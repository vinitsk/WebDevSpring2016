/**
 * Created by Bhanu on 18/03/2016.
 */

"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService($http) {
        var api = {
            createFieldForForm: createFieldForForm,
            getFieldsForForm: getFieldsForForm,
            getFieldForForm: getFieldForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };
        return api;

        function createFieldForForm(formId, field) {
            var url = "/api/assignment/form/" + formId + "/field";
            $http.post(url, field);
        }

        function getFieldsForForm(formId) {
            var url = "/api/assignment/form/" + formId + "/field";
            $http.get(url);
        }

        function getFieldForForm(formId, fieldId) {
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.get(url);
        }

        function deleteFieldFromForm(formId, fieldId) {
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.delete(url);
        }

        function updateField(formId, fieldId, field) {
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            $http.put(url, field);

        }
    }
})();