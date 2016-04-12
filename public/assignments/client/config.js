/**
 * Created by Bhanu on 02/03/2016.
 */

"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .config(configuration);

    function configuration($routeProvider) {

        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.html",
                controller: "HomeController"
            })
            .when("/:userId/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/:userId/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/register", {
                templateUrl: "views/users/register.view.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/users/login.view.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/:userId/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormsController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .when("/:userId/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model",
                resolve: {loggedin: checkLoggedin}
            })
            .otherwise({
                redirectTo: "/home"
            })
    }

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                console.log("User Logged In");
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                console.log("You need to log in.");
                $rootScope.errorMessage = 'You need to log in.';
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };
})();

