import { Request, Response } from "express";
import { OrderProducts } from "./../models/oderProducts";

const orderProducts = new OrderProducts();

class OrderProductsController {
   create = async (req: Request, res: Response) => {
      try {
         const newOrderProducts = await orderProducts.create(
            req.body.order_id,
            req.body.product_id,
            req.body.quantity
         );

         return res.json({ ordersProducts: newOrderProducts });
      } catch (err) {
         res.json({
            message: "Something went wrong",
         });
      }
   };

   index = async (req: Request, res: Response) => {
      try {
         const allOrderProducts = await orderProducts.index(req.params.id);

         if (!allOrderProducts)
            return res.json({
               message: "There is no any products for this order",
            });

         return res.json({ orderProducts: allOrderProducts });
      } catch (err) {
         res.json({
            message: "Something went wrong",
         });
      }
   };
}

export default OrderProductsController;
