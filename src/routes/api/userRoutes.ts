import { Router, IRouter } from "express";
import UserController from "./../../controllers/userController";
import { protect } from "./../../middleware/authMiddleware";

const userController = new UserController();

const userRoutes: IRouter = Router();

userRoutes.post("/register", userController.register);
userRoutes.post("/login", userController.login);

userRoutes.use(protect);
userRoutes.get("/", userController.index);
userRoutes.get("/:id", userController.show);

export default userRoutes;
