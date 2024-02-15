import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema)