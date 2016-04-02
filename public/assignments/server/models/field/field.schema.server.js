module.exports = function (mongoose) {
    return mongoose.Schema({
        label: String,
        placeholder: String,
        type: {
            type: String,
            default: "TEXT",
            enum: ['TEXT', 'TEXTAREA', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES']
        },
        options: [{label: String, value: String}]
    }, {collection: 'field'});
};