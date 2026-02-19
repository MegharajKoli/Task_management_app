
import User, { IUser } from '../models/User';   
import { IUserRepository } from '../domain/IUserInterface';
import { BaseMongoRepository } from './BaseRepository';

export class UserRepository extends BaseMongoRepository<IUser> implements IUserRepository{
 constructor() {
    super(User);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return this.model.findOne({ email }).exec();
  }
}