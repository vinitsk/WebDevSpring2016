/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController(UserService, $scope, $rootScope, $location) {

        function inti() {
            if (!$rootScope.user) {
                $location.url("/home");
            }
        };
        inti();

        //Event Handlers Decelerations
        $scope.update = Update;

        //Event Handlers Implementations
        function Update(user) {
            UserService.updateUser($rootScope.user._id, user)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    //Storing the user in the Root Scope
                    console.log(response);
                    $rootScope.user = response.data;
                    //Navigating to the Profile Page of this particular User
                    $location.url($rootScope.user._id + "/profile");
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }


    };
})();