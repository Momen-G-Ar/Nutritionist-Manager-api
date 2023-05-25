import mongoose from "mongoose";
import { APIResponse } from "../classes";
import { Food } from "../models";
import { FoodNS } from "../types";


const addFood = (newFood: FoodNS.Food): Promise<APIResponse> => {

    const addFood = new Food({
        name: newFood.name.toLowerCase().trim(),
        image: newFood.image,
        amount: newFood.amount,
        calories: newFood.calories,
        addDate: new Date().toISOString(),
    });

    return addFood.save()
        .then(() => {
            return new APIResponse(201, 'Food added successfully', {});
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new APIResponse(500, 'Failed to add food', {});
        });
};

const getFood = (sorted: boolean): Promise<APIResponse> => {

    return Food.find({}, {}, { sort: sorted ? { name: 1 } : { addDate: -1 } })
        .then((foodTable) => {
            return new APIResponse(200, 'OK', { length: foodTable.length, foodTable: foodTable });
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new APIResponse(500, 'Internal server error', {});
        });
};

const deleteFood = async (_id: string): Promise<APIResponse> => {
    const valid = mongoose.isValidObjectId(_id);
    if (_id && typeof _id === 'string' && valid) {
        return Food.deleteOne({ _id: _id })
            .then(() => {
                return new APIResponse(200, 'OK', {});
            })
            .catch((error: mongoose.Error) => {
                console.error(error.message);
                return new APIResponse(500, 'Internal server error', {});
            });
    }
    else {
        return new APIResponse(400, 'Invalid payload', {});
    }
};


export default {
    addFood,
    getFood,
    deleteFood,
};