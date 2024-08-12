// src/profile/profile.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileDto } from './dto/profile.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async getProfileById(id: any): Promise<ProfileDto> {
    console.log('userId xxx', id);
    const profile = await this.userModel.findById(id, {__v:0}).exec();
    if (!profile) throw new NotFoundException(`Profile with ID ${id} not found`);
    return profile.toObject() as ProfileDto;
  }
}
