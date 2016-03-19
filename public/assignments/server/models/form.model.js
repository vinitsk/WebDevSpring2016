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
            updateFormById: updateFormById
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

        function findUserForms(userId){
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

    };