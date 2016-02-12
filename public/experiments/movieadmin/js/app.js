(function () {

    angular
        .module("MovieAdminApp", [])
        .controller("MovieController", MovieController);

    function MovieController($scope) {
        $scope.hello = "Hello from the controller."
        $scope.movies = [
            {id: 123, title: "Star Wars I", director: "JJ A"},
            {id: 134, title: "Star Wars II", director: "JJ A"},
            {id: 145, title: "Star Wars III", director: "JJ A"}
        ]


        $scope.addMovie = addMovie;
        $scope.deleteMovie = deleteMovie;
        $scope.selectMovie = selectMovie;
        $scope.updateMovie = updateMovie;

        function addMovie() {
            var newMovie = {
                id: $scope.movie.id,
                title: $scope.movie.title,
                director: $scope.movie.director
            }
            $scope.movies.push(newMovie);
            $scope.movie = {};
        }

        function deleteMovie(movie) {
            var index = $scope.movies.indexOf(index);
            $scope.movies.splice(index, 1);
        }

        function selectMovie(movie) {
            $scope.movie = {
                id: movie.id,
                title: movie.title,
                director: movie.director
            };
            $scope.selMovieIndex = $scope.movies.indexOf(movie);
        }

        function updateMovie(){

        }

    };

})();