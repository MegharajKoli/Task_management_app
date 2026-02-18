export class TaskStatusRules {
  private static readonly VALID_TRANSITIONS: Record<string, string[]> = {
    Open: ["In Progress"],
    "In Progress": ["Done"],
    Done: [],
  };

  static validate(current: string, next: string) {
    if (!this.VALID_TRANSITIONS[current]?.includes(next)) {
      throw new Error(`Invalid status transition: ${current} → ${next}`);
    }
  }
}