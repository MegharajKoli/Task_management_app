
import { Model } from 'mongoose';
import User, { IUser } from '../models/User';   

export interface IUserRepository {
  create(userData: Partial<IUser>): Promise<IUser>;
  findAll(): Promise<IUser[]>;
}

export class UserRepository implements IUserRepository {
  private  userModel: Model<IUser>;

  constructor() {
    this.userModel = User;   
  }

  async create(userData: Partial<IUser>): Promise<IUser> {
    const user = new this.userModel(userData);
    return user.save();
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
}