import Sale from "../models/sales.js";

const reportController = {
    salesReport: async(req, res, next) => {
        
        const { startDate, endDate, sortBy } = req.query;
    
        try {
            const salesReport = await Sale.aggregate([
                {
                    $match: {
                        date: {
                            $gte: new Date(startDate),
                            $lte: new Date(endDate)
                        }
                    }
                },
            ]);
            console.log("salesReport: ", salesReport);
            
            res.json(salesReport);
        } catch (error) {
            next(error)
        }
    },

    itemReport: async(req, res, next) => {

    },

    customerLedger: async(req, res, next) => {

    }
}

export default reportController;