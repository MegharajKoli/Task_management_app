import { UserRepository } from '../repositories/userRepository';

export default class userServices{
private repository: UserRepository;

  constructor() {
    this.repository = new UserRepository();
  }
    async createNewUser(userData :any){
        const user = await this.repository.create(userData);
        return user;
}
     
    async fetchAllUsers(){
       return await this.repository.findAll();
    }
}