/**
 * Created by Bhanu on 02/03/2016.
 */
"user strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("SideBarController",SideBarController)

    function SideBarController($location, $scope){
        $scope.$location = $location;
    };
})();