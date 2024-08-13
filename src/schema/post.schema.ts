import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type PostDocument = Post & Document;
@Schema({ timestamps: true })
export class Post {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true, minlength: 1, maxlength: 255 })
  community: string;

  @Prop({ required: true, minlength: 1, maxlength: 255 })
  topic: string;

  @Prop({ required: true, minlength: 1 })
  content: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

// Optional: Indexing fields for better performance
PostSchema.index({ userId: 1, community: 1 });
