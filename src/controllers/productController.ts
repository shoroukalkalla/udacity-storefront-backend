import { Request, Response } from "express";
import Product from "../models/product";
import { UserRequest } from "./../userRequest";

const product = new Product();

class ProductController {
   index = async (_req: Request, res: Response) => {
      try {
         const products = await product.index();
         res.json(products);
      } catch (err) {
         res.json({
            message: "Something went wrong",
         });
      }
   };

   show = async (req: Request, res: Response) => {
      try {
         const getProduct = await product.show(req.params.id);
         res.json({ product: getProduct });
      } catch (err) {
         res.json({
            message: "Something went wrong",
         });
      }
   };

   create = async (req: UserRequest, res: Response) => {
      try {
         const newProduct = await product.create(
            req.body,
            req.currentUser?.id || ""
         );

         res.json({ product: newProduct });
      } catch (err) {
         console.log(err);
         res.json({
            message: "Something went wrong",
         });
      }
   };
}

export default ProductController;
