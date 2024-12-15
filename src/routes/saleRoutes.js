import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import saleController from "../controllers/saleController.js";

const saleRoutes = Router();

saleRoutes.post('/add-sale', authMiddleware, saleController.addSale);

export default saleRoutes;