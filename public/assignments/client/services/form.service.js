/**
 * Created by Bhanu on 02/03/2016.
 */

"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {

        var current_forms = [
            {"_id": "000", "title": "Contacts", "userId": 123},
            {"_id": "010", "title": "ToDo", "userId": 123},
            {"_id": "020", "title": "CDs", "userId": 234},
            {"_id": "050", "title": "REGISTRATION", "userId": 123},
            {"_id": "243", "title": "NEW USER", "userId": 123},
            {"_id": "543", "title": "NEW PRODUCT", "userId": 123},
            {"_id": "745", "title": "NEW CATALOG", "userId": 123},
        ];

        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };

        return api;

        //Accepts parameters user id, form object, and callback function
        //Adds property called _id with unique id. You can use (new Date).getTime() to create a unique number
        //Adds property called userId equal to user id parameter
        //Adds new form to local array of forms
        //Calls back with new form
        function createFormForUser(userId, form, callback) {
            var newForm = {
                "_id": Math.floor(Math.random() * 900) + 100,
                "title": form.title,
                "userId": userId
            }
            current_forms.push(newForm);
            callback(newForm);
        };

        //Accepts parameter user id, and callback function
        //Iterates over the array of current forms looking for forms whose user id is parameter user id
        //Calls back with found forms for user id parameter, empty array otherwise
        function findAllFormsForUser(userId, callback) {
            var matcheForms = [];
            for (let form of current_forms) {
                if (form.userId === userId) {
                    matcheForms.push(form);
                }
                callback(matcheForms);
            }
        };

        //Accepts parameter form id and callback function
        //Iterates over array of forms looking for form whose id is form id parameter
        //If found, removes form from current array of forms
        //Calls back with remaining array of forms
        function deleteFormById(formId, callback) {
            for (let formIndex in current_forms) {
                if (current_forms[formIndex]._id === formId) {
                    current_forms.splice(formIndex, 1);
                    break;
                }
            }
            callback(current_forms);
        };

        //Accepts parameter form id, new form object, and callback function
        //Iterates over array of forms looking for form whose id is form id parameter
        //If found, updates form object with new form values
        //Calls back with update form
        function updateFormById(formId, newForm, callback) {
            for (let form of current_forms) {
                if (form._id === formId) {
                    form.title = newForm.title;
                    form.userId = newForm.userId;
                    callback(form);
                } else {
                    callback(null);
                }
            }
        };

    }
})();