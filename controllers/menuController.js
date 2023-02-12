import MenuService from '../services/menuService.js'
import { v1 as uuidv4 } from 'uuid'
import paginationValidation from '../validations/paginationValidation.js';
import menuIdValidation from '../validations/menuValidation/menuIdValidation.js'
import errorcode from '../errorCode/errorcode.js';


export default class MenuController {
    constructor() {
        this.menuService = new MenuService();
    }


    /**
     * Creates a new menu.
     * @async
     * @author DineshkumarJegathisan
     * @method POST
     * @description This endpoint creates a new menu with the provided information.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {Object} req.body - The menu information to create.
     * @throws {InvalidInputFormatError} If the menu information provided in the request is invalid.
     * @throws {InternalServerError} If an error occurs while creating the menu.
     * @returns {Object} An object indicating the success of the operation.
     */

    async createMenu(req, res) {
        try {
            req.body.itemId = uuidv4();
            const result = await new MenuService().createMenu(req.body);
            res.status(201).json({
                result
            })
        } catch (err) {
            throw err;
        }
    }

    /**
     * Retrieves a list of all menus.
     * @async
     * @author DineshkumarJegathisan
     * @method GET
     * @description This endpoint retrieves a list of all menus, with pagination support.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {number} [req.query.page=1] - The page number to retrieve.
     * @param {number} [req.query.limit=10] - The number of menuss per page.
     * @throws {InvalidInputFormatError} If the page or limit query parameters are not in the correct format.
     * @throws {InternalServerError} If an error occurs while retrieving the menus information.
     * @returns {Array} An array of menus objects, including the menus ID and other details.
     */
    async getAllMenu(req, res) {
        try {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            const data = await paginationValidation(page, limit);
            const result = await new MenuService().getAllMenu(data)
            res.status(200).json({
                result
            })

        } catch (err) {
            if (err.message === errorcode.INVALID_INPUT_FORMAT_ERROR.message) {
                res
                    .status(errorcode.INVALID_INPUT_FORMAT_ERROR.status)
                    .send(errorcode.INVALID_INPUT_FORMAT_ERROR
                    )
            }
        }
    }

    /**
     * Get a paginated list of menu items based on a category.
     * 
     * @async
     * @author DineshkumarJegathisan
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @throws {Error} If there is an error with the input data.
     */

    async getMenuByCategory(req, res) {
        try {
            let page = req.query.page || 1;
            let limit = req.query.limit || 5;
            let category = req.query.category;
            const data = await paginationValidation(page, limit)
            const result = await new MenuService().getMenuByCategory(data, category);
            res.status(200).json({
                result
            })
        } catch (err) {
            if (err.message === errorcode.INVALID_INPUT_FORMAT_ERROR.message) {
                res
                    .status(errorcode.INVALID_INPUT_FORMAT_ERROR.status)
                    .send(errorcode.INVALID_INPUT_FORMAT_ERROR)

            }
        }
    }


    /**
    *@async
    *@author DineshkumarJegathisan
    *@function getMenuSearchByName
    *@param {Object} req - Express request object
    *@param {Object} res - Express response object
    *@description A function to get the menu details by searching the menu name.
    *@throws Will throw an error if the input format for page or limit is invalid.
    */

    async getMenuSearchByName(req, res) {
        try {

            let page = req.query.page || 1;
            let limit = req.query.limit || 5;
            let search = req.query.search;
            const data = await paginationValidation(page, limit)
            const result = await new MenuService().getMenuSearchByName(data, search);
            res.status(200).json({
                result
            })
        } catch (err) {
            if (err.message === errorcode.INVALID_INPUT_FORMAT_ERROR.message) {
                res
                    .status(errorcode.INVALID_INPUT_FORMAT_ERROR.status)
                    .send(errorcode.INVALID_INPUT_FORMAT_ERROR)
            }

        }
    }

    /**
     * Deletes a menu by ID.
     * @async
     * @author DineshkumarJegathisan
     * @method DELETE
     * @description This endpoint deletes a menu based on the provided menu ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @param {string} req.params.id - The ID of the menu to delete.
     * @throws {menuIdNotFoundError} If the menu ID provided in the request is not found.
     * @throws {InternalServerError} If an error occurs while deleting the menu.
     * @returns {Object} An object indicating the success of the operation.
     */

    async deleteMenuById(req, res) {
        try {
            await menuIdValidation(req.params.id)
            const result = await new MenuService().deleteMenuById(req.params.id)
            res.status(200).json({
                result
            })

        } catch (err) {
            if (err.message === errorcode.USER_ID_NOT_FOUND_ERROR.message) {
                res
                    .status(errorcode.USER_ID_NOT_FOUND_ERROR.status)
                    .send(errorcode.USER_ID_NOT_FOUND_ERROR)
            }
        }
    }

}