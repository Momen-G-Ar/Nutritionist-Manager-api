import mongoose from 'mongoose';

const programSchema = new mongoose.Schema({
    client: {
        type: {
            name: {
                type: 'String',
                unique: true,
                required: true,
            },
            phone: {
                type: 'String',
                required: true,

            },
            email: {
                type: 'String',
                required: true,
            },
            birthOfDate: {
                type: 'Date',
                required: true,
            },
            city: {
                type: 'String',
                required: true,
            }
        },
        required: true,
    },
    days: {
        type: {
            sunday: {
                type: [mongoose.Schema.Types.ObjectId],
                default: [],
                required: true,
                ref: 'Food',
            },
            monday: {
                type: [mongoose.Schema.Types.ObjectId],
                default: [],
                required: true,
                ref: 'Food',
            },
            tuesday: {
                type: [mongoose.Schema.Types.ObjectId],
                default: [],
                required: true,
                ref: 'Food',
            },
            wednesday: {
                type: [mongoose.Schema.Types.ObjectId],
                default: [],
                required: true,
                ref: 'Food',
            },
            thursday: {
                type: [mongoose.Schema.Types.ObjectId],
                default: [],
                required: true,
                ref: 'Food',
            },
            friday: {
                type: [mongoose.Schema.Types.ObjectId],
                default: [],
                required: true,
                ref: 'Food',
            },
            saturday: {
                type: [mongoose.Schema.Types.ObjectId],
                default: [],
                required: true,
                ref: 'Food',
            },
        },
        required: true,
    },
    status: {
        type: {
            sunday: {
                type: [{ meals: Number, calories: Number }],
                default: [],
                required: true,
                ref: 'Food',
            },
            monday: {
                type: [{ meals: Number, calories: Number }],
                default: [],
                required: true,
                ref: 'Food',
            },
            tuesday: {
                type: [{ meals: Number, calories: Number }],
                default: [],
                required: true,
                ref: 'Food',
            },
            wednesday: {
                type: [{ meals: Number, calories: Number }],
                default: [],
                required: true,
                ref: 'Food',
            },
            thursday: {
                type: [{ meals: Number, calories: Number }],
                default: [],
                required: true,
                ref: 'Food',
            },
            friday: {
                type: [{ meals: Number, calories: Number }],
                default: [],
                required: true,
                ref: 'Food',
            },
            saturday: {
                type: [{ meals: Number, calories: Number }],
                default: [],
                required: true,
                ref: 'Food',
            },
        },
        required: true,
    },
    addedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Program = mongoose.model('Program', programSchema);

export default Program;