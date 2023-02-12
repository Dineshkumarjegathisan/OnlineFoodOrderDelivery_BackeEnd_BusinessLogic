import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema(
    {
        orderId: {
            type: String,
            require: true
        },//(generate OD/DATE/0000) eg:OD231220220001 

        user: {
            userId: {
                type: String
                , require: true
            },
            userName: {
                type: String,
                require: true
            },
            cart:
                [{
                    itemId: {
                        type: String,
                        require: true
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
                        type: String,
                        require: true
                    }
                }
                ]
        },


        deliveryDetails: {
            deliveryPersonId: {
                type: String,
                require: true
            },
            deliveryPersonName: {
                type: String,
                require: true
            },
            deliveryLocation: {
                type: String,
                require: true
            } //user location 
        },

        noOfItems: {
            type: String,
            require: true
        },
        totalAmount: {
            type: String,
            require: true
        },
        isDeleted: {
            type: Boolean,
            require: true,
            default: false
        }

    }
)
export default mongoose.model("placeOrderDetails", OrderSchema);