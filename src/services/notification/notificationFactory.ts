import { NotificationChannel } from "./channels/notificationChannel";
import { EmailChannel } from "./channels/emailChannel";
import { SMSChannel } from "./channels/smsChannel";


export class NotificationFactory {
  static create(type: string): NotificationChannel {
    switch (type) {
      case "email":
        return new EmailChannel();
      case "sms":
        return new SMSChannel();
      default:
        throw new Error("Invalid notification type");
    }
  }
}
