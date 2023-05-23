import express from "express";
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

// router.post('/', (req, res) => {

//     const newFood: FoodNS.Food = req.body;
//     if (
//         // foodTable.find(food => food.id === newFood._id)
//         true
//     ) {
//         res.status(400).send('Invalid request payload');
//         return;
//     }

//     // foodTable.push(newFood);
//     res.status(201).end();
// });



export default router;