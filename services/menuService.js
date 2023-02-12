import errorcode from '../errorCode/errorcode.js';
import MenuRepo from '../Repo/menuRepo.js'
import checkCategory from '../validations/menuValidation/categoryValidation.js';


export default class MenuService {
    constructor() {
        this.menuRepo = new MenuRepo();
    }


    async createMenu(body) {
        try {

            const result = await this.menuRepo.createMenu(body);
            return errorcode.CREATE_SUCESS ;

        } catch (err) {
            throw err;
        }
    }


    async getAllMenu(data) {
        try {
            const { page, limit } = data
            const pagination = [{ $match: { isDeleted: false } }, { $skip: (page * 1 - 1) * (limit * 1) }, { $limit: limit * 1 }];
            const result = await this.menuRepo.getAllMenu(pagination);
            return result;

        } catch (err) {
            throw err;
        }
    }

    async getMenuByCategory(data, category) {
        try {
            const { page, limit } = data
            // await checkCategory(category);
            const pagination = [{ $match: { $and: [{ category: new RegExp(`^${category}`, "i") }, { isDeleted: false }] } }, { $skip: (page * 1 - 1) * (limit * 1) }, { $limit: limit * 1 }];
            const result = await this.menuRepo.getMenuByCategory(pagination);
            return result;
        } catch (err) {
            if (err.message === errorcode.FIELD_NOT_PRESENT_ERROR.message) {
                return errorcode.FIELD_NOT_PRESENT_ERROR;
            }
        }
    }


    async getMenuSearchByName(data, search) {
        try {
            const { page, limit } = data
            const query = ([{ $match: { $and: [{ itemName: new RegExp(`^${search}`, "i") }, { isDeleted: false }] } }, { $skip: (page - 1) * limit }, { $limit: limit * 1 }]);
            const result = await this.menuRepo.getMenuSearchByName(query);
            return result;

        } catch (err) {
            throw err;
        }
    }

    async deleteMenuById(id) {
        try {
            const delQuery = [{ itemId: id }, { isDeleted: true }]
            const result = await this.menuRepo.deleteMenuById(delQuery);
            return errorcode.DELETE_SUCESS ;
        } catch (err) {
            throw err;
        }
    }

}