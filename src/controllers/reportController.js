import Sale from "../models/sales.js";
import Item from "../models/item.js";
import Customer from "../models/customer.js";
import nodemailer from 'nodemailer';

const reportController = {
    // Sales Report
    salesReport: async (req, res, next) => {
        try {
            const sales = await Sale.find()
                .populate("item", "name price")
                .populate("customer", "name")
                .sort({ date: -1 });
    
            const report = sales.map(sale => ({
                date: sale.date,
                item: sale.item.name,
                customer: sale.customer.name,
                quantity: sale.quantity,
                paymentMode: sale.paymentMode,
                total: sale.quantity * sale.item.price
            }));
    
            res.status(200).json({ message: "Sales Report", report });
        } catch (error) {
            res.status(500).json({ message: "Error generating sales report", error });
        }
    },

    // Item Report
    itemReport: async (req, res, next) => {
        try {
            const items = await Item.find();
            const sales = await Sale.find();
    
            const report = items.map(item => {
                const totalSold = sales
                    .filter(sale => sale.item.toString() === item._id.toString())
                    .reduce((sum, sale) => sum + sale.quantity, 0);
    
                return {
                    name: item.name,
                    description: item.description,
                    totalSold,
                    remainingStock: item.quantity - totalSold,
                    isListed: item.isListed
                };
            });
    
            res.status(200).json({ message: "Items Report", report });
        } catch (error) {
            res.status(500).json({ message: "Error generating items report", error });
        }
    },

    // Customer Ledger
    customerLedger: async (req, res, next) => {
        try {
            const { customerId } = req.params;
            
            const customer = await Customer.findById(customerId);
            if (!customer) return res.status(404).json({ message: "Customer not found" });
            
            const transactions = await Sale.find({ customer: customerId })
                .populate("item", "name price")
                .sort({ date: -1 });

            const ledger = transactions.map(transaction => ({
                date: transaction.date,
                item: transaction.item.name,
                quantity: transaction.quantity,
                total: transaction.quantity * transaction.item.price,
                paymentMode: transaction.paymentMode
            }));

            res.status(200).json({
                message: `Ledger for Customer: ${customer.name}`,
                customerDetails: {
                    name: customer.name,
                    mobile: customer.mobile,
                    address: customer.address
                },
                ledger
            });
        } catch (error) {
            console.log("Inside catch");
            
            res.status(500).json({ message: "Error generating customer ledger", error });
        }
    },

    sendEmailReport: async (req, res) => {
        const { reportType, data } = req.body;
    
        try {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD,
                },
            });
    
            const message = {
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_RECEPIENT,
                subject: `Your ${reportType} Report`,
                text: `Please find attached the ${reportType} report.`,
                attachments: [
                    {
                        filename: `${reportType}-report.json`,
                        content: JSON.stringify(data, null, 2),
                    },
                ],
            };
    
            await transporter.sendMail(message);
    
            res.status(200).json({ success: true, message: 'Report sent via email' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Failed to send email' });
        }
    }
}

export default reportController;