import { Router } from "express";
import util from "../util/util";
import { IFood } from '../types/food';
const router = Router();

let foodTable: IFood[] = [
    {
        id: "56f343",
        name: "hello",
        image: "https://images.everydayhealth.com/images/diet-nutrition/all-about-bananas-nutrition-facts-health-benefits-recipes-and-more-rm-722x406.jpg",
        amount: 45,
        calories: 570
    },
    {
        id: "5f343",
        name: "hello",
        image: "https://images.everydayhealth.com/images/diet-nutrition/all-about-bananas-nutrition-facts-health-benefits-recipes-and-more-rm-722x406.jpg",
        amount: 45,
        calories: 570
    },
    {
        id: "5f43",
        name: "hello",
        image: "https://images.everydayhealth.com/images/diet-nutrition/all-about-bananas-nutrition-facts-health-benefits-recipes-and-more-rm-722x406.jpg",
        amount: 45,
        calories: 50
    },
    {
        id: "543",
        name: "hello",
        image: "https://images.everydayhealth.com/images/diet-nutrition/all-about-bananas-nutrition-facts-health-benefits-recipes-and-more-rm-722x406.jpg",
        amount: 45,
        calories: 50
    },
    {
        id: "53",
        name: "hello",
        image: "https://images.everydayhealth.com/images/diet-nutrition/all-about-bananas-nutrition-facts-health-benefits-recipes-and-more-rm-722x406.jpg",
        amount: 5,
        calories: 50
    }
];

router.get('/', (req, res) => {
    console.log("/GET all");
    const sorted = req.query.sorted ? Boolean(req.query.sorted) : undefined;
    const page = req.query.page ? Number(req.query.page) : undefined;
    const size = req.query.size ? Number(req.query.size) : undefined;

    let filteredFoodTable = foodTable.slice();

    if (sorted) {
        filteredFoodTable.sort((a: IFood, b: IFood) => {
            return (b.calories / b.amount) - (a.calories / a.amount);
        });
    }

    if (page !== undefined && size !== undefined) {
        const from = page * size;
        const to = page * size + size;
        filteredFoodTable = filteredFoodTable.slice(from, to);
    }

    res.send(filteredFoodTable).end();
});

router.post('/', (req, res) => {
    console.log("/POST add item");

    if (req.headers["content-type"] !== 'application/json') {
        res.status(400).send('Invalid content type');
        return;
    }

    const newFood: IFood = req.body;
    if (
        !util.validFood(newFood) ||
        foodTable.find(food => food.id === newFood.id)
    ) {
        res.status(400).send('Invalid request payload');
        return;
    }

    foodTable.push(newFood);
    res.status(201).end();
});



export default router;