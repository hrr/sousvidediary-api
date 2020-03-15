import mongoose, { Schema } from 'mongoose';

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    temp: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

export const Recipe = mongoose.model('Recipe', recipeSchema);
