import { Router, IRouter } from "express";
import ProductController from "../../controllers/productController";
import { protect } from "./../../middleware/authMiddleware";

const productController = new ProductController();
const productRoutes: IRouter = Router();

productRoutes
   .route("/")
   .post(protect, productController.create)
   .get(productController.index);

productRoutes.route("/:id").get(productController.show);

export default productRoutes;
