(function () {
    angular
        .module("MovieApp")
        .config(configuration);



    function configuration($routeProvider){
        $routeProvider
            .when ("/home",{
                templateUrl: "views/home.view.html"
            })
            .when ("/search",{
                templateUrl: "views/search.view.html"
            })
            .otherwise({
                redirectTo: "/home"
            })
    }

})()