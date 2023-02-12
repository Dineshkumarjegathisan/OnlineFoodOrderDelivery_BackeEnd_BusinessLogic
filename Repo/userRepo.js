import UserSchema from "../models/userSchema.js";


export default class UserRepo {
    constructor() {
        this.userSchema = UserSchema;
    }



    async createUser(params) {
        try {
            const result = await new this.userSchema(params);
            return result.save();
        } catch (err) {
            throw err;
        }
    }



    async getAllUsers(pagination) {
        try {
            const result = await this.userSchema.aggregate(pagination);

            return result;

        } catch (err) {
            throw err;
        }
    }



    async getUserById(idQuery) {
        try {
            const result = await this.userSchema.aggregate(idQuery);
            return result;
        } catch (err) {
            throw err;

        }
    }



    async deleteUserById(query) {
        try {
            const result = await this.userSchema.findOneAndUpdate(query[0], query[1]);
            return result;

        } catch (err) {
            throw err;
        }
    }

}