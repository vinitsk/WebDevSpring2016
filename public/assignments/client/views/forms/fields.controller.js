/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
        angular
            .module("FormBuilderApp")
            .controller("FieldsController", FieldsController)

        function FieldsController(FieldService, $routeParams, $scope, $rootScope) {

            //Event Handlers Decelerations
            $scope.removeField = removeField;
            $scope.addNewField = addNewField;

            function init() {
                getFormFields();
                $scope.fieldType = [
                    {"label": "Single Line Text Field", "value": "TEXT"},
                    {"label": "Multi Line Text Field", "value": "TEXTAREA"},
                    {"label": "Date Field", "value": "DATE"},
                    {"label": "Dropdown Field", "value": "OPTIONS"},
                    {"label": "Radio Buttons Field", "value": "RADIOS"},
                    {"label": "Checkboxes Field", "value": "CHECKBOXES"},
                ]

                $scope.sortableOptions = {
                    handle: ".field-move"
                };
            };
            init();

            function getFormFields() {
                if (!$routeParams.formId) {
                    return;
                }
                FieldService
                    .getFieldsForForm($routeParams.formId)
                    .then(success_callback, error_callback);
                function success_callback(response) {
                    if (response != null) {
                        console.log(response);
                        $scope.fields = response.data;
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
                        $scope.fields = response.data;
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
                    newfield = {"_id": null, "label": "New Text Field", "type": "TEXT", "placeholder": "New Field"};
                } else if (newfieldSelector.value == "TEXTAREA") {
                    newfield = {"_id": null, "label": "New Text Field", "type": "TEXTAREA", "placeholder": "New Field"};
                } else if (newfieldSelector.value == "DATE") {
                    newfield = {"_id": null, "label": "New Date Field", "type": "DATE"};
                } else if (newfieldSelector.value == "OPTIONS") {
                    newfield = {
                        "_id": null, "label": "New Dropdown", "type": "OPTIONS", "options": [
                            {"label": "Option 1", "value": "OPTION_1"},
                            {"label": "Option 2", "value": "OPTION_2"},
                            {"label": "Option 3", "value": "OPTION_3"}
                        ]
                    };
                } else if (newfieldSelector.value == "CHECKBOXES") {
                    newfield = {
                        "_id": null, "label": "New Checkboxes", "type": "CHECKBOXES", "options": [
                            {"label": "Option A", "value": "OPTION_A"},
                            {"label": "Option B", "value": "OPTION_B"},
                            {"label": "Option C", "value": "OPTION_C"}
                        ]
                    };
                } else if (newfieldSelector.value == "RADIOS") {
                    newfield = {
                        "_id": null, "label": "New Radio Buttons", "type": "RADIOS", "options": [
                            {"label": "Option X", "value": "OPTION_X"},
                            {"label": "Option Y", "value": "OPTION_Y"},
                            {"label": "Option Z", "value": "OPTION_Z"}
                        ]
                    };
                }

                FieldService
                    .createFieldForForm($rootScope.form._id, newfield)
                    .then(success_callback, error_callback);
                function success_callback(response) {
                    if (response != null) {
                        console.log(response);
                        $scope.fields = response.data;
                    }
                }
                function error_callback(error) {
                    console.log(error);
                }
            }
        }

    })
();