import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { Post, PostSchema } from 'src/schema/post.schema';
import { Comment, CommentSchema } from 'src/schema/comment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      { name: Comment.name, schema: CommentSchema }
    ])
  ],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService] 
})
export class PostModule { }
