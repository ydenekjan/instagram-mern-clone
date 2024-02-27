import mongoose, {Schema} from 'mongoose';

const userSchema = new Schema (
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        posts: {
            type: Array,
            required: false,
        },
        followers: {
            type: Array,
            required: false,
        },
        following: {
            type: Array,
            required: false,
        }
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema)