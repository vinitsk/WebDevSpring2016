/**
 * Created by Bhanu on 01/03/2016.
 */
(function(){

    angular
        .module("MovieApp")
        .controller("SearchController",SearchController);

    function SearchController($scope,$http){

        //Event Handlers Decelerations
        $scope.search = search;

        //Event Handlers Implementations
        function search(title){
            $http.get("http://www.omdbapi.com/?s="+title)
                .success(render);

            function render(response){
                $scope.data = response;
            }
        }

    };
})();