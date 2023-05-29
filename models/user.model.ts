import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: {
        type: 'String',
        required: true,
        unique: true,
    },
    password: {
        type: 'String',
        required: true,
    },
    addedFoods: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'Food'
    },
    addedPrograms: {
        type: [mongoose.Schema.Types.ObjectId],
        default: [],
        ref: 'Program'
    }
});

const User = mongoose.model('User', UserSchema);

export default User;