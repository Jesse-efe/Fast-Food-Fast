const orders = require('./orders.js');
const OrdersController = require('./controller/ordersController');

const Router = (app) => {
  app.get('/api/v1/orders', OrdersController.getAllOrders);
  app.get('/api/v1/orders/last', OrdersController.getLastOrder);
  app.get('/api/v1/orders/:id', OrdersController.getAnOrder);
  app.post('/api/v1/orders', OrdersController.postAnOrder);
  app.put('/api/v1/orders/:id', OrdersController.updateOrderStatus);
  app.delete('/api/v1/orders/:id', OrdersController.deleteAnOrder);
};
   

module.exports = Router;