import mongoose from "mongoose";
import { Program, User } from "../models";
import { ProgramNS } from "../types";
import { APIResponse } from "../classes";


const addProgram = async (program: ProgramNS.Program) => {
    const newProgram = new Program({
        client: { ...program.client },
        status: { ...program.status },
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

const getPrograms = async (searchTerms?: string) => {
    searchTerms = searchTerms || '';
    const regex: RegExp = new RegExp(searchTerms, 'i');
    const filter = {
        'client.name': regex,
    }
    try {
        const getPrograms = await Program.find({ ...filter })
        return new APIResponse(200, 'OK', { length: getPrograms.length, value: getPrograms })
    } catch (error) {
        console.error(error);
        return new APIResponse(500, 'Internal Server Error', {})
    }
}

const deleteProgram = async (programId: string) => {
    try {
        const deleteProgram = await Program.deleteOne({ _id: programId });
        return new APIResponse(200, 'The programs is deleted', deleteProgram);
    } catch (error) {
        console.error(error);
        return new APIResponse(500, 'Internal Server Error', {});
    }
}

export default {
    addProgram,
    getPrograms,
    deleteProgram,
};