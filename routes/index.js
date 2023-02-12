import UserController from "../controllers/userController.js";
import express from "express";
import DeliveryPersonController from "../controllers/deliveryPersonController.js";
import MenuController from "../controllers/menuController.js";
import SequenceController from "../controllers/sequenceController.js";
import OrderController from "../controllers/orderController.js";


export default function route(app) {
    const userController = new UserController();
    const deliveryPersonController = new DeliveryPersonController();
    const menuController = new MenuController();
    const sequenceController = new SequenceController();
    const orderController = new OrderController();


    //users APIs
    app.post('/v1/createUser', userController.createUser);
    app.get('/v1/getAllUsers', userController.getAllUsers);
    app.get('/v1/getUserById/:id', userController.getUserById);
    app.patch('/v1/deleteUserById/:id', userController.deleteUserById);

    //deliveryPersons APIs
    app.post('/v1/createDeliveryPerson', deliveryPersonController.createDeliveryPerson);
    app.get('/v1/getAllDeliveryPerson', deliveryPersonController.getAllDeliveryPerson);
    app.get('/v1/getDeliveryPersonById/:id', deliveryPersonController.getDeliveryPersonById);
    app.patch('/v1/deleteDeliveryPerson/:id', deliveryPersonController.deleteDeliveryPerson);
    app.patch('/v1/updateAvailability/:id', deliveryPersonController.updateAvailability);

    //menu APIs
    app.post('/v1/createMenu', menuController.createMenu);
    app.get('/v1/getAllMenu', menuController.getAllMenu);
    app.get('/v1/getMenuByCategory', menuController.getMenuByCategory);
    app.get('/v1/searchByName', menuController.getMenuSearchByName)
    app.patch('/v1/deleteMenuById/:id', menuController.deleteMenuById);

    //sequence API
    app.post('/v1/createSequence', sequenceController.createSequence);

    //order API
    app.post('/v1/placerOrder', orderController.placeOrder);
    app.get('/v1/getOrderDetailsById/:id', orderController.getOrderDetails);


}










