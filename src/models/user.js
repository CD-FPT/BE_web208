import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: true,
            minLength: 5,
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: "member"
        }
    }, { timestamps: true, versionKey: false })


export default mongoose.model("User", userSchema)