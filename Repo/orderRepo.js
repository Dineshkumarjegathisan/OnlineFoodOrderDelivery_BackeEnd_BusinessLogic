import OrderSchema from "../models/orderSchema.js";

export default class OrderRepo {
    constructor() {
        this.orderSchema = OrderSchema;
    }

    async placeOrder(orderDetails) {
        try {
            const result = await new this.orderSchema(orderDetails);
            return result.save();

        } catch (err) {
            throw err;
        }
    }

    async getOrderDetails(getQuery) {
        try {

            const result = await this.orderSchema.aggregate(getQuery)
            return result;

        } catch (err) {
            throw err;
        }
    }
}