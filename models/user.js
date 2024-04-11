import { Schema, model, models } from "mongoose";


const userSchema = new Schema({
    email:{
        type: String,
        unique:[true, "Email already exists!"],
        required: [true, "Email is required!"],
    },
    name:{
        type: String,
        required: [true, "Name is required!"],
    },
    image:{
        type: String,
    },
    employment_status:{
        type: Boolean,
        default: false,
    },
    phone:{
        type: Number,
    },
    bio:{
        type: String,
    },
    designation:{
        type: String,
    },
    resume:{
        type: String,
    },
});

const User = models.User ||  model('User', userSchema);
export default User;
