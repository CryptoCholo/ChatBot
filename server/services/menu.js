

class MenuItem {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

class Menu {
    constructor() {
        this.menuOptions = ["For Grilled options reply 10","For Pepper Soup options reply 20","For Sides reply 30","For Beverages reply 40"];
        this.grilledOptions = ["For Barbecued Catfish reply 12","For Barbecued Croaker reply 14","For Grilled Chicken Wings reply 16"];
        this.peppersoupOptions = ["For Catfish Peppersoup reply 22","For Chicken Peppersoup reply 24","For Goatmeat Peppersoup reply 26"];
        this.sideOptions = ["For Fried Plantain reply 32 ","For Fried Potatoes reply 34 ","For Fried Plantain reply 36"];
        this.beverageOptions = ["For Beer(Heineken) reply 42","For Palmwine reply 44","For Soft Drinks reply 46"];
    }

    // addItem(name, price) {
    //     const menuItem = new MenuItem(name, price);
    //     this.menuItems.push(menuItem);
    // }

    // removeItem(name) {
    //     this.menuItems = this.menuItems.filter(item => item.name !== name);
    // }

    getMenu() {
        return this.menuOptions;
    }
    getGrilledMenu() {
        return this.grilledOptions;
    }
    getSoupMenu() {
        return this.peppersoupOptions;
    }
    getSideMenu() {
        return this.sideOptions;
    }
    getBeverageMenu() {
        return this.beverageOptions;
    }
}

module.exports = Menu;