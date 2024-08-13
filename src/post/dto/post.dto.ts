import { Prop } from "@nestjs/mongoose";
import { IsMongoId, IsString } from "class-validator";
import { Types } from "mongoose";

export class PostDto {
  @Prop({ required: true, type: Types.ObjectId })
  userId: Types.ObjectId;
  
  @Prop({ required: true})
  @IsString()
  community: string;
  
  @Prop({ required: true})
  @IsString()
  topic: string;
  
  @Prop({ required: true})
  @IsString()
  content: string;
}
