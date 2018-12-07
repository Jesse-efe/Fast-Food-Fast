import express from 'express';
import ordersController from './controller/ordersController';
import users from './controller/users';
import menu from './controller/menu';
import {
  checkLoginData, checkSignupData, checkOrderData, checkmenuData,
} from './middlewares/validations';


const Router = express.Router();

Router.get('/orders', ordersController.getAllOrders);
Router.get('/orders/:id', ordersController.getAnOrder);
Router.post('/orders', checkOrderData, ordersController.postAnOrder);
Router.put('/orders/:id', ordersController.updateOrderStatus);
Router.post('/auth/signup', checkSignupData, users.signUserUp);
Router.post('/auth/login', checkLoginData, users.logUserIn);
Router.get('/users/:id/orders', ordersController.getUserOrders);
Router.get('/menu', menu.getMenu);
Router.post('/menu', checkmenuData, menu.insertMenu);


export default Router;
