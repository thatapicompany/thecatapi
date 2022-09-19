/**
 *
 *  Throws when no response was received from the server
 *  @param message - error message
 *
 * */
class ApiRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ApiRequestError";
  }
}

export default ApiRequestError;
