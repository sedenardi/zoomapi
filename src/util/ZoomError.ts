export default class ZoomError extends Error {
  httpStatusCode: number;
  errorCode: number | null;
  response: string;
  constructor(httpStatusCode: number, errorCode: number | null, message: string, response: string) {
    super();
    this.httpStatusCode = httpStatusCode;
    this.errorCode = errorCode;
    this.message = message;
    this.response = response;
  }
}
