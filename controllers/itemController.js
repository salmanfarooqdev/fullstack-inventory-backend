const Item = require('../models/item');
const Category = require('../models/category');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");



// /item/create
exports.getCreateItem = asyncHandler(async (req, res, next) => {
    
    const category = await Category.find({}).exec();
    res.render("getCreateItem", {
        title: 'Create Item',
        categories: category,
    });
  });


  // /item/create
exports.postCreateItem = [

    body('name', "name is required please").isLength({ min: 1, max:15}),
    body('desc').isLength({max:200}),
    body('category')
    .custom(async (value) => {
        const category = await Category.findById(value).exec();
        if (!category) {
            throw new Error('Category does not exist');
        }
    }),
    body('author').exists().isLength({min:1 , max:20}),

    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // If there are validation errors, render the form again with error messages.
            const category = await Category.find({}).exec();
            return res.render('getCreateItem', {
                title: 'Create Item',
                categories: category,
                errors: errors.array(),
            });
        }

          const item = new Item({
            name: req.body.name,
            description: req.body.desc || '',
            category: req.body.category,
            author: req.body.author,

        });

        await item.save();
        res.redirect(item.url);
    })
];

// /item/id
exports.getItem = asyncHandler(async (req, res, next) => {
    
    const item = await Item.find({_id: req.params.id}).populate('category').exec();

    res.render("getItem", {
        title: 'Item Detail',
        itemInstance: item[0],
    });
  });

  // /item/:id/delete
  exports.getDeleteItem = asyncHandler(async (req, res, next) => {
    
    res.render("getDeleteItem", {
        title: 'Delete Item',
    });
  });

  exports.postDeleteItem = asyncHandler(async (req, res, next) => {
    
    const item = await Item.findByIdAndDelete(req.params.id);
    res.redirect('/');
  });

  // /item/:id/update
  exports.getUpdateItem = asyncHandler(async (req, res, next) => {

    const item = await Item.find({_id: req.params.id}).exec();
    const category = await Category.find({}).exec();

    
    res.render("getUpdateItem", {
        title: 'Update Item',
        item: item[0],
        categories: category,
    });
  });

  exports.postUpdateItem = [
    body('name', "name is required please").isLength({ min: 1, max:15}),
    body('desc').isLength({max:200}),
    body('category')
    .custom(async (value) => {
        const category = await Category.findById(value).exec();
        if (!category) {
            throw new Error('Category does not exist');
        }
    }),
    body('author').exists().isLength({min:1 , max:20}),

    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // If there are validation errors, render the form again with error messages.
            const category = await Category.find({}).exec();
            const item = await Item.find({_id: req.params.id}).exec();

            res.render("getUpdateItem", {
                title: 'Update Item',
                item: item[0],
                categories: category,
            });
        }

          const item = await Item.findByIdAndUpdate(req.params.id, 
            {
            name: req.body.name,
            description: req.body.desc,
            category: req.body.category,
            author: req.body.author,

        }).exec();

        res.redirect(item.url);
    })
  ];



