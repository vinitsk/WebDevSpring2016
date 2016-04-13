/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService,  $routeParams, $rootScope, $location) {

        ProfileController = this;

        ProfileController.user = $rootScope.user;
        ProfileController.usereId = $routeParams.userId;

        function inti() {
            if (!$rootScope.user) {
                $location.url("/home");
            }
        }
        inti();

        //Event Handlers Decelerations
        ProfileController.update = Update;

        //Event Handlers Implementations
        function Update(user) {
            delete user._id;
            UserService.updateUser(ProfileController.usereId, user)
                .then(success_callback, error_callback);
            function success_callback(response) {
                if (response != null) {
                    //Storing the user in the Root Scope
                    console.log(response);
                    $rootScope.user = response.data;
                    //Navigating to the Profile Page of this particular User
                    $location.url(ProfileController.usereId + "/profile");
                }
            }

            function error_callback(error) {
                console.log(error);
            }
        }
    }
})();