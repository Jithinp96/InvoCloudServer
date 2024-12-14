import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import itemController from "../controllers/itemController.js";

const itemRoutes = Router();

itemRoutes.post('/addItem', authMiddleware, itemController.addItem);
itemRoutes.get('/items', authMiddleware, itemController.getItems );
itemRoutes.delete('/item/delete', authMiddleware, itemController.deleteItem);
itemRoutes.patch('/item/change-status', authMiddleware, itemController.switchItemStatus)

export default itemRoutes