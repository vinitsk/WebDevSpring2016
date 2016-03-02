/**
 * Created by Bhanu on 02/03/2016.
 */

"use strict";

(function () {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService() {

        var current_users = [
            {
                "_id": 123, "firstName": "Alice", "lastName": "Wonderland",
                "username": "alice", "password": "alice", "roles": ["student"]
            },
            {
                "_id": 234, "firstName": "Bob", "lastName": "Hope",
                "username": "bob", "password": "bob", "roles": ["admin"]
            },
            {
                "_id": 345, "firstName": "Charlie", "lastName": "Brown",
                "username": "charlie", "password": "charlie", "roles": ["faculty"]
            },
            {
                "_id": 456, "firstName": "Dan", "lastName": "Craig",
                "username": "dan", "password": "dan", "roles": ["faculty", "admin"]
            },
            {
                "_id": 567, "firstName": "Edward", "lastName": "Norton",
                "username": "ed", "password": "ed", "roles": ["student"]
            }
        ];

        var api = {
            findUserByCredentials: findUserByCredentials,
            //findAllUsers: findAllUsers,
            //createUser: createUser,
            //deleteUserById: deleteUserById,
            //updateUser: updateUser
        };
        return api;

        function findUserByCredentials(username, password, callback) {

            for (let user of current_users) {
                if (user.username === username && user.password === password) {
                    callback(user);
                }
            }

        };


    };
})();