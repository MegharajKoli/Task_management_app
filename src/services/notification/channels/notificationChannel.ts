export interface NotificationChannel {
  send(to: string, subject: string, message: string): Promise<void>;
}
