import express from "express";
import mongoose from "mongoose";
import { APIResponse } from "../classes";
import { User } from "../models";

const validateAddUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send(new APIResponse(400, 'Invalid content type', {}));
        return;
    }

    const newUser = req.body;
    let notValidUser: boolean = false;
    notValidUser ||= !newUser.username || typeof newUser.username !== 'string';
    notValidUser ||= !newUser.password || typeof newUser.password !== 'string';

    if (notValidUser) {
        res.status(400).send(new APIResponse(400, 'Invalid payload', {}));
        return;
    }

    User.find({ username: newUser.username.toLowerCase().trim() })
        .then((value) => {
            if (value[0] !== undefined) {
                res.status(400).send(new APIResponse(400, 'Duplicate Username', {}));
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

export default validateAddUser;
