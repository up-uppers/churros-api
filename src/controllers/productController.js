const productModel = require('../models/ProductModel');
class ProductController {

    async save(req, res){
        const result = await productModel.create(req.body);
        res.status(201).json(result);
    }

    async list(req, res){
        const result = await productModel.find({});
        res.status(200).json(result);
    }

    async find(req, res){
        const result = await productModel.findOne({'id': req.params.id});
        res.status(200).json(result);
    }

    async update(req, res){
        await productModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send();
    }

    async delete(req, res){
        await productModel.findByIdAndRemove(req.params.id);
        res.status(200).send();
    }
}

module.exports = new ProductController();