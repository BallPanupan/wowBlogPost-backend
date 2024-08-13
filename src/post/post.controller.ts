import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostService } from './post.service';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Req() req, @Body() body: PostDto): Promise<any> {
    try{
      const userId = req.user._id;
      const createdPost = await this.postService.createPost({
        userId,
        ...body,
      });
      return createdPost
    } catch {
      return { message: 'success'};
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<any> {
    console.log('id', id)
    return this.postService.deletePostById(id);
  }

  @Get()
  async getPosts(): Promise<any> { // PostDto
    const posts = await this.postService.getPosts();
    return posts
  }
}


