/**
 * Created by Bhanu on 02/03/2016.
 */

"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($http) {

        var current_users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"], "email": "alice@test.com"
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"], "email": "bob@test.com"
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"], "email": "charlie@test.com"
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"], "email": "craig@test.com"
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"], "email": "edward@test.com"
            }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            createUser: createUser,
            deleteUserById: deleteUserById,
            updateUser: updateUser
        };
        return api;

        //Accepts parameters username, password, and callback function
        //Iterates over the array of current users looking for user object
        // whose username and password match the parameters
        //Calls back with user found or null otherwise
        function findUserByCredentials(credentials) {
            var url = "/api/assignment/user";
            url+="?username="+credentials.username;
            url+="&password="+credentials.password;
            return $http.get(url);
        }

        //findAllUsers(callback)
        //Accepts parameter callback function
        //Calls back with array of all u
        function findAllUsers(callback) {
            callback(current_users);
        }

        //Accepts parameters user object and callback function
        //Adds property called _id with unique value to the user object parameter.
        //Adds the new user to local array of users
        //Calls back with new user
        function createUser(user) {
            if (user.password == user.repeatPassword) {
                var url = "/api/assignment/user";
                return $http.post(url, user);
            }
        };

        //Accepts parameters user id and callback function
        //Iterates over the array of current users looking for a
        // user object whose user id is equal to parameter user id
        //If found, removes user from the array of current users
        //Calls back with remaining array of all users
        function deleteUserById(userId, callback) {
            for (let user_index in current_users) {
                if (current_users[user_index]._id === userId) {
                    current_users.splice(user_index, 1);
                }
                callback(current_users);
            }
        };


        //Accepts parameters user id, user object and callback function
        //Iterates over the array of current users looking for a user
        // object whose user id is equal to parameter user id
        //If found, updates user with new user properties
        //Calls back with updated user
        function updateUser(userId, newUser) {
            var url = "/api/assignment/user/";
            url+=userId;
            return $http.put(url, newUser);
        }
    };
})();