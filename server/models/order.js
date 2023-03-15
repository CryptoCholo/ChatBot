const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer: {
        sessionId: {
            type: String,
            required: true
        }
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
    }],
    totalCost: {
        type: Number,
        required: true
    },
}, {timestamp: true});

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;