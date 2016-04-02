/**
 * Created by Bhanu on 01/04/2016.
 */
module.exports = function (Form) {
    var api = {
        getAllFormFields: getAllFormFields,
        getFormField: getFormField,
        deleteFormField: deleteFormField,
        createNewFormField: createNewFormField,
        updateFormField: updateFormField,
        updateAllFormFields: updateAllFormFields
    };
    return api;


    function getAllFormFields(formId) {
        return Form.findById(formId);
    }

    function getFormField(formId, fieldId) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    return form.fields.id(fieldId);
                },
                function (err) {
                    console.log(err);
                })
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
        return Form
            .findById(formId)
            .then(
                function (form) {
                    form.fields.push(field);
                    return form.save();
                },
                function (err) {
                    console.log(err);
                })
    }

    function updateFormField(formId, fieldId, newField) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    var field = form.fields.id(newField._id);
                    field.label = newField.label;
                    field.type = newField.type;
                    field.placeholder = newField.placeholder;
                    field.options = newField.options;
                    return form.save();
                },
                function (err) {
                    console.log(err);
                });
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

    function findUserForms(userId) {
        var userForms = [];
        for (var formIndex in data) {
            if (data[formIndex].userId == userId) {
                userForms.push(data[formIndex]);
            }
        }
        return userForms;
    }
};