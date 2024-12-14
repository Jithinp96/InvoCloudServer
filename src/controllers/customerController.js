import HttpStatusCodes from "../enums/httpStatusCodes"
import SuccessMessages from "../enums/successMessages"
import Customer from "../models/customer"

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
        const { customerDetails } = req.body
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
    }
}

export default customerController;