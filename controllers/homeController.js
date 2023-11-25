const Item = require('../models/item');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.homePage = asyncHandler(async (req, res, next) => {
    
    const item = await Item.find({}).populate('category').exec();
    const category = await Category.find({}).exec();

    res.json({
        title: 'Item Inventory System',
        item,
        category,
    });
  });