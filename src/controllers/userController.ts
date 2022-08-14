import { Request, Response } from "express";
import { User, UserTypes } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const user = new User();

class UserController {
   register = async (req: Request, res: Response) => {
      try {
         const newUser: UserTypes = await user.register(req.body);
         const token = jwt.sign(
            { id: newUser.id },
            process.env.jwtSecret || ""
         );

         return res.json({ user: newUser, token });
      } catch (err) {
         console.log(err);
         res.json({
            message: "Something went wrong",
         });
      }
   };

   login = async (req: Request, res: Response) => {
      try {
         const currentUser: UserTypes = await user.login(req.body.email);

         if (!user)
            return res.json({
               message: "User doesn't exist",
            });

         const correctPassword = await bcrypt.compare(
            req.body.password,
            currentUser.password || ""
         );
         if (!correctPassword)
            return res.json({ message: "Invalid email or password" });

         const token = jwt.sign(
            { id: currentUser.id },
            process.env.jwtSecret || ""
         );

         let { password, ...userData } = currentUser;

         return res.json({
            user: userData,
            token,
         });
      } catch (err) {
         console.log(err);
         res.json({
            message: "Something went wrong",
         });
      }
   };

   index = async (_req: Request, res: Response) => {
      try {
         const users = await user.index();
         return res.json(users);
      } catch (err) {
         res.json({
            message: "Something went wrong",
         });
      }
   };

   show = async (req: Request, res: Response) => {
      try {
         const getUser = await user.show(req.params.id);
         return res.json({ user: getUser });
      } catch (err) {
         res.json({
            message: "Something went wrong",
         });
      }
   };
}

export default UserController;
