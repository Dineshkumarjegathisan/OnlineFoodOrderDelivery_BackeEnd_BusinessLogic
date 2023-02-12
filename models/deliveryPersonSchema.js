import mongoose from "mongoose"

const deliveryPersonSchema = new mongoose.Schema({

    deliverPersonId: {
        type: String,
        require: true,
        unique: true
    },//uuid 
    deliveryPersonName: {
        type: String,
        require: true
    },
    deliveryPersonAge: {
        type: Number,
        require: true
    },
    deliveryPersonGender: {
        type: String,
        require: true
    },
    deliveryPersonStatus: {
        type: String,
        require: true
    }, //Available/Busy 
    deliveryPersonisDeleted: {
        type: Boolean,
        require: true
    }

})
export default mongoose.model("DeliveryPersons", deliveryPersonSchema);