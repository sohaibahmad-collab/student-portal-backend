import { Request } from "express"
export interface authReq extends Request {
  userID: string;
}