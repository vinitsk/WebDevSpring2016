module.exports = function (mongoose) {
    var FieldSchema = require("./../field/field.schema.server.js")(mongoose);
    return mongoose.Schema({
            title: String,
            userId: String,
            fields: [FieldSchema]
        },
        {
            timestamps: {createdAt: 'created', updatedAt: 'updated'}
        },
        {
            collection: 'form'
        });
};