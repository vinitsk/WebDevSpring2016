/**
 * Created by Bhanu on 02/03/2016.
 */

"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService($http) {

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
        function createFormForUser(userId, form) {
            var url = "/api/assignment/user/" + userId + "/form";
            return $http.post(url, form);
        };

        //Accepts parameter user id, and callback function
        //Iterates over the array of current forms looking for forms whose user id is parameter user id
        //Calls back with found forms for user id parameter, empty array otherwise
        function findAllFormsForUser(userId) {
            var url = "/api/assignment/user/" + userId + "/form";
            return $http.get(url);
        };

        //Accepts parameter form id and callback function
        //Iterates over array of forms looking for form whose id is form id parameter
        //If found, removes form from current array of forms
        //Calls back with remaining array of forms
        function deleteFormById(formId) {
            var url = "/api/assignment/form/"+formId;
            return $http.delete(url);
        };

        //Accepts parameter form id, new form object, and callback function
        //Iterates over array of forms looking for form whose id is form id parameter
        //If found, updates form object with new form values
        //Calls back with update form
        function updateFormById(formId, newForm) {
            var url = "/api/assignment/form/" + formId;
            return $http.post(url, newForm);
        };

    }
})();