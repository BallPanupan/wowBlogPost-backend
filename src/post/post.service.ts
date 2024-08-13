import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from 'src/schema/post.schema';
import { PostDto } from './dto/post.dto';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }

  async createPost(content: PostDto): Promise<any> { // Post
    try {
      const createdPost = this.postModel.create(content);
      return { message: 'success'};
    } catch {
      return { message: 'failed' };
    }
  }

  async getPosts(): Promise<any> {

    const aggregate: any = [
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $project: {
          __v: 0,
          'user.__v': 0,
          'userId': 0,
        },
      },
    ]

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

}
