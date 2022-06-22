const productModel = require('../models/ProductModel');
class ProductController {

    async create(req, res){
        const { name, description, type, price } = req.body

        const result = await productModel.create({
            name,
            description,
            type,
            price
        });
        res.status(201).json(result);
    }

    async list(req, res){
        const result = await productModel.find({});

        if(!result) {
            res.status(404).json({ msg: "não foi possivel encontrar estes produtos!" })
        }

        res.status(200).json(result);
    }

    async find(req, res){
        const result = await productModel.findOne({'id': req.params.id});

        if(!result) {
            res.status(404).json({ msg: "não foi possivel encontrar este produto!" })
        }

        res.status(200).json(result);
    }

    async update(req , res){
        const result = await productModel.findByIdAndUpdate(req.params.id, req.body);
        
        if(!result) {
            res.status(500).json({ msg: "erro ao atualizar!" })
        }
        
        const updated =  await productModel.findOne({'id': req.params.id});
        res.status(200).json({ 
            updated,
            msg: "Atualizado com sucesso!"
        });
    }

    async delete(req, res){
        const result = await productModel.findByIdAndRemove(req.params.id);

        if(!result) {
            res.status(500).json({ msg: "erro ao deletar!" })
        }

        res.status(200).json({ 
            result,
            msg: "Deletado com sucesso!"
        });
    }
}

module.exports = new ProductController();