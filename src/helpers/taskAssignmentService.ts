import userServices from "../services/userServices";
  import mongoose from "mongoose";
  import { AppError } from "../middlewares/appError";
  import { UserRepository } from "../repositories/userRepository";

export class TaskAssignmentService {
  constructor(private repository: UserRepository) {}

  async resolveUser(identifier: string) {

  if (mongoose.Types.ObjectId.isValid(identifier)) {
    const user = await this.repository.findById(identifier);
    if (!user) throw new AppError("User not found", 404);
    return user;
  }

  const user = await this.repository.findByEmail(identifier);
  if (!user) throw new AppError("User not found", 404);
  return user;
}
}
