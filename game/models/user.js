import { Schema,model,models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
    },
    score: {
        type: Number,
        require: false,
    }    

},{timestamps:true})

const User = models.User || model("User",UserSchema);

export default User;