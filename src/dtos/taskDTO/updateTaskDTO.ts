import { Priority , Status } from "../../domain/taskEnums";
export interface UpdateTaskDto {
  title?: string;
  description?: string;
  assigned_to?: string;
  priority?: Priority;
  status?: Status;
}