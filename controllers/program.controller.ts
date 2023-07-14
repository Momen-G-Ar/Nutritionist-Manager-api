import mongoose from "mongoose";
import { Program, User } from "../models";
import { ProgramNS } from "../types";
import { APIResponse } from "../classes";


const addProgram = async (program: ProgramNS.Program) => {
    const newProgram = new Program({
        client: { ...program.client },
        days: { ...program.days },
        addedBy: program.addedBy,
    });

    try {
        return newProgram.save()
            .then(async (val) => {
                await User.updateOne({ _id: program.addedBy }, {
                    $push: { addedPrograms: val._id }
                });
                return new APIResponse(201, 'Program added successfully', val);
            })
            .catch((error: mongoose.Error) => {
                console.error(error.message);
                return new APIResponse(500, 'Internal Server Error', {})
            })

    } catch (error) {
        console.error(error);
        return new APIResponse(500, 'Internal Server Error', {})
    }

};

export default {
    addProgram,
};