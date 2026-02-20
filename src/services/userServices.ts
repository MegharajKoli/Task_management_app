import { UserRepository } from '../repositories/userRepository';
import { NotificationHelper } from '../helpers/notificationHelper';
import { UserDTO } from '../dtos/userDTO';

export default class userServices{

  constructor(private repository: UserRepository, private notificationhelper:NotificationHelper) {
  }
    
    async createNewUser(userData : UserDTO){
        const user = await this.repository.create(userData);
        await this.notificationhelper.sendWelcome(user);
        return user;
    }
     
    async fetchAllUsers(){
       return await this.repository.findAll();
    }
    
    
}