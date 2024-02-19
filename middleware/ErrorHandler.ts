export default class ErrorHandler extends Error {
  statusCode: number;
  path: any;
  value: any;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}
