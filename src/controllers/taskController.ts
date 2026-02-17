import type {Request, Response} from "express";
import taskServices from "../services/taskServices";
import { asyncHandler } from '../middlewares/asyncHandlers';

export default class taskController{

    constructor(private taskservices:taskServices){}

    createTask= asyncHandler(async (req : Request, res : Response) => {
    if (!req.body.title) {
      return res.status(400).send("Title is required");
    }
    const task = await this.taskservices.createNewTask(req.body);
    res.send(task); 
    });

    deleteTask = asyncHandler(async (req: Request, res: Response) => {
            const id : string = req.params.id as string;
            await this.taskservices.delete(id);
            res.send({ message: "Deleted" });
        
    });

    updateTask = asyncHandler(async (req: Request, res: Response) => {
            const id : string = req.params.id as string;
            const task = await this.taskservices.update(id, req.body);
            res.send(task);
        
    });

    getTasks =  async (req : Request, res : Response) => {
    const tasks = await this.taskservices.fetchAllTask();
    res.send(tasks);
    };
}