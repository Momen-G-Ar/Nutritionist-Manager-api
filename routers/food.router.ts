import express from "express";
import { APIResponse } from "../classes";
import { FoodNS } from "../types";
import { foodController } from "../controllers";
import { validateFood } from "../middlewares";

const router = express.Router();

router.get('/', async (req, res) => {
    const sorted = req.query.sorted ? Boolean(req.query.sorted) : false;
    try {
        const getFood = await foodController.getFood(sorted);
        res.status(getFood.status).send(getFood);
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Failed', {}));
    }
});

router.post('/', validateFood, async (req: express.Request, res: express.Response) => {
    try {
        const addFood = await foodController.addFood(req.body as FoodNS.Food);
        res.status(addFood.status).send(addFood);
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Failed', {}));
    }
});

router.delete('/', async (req: express.Request, res: express.Response) => {
    const _id = req.body._id;
    try {
        const deleteFood = await foodController.deleteFood(_id);
        res.status(deleteFood.status).send(deleteFood);
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Failed', {}));
    }
});



export default router;