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
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
    };
    return api;

    function findUserByCredentials(credentials) {
        for (let user of data) {
            if (user.username === credentials.username && user.password === credentials.password) {
                return user;
                break;
            }
        }
    };

    function findAllUsers(){
        // use q to defer the response
        var deferred = q.defer();
        deferred.resolve(data);

        // return a promise
        return deferred.promise;
    }

    function createUser(){

    }

    function deleteUserById(){

    }

    function updateUser(){

    }
}

