import mongoose from "mongoose";
import { APIResponse } from "../classes";
import { User } from "../models";
import { UserNS } from "../types";
import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
    const s = '$2b$10$OzHwOAlQb0q78dcONdItPO';
    const hashedPassword = await bcrypt.hash(password, s);
    return hashedPassword;
};

const addUser = async (user: UserNS.User): Promise<APIResponse> => {
    const newUser = new User({
        username: user.username.toLowerCase().trim(),
        password: await hashPassword(user.password as string)
    });

    return newUser.save()
        .then((user) => {
            return new APIResponse(201, 'The user is added successfully', {
                _id: user._id,
                username: user.username,
                addedFoods: user.addedFoods,
                addedPrograms: user.addedPrograms,
                addedClients: user.addedClients,
            });
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new APIResponse(500, 'Internal server error', {});
        });
};

const getUser = async (user: UserNS.User) => {
    return User.findOne({
        username: user.username.toLowerCase().trim(),
        password: await hashPassword(user.password as string)
    }).select(['_id', 'username', 'addedFoods', 'addedPrograms', 'addedClients'])
        .then((user) => {
            if (user !== null)
                return new APIResponse(200, 'OK, the user is found', user);
            else
                return new APIResponse(401, 'Invalid username or password', {});
        })
        .catch((error: mongoose.Error) => {
            console.error(error.message);
            return new APIResponse(500, 'Internal server error', {});
        });
};

export default {
    addUser,
    getUser,
};