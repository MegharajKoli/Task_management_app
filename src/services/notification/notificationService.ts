import { NotificationChannel } from "./channels/notificationChannel";

export class NotificationService {
  constructor(private channel: NotificationChannel) {}

  async sendWelcomeEmail(email: string, name: string) {
    await this.channel.send(
      email,
      "Welcome to Our Platform",
      `Hello ${name}, welcome to our application!`
    );
  }

  async sendTaskCreatedNotification(email: string, taskTitle: string) {
    await this.channel.send(
      email,
      "New Task Assigned",
      `A new task "${taskTitle}" has been assigned to you.`
    );
  }

  async sendTaskUpdatedNotification(email: string, taskTitle: string) {
    await this.channel.send(
      email,
      "Task Updated",
      `The task "${taskTitle}" has been updated.`
    );
  }
}