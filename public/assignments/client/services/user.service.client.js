/**
 * Created by Bhanu on 02/03/2016.
 */

"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser,
            updateUserByAdmin: updateUserByAdmin
        };
        return api;

        //Accepts parameters username, password, and callback function
        //Iterates over the array of current users looking for user object
        // whose username and password match the parameters
        //Calls back with user found or null otherwise
        function findUserByCredentials(credentials) {
            var url = "/api/assignment/admin/user";
            url += "?username=" + credentials.username;
            url += "&password=" + credentials.password;
            return $http.get(url);
        }

        //findAllUsers(callback)
        //Accepts parameter callback function
        //Calls back with array of all u
        function findAllUsers() {
            var url = "/api/assignment/admin/user";
            return $http.get(url);
        }

        //Accepts parameters user object and callback function
        //Adds property called _id with unique value to the user object parameter.
        //Adds the new user to local array of users
        //Calls back with new user
        function createUser(user) {
            var url = "/api/assignment/admin/user";
            return $http.post(url, user);
        }

        //Accepts parameters user id and callback function
        //Iterates over the array of current users looking for a
        // user object whose user id is equal to parameter user id
        //If found, removes user from the array of current users
        //Calls back with remaining array of all users
        function deleteUserById(userId) {
            var url = "/api/assignment/admin/user/";
            url += userId;
            return $http.delete(url);
        }


        //Accepts parameters user id, user object and callback function
        //Iterates over the array of current users looking for a user
        // object whose user id is equal to parameter user id
        //If found, updates user with new user properties
        //Calls back with updated user
        function updateUser(userId, newUser) {
            var url = "/api/assignment/user/";
            url += userId;
            console.log(url);
            return $http.put(url, newUser);
        }

        //Accepts parameters user id, user object and callback function
        //Iterates over the array of current users looking for a user
        // object whose user id is equal to parameter user id
        //If found, updates user with new user properties
        //Calls back with updated user
        function updateUserByAdmin(userId, newUser) {
            var url = "/api/assignment/admin/user/";
            url += userId;
            console.log(url);
            return $http.put(url, newUser);
        }
    }
})();