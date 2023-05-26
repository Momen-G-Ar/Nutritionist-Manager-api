import { APIResponse } from "../classes";
import { UserNS } from "../types";

const addUser = (user: UserNS.User): Promise<APIResponse> | APIResponse => {
    // must hash password
    return new APIResponse(200, '', {});
};

export default {
    addUser,
};