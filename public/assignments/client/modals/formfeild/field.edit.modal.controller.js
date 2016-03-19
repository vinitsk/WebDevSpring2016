/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldModalController", FieldModalController);

    function FieldModalController($scope, field, $uibModalInstance) {
        $scope.field = field;
        $scope.originalfield = angular.copy($scope.field);

        if (field.type == "OPTIONS" || field.type == "CHECKBOXES" || field.type == "RADIOS") {
            var optionsString = ""
            for (let option of field.options) {
                optionsString += option.label + ":" + option.value + "\n";
            }
            $scope.optionsValue = optionsString;
            console.log("Options Value: " + optionsString);
        }

        $scope.ok = function () {
            if ($scope.field.type == "OPTIONS" || $scope.field.type == "CHECKBOXES" || $scope.field.type == "RADIOS") {
                var options = [];
                var stringOptions = $scope.optionsValue.split("\n");
                for (let o of stringOptions) {
                    var option = {
                        "label": o.split(":")[0],
                        "value": o.split(":")[1]
                    }
                    options.push(option);
                }
                $scope.field.options = options;
            }
            $uibModalInstance.close($scope.field);
        };

        $scope.cancel = function () {
            $scope.field = $scope.originalfield;
            $uibModalInstance.dismiss($scope.field);
        };
    }
})
();