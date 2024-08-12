import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(username: string): Promise<User | null> {
    return this.userModel.findOne({username: username}).exec();
  }

  async login(user: User) {
    const payload: any = { username: user.username };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

	async register(username: any) {
    const payload: any = { username: username };
		const prepareData = {
			username: username
		}
		const createUserResult = await this.userModel.create(prepareData);
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
