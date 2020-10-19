const Product = require('../models/Product');
const { validationResult } = require('express-validator');

exports.createProduct = async ( req, res ) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {

        //Crear un nuevo producto
        const product = new Product(req.body);

        //Guardar producto
        product.save();
        res.json(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error'});
    }
}

//Obtiene todos los proyectos del usuario actual
exports.getProducts = async ( req, res ) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {
        
        const products = await Product.find().sort({ created: -1 });
        res.json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server Error'})
    }

}

//Update Product
exports.updateProduct = async ( req, res ) => {

    //Revisar si hay errores
    const errores = validationResult(req);
    if ( !errores.isEmpty() ) {
        return res.status(400).json({ errores: errores.array() });
    }

    try {

        //Revisar el ID
        let product = await Product.findById(req.params.id);//req.params.id nos permite saber que id es el que viene en el request, esta linea busca en la BD un registro con ese ID
        //Si el proyecto existe
        if (!product) {
            return res.status(404).json({ msg: 'Product not Found!' });
        }

        product = await Product.findByIdAndUpdate({ _id: req.params.id }, {$set: req.body}, { new: true });
        
        res.json({ product });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Server Error'});
    }

}
//Delete Product
exports.deleteProduct = async ( req, res ) => {


    try {
        //Revisar el ID
        let product = await Product.findById(req.params.id);//req.params.id nos permite saber que id es el que viene en el request, esta linea busca en la BD un registro con ese ID
        //Si el producto no existe
        if (!product) {
            return res.status(404).json({ msg: 'Product not Found!' });
        }
        
        await Product.findOneAndDelete({ _id: req.params.id });
        res.json({ msg: 'Product Deleted!' });

    } catch (error) {
        console.log(error);
        res.status(500).send({ msg: 'Server Error'});
    }
}