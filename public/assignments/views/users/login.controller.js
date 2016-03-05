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
        function Login(user_name, user_password) {
            UserService.findUserByCredentials(user_name, user_password, render);

            function render(response) {
                if (response != null) {
                    //Storing the user in the Root Scope
                    $rootScope.user = response;
                    // Navigating to the Profile Page of this particular User
                    $location.url("/profile/");
                }
            }
        };


    };
})();