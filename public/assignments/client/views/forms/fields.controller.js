/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldsController", FieldsController);

    function FieldsController(FieldService, $routeParams, $rootScope, $location) {

        var FieldsController = this;

        //Event Handlers Decelerations
        FieldsController.removeField = removeField;
        FieldsController.addNewField = addNewField;
        FieldsController.updateField = updateField;
        FieldsController.duplicateField = duplicateField;

        function init() {
            getFormFields();
            FieldsController.fieldType = [
                {"label": "Single Line Text Field", "value": "TEXT"},
                {"label": "Multi Line Text Field", "value": "TEXTAREA"},
                {"label": "Date Field", "value": "DATE"},
                {"label": "Dropdown Field", "value": "OPTIONS"},
                {"label": "Radio Buttons Field", "value": "RADIOS"},
                {"label": "Checkboxes Field", "value": "CHECKBOXES"}
            ];

            FieldsController.sortableOptions = {
                handle: ".field-move",
                update: updateSortOrder
            };
        }

        init();

        function updateSortOrder() {
            if (!FieldsController.fields) {
                return
            }
            FieldService
                .updateAllFields($routeParams.formId, FieldsController.fields)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    getFormFields();
                    FieldsController.fields = response.data;
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }


        function duplicateField(field) {
            if (!field) {
                return;
            }
            FieldService
                .createFieldForForm($rootScope.form._id, field)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    FieldsController.fields = response.data;
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function updateField(field) {
            if (!field || !$routeParams.formId) {
                return;
            }
            FieldService
                .updateField($routeParams.formId, field._id, field)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    FieldsController.fields = response.data;
                }
            }

            function error_callback(error) {
                console.log(error);
            }

        }

        function getFormFields() {
            if (!$rootScope.user || !$routeParams.formId) {
                $location.url("/");
            }
            FieldService
                .getFieldsForForm($routeParams.formId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    FieldsController.fields = response.data;
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }


        function removeField(fieldId) {
            if (!$rootScope.form._id || !fieldId) {
                return;
            }
            FieldService
                .deleteFieldFromForm($rootScope.form._id, fieldId)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    FieldsController.fields = response.data;
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function addNewField(newfieldSelector) {
            if (!newfieldSelector) {
                return;
            }

            var newfield = {};
            if (newfieldSelector.value == "TEXT") {
                newfield = {"label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
            } else if (newfieldSelector.value == "TEXTAREA") {
                newfield = {"label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
            } else if (newfieldSelector.value == "DATE") {
                newfield = {"label": "New Date Field", "type": "DATE"};
            } else if (newfieldSelector.value == "OPTIONS") {
                newfield = {
                    "label": "New Dropdown", "type": "OPTIONS", "options": [
                        {"label": "Option 1", "value": "OPTION_1"},
                        {"label": "Option 2", "value": "OPTION_2"},
                        {"label": "Option 3", "value": "OPTION_3"}
                    ]
                };
            } else if (newfieldSelector.value == "CHECKBOXES") {
                newfield = {
                    "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                        {"label": "Option A", "value": "OPTION_A"},
                        {"label": "Option B", "value": "OPTION_B"},
                        {"label": "Option C", "value": "OPTION_C"}
                    ]
                };
            } else if (newfieldSelector.value == "RADIOS") {
                newfield = {
                    "label": "New Radio Buttons", "type": "RADIOS", "options": [
                        {"label": "Option X", "value": "OPTION_X"},
                        {"label": "Option Y", "value": "OPTION_Y"},
                        {"label": "Option Z", "value": "OPTION_Z"}
                    ]
                };
            }

            function success_callback(response) {
                if (response != null) {
                    console.log(response);
                    FieldsController.fields = response.data;
                }
            }
            FieldService
                .createFieldForForm($rootScope.form._id, newfield)
                .then(success_callback, error_callback);

            function error_callback(error) {
                console.log(error);
            }
        }
    }

})
();