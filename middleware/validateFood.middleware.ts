import express from "express";

const validateFood = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (req.headers['content-type'] !== 'application/json') {
        res.status(400).send('Invalid content type');
        return;
    }

    const newFood = req.body;
    let notValidFood: boolean = false;
    notValidFood ||= !newFood.name || typeof newFood.name !== 'string';
    notValidFood ||= !newFood.image || typeof newFood.image !== 'string';
    notValidFood ||= !newFood.amount || typeof newFood.amount !== 'number';
    notValidFood ||= !newFood.calories || typeof newFood.calories !== 'number';

    if (notValidFood) {
        res.status(400).send('Invalid payload');
        return;
    }

    next();
};

export default validateFood;
