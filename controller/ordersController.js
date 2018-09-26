const orders = require('./orders.js');

class OrdersController {
    getAllOrders(req, res) {
        return res.status(200).json(orders);
    };

    getLastOrder(req, res) {
        let ids = Object.keys(orders);
        let lastId = parseInt(ids.pop());
        return res.status(200).json(orders[lastId]);
    };

    getAnOrder(req, res) {
        const { params: { id: orderId } } = req;
        if(orders[orderId] == undefined){
            return res.status(404).send('Invalid order Id');
        }else{
            return res.status(200).json(orders[orderId]);
        };
    };

    postAnOrder(req, res){
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
        return res.status(201).send('Your arder was received');
        };

        updateOrderStatus(req, res) {
            const { params: { id: orderId } } = req;
            orders[orderId].orderStatus = 'accepted';
            return res.status(200).send('Order status has been updated');
        };

        deleteAnOrder(req, res) {
            const { params: { id: orderId } } = req;
            if(orders[orderId] == undefined){
                return res.status(404).send('Invalid order Id');
            }else{
                delete orders.orderId;
                return res.status(204).send('Order has been deleted');
            };
        };
}


const ordersController = new OrdersController();
module.exports = ordersController;