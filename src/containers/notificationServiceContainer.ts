import { NotificationFactory } from "../services/notification/notificationFactory";
import { NotificationService } from "../services/notification/notificationService";
const channelType = process.env.NOTIFICATION_CHANNEL || "email";

const channel = NotificationFactory.create(channelType);

export const notificationService = new NotificationService(channel);
