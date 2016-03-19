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
            .when("/admin", {
                templateUrl: "views/admin/admin.view.html",
                controller: "AdminController"
            })
            .when("/profile", {
                templateUrl: "views/users/profile.view.html",
                controller: "ProfileController"
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
            .when("/forms", {
                templateUrl: "views/forms/forms.view.html",
                controller: "FormsController",
                controllerAs: "model"
            })
            .when("/:formId/fields", {
                templateUrl: "views/forms/fields.view.html",
                controller: "FieldsController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo: "/home"
            })
    }
})();

