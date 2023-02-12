import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    UserId: {
        type: String,
        require: true,
        unique: true
    },
    userName: {
        type: String,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    isDeleted: {
        type: Boolean,
        require: true
    }

})
export default mongoose.model("Customers", UsersSchema);