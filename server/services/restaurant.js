const Menu = require('./menu')
const Order = require('./order');



class RestaurantEvent {
    constructor({ data, eventName, message } ) {
        this.data = data;
        this.eventName = eventName;
        this.message = message;
    }
}



class Restaurant {
    constructor() {
        this.menu = new Menu();
        this.order = new Order();
        this.orderHistory = [];
    }

    createEvent({ message, data, eventName }) {
        const event = new RestaurantEvent({ message, data, eventName })
        this.events.push(event);
        return event;
    }

    emitEvent(event) {
        this.socket.emit(event.eventName, event);
    }

    emitRestaurantEvent({ message, data, eventName }) {
        const event = this.createEvent({ message, data, eventName });
        this.emitEvent(event)
    }


    getMenu() {
        return this.menu.getMenu();
    }

    getGrilledMenu() {
        return this.menu.getGrilledMenu();
    }

    getSoupMenu() {
        return this.menu.getSoupMenu();
    }

    getSideMenu() {
        return this.menu.getSideMenu();
    }
    getBeverageMenu() {
        return this.menu.getBeverageMenu();
    }

    placeOrder(orderItems) {
        const items = [];
        orderItems.forEach(item => {
            const menuItem = this.menu.menuItems.find(menuItem => menuItem.name === item.name);
            if (menuItem) {
                items.push(menuItem);
            }
        });
        this.order.addItems(items);
        return this.order.calculateTotal();
    }

    getCurrentOrder() {
        return this.order.getOrderDetails();
    }

    getOrderHistory() {
        return this.order.getOrderHistory();
    }
}

module.exports = Restaurant;