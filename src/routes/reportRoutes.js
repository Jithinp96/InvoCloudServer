import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import reportController from "../controllers/reportController.js";

const reportRoutes = Router();

reportRoutes.get('/reports/sales', authMiddleware, reportController.salesReport);
reportRoutes.get('/reports/items', authMiddleware, reportController.itemReport);
reportRoutes.get('/reports/customer-ledger/:customerId', authMiddleware, reportController.customerLedger);
reportRoutes.post('/reports/email', authMiddleware, reportController.sendEmailReport);

export default reportRoutes;