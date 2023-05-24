import mongoose, { mongo } from 'mongoose';

const FoodSchema = new mongoose.Schema({
    name: {
        type: 'String',
        required: true,
        unique: true,
    },
    image: {
        type: 'String',
        required: true,
    },
    amount: {
        type: 'Number',
        required: true,
    },
    calories: {
        type: 'Number',
        required: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date
});

const Food = mongoose.model('Food', FoodSchema);

export default Food;