/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController(UserService, $scope, $rootScope, $location) {

        //Event Handlers Decelerations
        $scope.register = Register;

        //Event Handlers Implementations
        function Register(user) {

            UserService
                .createUser(user)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    //Storing the user in the Root Scope
                    console.log(response);
                    $rootScope.user = response.data;
                    //Navigating to the Profile Page of this particular User
                    $location.url("/profile");
                }
            }

            function error_callback(error) {
                console.log(error);
            }

        }

    }
})();