import type {Request, Response} from "express";
import userServices from "../services/userServices";


export default class userController{

    constructor(private userservice: userServices){}

createUser = async (req : Request, res : Response) => {
  try {
    if (!req.body.email) {
      return res.status(400).send("Email required");
    } 
    const user = await this.userservice.createNewUser(req.body);
    res.send(user);
  } catch (err : any) {
    res.status(500).send(err.message);
  }
};


getUsers = async (req: Request, res: Response) => {
        const users = await this.userservice.fetchAllUsers();
        res.send(users);
    };
};