import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { User, UserSchema } from './schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localAdmin:localAdmin@localhost:27017/wowBlogPost'), // Replace with your MongoDB connection string
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), // Register User model
    AuthModule,
  ],
})
export class AppModule {}
