/**
 * Created by Bhanu on 02/03/2016.
 */
"user strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController)

    function HeaderController($location, $scope, $rootScope) {

        $scope.$location = $location;

        //Event Handler Deceleration
        $scope.logout = logout;

        //Event Handler Implementation
        function logout() {
            delete $rootScope.user;
            $location.url("/home");
        };
    };
})();