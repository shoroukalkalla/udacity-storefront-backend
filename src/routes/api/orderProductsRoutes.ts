import { Router, IRouter } from "express";
import { protect } from "./../../middleware/authMiddleware";
import OrderProductsController from "./../../controllers/orderProductsController";

const orderProductsController = new OrderProductsController();

const orderProductsRoutes: IRouter = Router();

orderProductsRoutes.use(protect);

orderProductsRoutes.route("/").post(orderProductsController.create);

orderProductsRoutes.route("/:id").get(orderProductsController.index);

export default orderProductsRoutes;
