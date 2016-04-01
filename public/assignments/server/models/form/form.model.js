/**
 * Created by Bhanu on 18/03/2016.
 */

var q = require("q");
var data = require("./form.mock.json");

module.exports = function () {
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
        updateAllFormFields:updateAllFormFields
    };
    return api;

    function createFormForUser(userId, form) {
        var defered = q.defer();
        form._id = Math.floor(Math.random() * 900) + 100;
        form.userId = userId;
        data.push(form);
        defered.resolve(form);
        return defered.promise;
    }

    function getFormById(formId) {
        var deferred = q.defer();
        var formFound = false;
        for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                deferred.resolve(data[formIndex]);
                formFound = true;
                break;
            }
        }
        if (!formFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function findAllFormsForUser(userId) {
        var deferred = q.defer();
        var formFound = false;
        var userForms = [];
        for (var formIndex in data) {
            if (data[formIndex].userId == userId) {
                userForms.push(data[formIndex]);
                formFound = true;
            }
        }
        if (!formFound) {
            deferred.resolve(userForms);
        } else {
            deferred.resolve(userForms);
        }
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

    function deleteFormById(formId) {
        var deferred = q.defer();
        var formFound = false;
        for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                var userId = data[formIndex].userId;
                data.splice(formIndex, 1);
                deferred.resolve(findUserForms(userId));
                formFound = true;
                break;
            }
        }
        if (!formFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function updateFormById(formId, form) {
        var deferred = q.defer();
        var formFound = false;
        for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                data[formIndex].userId = form.userId;
                data[formIndex].title = form.title;
                //currentForm.fields = form.fields;
                deferred.resolve(data[formIndex]);
                formFound = true;
                break;
            }
        }
        if (!formFound) {
            deferred.reject("No Match Found.");
        }
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

    function updateAllFormFields(formId, newFields){
        var deferred = q.defer();
        var fieldFound = false;
        formLoop:for (var formIndex in data) {
            if (data[formIndex]._id == formId) {
                data[formIndex].fields =newFields;
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