import { NotificationFactory } from "./notificationFactory";

export class NotificationService {
  private getChannel() {
    const channelType = process.env.NOTIFICATION_CHANNEL || "email";
    return NotificationFactory.create(channelType);
  }

  async sendWelcomeEmail(email: string, name: string) {
    const channel = this.getChannel();

    await channel.send(
      email,
      "Welcome to Our Platform",
      `Hello ${name}, welcome to our application!`
    );
  }

  async sendTaskCreatedNotification(email: string, taskTitle: string) {
    const channel = this.getChannel();

    await channel.send(
      email,
      "New Task Assigned",
      `A new task "${taskTitle}" has been assigned to you.`
    );
  }

  async sendTaskUpdatedNotification(email: string, taskTitle: string) {
    const channel = this.getChannel();

    await channel.send(
      email,
      "Task Updated",
      `The task "${taskTitle}" has been updated.`
    );
  }
}
