const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({

    description : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
    },
    noofstars : {
        type : String,
        required : true
    },
    reviewstatus : {
        type : String,
        required : true,
        default: false
    },
    reportreason : {
        type : String,
        required : true
    },
    customerid : {
        type : String,
        required : true
    },
    itemid : {
        type : String,
        required : true
    },

    // reviewcus : [{

    //     name: {type: String},

    //     cusimage : {type: String},

    // }],
    // reviewitem : [{

    //     name: {type: String},

    //     itemimage : {type: String},

    // }]

})

const Review = mongoose.model("Review",ReviewSchema);
module.exports = Review;