import mongoose from "mongoose";
import { APIResponse } from "../classes";
import { Food, User } from "../models";
import { FoodNS } from "../types";


const addFood = async (newFood: FoodNS.Food): Promise<APIResponse> => {

    const addFood = new Food({
        name: newFood.name.toLowerCase().trim(),
        image: newFood.image,
        amount: newFood.amount,
        calories: newFood.calories,
        addedBy: newFood.addedBy,
        addDate: new Date().toISOString(),
    });

    try {
        const food = await addFood.save();
        await User.updateOne({ _id: newFood.addedBy }, { $addToSet: { addedFoods: food._id } });
        return new APIResponse(201, 'Food added successfully', { food: food });
    } catch (error) {
        console.error(error);
        return new APIResponse(500, 'Internal server error', {});
    }
};

const getFood = (userId: string, sorted: boolean): Promise<APIResponse> => {

    return Food.find({ addedBy: userId }, {}, { sort: sorted ? { name: 1 } : { addDate: -1 } })
        .then((foodTable) => {
            return new APIResponse(200, 'OK', { length: foodTable.length, foodTable: foodTable });
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new APIResponse(500, 'Internal server error', {});
        });
};

const deleteFood = async (userId: string, foodId: string): Promise<APIResponse> => {
    const valid = mongoose.isValidObjectId(foodId);
    if (foodId && typeof foodId === 'string' && valid) {
        try {
            await Food.deleteOne({ _id: foodId });
            await User.updateOne({ _id: userId }, { $pull: { addedFoods: foodId } });
            return new APIResponse(200, 'OK', {});
        } catch (error) {
            console.error(error);
            return new APIResponse(500, 'Internal server error', {});
        }
    }
    else {
        return new APIResponse(400, 'Invalid payload', {});
    }
};

const updateFood = async (food: FoodNS.Food): Promise<APIResponse> => {
    return Food.findByIdAndUpdate(food._id, food)
        .then((newFood) => {
            return new APIResponse(200, 'Food edited successfully', { food: newFood });
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new APIResponse(500, 'Internal server error', {});
        });
};


export default {
    addFood,
    getFood,
    deleteFood,
    updateFood,
};