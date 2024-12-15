import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    houseName: {
        type: String,
        required: true,
    },
    place: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
});

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: addressSchema,
        required: true,
    },
    mobile: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

const Customer = mongoose.model('Customer', customerSchema);
export default Customer;