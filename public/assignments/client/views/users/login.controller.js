/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("LoginController", LoginController)

    function LoginController(UserService, $scope, $location, $rootScope) {

        //Event Handlers Decelerations
        $scope.login = Login;

        //Event Handlers Implementations
        function Login(credentials) {
            UserService
                .findUserByCredentials(credentials)
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
        };


    };
})();