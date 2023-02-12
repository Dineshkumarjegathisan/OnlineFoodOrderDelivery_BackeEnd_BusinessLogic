import SequenceSchema from '../models/sequenceSchema.js'



export default class SequenceRepo {
    constructor() {
        this.sequenceSchema = SequenceSchema;
    }


    async createSequence(body) {
        try {
            const result = await new this.sequenceSchema(body);
            return result.save();

        } catch (err) {
            throw err;
        }
    }


    async getSequenceCount() {
        try {

            const result = await this.sequenceSchema.find();
            return result;

        } catch (err) {
            throw err;
        }
    }

    async updateCount(updateQuery) {
        try {
            const result = await this.sequenceSchema.updateMany(updateQuery)
            return result;

        } catch (err) {
            throw err;
        }
    }
}