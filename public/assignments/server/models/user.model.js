/**
 * Created by Bhanu on 18/03/2016.
 */

"use strict";

// load q promise library
var q = require("q");

var data = require("./user.mock.json");
module.exports = function () {
    var api = {
        findUserByCredentials: findUserByCredentials,
        findAllUsers: findAllUsers,
        findUserByUsername: findUserByUsername,
        findUserById: findUserById,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserById(userID) {
        var defered = q.defer();
        var userFound = false;
        for (let user of data) {
            if (user._id == userID) {
                defered.resolve(user);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            defered.reject("No Match Found.");
        }
        return defered.promise;
    }

    function findUserByUsername(username) {
        var defered = q.defer();
        var userFound = false;
        for (let user of data) {
            if (user.username == username) {
                defered.resolve(user);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            defered.reject("No Match Found.");
        }
        return defered.promise;
    }

    function findUserByCredentials(credentials) {
        var defered = q.defer();
        var userFound = false;
        for (let user of data) {
            if (user.username == credentials.username && user.password == credentials.password) {
                defered.resolve(user);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            defered.reject("No Match Found.");
        }
        return defered.promise;
    };

    function findAllUsers() {
        // use q to defer the response
        var deferred = q.defer();
        deferred.resolve(data);

        // return a promise
        return deferred.promise;
    }

    function createUser(user) {
        var defered = q.defer();
        user._id = Math.floor(Math.random() * 900) + 100;
        data.push(user);
        defered.resolve(user);
        return defered.promise;
    }

    function deleteUserById() {
        var defered = q.defer();
        var userFound = false;
        for (let cuurentUser of data) {
            if (cuurentUser._id == userID) {
                data.splice(user_index, 1);
                defered.resolve(data);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            defered.reject("No Match Found.");
        }
        return defered.promise;
    }

    function updateUser(userID, user) {
        var defered = q.defer();
        var userFound = false;
        for (let cuurentUser of data) {
            if (cuurentUser._id == userID) {
                cuurentUser.email = user.email;
                cuurentUser.firstName = user.firstName;
                cuurentUser.lastName = user.lastName;
                cuurentUser.passowrd = user.passowrd;
                defered.resolve(cuurentUser);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            defered.reject("No Match Found.");
        }
        return defered.promise;
    }
};

