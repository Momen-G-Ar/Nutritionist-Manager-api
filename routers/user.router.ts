import express from 'express';
import { validateAddUser, validateGetUser } from '../middlewares';
import { UserNS } from '../types/user';
import { userController } from '../controllers';
import { APIResponse } from '../classes';

const router = express.Router();

router.post('/', validateAddUser, async (req: express.Request, res: express.Response) => {
    const newUser: UserNS.User = req.body;
    try {
        const addUser = await userController.addUser(newUser);
        res.status(addUser.status).send(addUser);
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Internal server error', {}));
    }
});

router.get('/', validateGetUser, async (req: express.Request, res: express.Response) => {
    const user: UserNS.User = req.body;
    try {
        const getUser = await userController.getUser(user);
        res.status(getUser.status).send(getUser);
    } catch (error) {
        console.error(error);
        res.status(500).send(new APIResponse(500, 'Internal server error', {}));
    }
});

export default router;