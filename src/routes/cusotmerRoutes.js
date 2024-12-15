import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import customerController from "../controllers/customerController.js";

const customerRoutes = Router();

customerRoutes.get('/customers', authMiddleware, customerController.getCustomers);
customerRoutes.post('/customer/add', authMiddleware, customerController.addCustomer);
customerRoutes.put('/customer/update', authMiddleware, customerController.updateCustomer);
customerRoutes.patch('/customer/change-status', authMiddleware, customerController.switchCustomerStatus);

export default customerRoutes