/**
 * Created by Bhanu on 01/03/2016.
 */
(function(){

    angular
        .module("MovieApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$http,$routeParams,$location,MovieService){

        $scope.title = "Star Wars";
        var url_title = $routeParams.title;

        if(url_title){
            search(url_title);
        }
        //Event Handlers Decelerations
        $scope.search = search;

        //Event Handlers Implementations
        function search(title){

            $location.url("/search/"+title);
            MovieService.findMoviesByTitle(title,render);

            function render(response){
                $scope.data = response;
            }
        }

    };
})();