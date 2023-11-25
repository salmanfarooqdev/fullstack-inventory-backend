const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");



exports.getCreateCategory = asyncHandler(async (req, res, next) => {
    res.json( {
        title: 'Create Category',
    });
  });


exports.postCreateCategory = [
    body('cname', "name is required please").isLength({max:15}),
    body('cdesc').isLength({max:50}).escape(),

    asyncHandler(async(req,res,next)=>{
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
         
            return res.status(400).json({ errors: errors.array() });
          
        }

          const category = new Category({
            name: req.body.cname,
            description: req.body.cdesc || '',
        });

        await category.save();
        res.status(201).json({ category });
    })
];

exports.getCategory = asyncHandler(async (req, res, next) => {
    const category = await Category.find({_id: req.params.id}).exec();
    const items = await Item.find({category: req.params.id}).exec();

    res.json({
        category: category[0],
        items: items,
    });
  });

    // /category/:id/delete
    exports.getDeleteCategory = asyncHandler(async (req, res, next) => {
    
        const items= await Item.find({category: req.params.id}).exec();

        res.render("getDeleteCategory", {
            title: 'Delete Category',
            items: items,
        });
      });
    
      exports.postDeleteCategory = asyncHandler(async (req, res, next) => {
        
        const category = await Category.findByIdAndDelete(req.params.id);
        res.redirect('/');
      });
    
    
