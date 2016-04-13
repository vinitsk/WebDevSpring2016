/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("HeaderController", HeaderController)

    function HeaderController($location, $scope, $rootScope, SecurityService) {

        $scope.$location = $location;

        //Event Handler Deceleration
        $scope.logout = logout;

        //Event Handler Implementation
        function logout() {
            SecurityService.logout()
                .then(function (response) {
                    console.log(response);
                    delete $rootScope.user;
                    $location.url("/home");
                }, function (err) {
                    console.log(err)
                });

        };
    };
})();