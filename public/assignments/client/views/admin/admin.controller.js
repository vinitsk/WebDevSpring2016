/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController(UserService, $location, $rootScope) {

        var AdminController = this;

        AdminController.addNewUser = addNewUser;
        AdminController.updateUser = updateUser;
        AdminController.deleteUser = deleteUser;
        AdminController.selectUser = selectUser;
        AdminController.new_user = {
            '_id': '',
            'username': '',
            'password': '',
            'roles': ''
        };


        function init() {
            if (!$rootScope.user) {
                $location.url("/home");
            }
            populateUsers();
        }

        init();

        function addNewUser(user) {
            if (!$rootScope.user) {
                $location.url("/home");
            }
            if (!user) {
                return;
            }
            delete user._id;
            UserService
                .createUser(rolesToArray(user))
                .then(success_callback, error_callback);

            function success_callback(response) {
                console.log(response.data);
                populateUsers();
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function updateUser(user) {
            if (!$rootScope.user) {
                $location.url("/home");
            }
            if (!user || !user._id) {
                return;
            }
            var userId = user._id;
            delete user._id;
            UserService
                .updateUser(userId, rolesToArray(user))
                .then(success_callback, error_callback);

            function success_callback(response) {
                console.log(response.data);
                AdminController.new_user = {
                    '_id': '',
                    'username': '',
                    'password': '',
                    'roles': ''
                };
                populateUsers();
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function deleteUser(userId) {
            if (!$rootScope.user) {
                $location.url("/home");
            }
            if (!userId) {
                return;
            }
            UserService
                .deleteUserById(userId)
                .then(success_callback, error_callback);

            function success_callback(response) {
                console.log(response.data);
                populateUsers();
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function selectUser(user) {
            if (!$rootScope.user) {
                $location.url("/home");
            }
            if (!user) {
                return;
            }
            var selectedUser = rolesToString(angular.copy(user));
            AdminController.new_user = {
                '_id': selectedUser._id,
                'username': selectedUser.username,
                'password': selectedUser.password,
                'roles': selectedUser.roles
            };

        }

        function populateUsers() {
            UserService.findAllUsers()
                .then(success_callback, error_callback);

            function success_callback(response) {
                console.log(response.data);
                AdminController.users = rolesToString(response.data);
            }

            function error_callback(error) {
                console.log(error);
            }
        }

        function rolesToString(user) {
            if (user.roles) {
                user.roles = user.roles.join();
            }
            return user;

        }

        function rolesToArray(user) {
            if (user.roles) {
                user.roles = user.roles.split(",");
            }
            return user;
        }
    }
})();