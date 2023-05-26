import mongoose from 'mongoose';

export namespace UserNS {
    export interface User {
        _id: mongoose.Schema.Types.ObjectId;
        username: String;
        password: String;
        clients: [mongoose.Schema.Types.ObjectId];
        programs: [mongoose.Schema.Types.ObjectId];
        foods: [mongoose.Schema.Types.ObjectId];
    }
}