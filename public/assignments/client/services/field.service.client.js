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
            updateField: updateField,
            sortFields: sortFields
        };
        return api;

        function createFieldForForm(formId, field) {
            var url = "/api/assignment/form/" + formId + "/field";
            return $http.post(url, field);
        }

        function getFieldsForForm(formId) {
            var url = "/api/assignment/form/" + formId + "/field";
            return $http.get(url);
        }

        function getFieldForForm(formId, fieldId) {
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            return $http.get(url);
        }

        function deleteFieldFromForm(formId, fieldId) {
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            return $http.delete(url);
        }

        function updateField(formId, fieldId, field) {
            var url = "/api/assignment/form/" + formId + "/field/" + fieldId;
            return $http.put(url, field);

        }

        function sortFields(formId, startIndex, endIndex) {
            var url = "/api/assignment/form/" + formId + "/fields?startIndex=" + startIndex + "&endIndex=" + endIndex;
            return $http.put(url);
        }
    }
})();