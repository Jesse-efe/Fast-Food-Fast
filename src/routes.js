import express from 'express';
import ordersController from './controller/ordersController';
import users from './controller/users';
import menu from './controller/menu';
import isLoggedIn from './middlewares/isLoggedIn';
import isAdmin from './middlewares/isAdmin';
import {
  checkLoginData, checkSignupData, checkOrderData, checkmenuData,
} from './middlewares/validations';


const Router = express.Router();

Router.get('/orders', isAdmin, ordersController.getAllOrders);
Router.get('/orders/:id', isAdmin, ordersController.getAnOrder);
Router.post('/orders', isLoggedIn, checkOrderData, ordersController.postAnOrder);
Router.put('/orders/:id', isAdmin, ordersController.updateOrderStatus);
Router.post('/auth/signup', checkSignupData, users.signUserUp);
Router.post('/auth/login', checkLoginData, users.logUserIn);
Router.get('/users/:id/orders', isLoggedIn, ordersController.getUserOrders);
Router.get('/menu', menu.getMenu);
Router.post('/menu', isAdmin, checkmenuData, menu.insertMenu);


export default Router;
