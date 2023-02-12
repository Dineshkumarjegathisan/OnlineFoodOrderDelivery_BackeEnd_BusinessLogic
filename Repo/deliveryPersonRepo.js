import DeliveryPersonSchema from "../models/deliveryPersonSchema.js";

export default class DeliverPersonRepo {
    constructor() {
        this.deliveryPersonSchema = DeliveryPersonSchema;
    }


    async createDeliveryPerson(body) {
        try {

            const result = await this.deliveryPersonSchema(body);
            return result.save();

        } catch (err) {
            throw err;
        }
    }


    async getAllDeliveryPerson(pagination) {
        try {
            const result = await this.deliveryPersonSchema.aggregate(pagination)
            return result;

        } catch (err) {
            throw err;
        }
    }


    async getDeliveryPersonById(idQuery) {
        try {
            const result = await this.deliveryPersonSchema.aggregate(idQuery);
            console.log(result);
            return result;

        } catch (err) {
            throw err;
        }
    }


    async deleteDeliveryPerson(delQuery) {
        try {
            const result = await this.deliveryPersonSchema.findOneAndUpdate(delQuery[0], delQuery[1]);
            console.log("REPO==>", result);
            return result;

        } catch (err) {
            throw err;
        }
    }

    async updateAvailability(updateQuery) {
        try {
            const result = await this.deliveryPersonSchema.findOneAndUpdate(updateQuery[0], updateQuery[1])
            return result;

        } catch (err) {
            throw err;
        }
    }


    async getAvailability(getQuery) {
        try {
            const result = await this.deliveryPersonSchema.findOne(getQuery);
            return result
        } catch (err) {
            throw err;
        }
    }
}