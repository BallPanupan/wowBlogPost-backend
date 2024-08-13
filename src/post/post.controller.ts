import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PostService } from './post.service';

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
    return this.postService.deletePostById(id);
  }

  @Get()
  async getPosts(@Query('id') id: string): Promise<any> { 
    const posts = await this.postService.getPosts(id);
    return posts
  }

  @UseGuards(JwtAuthGuard)
  @Get('/mypost')
  async getMyPosts(@Req() req): Promise<any> { 
    const userId = req.user._id;
    return await this.postService.getMyPosts(userId);
  }

}


