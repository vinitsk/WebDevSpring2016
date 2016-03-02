    /**
     * Created by Bhanu on 02/03/2016.
     */
    (function () {
        angular
            .module("MovieApp")
            .factory("MovieService", MovieService);

        function MovieService($http) {
            var api = {
                findMoviesByTitle: findMoviesByTitle,
                findMovieById: findMovieById
            };

            return api;

            function findMoviesByTitle(title, callBack) {
                $http.get("http://www.omdbapi.com/?s=" + title)
                    .success(callBack);
            };

            function findMovieById(imdbID, callBack) {
                $http.get("http://www.omdbapi.com/?i=" + imdbID)
                    .success(callBack);
            };
        };


    })();