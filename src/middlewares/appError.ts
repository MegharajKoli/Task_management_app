export class AppError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    // This ensures the error points to the right place in your code
    Object.setPrototypeOf(this, AppError.prototype);
  }
}