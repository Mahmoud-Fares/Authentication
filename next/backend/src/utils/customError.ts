type ErrorStatus =
   | "ERROR"
   | "VALIDATION_ERROR"
   | "UNAUTHORIZED"
   | "CONFLICT"
   | "BAD_REQUEST"
   | "FORBIDDEN"
   | "NOT_FOUND";

class CustomError extends Error {
   statusCode: number = 500;
   statusText: ErrorStatus = "ERROR";

   constructor() {
      super();
      Error.captureStackTrace(this, this.constructor);
   }

   create(
      message: string,
      statusCode: number,
      statusText: ErrorStatus
   ): CustomError {
      this.message = message;
      this.statusCode = statusCode;
      this.statusText = statusText;
      return this;
   }
}

export default new CustomError();
