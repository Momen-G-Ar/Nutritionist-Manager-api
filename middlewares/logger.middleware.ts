import express from 'express';

const logger = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.info(`Method: ${req.method}, URL: ${req.originalUrl}, Time: ${new Date().toISOString()}`);
    next();
};

export default logger;