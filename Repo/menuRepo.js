import MenuSchema from "../models/menuSchema.js";


export default class MenuRepo {
    constructor() {
        this.menuSchema = MenuSchema;
    }

    async createMenu(body) {
        try {

            const result = await new this.menuSchema(body);
            return result.save();

        } catch (err) {
            throw err;
        }
    }

    async getAllMenu(pagination) {
        try {
            const result = await this.menuSchema.aggregate(pagination);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getMenuByCategory(pagination) {
        try {
            const result = await this.menuSchema.aggregate(pagination);
            return result;

        } catch (err) {
            throw err;
        }
    }

    async getMenuSearchByName(query) {
        try {

            const result = await this.menuSchema.aggregate(query);
            return result;

        } catch (err) {
            throw err;
        }
    }



    async deleteMenuById(delQuery) {
        try {
            const result = await this.menuSchema.findOneAndUpdate(delQuery[0], delQuery[1]);
            return result;
        } catch (err) {
            throw err;
        }
    }



    async getMenuById(getQuery){
        try {
            const result = await this.menuSchema.aggregate(getQuery);
            return result ;
            
        } catch (err) {
            throw err ;
        }
    }
}