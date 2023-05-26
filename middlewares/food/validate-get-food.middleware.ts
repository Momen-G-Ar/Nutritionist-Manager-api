import express from 'express';
import { APIResponse } from '../../classes';
import { User } from '../../models';
import mongoose from 'mongoose';

const validateGetFood = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send(new APIResponse(400, 'Invalid content type', {}));
        return;
    }

    const userId = req.body._id;
    let notValidUser: boolean = false;
    notValidUser ||= !userId.username || typeof userId.username !== 'string';

    if (notValidUser) {
        res.status(400).send(new APIResponse(400, 'Invalid payload', {}));
        return;
    }

    User.findById(userId)
        .then((user) => {
            if (user === null)
                res.status(400).send(new APIResponse(400, 'Invalid payload', {}));
            else
                next();
        })
        .catch((error: mongoose.Error) => {
            res.status(500).send(new APIResponse(500, 'Internal server error', {}));
        });
};

export default validateGetFood;