import express from "express";
import { APIResponse } from "../classes";
import { FoodNS } from "../types";
import { foodController } from "../controllers";
import { validateAddFood } from "../middlewares";

const router = express.Router();

router.get('/', async (req, res) => {
    const sorted: boolean = req.query.sorted ? Boolean(req.query.sorted) : false;
    const userId: string = req.query.userId ? (req.query.userId as string) : '';
    try {
        const getFood = await foodController.getFood(userId, sorted);
        res.status(getFood.status).send(getFood);
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Failed', {}));
    }
});

router.post('/', validateAddFood, async (req: express.Request, res: express.Response) => {
    try {
        const addFood = await foodController.addFood(req.body as FoodNS.Food);
        res.status(addFood.status).send(addFood);
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Failed', {}));
    }
});

router.delete('/', async (req: express.Request, res: express.Response) => {
    const foodId = req.query.foodId ? String(req.query.foodId) : '';
    const userId = req.query.userId ? String(req.query.userId) : '';
    try {
        const deleteFood = await foodController.deleteFood(userId, foodId);
        res.status(deleteFood.status).send(deleteFood);
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Failed', {}));
    }
});



export default router;