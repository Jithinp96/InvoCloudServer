import { Router } from "express";

import userController from "../controllers/userController.js";

const userRoutes = Router();

userRoutes.post('/login', userController.login)

export default userRoutes