/**
 * Created by Bhanu on 18/03/2016.
 */

/*Load q promise library*/
var q = require("q");
/*Load Mongoose*/
var mongoose = require("mongoose");
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

    function findUserById(user) {
        var deferred = q.defer();
        User.findOne(
            mapDBUser(user), function (err, doc) {
                if (err) {
                    console.log("Error in findUserById");
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log("User Found");
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findUserByUsername(user) {
        var deferred = q.defer();
        User.findOne(
            mapDBUser(user), function (err, doc) {
                if (err) {
                    console.log("Error in findUserByUsername");
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log("User Found");
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function findUserByCredentials(credentials) {
        var deferred = q.defer();
        User.findOne(
            mapDBUser(credentials), function (err, doc) {
                if (err) {
                    console.log("Error in findUserByCredentials");
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log("User Found");
                    console.log(doc);
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

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
        if ('_id' in user) {
            new_user['_id'] = user._id;
        }
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

    function deleteUserById(user) {
        var deferred = q.defer();
        User.delete(
            mapDBUser(user), function (err, doc) {
                if (err) {
                    console.log("Error in findUserByCredentials");
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log("User Found");
                    console.log(doc);
                    deferred.resolve(doc);
                }
            }
        );
        return deferred.promise;
    }

    function updateUser(userID, user) {
        var deferred = q.defer();
        User.findOneAndUpdate(
            {_id: userID},
            {$set: mapDBUser(user)},
            {new: true},
            function (err, doc) {
                if (err) {
                    console.log("Error in updateUser");
                    console.log(err);
                    deferred.reject(err);
                } else {
                    console.log(doc);
                    deferred.resolve(doc);
                }
            });
        return deferred.promise;
    }
};

