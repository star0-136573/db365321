const express = require('express');

const controller = require('../controllers/auth');
const customerController = require('../controllers/customer')
const memoController = require('../controllers/memo')
const router = express.Router();
//ejs
router.get('/', controller.getLogin);
router.post('/admin', controller.admin);
router.post('/addUser',controller.addUser)

//react
router.get('/getStatus',memoController.getStatus)
router.post('/setStatus',memoController.setStatus)
router.post('/setMemo',memoController.setRedis)
router.get('/getMemo',memoController.getRedis)
router.post('/login', controller.postLogin);
router.get('/customer',customerController.getCustomer);
router.post('/create_customer',customerController.createCustomer)
router.post('/delete_customer',customerController.deleteCustomer)
router.post('/update_customer',customerController.updateCustomer)


module.exports = router;