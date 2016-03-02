/**
 * Created by Bhanu on 01/03/2016.
 */
(function (){

    angular
        .module("MovieApp")
        .controller("DetailController",DetailController);

    function DetailController($scope,$routeParams,$http,MovieService){

        var imdbID = $routeParams.imdbID;
        MovieService.findMovieById(imdbID,render);

        function render(response){
            $scope.movie = response;
        }

    }
})();