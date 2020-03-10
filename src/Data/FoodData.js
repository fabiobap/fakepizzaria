export function formatPrice(price) {
    return price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    });
}
export const foodItems = [
    {
        name: 'Cheese Pizza',
        img: '/img/pizza.png',
        section: 'Pizza',
        price: 20
    },
    {
        name: 'Pepperoni Pizza',
        img: '/img/pizza2.jpeg',
        section: 'Pizza',
        price: 11
    },
    {
        name: 'Chicken Pizza',
        img: '/img/chicken-pizza.jpeg',
        section: 'Pizza',
        price: 32
    },
    {
        name: 'Veggie Pizza',
        img: '/img/healthy-pizza.jpeg',
        section: 'Pizza',
        price: 44
    },
    {
        name: 'Burger',
        img: '/img/burger.jpeg',
        section: 'Sandwich',
        price: 50
    },
    {
        name: 'Gyro',
        img: '/img/gyro.jpeg',
        section: 'Sandwich',
        price: 32
    },
    {
        name: 'Shrimp PoBoy',
        img: '/img/sandwich.jpeg',
        section: 'Sandwich',
        price: 10
    },
    {
        name: 'Fries',
        img: '/img/fries.jpeg',
        section: 'Sides',
        price: 25
    },
];

export const foods = foodItems.reduce((res, food) => {
    if (!res[food.section]) {
        res[food.section] = [];
    }
    res[food.section].push(food)
    return res;
}, {})