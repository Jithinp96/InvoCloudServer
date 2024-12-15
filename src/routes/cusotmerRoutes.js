import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import customerController from "../controllers/customerController.js";

const customerRoutes = Router();

customerRoutes.get('/customers', authMiddleware, customerController.getCustomers);
customerRoutes.post('/customer/add', authMiddleware, customerController.addCustomer);

export default customerRoutes