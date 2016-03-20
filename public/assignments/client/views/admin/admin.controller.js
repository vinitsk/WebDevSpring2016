/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController(UserService, $location, $scope, $rootScope) {

        var AdminController = this;

        function init() {
            if (!$rootScope.user) {
                $location.url("/home");
            }
            populateUsers();
        }

        init();

        function populateUsers() {
            UserService.findAllUsers(callback);

            function callback(response) {
                AdminController.users = response;
            }
        };

    };
})();