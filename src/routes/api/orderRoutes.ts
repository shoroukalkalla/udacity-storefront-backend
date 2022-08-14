import { Router, IRouter } from "express";
import { protect } from "./../../middleware/authMiddleware";
import OrderController from "./../../controllers/orderController";

const orderController = new OrderController();

const orderRoutes: IRouter = Router();

orderRoutes.use(protect);

orderRoutes.route("/").post(orderController.create).get(orderController.index);

export default orderRoutes;
