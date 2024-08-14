import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CommentDocument = Comment & Document;

@Schema({ timestamps: true })
export class Comment {
  @Prop({ type: Types.ObjectId, required: true })
  postId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, minlength: 1, maxlength: 255 })
  comment: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

CommentSchema.index({ userId: 1, postId: 1 });
