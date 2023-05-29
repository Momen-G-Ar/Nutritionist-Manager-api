import mongoose from 'mongoose';

export namespace UserNS {
    export interface User {
        _id: mongoose.Schema.Types.ObjectId;
        username: String;
        password: String;
        clients: [mongoose.Schema.Types.ObjectId];
        addedPrograms: [mongoose.Schema.Types.ObjectId];
        addedFoods: [mongoose.Schema.Types.ObjectId];
    }
}