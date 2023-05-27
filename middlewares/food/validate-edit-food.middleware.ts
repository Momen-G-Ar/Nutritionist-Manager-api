import express from "express";
import { APIResponse } from "../../classes";
import { Food, User } from "../../models";
import mongoose from "mongoose";
import { FoodNS } from "../../types";

const validateEditFood = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send(new APIResponse(400, 'Invalid content type', {}));
        return;
    }

    const newFood: FoodNS.Food = req.body;
    let notValidFood: boolean = false;
    notValidFood ||= !newFood._id || typeof newFood._id !== 'string';
    notValidFood ||= !newFood.name || typeof newFood.name !== 'string';
    notValidFood ||= !newFood.image || typeof newFood.image !== 'string';
    notValidFood ||= !newFood.amount || typeof newFood.amount !== 'number';
    notValidFood ||= !newFood.calories || typeof newFood.calories !== 'number';
    notValidFood ||= !newFood.addedBy || typeof newFood.addedBy !== 'string';


    if (notValidFood) {
        res.status(400).send(new APIResponse(400, 'Invalid payload', {}));
        return;
    }

    try {
        const food = await Food.find({ _id: newFood._id });
        if (food) {
            const user = await User.findById(newFood.addedBy);
            if (user) {
                const findIfNameDuplication = await Food.findOne({ name: newFood.name });
                if (findIfNameDuplication) {
                    res.status(400).send(new APIResponse(400, 'Duplicate food name', {}));
                    return;
                }
                next();
            }
            else {
                res.status(400).send(new APIResponse(400, 'Invalid user', {}));
                return;
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Internal server error', {}));
        return;
    }

};

export default validateEditFood;
