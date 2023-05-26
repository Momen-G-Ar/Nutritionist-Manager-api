import express from "express";
import { APIResponse } from "../../classes";
import { Food, User } from "../../models";
import mongoose from "mongoose";
import { FoodNS } from "../../types";

const validateAddFood = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send(new APIResponse(400, 'Invalid content type', {}));
        return;
    }

    const newFood: FoodNS.Food = req.body;
    let notValidFood: boolean = false;
    notValidFood ||= !newFood.name || typeof newFood.name !== 'string';
    notValidFood ||= !newFood.image || typeof newFood.image !== 'string';
    notValidFood ||= !newFood.amount || typeof newFood.amount !== 'number';
    notValidFood ||= !newFood.calories || typeof newFood.calories !== 'number';
    notValidFood ||= !newFood.addedBy || typeof newFood.addedBy !== 'string';


    if (notValidFood) {
        res.status(400).send(new APIResponse(400, 'Invalid payload', {}));
        return;
    }

    Food.find({ name: newFood.name.toLowerCase().trim() })
        .then((value) => {
            if (value[0] !== undefined) {
                res.status(400).send(new APIResponse(400, 'Duplicate food name', {}));
                return;
            }
            else {
                User.findById(newFood.addedBy)
                    .then((user) => {
                        if (user === null)
                            res.status(400).send(new APIResponse(400, 'Invalid user', {}));
                        else
                            next();
                    })
                    .catch((error: mongoose.Error) => {
                        res.status(500).send(new APIResponse(500, 'Internal server error', {}));
                        console.error(error.message);
                    });
            }
        })
        .catch((error: mongoose.Error) => {
            res.status(500).send(new APIResponse(500, 'Internal server error', {}));
            console.error(error.message);
            return;
        });
};

export default validateAddFood;
