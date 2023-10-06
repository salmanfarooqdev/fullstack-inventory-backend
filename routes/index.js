var express = require('express');
var router = express.Router();

const index = require('../controllers/homeController');
const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');
const homeController = require('../controllers/homeController');

/* GET home page. */ 
// '/'
router.get('/', homeController.homePage);

// ITEMS

// get create item
router.get('/item/create', itemController.getCreateItem );

//post create item
router.post('/item/create', itemController.postCreateItem);

//item
router.get('/item/:id', itemController.getItem);

// item delete
router.get('/item/:id/delete', itemController.getDeleteItem);

router.post('/item/:id/delete', itemController.postDeleteItem);

//item update
router.get('/item/:id/update', itemController.getUpdateItem);

router.post('/item/:id/update', itemController.postUpdateItem);





// CATEGORY

// get create category
router.get('/category/create', categoryController.getCreateCategory);

//post create category
router.post('/category/create', categoryController.postCreateCategory);

//category
router.get('/category/:id', categoryController.getCategory);

//delete
router.get('/category/:id/delete', categoryController.getDeleteCategory);

router.post('/category/:id/delete', categoryController.postDeleteCategory);






module.exports = router;
