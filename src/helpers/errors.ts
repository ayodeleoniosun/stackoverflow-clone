export class CustomError extends Error {
  type: string;
  constructor(message = "Error", type = null) {
    super(message);
    this.type = type;
    Error.captureStackTrace(this, CustomError);
  }
}
