module.exports = function (mongoose) {
    return mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        email: String,
        roles: [String],
        phones: [String]
    }, {collection: 'user'});
};