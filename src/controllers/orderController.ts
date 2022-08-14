import { Request, Response } from "express";
import { Order } from "../models/order";
import { UserRequest } from "./../userRequest";

const order = new Order();

class OrderController {
   create = async (req: UserRequest, res: Response) => {
      try {
         let newOrder = await order.create(req.currentUser?.id || "");

         return res.json({
            order: newOrder,
         });
      } catch (err) {
         res.json({
            message: "Something went wrong",
         });
      }
   };

   index = async (req: UserRequest, res: Response) => {
      try {
         let orders = await order.index(req.currentUser?.id || "");

         if (!orders)
            return res.json({ message: "There isn't order with this id" });

         return res.json({ orders });
      } catch (err) {
         res.json({
            message: "Something went wrong",
         });
      }
   };
}

export default OrderController;
