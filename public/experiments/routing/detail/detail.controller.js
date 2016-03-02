/**
 * Created by Bhanu on 01/03/2016.
 */
(function (){

    angular
        .module("MovieApp")
        .controller("DetailController",DetailController);

    function DetailController($scope,$routeParams,$http){

        var imdbID = $routeParams.imdbID;
        $http.get("http://www.omdbapi.com/?i="+imdbID)
            .success(render);

        function render(response){
            //console.log(response);
            $scope.movie = response;
        }

    }
})();