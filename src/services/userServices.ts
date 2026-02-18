import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../middlewares/appError';

export default class userServices{
private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }
    
  async getValidUserByEmail(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new AppError("User Not Found", 404);
    }
    return user;
  }

    async createNewUser(userData :any){
        const user = await this.repository.create(userData);
        return user;
    }
     
    async fetchAllUsers(){
       return await this.repository.findAll();
    }
    
    
}