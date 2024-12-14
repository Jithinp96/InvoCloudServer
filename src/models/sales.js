import mongoose from "mongoose";

const saleSchema = new mongoose.Schema({
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required: true,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },
    paymentMode: {
        type: String,
        enum: ['Cash', 'Card'],
        required: true
    }
}, {timestamps: true});

const Sale = mongoose.model('Sale', saleSchema);
export default Sale;