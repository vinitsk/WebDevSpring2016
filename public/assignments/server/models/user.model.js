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
        var deferred = q.defer();
        var userFound = false;
        for (let user of data) {
            if (user._id == userID) {
                deferred.resolve(user);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        var userFound = false;
        for (let user of data) {
            if (user.username == username) {
                deferred.resolve(user);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        var userFound = false;
        for (let user of data) {
            if (user.username == credentials.username && user.password == credentials.password) {
                deferred.resolve(user);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    };

    function findAllUsers() {
        // use q to defer the response
        var deferred = q.defer();
        deferred.resolve(data);

        // return a promise
        return deferred.promise;
    }

    function createUser(user) {
        var deferred = q.defer();
        user._id = Math.floor(Math.random() * 900) + 100;
        data.push(user);
        deferred.resolve(user);
        return deferred.promise;
    }

    function deleteUserById() {
        var deferred = q.defer();
        var userFound = false;
        for (let currentUserIndex in data) {
            if (data[currentUserIndex]._id == userID) {
                data.splice(currentUserIndex, 1);
                deferred.resolve(data);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }

    function updateUser(userID, user) {
        var deferred = q.defer();
        var userFound = false;
        for (let currentUser of data) {
            if (currentUser._id == userID) {
                currentUser.email = user.email;
                currentUser.firstName = user.firstName;
                currentUser.lastName = user.lastName;
                currentUser.passowrd = user.passowrd;
                deferred.resolve(currentUser);
                userFound = true;
                break;
            }
        }
        if (!userFound) {
            deferred.reject("No Match Found.");
        }
        return deferred.promise;
    }
};

