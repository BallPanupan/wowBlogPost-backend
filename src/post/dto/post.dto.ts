import { IsString } from "class-validator";

export class PostDto {
  @IsString()
  id: string;

  @IsString()
  userId: string;
  
  @IsString()
  community: string;
  
  @IsString()
  topic: string;
  
  @IsString()
  content: string;
}
