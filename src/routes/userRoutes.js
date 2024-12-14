import { Router } from "express";

import userController from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRoutes = Router();

userRoutes.post('/login', userController.login);
userRoutes.post('/logout', userController.logout);

export default userRoutes