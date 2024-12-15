import Sale from "../models/sales.js";
import Item from "../models/item.js";
import Customer from "../models/customer.js";

import HttpStatusCodes from "../enums/httpStatusCodes.js";
import SuccessMessages from "../enums/successMessages.js";
import ErrorMessages from "../enums/ErrorMessages.js";

import AppError from "../utils/appError.js";

const saleController = {
    addSale: async(req, res, next) => {
        try {
            console.log("Reached add sale controller");
            
            const { item, customer, quantity, paymentMode } = req.body;

            const existingItem = await Item.findById(item);
            const existingCustomer = await Customer.findById(customer);

            if (!existingItem) {
                return next(new AppError(HttpStatusCodes.NOT_FOUND, ErrorMessages.NOT_FOUND('Item')));
            }
            if (!existingCustomer) {
                return next(new AppError(HttpStatusCodes.NOT_FOUND, ErrorMessages.NOT_FOUND('Customer')));
            }
            if (existingItem.quantity < quantity) {
                return next(new AppError(HttpStatusCodes.BAD_REQUEST, ErrorMessages.LESS_STOCK));
            }

            const sale = await Sale.create({
                item,
                customer,
                quantity,
                paymentMode,
            });

            existingItem.quantity -= quantity;
            await existingItem.save();

            res.status(HttpStatusCodes.CREATED).json({
                success: true,
                message: SuccessMessages.SALE_SAVED,
                sale,
            });
        } catch (error) {
            next(new AppError(HttpStatusCodes.INTERNAL_SERVER_ERROR, ErrorMessages.INTERNAL_SERVER_ERROR));
        }
    }
}

export default saleController