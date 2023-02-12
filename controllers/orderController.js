import OrderService from '../services/orderService.js'

export default class OrderController {
    constructor() {
        this.orderService = new OrderService();
    }


    /**
 * Handles the placement of an order by extracting required parameters from the request,
 * calling the `placeOrder` method on an instance of `OrderService`, and returning a JSON response with the result.
 *
 * 
 * @author DineshkumarJegathisan
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws Will throw an error if there is a problem during the execution of the function.
 * @returns {Object} A JSON object with the result of the `placeOrder` method call.
 */

    async placeOrder(req, res) {
        try {
            const params = req.body.user.userId;
            const cart = req.body.user.cart;
            const result = await new OrderService().placeOrder(params, cart);
            res.status(200).json({
                result
            })
        } catch (err) {
            throw err;
        }
    }

    /**
 * Handles the retrieval of order details by calling the `getOrderDetails` method on an instance of `OrderService`
 * and returning a JSON response with the result.
 *
 * @author DineshkumarJegathisan
 * @async
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @throws Will throw an error if there is a problem during the execution of the function.
 * @returns {Object} A JSON object with the result of the `getOrderDetails` method call.
 */

    async getOrderDetails(req, res) {
        try {
            const result = await new OrderService().getOrderDetails(req.params.id);
            res.status(200).json({
                result
            })
        } catch (err) {
            throw err;
        }
    }

}