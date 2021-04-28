export class CustomError extends Error {
  type: string;
  constructor(type, message = "Error") {
    super(message);
    this.type = type;
    Error.captureStackTrace(this, CustomError);
  }
}
