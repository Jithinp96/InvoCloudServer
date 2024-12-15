import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import reportController from "../controllers/reportController.js";

const reportRoutes = Router();

reportRoutes.get('/reports/sales', authMiddleware, reportController.salesReport);

export default reportRoutes;