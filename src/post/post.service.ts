import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schema/post.schema';
import { Comment, CommentDocument } from 'src/schema/comment.schema';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<PostDocument>,
    @InjectModel(Comment.name) private readonly commentModel: Model<CommentDocument>,
  ) {}


  async createPost(content: PostDto): Promise<any> { 
    try {
      const createdPost = this.postModel.create(content);
      return { message: 'success'};
    } catch {
      return { message: 'failed' };
    }
  }

  async getPosts(id: any): Promise<any> {
    const aggregate: mongoose.PipelineStage[] = [
      {
        $match: {
          _id: id ? new mongoose.Types.ObjectId(id) : { $exists: true }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments'
        }
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.userId',
          foreignField: '_id',
          as: 'comments.user'
        }
      },
      {
        $unwind: {
          path: '$comments.user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          community: { $first: '$community' },
          topic: { $first: '$topic' },
          content: { $first: '$content' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          user: { $first: '$user' },
          comments: { $push: { $mergeObjects: ['$comments', { user: '$comments.user' }] } }
        }
      },
      {
        $addFields: {
          comments: {
            $cond: {
              if: { $eq: [{ $size: '$comments' }, 0] },
              then: [],
              else: '$comments'
            }
          }
        }
      },
      {
        $project: {
          __v: 0,
          'user.__v': 0,
          'comments.__v': 0
        }
      }
    ];

    const post = await this.postModel.aggregate(aggregate).exec()
    const result = post
      .map((content: any) => {
        return {
          ...content,
          user: content.user[0] || {}
        };
      })
      .map(data => {
        return {...data, comments: [...data.comments].reverse()}
      })

    if (!result) {
      throw new NotFoundException('Post not found');
    }
    return result;
  }

  async deletePostById(id: string): Promise<any> {
    const deletedPost = await this.postModel.findByIdAndDelete(id).exec();
    if (!deletedPost) {
      throw new NotFoundException(`Post with ID "${id}" not found`);
    }
    return { message: 'Post deleted successfully', deletedPost };
  }

  async getPostById(id: string): Promise<any> {
    try {
      const post = await this.postModel.findById(id).exec();
      if (!post) {
        throw new NotFoundException('Post not found');
      }
      return post;
    } catch {
      return []
    }
  }


  async getMyPosts(id: any): Promise<any> {
    const aggregate: mongoose.PipelineStage[] = [
      {
        $match: {
          userId: id ? new mongoose.Types.ObjectId(id) : {$exists: true}
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments'
        }
      },
      {
        $unwind: {
          path: '$comments',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'comments.userId',
          foreignField: '_id',
          as: 'comments.user'
        }
      },
      {
        $unwind: {
          path: '$comments.user',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $group: {
          _id: '$_id',
          community: { $first: '$community' },
          topic: { $first: '$topic' },
          content: { $first: '$content' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          user: { $first: '$user' },
          comments: { $push: { $mergeObjects: ['$comments', { user: '$comments.user' }] } }
        }
      },
      {
        $addFields: {
          comments: {
            $cond: {
              if: { $eq: [{ $size: '$comments' }, 0] },
              then: [],
              else: '$comments'
            }
          }
        }
      },
      {
        $project: {
          __v: 0,
          'user.__v': 0,
          'comments.__v': 0
        }
      }
    ];

    const post = await this.postModel.aggregate(aggregate).exec()

    const result = post.map((content: any) => {
      return {
        ...content,
        user: content.user[0] || {}
      };
    });

    if (!result) {
      throw new NotFoundException('Post not found');
    }
    return result;
  }
  
  async updatePostById(id: string, updateData: any): Promise<any> {
    const updatePost = await this.postModel.findByIdAndUpdate(id, { 
      $set: updateData 
    }).exec();
    
    return { message: 'Post update successfully', updatePost };
  }

  async addComment(postId: string, userId: string, commentText: string): Promise<Comment> {
    const prepareComment = {
      postId: new mongoose.Types.ObjectId(postId),
      userId: new mongoose.Types.ObjectId(userId),
      comment: commentText,
    }
    const createdComment = await this.commentModel.create(prepareComment);
    return createdComment;
  }


}
