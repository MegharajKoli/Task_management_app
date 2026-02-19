import { NotificationChannel } from "./notificationChannel";

export class SMSChannel implements NotificationChannel {

  async send(to: string, subject: string, message: string): Promise<void> {
    console.log("Sending SMS...");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
  }
}
