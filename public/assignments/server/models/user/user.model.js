/**
 * Created by Bhanu on 18/03/2016.
 */

/*Load q promise library*/
var q = require("q");
/*Load Mongoose*/
var mongoose = require("mongoose");

var data = require("./user.mock.json");
module.exports = function () {
    var UserSchema = require("./user.schema.server.js")();
    var User = mongoose.model("User", UserSchema);
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
        User.create(mapDBUser(user), function (err, doc) {
            if (err) {
                console.log(err);
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function mapDBUser(user) {
        var new_user = {};
        if ('username' in user) {
            new_user['username'] = user.username;
        }
        if ('password' in user) {
            new_user['password'] = user.password;
        }
        if ('email' in user) {
            new_user['email'] = user.email;
        }
        if ('firstName' in user) {
            new_user['firstName'] = user.firstName;
        }
        if ('lastName' in user) {
            new_user['lastName'] = user.lastName;
        }
        if ('roles' in user) {
            new_user['roles'] = user.roles;
        }
        return new_user;
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

