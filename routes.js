const orders = require('./orders.js');

const Router = (app) => {
  app.get('/api/v1/orders', (req, res) => {
    res.status(200).json(orders);
  });
  app.get('/api/v1/orders/last', (req, res) => {
    let ids = Object.keys(orders);
    let lastId = parseInt(ids.pop());
    res.status(200).json(orders[lastId]);
  });
  app.get('/api/v1/orders/:id', (req, res) => {
    const { params: { id: orderId } } = req;
    if(orders[orderId] == undefined){
      res.status(404).end();
    }else{
      res.status(200).json(orders[orderId]);
    }
  });
  app.post('/api/v1/orders', (req, res) => {
    let ids = Object.keys(orders);
    let lastId = parseInt(ids.pop());
    let newId = lastId + 1;
    orders[newId] = {
      customerName: req.body.name,
      foodOrdered: req.body.food,
      price: req.body.price,
      quantity: req.body.quantity,
      total: req.body.price * req.body.quantity,
      orderStatus: 'unresolved',
    };
    res.status(201).end();
  });
  app.put('/api/v1/orders/:id', (req, res) => {
    const { params: { id: orderId } } = req;
    orders[orderId].orderStatus = 'accepted';
    res.status(200);
  });
  app.delete('/api/v1/orders/:id', (req, res) => {
    const { params: { id: orderId } } = req;
    delete orders.orderId;
    res.status(204).json(orders[orderId]);
  });
};
   

module.exports = Router;