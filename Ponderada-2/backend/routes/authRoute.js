const express = require('express');
const router = express.Router();

//Importações necessárias
const authController = require('../controller/authController')


//ROUTAS com seus respectivos controlers e middlewares
router.post('/token', authController.createToken)

//Exporta o ROUTER
module.exports = router