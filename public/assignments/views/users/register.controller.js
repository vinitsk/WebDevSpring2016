/**
 * Created by Bhanu on 02/03/2016.
 */
"user strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("RegisterController", RegisterController)

    function RegisterController(UserService, $scope, $rootScope, $location) {

        //Event Handlers Decelerations
        $scope.register = Register;

        //Event Handlers Implementations
        function Register() {

            var form_user = {
                username: $scope.form.user_name,
                password: $scope.form.user_password,
                repeat_password:$scope.form.user_password_repeat,
                email:$scope.form.user_email
            };
            
            UserService.createUser(form_user, userRegisterCallback)

            function userRegisterCallback(response) {
                if (response != null) {
                    //Storing the user in the Root Scope
                    $rootScope.user = response;
                    // Navigating to the Profile Page of this particular User
                    $location.url("/profile/");
                }
            };
        };

    };
})();