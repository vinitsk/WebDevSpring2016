/**
 * Created by Bhanu on 18/03/2016.
 */

"use strict";
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
        updateFormField: updateFormField
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
        for (let form of data) {
            if (form._id == formId) {
                deferred.resolve(form);
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
        for (let form of data) {
            if (form.userId == userId) {
                userForms.push(form);
                formFound = true;
            }
        }
        if (!formFound) {
            deferred.reject("No Match Found.");
        } else {
            deferred.resolve(userForms);
        }
        return deferred.promise;
    }

    function findUserForms(userId) {
        var userForms = [];
        for (let form of data) {
            if (form.userId == userId) {
                userForms.push(form);
            }
        }
        return userForms;
    }

    function deleteFormById(formId) {
        var deferred = q.defer();
        var formFound = false;
        for (let formIndex in data) {
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
        for (let currentForm of data) {
            if (currentForm._id == formId) {
                currentForm.userId = form.userId;
                currentForm.title = form.title;
                currentForm.fields = form.fields;
                deferred.resolve(currentForm);
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
        for (let form of data) {
            if (form._id == formId) {
                formFound = true;
                deferred.resolve(form.fields);
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
        formLoop:for (let form of data) {
            if (form._id == formId) {
                fieldLoop:for (let field of form.fields) {
                    if (field._id == fieldId) {
                        fieldFound = true;
                        deferred.resolve(field);
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
        formLoop:for (let form of data) {
            if (form._id == formId) {
                var fields = form.fields;
                fieldLoop:for (let fieldIndex in fields) {
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
        for (let form of data) {
            if (form._id == formId) {
                formFound = true;
                field._id = Math.floor(Math.random() * 900) + 100;
                form.fields.push(field);
                deferred.resolve(form.fields);
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
        formLoop:for (let form of data) {
            if (form._id == formId) {
                var fields = form.fields;
                fieldLoop:for (let field of fields) {
                    if (field._id == fieldId) {
                        field.label = newField.label
                        field.type = newField.type
                        field.placeholder = newField.placeholder
                        fieldFound = true;
                        deferred.resolve(fields);
                        break fieldLoop;
                    }
                }
                break formLoop;
            }
        }
        if (!formFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

};