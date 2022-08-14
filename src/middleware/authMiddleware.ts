import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import { User, UserTypes } from "../models/user";
import { UserRequest } from "./../userRequest";

dotenv.config();

const user = new User();

export const protect = async (
   req: UserRequest,
   res: Response,
   next: NextFunction
) => {
   try {
      let token: string | null = null;

      if (
         req.headers.authorization &&
         req.headers.authorization.split(" ")[0] == "Bearer"
      ) {
         token = req.headers.authorization.split(" ")[1];
      }

      if (!token) return res.json({ message: "There is no token" });

      const decode = jwt.verify(
         token || "",
         process.env.jwtSecret || ""
      ) as JwtPayload;

      const currentUser = await user.show(decode.id);
      if (!currentUser) {
         return res.json({ message: "Token in invalid" });
      }

      req.currentUser = currentUser;

      next();
   } catch (err) {
      console.log(err);
      throw new Error("Invalid token");
   }
};
