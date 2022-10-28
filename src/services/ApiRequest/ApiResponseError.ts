/**
 *
 *  Throws when the server responds with a status code that falls out of the range 2xx
 *  @param statusCode - HTTP status code the server responded with
 *  @param data - Server response body
 *
 * */
class ApiResponseError extends Error {
  statusCode: number;
  data: any;
  constructor(statusCode: number, data: any) {
    super(`ApiResponseError (${statusCode})`);
    this.statusCode = statusCode;
    this.data = data;
    this.name = "ApiResponseError";
  }
}

export default ApiResponseError;
