import DeliveryPersonService from '../services/deliveryPersonService.js'
import checkpagination from '../validations/paginationValidation.js'
import { v1 as uuidv4 } from 'uuid'
import errorcode from '../errorCode/errorcode.js';
import deliveryPersonIdValidation from '../validations/deliveryValidation/deliveryPersonIdvalidation.js'


export default class DeliveryPersonController {
    constructor() {
        this.deliveryPersonService = new DeliveryPersonService();
    }


    /**
 * Creates a new deliveryPerson.
 * @async
 * @author DineshkumarJegathisan
 * @method POST
 * @description This endpoint creates a new deliveryPerson with the provided information.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Object} req.body - The deliveryPerson information to create.
 * @throws {InvalidInputFormatError} If the deliveryPerson information provided in the request is invalid.
 * @throws {InternalServerError} If an error occurs while creating the deliveryPerson.
 * @returns {Object} An object indicating the success of the operation.
 */

    async createDeliveryPerson(req, res) {
        try {
            req.body.deliverPersonId = uuidv4();
            const result = await new DeliveryPersonService().createDeliveryPerson(req.body);
            res.status(201).json({
                result
            })

        } catch (err) {
            throw err;
        }

    }

    /**
   * Retrieves a list of all deliveryPerson.
   * @async
   * @author DineshkumarJegathisan
   * @method GET
   * @description This endpoint retrieves a list of all deliveryPerson, with pagination support.
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @param {number} [req.query.page=1] - The page number to retrieve.
   * @param {number} [req.query.limit=5] - The number of deliveryPersons per page.
   * @throws {InvalidInputFormatError} If the page or limit query parameters are not in the correct format.
   * @throws {InternalServerError} If an error occurs while retrieving the deliveryPerson information.
   * @returns {Array} An array of deliveryPerson objects, including the deliveryPerson ID and other details.
   */

    async getAllDeliveryPerson(req, res) {
        try {

            let page = req.query.page || 1;
            let limit = req.query.limit || 5;
            const data = await checkpagination(page, limit)
            const result = await new DeliveryPersonService().getAllDeliveryPerson(data);
            res.status(200).json({
                result
            })

        } catch (err) {
            if (err.message === errorcode.INVALID_INPUT_FORMAT_ERROR.message) {
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
     * Gets the DeliveryPerson information for a given DeliveryPerson ID.
     * @async
     * @author DineshkumarJegathisan
     * @method GET
     * @description Retrieves the DeliveryPerson information based on the provided DeliveryPerson ID.
     * @param {Object} req - Express request object.
     * @param {Object} res - Express response object.
     * @throws {DeliveryPersonIdNotFoundError} If the DeliveryPerson ID is not found in the database.
     * @throws {InternalServerError} If an error occurs while retrieving the DeliveryPerson information.
     * @returns {Object} The DeliveryPerson information, including the DeliveryPerson ID and other details.
     */

    async getDeliveryPersonById(req, res) {
        try {
            await deliveryPersonIdValidation(req.params.id)
            const result = await new DeliveryPersonService().getDeliveryPersonById(req.params.id);
            res.status(200).json({
                result
            })

        } catch (err) {
            if (err.message === errorcode.USER_ID_NOT_FOUND_ERROR.message) {
                res
                    .status(errorcode.USER_ID_NOT_FOUND_ERROR.status)
                    .send(errorcode.USER_ID_NOT_FOUND_ERROR);
            }
            else {
                res
                    .status(errorcode.INTERNAL_SERVER_ERROR.status)
                    .send(errorcode.INTERNAL_SERVER_ERROR)
            }
        }
    }


    /**
  * Deletes a deliveryPerson by ID.
  * @async
  * @author DineshkumarJegathisan
  * @method DELETE
  * @description This endpoint deletes a deliveryPerson based on the provided deliveryPerson ID.
  * @param {Object} req - Express request object.
  * @param {Object} res - Express response object.
  * @param {string} req.params.id - The ID of the deliveryPerson to delete.
  * @throws {deliveryPersonIdNotFoundError} If the deliveryPerson ID provided in the request is not found.
  * @throws {InternalServerError} If an error occurs while deleting the deliveryPerson.
  * @returns {Object} An object indicating the success of the operation.
  */
    async deleteDeliveryPerson(req, res) {
        try {
            await deliveryPersonIdValidation(req.params.id)
            const result = await new DeliveryPersonService().deleteDeliveryPerson(req.params.id);
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
     * Update the availability of a delivery person.
     * 
     * @async
     * @author DineshkumarJEgathisan
     * @function
     * @param {Object} req - The request object.
     * @param {Object} res - The response object.
     * @returns {Object} The updated delivery person information.
     * @throws {Error} If there is an error during the updateAvailability operation or if the delivery person ID is not found.
     */

    async updateAvailability(req, res) {
        try {
            await deliveryPersonIdValidation(req.params.id)
            const result = await new DeliveryPersonService().updateAvailability(req.params.id, req.body.deliveryPersonStatus);
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