import mongoose from "mongoose";

export namespace ProgramNS {
    export interface Program {
        client: {
            name: string,
            phone: string,
            email: string,
            birthOfDate: Date,
            city: string;
        },
        days: {
            sunday: [mongoose.Schema.Types.ObjectId];
            monday: [mongoose.Schema.Types.ObjectId];
            tuesday: [mongoose.Schema.Types.ObjectId];
            wednesday: [mongoose.Schema.Types.ObjectId];
            thursday: [mongoose.Schema.Types.ObjectId];
            friday: [mongoose.Schema.Types.ObjectId];
            saturday: [mongoose.Schema.Types.ObjectId];
        };
        status: {
            sunday: [{ meals: number, calories: number }];
            monday: [{ meals: number, calories: number }];
            tuesday: [{ meals: number, calories: number }];
            wednesday: [{ meals: number, calories: number }];
            thursday: [{ meals: number, calories: number }];
            friday: [{ meals: number, calories: number }];
            saturday: [{ meals: number, calories: number }];
        };
        addedBy: mongoose.Schema.Types.ObjectId
    }
}