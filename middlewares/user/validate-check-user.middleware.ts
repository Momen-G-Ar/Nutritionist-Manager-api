import express from 'express';
import { APIResponse } from '../../classes';

const validateCheckUser = (req: express.Request, res: express.Response, next: express.NextFunction) => {
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
    next();
};

export default validateCheckUser;