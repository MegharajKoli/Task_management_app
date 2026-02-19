import { NotificationChannel } from "./notificationChannel";

export class EmailChannel implements NotificationChannel {

  async send(to: string, subject: string, message: string): Promise<void> {
    console.log("Sending Email...");
    console.log(`To: ${to}`);
    console.log(`Subject: ${subject}`);
    console.log(`Message: ${message}`);
  }
}
