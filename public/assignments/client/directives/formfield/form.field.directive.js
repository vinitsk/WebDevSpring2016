/**
 * Created by Bhanu on 19/03/2016.
 */

"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .directive("formField", formField)

    function formField($uibModal) {
        return {
            scope: {
                "field": "="
            },
            templateUrl: "directives/formfield/form.field.directive.html",
            link: function (scope, element, attrs) {
                scope.removeField = function (fieldId) {
                    scope.$parent.model.removeField(fieldId);
                };
                scope.openEditModel = function (field) {
                    console.log("Call Modal from Directive");
                    console.log(field);
                    console.log("Opening Model");
                    console.log(field);
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'modals/formfeild/field.edit.modal.html',
                        controller: 'FieldModalController',
                        resolve: {
                            field: function () {
                                return field;
                            },
                        }
                    });
                    modalInstance.result.then(function (field) {
                        console.log(field);
                        console.log(scope);
                        scope.$parent.$parent.model.updateField(field);
                    }, function (originalfield) {
                        console.log(originalfield);
                        scope.$parent.field = originalfield;
                        console.log('Modal dismissed at: ' + new Date());
                    });
                };

                scope.duplicateField = function (field) {
                    console.log(field);
                    scope.$parent.model.duplicateField(field);
                }
            }
        }
    }
})();