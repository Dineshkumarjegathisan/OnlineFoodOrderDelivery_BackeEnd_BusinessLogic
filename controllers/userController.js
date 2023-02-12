import UserService from '../services/userService.js'
import checkpagination from '../validations/paginationValidation.js';
import userIdValidation from '../validations/userValidation/idValidation.js';
import { v1 as uuidv4 } from 'uuid'
import errorcode from '../errorCode/errorcode.js';



export default class UserController {
    constructor() {
        this.userService = new UserService();
    }

    /**
 * Creates a new user.
 * @async
 * @author DineshkumarJegathisan
 * @method POST
 * @description This endpoint creates a new user with the provided information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} req.body - The user information to create.
 * @throws {InvalidInputFormatError} If the user information provided in the request is invalid.
 * @throws {InternalServerError} If an error occurs while creating the user.
 * @returns {Object} An object indicating the success of the operation.
 */

    async createUser(req, res) {

        try {
            req.body.UserId = uuidv4();
            const result = await new UserService().createUser(req.body);
            res.status(201).json({
                result
            })
        } catch (err) {
            throw err;
        }
    }

    /**
    * Retrieves a list of all users.
    * @async
    * @author DineshkumarJegathisan
    * @method GET
    * @description This endpoint retrieves a list of all users, with pagination support.
    * @param {Object} req - Express request object.
    * @param {Object} res - Express response object.
    * @param {number} [req.query.page=1] - The page number to retrieve.
    * @param {number} [req.query.limit=5] - The number of users per page.
    * @throws {InvalidInputFormatError} If the page or limit query parameters are not in the correct format.
    * @throws {InternalServerError} If an error occurs while retrieving the user information.
    * @returns {Array} An array of user objects, including the user ID and other details.
    */

    async getAllUsers(req, res) {
        try {
            let page = req.query.page || 1;
            let limit = req.query.limit || 5;
            const data = await checkpagination(page, limit)
            const result = await new UserService().getAllUsers(data);
            res.status(200).json({
                result
            })

        } catch (err) {
            if (err.message === errorcode.INVALID_INPUT_FORMAT_ERROR.message) {
                console.log(err.messgae === errorcode.INVALID_INPUT_FORMAT_ERROR.message);
                res
                    .status(errorcode.INVALID_INPUT_FORMAT_ERROR.status)
                    .send(errorcode.INVALID_INPUT_FORMAT_ERROR)
            }
            else {
                res
                    .status(errorcode.INTERNAL_SERVER_ERROR.status)
                    .send(errorcode.INTERNAL_SERVER_ERROR)
            }
        }
    }


    /**
     * Gets the user information for a given user ID.
     * @async
     * @author DineshkumarJegathisan
     * @method GET
     * @description Retrieves the user information based on the provided user ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @throws {UserIdNotFoundError} If the user ID is not found in the database.
     * @throws {InternalServerError} If an error occurs while retrieving the user information.
     * @returns {Object} The user information, including the user ID and other details.
     */

    async getUserById(req, res) {
        try {

            await userIdValidation(req.params.id);
            const result = await new UserService().getUserById(req.params.id);
            res.status(200).json({
                result
            })
        } catch (err) {
            if (err.message === errorcode.USER_ID_NOT_FOUND_ERROR.message) {
                res
                    .status(errorcode.USER_ID_NOT_FOUND_ERROR.status)
                    .send(errorcode.USER_ID_NOT_FOUND_ERROR)
            }
            else {
                res
                    .status(errorcode.INTERNAL_SERVER_ERROR.status)
                    .send(errorcode.INTERNAL_SERVER_ERROR)

            }
        }
    }


    /**
 * Deletes a user by ID.
 * @async
 * @author DineshkumarJegathisan
 * @method DELETE
 * @description This endpoint deletes a user based on the provided user ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {string} req.params.id - The ID of the user to delete.
 * @throws {UserIdNotFoundError} If the user ID provided in the request is not found.
 * @throws {InternalServerError} If an error occurs while deleting the user.
 * @returns {Object} An object indicating the success of the operation.
 */

    async deleteUserById(req, res) {
        try {
            await userIdValidation(req.params.id)
            const result = await new UserService().deleteUserById(req.params.id);
            res.status(200).json({
                result
            })
        } catch (err) {
            if (err.message === errorcode.USER_ID_NOT_FOUND_ERROR.message) {
                res
                    .status(errorcode.USER_ID_NOT_FOUND_ERROR.status)
                    .send(errorcode.USER_ID_NOT_FOUND_ERROR)
            }
            else {
                res
                    .status(errorcode.INTERNAL_SERVER_ERROR.status)
                    .send(errorcode.INTERNAL_SERVER_ERROR)
            }

        }
    }
}