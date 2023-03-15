

class MenuItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Menu {
    constructor() {
        this.menuItems = ["For Grilled options reply 10 ","For Pepper Soup options reply 20 ","For Sides reply 30","For Beverages reply 40"];
    }

    addItem(name, price) {
        const menuItem = new MenuItem(name, price);
        this.menuItems.push(menuItem);
    }

    removeItem(name) {
        this.menuItems = this.menuItems.filter(item => item.name !== name);
    }

    getMenu() {
        return this.menuItems;
    }
}

module.exports = Menu;