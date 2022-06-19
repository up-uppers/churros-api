const OrderModel = require('../models/OrderModel');
class OrderController {

    async save(req, res){
        const result = await OrderModel.create(req.body);
        res.status(201).json(result);
    }

    async list(req, res){
        const result = await OrderModel.find({});
        res.status(200).json(result);
    }

    async find(req, res){
        const result = await OrderModel.findOne({'id': req.params.id});
        res.status(200).json(result);
    }

    async update(req, res){
        await OrderModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send();
    }

    async delete(req, res){
        await OrderModel.findByIdAndRemove(req.params.id);
        res.status(200).send();
    }
}

module.exports = new OrderController();