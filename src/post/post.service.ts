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
      const createdPost = new this.postModel(content);
      return { message: 'success' };
    } catch {
      return { message: 'failed' };
    }
  }

  async getPosts(): Promise<any> {
    const post = await this.postModel.find({},{__v: 0}).lean()
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    return post;
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
