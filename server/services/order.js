const OrderModel = require('../models/order')


class Order {
    constructor(items, customer) {
        this.customer = customer;
        this.items = items;
        this.timestamp = new Date();
    }

    async save() {
        const orderData = {
            items: this.items.map(item => ({ name: item.name, price: item.price })),
            total: this.calculateTotal(),
            timestamp: this.timestamp
        };
        const order = new OrderModel(orderData);
        await order.save();
    }

    calculateTotal() {
        let total = 0;
        this.items.forEach(item => {
            total += item.price;
        });
        return total;
    }

    getOrderDetails() {
        const orderItems = this.items.map(item => {
            return { name: item.name, price: item.price };
        });
        return { items: orderItems, total: this.calculateTotal(), timestamp: this.timestamp };
    }
}

module.exports = Order;
