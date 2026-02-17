import type {Request, Response} from "express";
import userServices from "../services/userServices";
import { asyncHandler } from '../middlewares/asyncHandlers';

export default class userController{

    constructor(private userservice: userServices){}

    createUser = asyncHandler(async (req : Request, res : Response) => {
  
    if (!req.body.email) {
      return res.status(400).send("Email required");
    } 
    const user = await this.userservice.createNewUser(req.body);
    res.send(user);
 
    });


    getUsers = async (req: Request, res: Response) => {
        const users = await this.userservice.fetchAllUsers();
        res.send(users);
    };
};