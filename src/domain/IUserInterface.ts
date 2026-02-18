import { IUser } from '../models/User';   

export interface IUserRepository {
  create(userData: Partial<IUser>): Promise<IUser>;
  findAll(): Promise<IUser[]>;
  findByEmail(email: string): Promise<IUser | null>;
}
