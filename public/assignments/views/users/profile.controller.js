/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("ProfileController", ProfileController)

    function ProfileController(UserService, $scope, $rootScope, $location) {


        //Event Handlers Decelerations
        $scope.update = Update;

        //Event Handlers Implementations
        function Update() {

            var form_user = {
                username: $scope.form.user_name,
                password: $scope.form.user_password,
                firstname: $scope.form.user_fname,
                lastname: $scope.form.user_lname,
                email: $scope.form.user_email
            };

            UserService.updateUser($rootScope.user._id, form_user, callback);
            function callback(response) {
                if (response != null) {
                    //Storing the user in the Root Scope
                    $rootScope.user = response;
                    // Navigating to the Profile Page of this particular User
                    $location.url("/profile/");
                }
            };
        }


    };
})();