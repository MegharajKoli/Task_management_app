import { NotificationService } from "../services/notification/notificationService";
import {IUser} from "../models/User";
import { ITask } from "../models/Task";

export class NotificationHelper{
    constructor(private notificationservice:NotificationService){}

    async sendWelcome(user: IUser){
        await this.notificationservice.sendWelcomeEmail(user.email,user.name);
    }

    async taskCreated(user :IUser, task :ITask){
        await this.notificationservice.sendTaskCreatedNotification(user.email,task.title);
    }

    async taskUpdated(user :IUser, task :ITask){
        await this.notificationservice.sendTaskUpdatedNotification(user.email,task.title);
    }
}