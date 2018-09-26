const ordersController = require('./controller/ordersController.js');

const Router = (app) => {
  app.get('/api/v1/orders', ordersController.getAllOrders(req, res));
  app.get('/api/v1/orders/last', ordersController.getLastOrder(req, res));
  app.get('/api/v1/orders/:id', ordersController.getAnOrder(req, res));
  app.post('/api/v1/orders', ordersController.postAnOrder(req, res));
  app.put('/api/v1/orders/:id', ordersController.updateOrderStatus(req, res));
  app.delete('/api/v1/orders/:id', ordersController.deleteAnOrder(req, res));
};
   

module.exports = Router;