import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostService } from './post.service';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(@Req() req, @Body() body: PostDto): Promise<any> { // PostDto
    const userId = req.user._id.toString();
    const createdPost = await this.postService.createPost({
      userId,
      ...body,
    });
    return createdPost
  }

  @Get()
  async getPosts(): Promise<any> { // PostDto
    const posts = await this.postService.getPosts();
    return posts
  }
}


