var mongoose = require("mongoose");
module.exports = function () {
    return mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [String]
    }, {collection: 'field'});
};