/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController(SecurityService, $rootScope, $location) {

        var RegisterController = this;
        //Event Handlers Decelerations
        RegisterController.register = Register;

        //Event Handlers Implementations
        function Register(user) {
            if (user.password != user.repeatPassword) {
                console.log("Password Do not match!!");
                $rootScope.errorMessage = "Password Do not match!!";
                return;
            }
            console.log(user);
            SecurityService
                .register(user)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    //Storing the user in the Root Scope
                    console.log(response);
                    if (response.data == "User already exist. Please login.") {
                        $rootScope.errorMessage = response.data
                    } else {
                        $rootScope.user = response.data;
                        //Navigating to the Profile Page of this particular User
                        $location.url($rootScope.user._id + "/profile");
                    }

                }
            }

            function error_callback(error) {
                console.log(error);
            }

        }

    }
})();