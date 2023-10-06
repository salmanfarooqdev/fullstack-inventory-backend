const mongoose = require("mongoose");

const Schema  = mongoose.Schema;

const ItemSchema = new Schema({
    name : {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 20,
    },
    description:{
        type: String,
        maxLength: 200,
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    author:{
        type:String,
        required:true,
        minLength:1,
        maxLength: 20,
    },

});

ItemSchema.virtual("url").get(function(){
    return `/item/${this._id}`;
})

module.exports = mongoose.model("Item", ItemSchema);