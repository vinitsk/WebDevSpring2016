/**
 * Created by Bhanu on 18/03/2016.
 */

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
        for (var userIndex in data) {
            if (data[userIndex]._id == userID) {
                deferred.resolve(data[userIndex]);
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
        for (var userIndex in data) {
            if (data[userIndex].username == username) {
                deferred.resolve(data[userIndex]);
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
        for (var userIndex in data) {
            if (data[userIndex].username == credentials.username && data[userIndex].password == credentials.password) {
                deferred.resolve(data[userIndex]);
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
        for (var currentUserIndex in data) {
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
        for (var userIndex in data) {
            if (data[userIndex]._id == userID) {
                data[userIndex].email = user.email;
                data[userIndex].firstName = user.firstName;
                data[userIndex].lastName = user.lastName;
                data[userIndex].passowrd = user.passowrd;
                deferred.resolve(data[userIndex]);
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

