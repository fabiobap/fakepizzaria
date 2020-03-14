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
        price: 10
    },
    {
        name: 'Pepperoni Pizza',
        img: '/img/pizza2.jpeg',
        section: 'Pizza',
        price: 15
    },
    {
        name: 'Chicken Pizza',
        img: '/img/chicken-pizza.jpeg',
        section: 'Pizza',
        price: 12
    },
    {
        name: 'Veggie Pizza',
        img: '/img/healthy-pizza.jpeg',
        section: 'Pizza',
        price: 18
    },
    {
        name: 'Burger',
        img: '/img/burger.jpeg',
        section: 'Sandwich',
        price: 5
    },
    {
        name: 'Gyro',
        img: '/img/gyro.jpeg',
        section: 'Sandwich',
        price: 6
    },
    {
        name: 'Shrimp PoBoy',
        img: '/img/sandwich.jpeg',
        section: 'Sandwich',
        price: 3
    },
    {
        name: 'Fries',
        img: '/img/fries.jpeg',
        section: 'Sides',
        price: 3
    },
    {
        img: '/img/sodas.jpg',
        name: 'Soda',
        section: 'Drinks',
        price: 3,
        choices: ['Coke', 'Sprite', 'Root Beer']
    }
];

export const foods = foodItems.reduce((res, food) => {
    if (!res[food.section]) {
        res[food.section] = [];
    }
    res[food.section].push(food)
    return res;
}, {})