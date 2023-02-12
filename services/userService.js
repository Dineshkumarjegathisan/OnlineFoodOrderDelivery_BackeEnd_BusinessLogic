import errorcode from '../errorCode/errorcode.js';
import UserRepo from '../Repo/userRepo.js'

export default class UserService {
    constructor() {
        this.userRepo = new UserRepo();
    }


    async createUser(body) {
        try {

            const result = await this.userRepo.createUser(body);
            return errorcode.CREATE_SUCESS;

        } catch (err) {
            throw err;
        }
    }


    async getAllUsers(data) {
        try {
            const { page, limit } = data
            const pagination = [{ $match: { isDeleted: false } }, { $skip: (page * 1 - 1) * (limit * 1) }, { $limit: limit * 1 }]
            const result = await this.userRepo.getAllUsers(pagination);
            return result;

        } catch (err) {
            throw err;
        }
    }


    async getUserById(id) {
        try {
            const idQuery = [{ $match: { UserId: id, isDeleted: false } }]
            const result = await this.userRepo.getUserById(idQuery);
            return result;

        } catch (err) {
            throw err
        }
    }


    async deleteUserById(id) {
        try {
            const query = [{ UserId: id }, { isDeleted: true }]
            const result = await this.userRepo.deleteUserById(query);
            return errorcode.DELETE_SUCESS;

        } catch (err) {
            throw err;
        }
    }
}