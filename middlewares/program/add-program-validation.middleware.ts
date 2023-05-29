import express from 'express';
import { APIResponse } from '../../classes';
import { ProgramNS } from '../../types';
import { Program } from '../../models';
import mongoose from 'mongoose';

const addProgramValidation = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send(new APIResponse(400, 'Invalid content type', {}));
        return;
    }

    const newProgram: ProgramNS.Program = req.body;

    if (notValidateClient(newProgram) || notValidateDays(newProgram)) {
        res.status(400).send(new APIResponse(400, 'Invalid payload', {}));
        return;
    }


    Program.findOne({ client: { name: newProgram.client.name } })
        .then((value) => {
            if (value) {
                res.status(400).send(new APIResponse(400, 'Duplicate client name', {}));
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

export default addProgramValidation;

const notValidateClient = (program: ProgramNS.Program): boolean => {
    let notValidClient: boolean = false;
    notValidClient ||= !program.client;
    notValidClient ||= !program.client.name || typeof program.client.name !== 'string';
    notValidClient ||= !program.client.phone || typeof program.client.phone !== 'string';
    notValidClient ||= !program.client.email || typeof program.client.email !== 'string';
    notValidClient ||= !program.client.city || typeof program.client.city !== 'string';
    notValidClient ||= !program.client.birthOfDate;
    return notValidClient;
};

const notValidateDays = (program: ProgramNS.Program): boolean => {
    let notValidDays: boolean = false;
    notValidDays ||= !program.days;
    notValidDays ||= !program.days.saturday || !Array.isArray(program.days.saturday);
    notValidDays ||= !program.days.sunday || !Array.isArray(program.days.sunday);
    notValidDays ||= !program.days.monday || !Array.isArray(program.days.monday);
    notValidDays ||= !program.days.tuesday || !Array.isArray(program.days.tuesday);
    notValidDays ||= !program.days.wednesday || !Array.isArray(program.days.wednesday);
    notValidDays ||= !program.days.thursday || !Array.isArray(program.days.thursday);
    notValidDays ||= !program.days.friday || !Array.isArray(program.days.friday);

    return notValidDays;
};