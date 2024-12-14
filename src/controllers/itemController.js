import ErrorMessages from "../enums/ErrorMessages.js";
import HttpStatusCodes from "../enums/httpStatusCodes.js";
import SuccessMessages from "../enums/successMessages.js";
import Item from "../models/item.js";

const itemController = {
    getItems: async(req, res, next) => {
        try {
            const items = await Item.find()
            res.status(HttpStatusCodes.OK).json({
                success: true,
                message: SuccessMessages.ITEM_FETCHED,
                items: items
            })
        } catch (error) {
            next(error)
        }
    },

    addItem: async (req, res, next) => {
        const { name, description, quantity, price } = req.body;
        
        try {
            const newItem = await Item.create({
                name,
                description,
                quantity,
                price
            });
            
            res.status(HttpStatusCodes.CREATED).json({
                success: true,
                message: SuccessMessages.ITEM_CREATED,
                item: newItem,
            })
        } catch (error) {
            next(error)
        }
    },

    switchItemStatus: async(req, res, next) => {
        const { itemId } = req.body;
        
        if(!itemId) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: ErrorMessages.ITEM_ID_REQUIRED
            })
        }

        try {
            const item = await Item.findById(itemId);

            if(!item) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    success: false,
                    message: ErrorMessages.ITEM_NOT_FOUND
                });
            }

            item.isListed = !item.isListed;

            const updatedItem = await item.save();

            return res.status(HttpStatusCodes.OK).json({
                success: true,
                message: SuccessMessages.ITEM_STATUS_UPDATED,
                data: {
                    itemId: updatedItem._id,
                    isListed: updatedItem.isListed
                }
            })
            
        } catch (error) {
            next(error)
        }
    },

    updateItem: async( req, res, next ) => {
        const { currentItemId } = req.query;
        const { name, description, quantity, price } = req.body;
        
        try {
            const updatedItem = await Item.findByIdAndUpdate(
                currentItemId,
                {name, description, quantity, price},
                {new: true}
            );

            if(!updatedItem) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    success: false,
                    message: ErrorMessages.ITEM_NOT_FOUND
                })
            }

            return res.status(HttpStatusCodes.OK).json({
                success: true,
                message: SuccessMessages.ITEM_EDITED,
                data: updatedItem
            })
        } catch (error) {
            next(error);
        }
    },

    deleteItem: async(req, res, next) => {
        const { itemId } = req.query;

        if(!itemId) {
            return res.status(HttpStatusCodes.BAD_REQUEST).json({
                success: false,
                message: ErrorMessages.ITEM_ID_REQUIRED
            })
        }
        try {
            const deleteResult = await Item.deleteOne({_id: itemId});
            
            if(deleteResult.deletedCount === 0) {
                return res.status(HttpStatusCodes.NOT_FOUND).json({
                    success: false,
                    message: ErrorMessages.ITEM_NOT_FOUND
                })
            }

            return res.status(HttpStatusCodes.OK).json({
                success: true,
                message: SuccessMessages.ITEM_DELETED,
                itemId
            })
            
        } catch (error) {
            next(error)
        }
    },
}

export default itemController