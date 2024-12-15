import ErrorMessages from "../enums/ErrorMessages.js"
import HttpStatusCodes from "../enums/httpStatusCodes.js"
import SuccessMessages from "../enums/successMessages.js"
import Customer from "../models/customer.js"

const customerController = {
    getCustomers: async(req, res, next) => {
        try {
            const customers = await Customer.find()

            res.status(HttpStatusCodes.OK).json({
                success: true,
                message: SuccessMessages.CUSTOMER_FETCHED,
                customers
            })
        } catch (error) {
            next(error)
        }
    },

    addCustomer: async(req, res, next) => {
        const customerDetails  = req.body
        
        try {
            const newCustomer = await Customer.create(customerDetails);

            return res.status(HttpStatusCodes.CREATED).json({
                success: true,
                message: SuccessMessages.CUSTOMER_CREATED,
                newCustomer
            })
        } catch (error) {
            next(error)
        } 
    },

    updateCustomer: async(req, res, next) => {
        const {currentCustomerId} = req.query;
        const updateCustomer = req.body;
        
        try {
            const updatedCustomer = await Customer.findByIdAndUpdate(
                currentCustomerId,
                updateCustomer,
                {new: true}
            );

            if(!updatedCustomer) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    success: false,
                    message: ErrorMessages.CUSTOMER_NOT_FOUND
                })
            }

            return res.status(HttpStatusCodes.OK).json({
                success: true,
                message: SuccessMessages.CUSTOMER_EDITED,
                data: updatedCustomer
            })
        } catch (error) {
            next(error)
        }
    },
    switchCustomerStatus: async(req, res, next) => {
        const { customerId } = req.body;
        console.log("customerId: ", customerId);
        
        if(!customerId) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: ErrorMessages.CUSTOMER_ID_REQUIRED
            });
        }

        try {
            const customer = await Customer.findById(customerId);

            if(!customer) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    success: false,
                    message: ErrorMessages.CUSTOMER_NOT_FOUND
                });
            }

            customer.isActive = !customer.isActive;

            const updatedCustomer = await customer.save();

            return res.status(HttpStatusCodes.OK).json({
                success: true,
                message: SuccessMessages.CUSTOMER_STATUS_UPDATED,
                data: {
                    customerId: updatedCustomer._id,
                    isActive: updatedCustomer.isActive
                }
            })
        } catch (error) {
            next(error);
        }
    }
}

export default customerController;