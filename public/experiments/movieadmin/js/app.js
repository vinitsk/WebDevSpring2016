(function(){

    angular
        .module("MovieAdminApp",[])
        .controller("MovieController",MovieController);

    function MovieController($scope){
        $scope.hello = "Hello from the controller."
        $scope.movies = [
            {id: 123, title: "Star Wars I", director:"JJ A"},
            {id: 134, title: "Star Wars II", director:"JJ A"},
            {id: 145, title: "Star Wars III", director:"JJ A"}
        ]

        $scope.addMovie = function(){
            var newMovie = {
                id: $scope.movie.id,
                title: $scope.movie.title,
                director: $scope.movie.director
            }
            $scope.movies.push(newMovie);
            $scope.movie = {};
        }

        $scope.deleteMovie = function (index) {
            $scope.movies.splice(index,1);
        }
    };

})();