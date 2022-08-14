import { Router, IRouter } from "express";
import productRoutes from "./api/productRoutes";
import userRoutes from "./api/userRoutes";
import orderRoutes from "./api/orderRoutes";
import orderProductsRoutes from "./api/orderProductsRoutes";

const indexRoutes: IRouter = Router();

indexRoutes.use("/products", productRoutes);
indexRoutes.use("/users", userRoutes);
indexRoutes.use("/orders", orderRoutes);
indexRoutes.use("/order-products", orderProductsRoutes);

export default indexRoutes;
