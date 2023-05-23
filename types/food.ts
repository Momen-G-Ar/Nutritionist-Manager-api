import mongoose from "mongoose";
export namespace FoodNS {

    export interface Food {
        _id: mongoose.Schema.Types.ObjectId;
        name: string;
        image: string;
        amount: number;
        calories: number;
    }
}
