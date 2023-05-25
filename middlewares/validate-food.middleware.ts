import express from "express";
import { APIResponse } from "../classes";
import { Food } from "../models";
import mongoose from "mongoose";

const validateFood = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Invalid content type');
        return;
    }

    const newFood = req.body;
    let notValidFood: boolean = false;
    notValidFood ||= !newFood.name || typeof newFood.name !== 'string';
    notValidFood ||= !newFood.image || typeof newFood.image !== 'string';
    notValidFood ||= !newFood.amount || typeof newFood.amount !== 'number';
    notValidFood ||= !newFood.calories || typeof newFood.calories !== 'number';


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
            else
                next();
        })
        .catch((error: mongoose.Error) => {
            res.status(500).send(new APIResponse(500, 'Internal server error', {}));
            console.error(error.message);
            return;
        });
};

export default validateFood;
