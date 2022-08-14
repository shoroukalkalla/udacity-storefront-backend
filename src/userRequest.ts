import { Request } from "express";
import { UserTypes } from "./models/user";

export interface UserRequest extends Request {
   currentUser?: UserTypes;
}
