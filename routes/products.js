const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { check } = require('express-validator');

//Importamos el middleware
const auth = require('../middleware/auth');



//Create Product
router.post('/',
    auth, //Solo agregandolo de esta forma se pasa al middleware y verifica todo lo que hay ahí
    [
        check('name', 'Name is required').not().isEmpty()
    ],
    productController.createProduct
);

//Get Products
router.get('/',
    auth, //Solo agregandolo de esta forma se pasa al middleware y verifica todo lo que hay ahí
    productController.getProducts
);

//Update Product
router.put('/:id',
    auth, //Solo agregandolo de esta forma se pasa al middleware y verifica todo lo que hay ahí
    [
        check('name', 'Name is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
        check('quantity', 'Quantity is required').not().isEmpty(),
    ],
    productController.updateProduct
);

//Delete Product
router.delete('/:id',
    auth, //Solo agregandolo de esta forma se pasa al middleware y verifica todo lo que hay ahí
    productController.deleteProduct
);

module.exports = router;

