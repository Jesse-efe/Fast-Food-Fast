import express from 'express';
import ordersController from './controller/ordersController';


const Router = (app) => {
  app.get('/api/v1/orders', ordersController.getAllOrders);
  app.get('/api/v1/orders/last', ordersController.getLastOrder);
  app.get('/api/v1/orders/:id', ordersController.getAnOrder);
  app.post('/api/v1/orders', ordersController.postAnOrder);
  app.put('/api/v1/orders/:id', ordersController.updateOrderStatus);
  app.delete('/api/v1/orders/:id', ordersController.deleteAnOrder);
};


export default Router;
