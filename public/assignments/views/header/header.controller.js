/**
 * Created by Bhanu on 02/03/2016.
 */
"user strict";
(function () {
    angular
        .module("FormMakerApp")
        .controller("HeaderController",HeaderController)

    function HeaderController($location, $scope){

        $scope.$location = $location;

    };
})();