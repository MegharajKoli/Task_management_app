import { Priority } from "../../domain/taskEnums";

export interface CreateTaskDto {
  title: string;
  description: string;
  assigned_to: string; 
  priority: Priority;
}