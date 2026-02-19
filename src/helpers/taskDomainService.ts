import { TaskStatusRules } from "../domain/taskStatusRules";

export class TaskDomainService {
  async changeStatus(current: string, next: string) {
    TaskStatusRules.validate(current, next);
  }
}
