/**
 * Created by Bhanu on 02/03/2016.
 */
"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController)

    function AdminController(UserService,$location,$scope,$rootScope) {

        populateUsers();

        function populateUsers(){
            UserService.findAllUsers(callback);

            function callback(response){
                $rootScope.users = response;
            }
        };

    };
})();