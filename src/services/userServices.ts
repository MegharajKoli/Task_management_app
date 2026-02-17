import User from '../models/User';

export default class userServices{

    async createNewUser(userData :any){
        const user=new User(userData);
        await user.save();        


    return user;
        

        
}
     
    async fetchAllUsers(){
       return await User.find();
    }
}