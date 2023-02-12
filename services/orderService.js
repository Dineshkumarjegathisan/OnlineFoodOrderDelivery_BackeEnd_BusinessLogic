import MenuRepo from '../Repo/menuRepo.js';
import OrderRepo from '../Repo/orderRepo.js'
import SequenceRepo from '../Repo/sequenceRepo.js';
import UserRepo from '../Repo/userRepo.js';
import DeliverPersonRepo from '../Repo/deliveryPersonRepo.js';
import errorcode from '../errorCode/errorcode.js';
import userIdValidation from '../validations/userValidation/idValidation.js';


export default class OrderService {
    constructor() {
        this.orderRepo = new OrderRepo();
        this.sequenceRepo = new SequenceRepo();
        this.userRepo = new UserRepo();
        this.menuRepo = new MenuRepo();
        this.deliverPersonRepo = new DeliverPersonRepo();
    }
/**
 * Places an order for a given user and cart.
 * 
 * @async
 * @param {Object} params - The user ID to place the order for.
 * @param {Array} cart - An array of items in the cart to be ordered.
 * @returns {String} - Returns a string indicating the success or failure of the order placement.
 */

    async placeOrder(params, cart) {
        try {
            await userIdValidation(params)
            var date = new Date();
            var sequenceCount = await this.sequenceRepo.getSequenceCount();
            let count = sequenceCount[0].count;
            let SeqCount = ++count;
            let orderId = `OD${date.getDate()}${date.getMonth()}${date.getFullYear()}${SeqCount}`
            var orderDetails = {
                orderId,
                user: {
                    userId: {},
                    userName: {},
                    cart: [],
                },
                deliveryDetails: {}
            }
            if (params) {
                const userQuery = [{ $match: { UserId: params } }];
                const user = await this.userRepo.getUserById(userQuery);
                if (user.length != 0) {
                    orderDetails.user.userId = user[0].UserId;
                    orderDetails.user.userName = user[0].userName;
                    var totalAmount = 0;
                    var cartCount = 0;
                    let i = 0;
                    while (i < cart.length) {
                        const menuQuery = [{ $match: { itemId: cart[i].itemId } }, { $project: { _id: 0, isDeleted: 0, __v: 0 } }]
                        const getCart = await this.menuRepo.getMenuById(menuQuery);
                        cartCount++;
                        if (cart.length > 0) {
                            orderDetails.user.cart.push(getCart[0]);
                            totalAmount = totalAmount + getCart[0].price;
                            i++;
                        }
                    }
                    const availbileQuery = { $and: [{ deliveryPersonisDeleted: false, deliveryPersonStatus: "Available" }] };
                    const getDelivery = await this.deliverPersonRepo.getAvailability(availbileQuery);
                    if (getDelivery != null) {
                        orderDetails.deliveryDetails = {
                            deliveryPersonId: getDelivery.deliverPersonId,
                            deliveryPersonName: getDelivery.deliveryPersonName,
                            deliveryLocation: user[0].location
                        }
                    }

                }
                orderDetails.noOfItems = cartCount;
                orderDetails.totalAmount = totalAmount;
                const countQuery = [{ $set: { count: SeqCount } }]
                await this.sequenceRepo.updateCount(countQuery);
                const result = await this.orderRepo.placeOrder(orderDetails);
                return errorcode.ORDER_PALCE_SUCCESS;

            }
        } catch (err) {
            if (err.message === errorcode.USER_ID_NOT_FOUND_ERROR.message) {
                return errorcode.USER_ID_NOT_FOUND_ERROR;
            }
        }
    }


    async getOrderDetails(orderid) {
        try {
            const getQuery = [
                { $match: { orderId: orderid, isDeleted: false } },
                {
                    $project:
                    {
                        "user.cart": 1,
                        deliveryDetails: 1,
                        noOfItems: 1,
                        totalAmount: 1
                    }
                }
            ]
            const result = await this.orderRepo.getOrderDetails(getQuery);
            return result;

        } catch (err) {
            throw err;
        }
    }
}