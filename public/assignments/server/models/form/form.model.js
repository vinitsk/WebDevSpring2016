/**
 * Created by Bhanu on 18/03/2016.
 */

/*Load q promise library*/
var q = require("q");
/*Load Mongoose*/
var mongoose = require("mongoose");

module.exports = function () {
    var FormSchema = require("./form.schema.server.js")();
    var Form = mongoose.model("Form", FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        getFormById: getFormById,
        findAllFormsForUser: findAllFormsForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        getAllFormFields: getAllFormFields,
        getFormField: getFormField,
        deleteFormField: deleteFormField,
        createNewFormField: createNewFormField,
        updateFormField: updateFormField,
        updateAllFormFields: updateAllFormFields
    };
    return api;

    function mapDBForm(form) {
        var new_form = {};
        if ('_id' in form) {
            new_form['_id'] = form._id
        }
        if ('title' in form) {
            new_form['title'] = form.title
        }
        if ('userId' in form) {
            new_form['userId'] = form.userId
        }
        if ('fields' in form) {
            new_form['fields'] = form.fields
        }
        return new_form
    }

    function createFormForUser(form) {
        var deferred = q.defer();
        Form.create(mapDBForm(form), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function getFormById(form) {
        var deferred = q.defer();
        Form.find(mapDBForm(form), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findAllFormsForUser(form) {
        var deferred = q.defer();
        Form.find(mapDBForm(form), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function findUserForms(userId) {
        var userForms = [];
        for (var formIndex in data) {
            if (data[formIndex].userId == userId) {
                userForms.push(data[formIndex]);
            }
        }
        return userForms;
    }

    function deleteFormById(form) {
        var deferred = q.defer();
        Form.remove(mapDBForm(form), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                console.log(doc);
                deferred.resolve(doc);
                }
        });
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        var deferred = q.defer();
        Form.findOneAndUpdate(
            {_id: formId},
            {$set: mapDBForm(form)},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }

    function getAllFormFields(formId) {
        var deferred = q.defer();
        var formFound = false;
        for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                formFound = true;
                deferred.resolve(data[formIndex].fields);
                break;
            }
        }
        if (!formFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function getFormField(formId, fieldId) {
        var deferred = q.defer();
        var fieldFound = false;
        formLoop:for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                var fields = data[formIndex].fields;
                fieldLoop:for (var fieldIndex in fields) {
                    if (fields[fieldIndex]._id == fieldId) {
                        fieldFound = true;
                        deferred.resolve(fields[fieldIndex]);
                        break fieldLoop;
                    }
                }
                break formLoop;
            }
        }
        if (!fieldFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function deleteFormField(formId, fieldId) {
        var deferred = q.defer();
        var fieldFound = false;
        formLoop:for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                var fields = data[formIndex].fields;
                fieldLoop:for (var fieldIndex in fields) {
                    if (fields[fieldIndex]._id == fieldId) {
                        fieldFound = true;
                        fields.splice(fieldIndex, 1);
                        deferred.resolve(fields);
                        break fieldLoop;
                    }
                }
                break formLoop;
            }
        }
        if (!fieldFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function createNewFormField(formId, field) {
        var deferred = q.defer();
        var formFound = false;
        for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                formFound = true;
                field._id = Math.floor(Math.random() * 900) + 100;
                if (data[formIndex].fields) {
                    data[formIndex].fields.push(field);
                } else {
                    var fields = [];
                    fields.push(field)
                    data[formIndex].fields = fields;
                }
                deferred.resolve(data[formIndex].fields);
                break;
            }
        }
        if (!formFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function updateFormField(formId, fieldId, newField) {
        var deferred = q.defer();
        var fieldFound = false;
        formLoop:for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                var fields = data[formIndex].fields;
                fieldLoop:for (var fieldIndex in fields) {
                    if (fields[fieldIndex]._id == fieldId) {
                        fields[fieldIndex].label = newField.label;
                        fields[fieldIndex].type = newField.type;
                        fields[fieldIndex].placeholder = newField.placeholder;
                        fields[fieldIndex].options = newField.options;
                        fieldFound = true;
                        deferred.resolve(fields);
                        break fieldLoop;
                    }
                }
                break formLoop;
            }
        }
        if (!fieldFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function updateAllFormFields(formId, newFields) {
        var deferred = q.defer();
        var fieldFound = false;
        formLoop:for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                data[formIndex].fields = newFields;
                fieldFound = true;
                deferred.resolve(data[formIndex].fields);
                break formLoop;
            }
        }
        if (!fieldFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

};