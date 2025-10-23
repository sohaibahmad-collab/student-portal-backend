export enum HttpMessage {
  OK = "Success",
  CREATED = "Resource created successfully",
  DELETED ="Resource deleted successfully",
  BAD_REQUEST = "Bad request",
  UNAUTHORIZED = "Unauthorized access",
  FORBIDDEN = "Forbidden",
  NOT_FOUND = "Resource not found",
  INTERNAL_SERVER_ERROR = "Internal server error",
  INVALID_EMAIL = "Invalid email",
  INVALID_PASSWORD = "Invalid password",
  INVALID_TOKEN = "Token is not valid",
  NO_TOKEN = "Authorization denied: No token provided",
}