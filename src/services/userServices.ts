import { UserRepository } from '../repositories/userRepository';
import { AppError } from '../middlewares/appError';
import { NotificationService } from './notification/notificationService';

export default class userServices{

  constructor(private repository: UserRepository, private notificationService: NotificationService) {
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
        this.notificationService.sendWelcomeEmail(user.email,user.name);
        return user;
    }
     
    async fetchAllUsers(){
       return await this.repository.findAll();
    }
    
    
}