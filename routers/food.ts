import express from "express";
import { APIResponse } from "../classes";
import { Food } from "../models";
import { FoodNS } from "../types";
import mongoose from "mongoose";
const router = express.Router();

// router.get('/', (req, res) => {
//     const sorted = req.query.sorted ? Boolean(req.query.sorted) : undefined;
//     const page = req.query.page ? Number(req.query.page) : undefined;
//     const size = req.query.size ? Number(req.query.size) : undefined;

//     let filteredFoodTable = foodTable.slice();

//     if (sorted) {
//         // filteredFoodTable.sort((a: FoodNS.Food, b: FoodNS.Food) => {
//         //     return (b.calories / b.amount) - (a.calories / a.amount);
//         // });
//     }

//     if (page !== undefined && size !== undefined) {
//         const from = page * size;
//         const to = page * size + size;
//         filteredFoodTable = filteredFoodTable.slice(from, to);
//     }

//     res.send(filteredFoodTable).end();
// });

router.post('/add-food', (req: express.Request, res: express.Response) => {
    const newFood: FoodNS.Food = req.body;

    const addFood = new Food({
        name: newFood.name.toLowerCase().trim(),
        image: newFood.image,
        amount: newFood.amount,
        calories: newFood.calories,
    });

    addFood.save()
        .then(() => {
            res.status(201).send(new APIResponse(201, 'Food added successfully', {}));
            return;
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            res.status(500).send(new APIResponse(500, 'Failed to add food', {}));
            return;
        });
});



export default router;