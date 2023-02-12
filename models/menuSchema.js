import mongoose from "mongoose"

const menuSchema = new mongoose.Schema({

    itemId: {
        type: String,
        require: true,
        unique: true
    },
    itemName: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    isDeleted: {
        type: Boolean
    }


})
export default mongoose.model("menuDetails", menuSchema);



