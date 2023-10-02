const express = require('express');
const router = express.Router();

//Importações necessárias
const taskController = require('../controller/taskController')
const userAuth = require('../middleware/unsureAuthenticated')


//ROUTAS com seus respectivos controlers e middlewares
router.post('/createTask', userAuth.unsureAuthenticated, taskController.createTask)
router.put('/updateTask', userAuth.unsureAuthenticated, taskController.updateTask)
router.patch('/importTask', userAuth.unsureAuthenticated, taskController.importantTask)
router.patch('/completedTask', userAuth.unsureAuthenticated, taskController.completedTask)

router.get('/getTasks', userAuth.unsureAuthenticated, taskController.getTasks)

router.delete('/deleteAll', userAuth.unsureAuthenticated, taskController.deleteAll)
router.delete('/deleteTask', userAuth.unsureAuthenticated, taskController.deleteTask)


//Exporta o ROUTER
module.exports = router