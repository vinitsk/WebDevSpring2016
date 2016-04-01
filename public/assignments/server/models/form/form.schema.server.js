var mongoose = require("mongoose");
var FieldSchema = require("./../field/field.schema.server.js")();
module.exports = function () {
    return mongoose.Schema({
            title: String,
            userId: String,
            fields: [FieldSchema]
        },
        {
            collection: 'form'
        },
        {
            timestamps: {createdAt: 'created', updatedAt: 'updated'}
        });
};