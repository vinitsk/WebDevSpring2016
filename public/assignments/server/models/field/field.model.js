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
        sortFormFields: sortFormFields
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
        return Form.findById(formId)
            .then(
                function (form) {
                    form.fields.id(fieldId).remove();
                    return form.save()
                },
                function (err) {
                    console.log(err);
                });
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
                    var field = form.fields.id(fieldId);
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

    function sortFormFields(formId, startIndex, endIndex) {
        return Form
            .findById(formId)
            .then(
                function (form) {
                    form.fields.splice(endIndex, 0, form.fields.splice(startIndex, 1)[0]);
                    form.markModified("fields");
                    return form.save();
                },
                function (err) {
                    console.log(err);
                });
    }
};