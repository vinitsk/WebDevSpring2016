module.exports = function (app) {

    /*Load Mongoose*/
    var mongoose = require("mongoose");

    /*DB Models*/
    var UserSchema = require("./models/user/user.schema.server.js")(mongoose);
    var FormSchema = require("./models/form/form.schema.server.js")(mongoose);
    var FieldSchema = require("./models/field/field.schema.server.js")(mongoose);
    var User = mongoose.model("User", UserSchema);
    var Form = mongoose.model("Form", FormSchema);
    var Field = mongoose.model("Field", FieldSchema);


    /*Node Models*/
    var userModel = require("./models/user/user.model.js")(User);
    var formModel = require("./models/form/form.model.js")(Form);
    var fieldModel = require("./models/field/field.model.js")(Form);

    /*Server Services*/
    require("./services/user.service.server.js")(app, userModel);
    require("./services/form.service.server.js")(app, formModel);
    require("./services/field.service.server.js")(app, fieldModel);

};