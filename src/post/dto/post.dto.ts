import { Prop } from "@nestjs/mongoose";
import { IsString } from "class-validator";

export class PostDto {
  @Prop({ required: true})
  @IsString()
  userId: string;
  
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
