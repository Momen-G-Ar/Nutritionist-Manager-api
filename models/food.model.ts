import mongoose from 'mongoose';

const FoodSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
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
    }
});

const Food = mongoose.model('food', FoodSchema);

export default Food;