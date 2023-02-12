import errorcode from '../errorCode/errorcode.js';
import DeliverPersonRepo from '../Repo/deliveryPersonRepo.js'
import updateValidation from '../validations/deliveryValidation/updateValidation.js'


export default class DeliveryPersonService {
    constructor() {
        this.deliverPersonRepo = new DeliverPersonRepo()
    }


    async createDeliveryPerson(body) {
        try {
            const result = await this.deliverPersonRepo.createDeliveryPerson(body);
            return errorcode.CREATE_SUCESS;

        } catch (err) {
            throw err;
        }
    }


    async getAllDeliveryPerson(data) {
        try {

            const { page, limit } = data
            const pagination = [{ $match: { deliveryPersonisDeleted: false } }, { $skip: (page * 1 - 1) * (limit * 1) }, { $limit: limit * 1 }]
            const result = await this.deliverPersonRepo.getAllDeliveryPerson(pagination);
            return result;
        } catch (err) {
            throw err;
        }
    }

    async getDeliveryPersonById(id) {
        try {
            const idQuery = [{ $match: { deliverPersonId: id, deliveryPersonisDeleted: false } }]
            const result = await this.deliverPersonRepo.getDeliveryPersonById(idQuery);
            return result;

        } catch (err) {
            throw err;
        }
    }


    async deleteDeliveryPerson(id) {
        try {
            const delQuery = [{ deliverPersonId: id }, { deliveryPersonisDeleted: true }]
            const result = await this.deliverPersonRepo.deleteDeliveryPerson(delQuery);
            return errorcode.DELETE_SUCESS;

        } catch (err) {
            console.log(err);
            throw err;
        }
    }




    async updateAvailability(id, status) {
        try {
            await updateValidation(status)
            const updateQuery = [{ deliverPersonId: id }, { deliveryPersonStatus: status }];
            const result = await this.deliverPersonRepo.updateAvailability(updateQuery);
            return errorcode.UPDATE_SUCESS;

        } catch (err) {
            if (err.message == errorcode.INVALID_INPUT_FORMAT_ERROR.message) {
                return errorcode.INVALID_INPUT_FORMAT_ERROR;
            }
        }
    }


}