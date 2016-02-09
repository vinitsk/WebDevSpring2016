(function () {
    $(init);


    var $movieTitleTxt;
    var $searchBtn;
    var $searchResults;
    var SEARCH_URL = "http://www.omdbapi.com/?s=TITLE";


    function init() {
        $movieTitleTxt = $("#movieTitleTxt");
        $searchBtn = $("#searchBtn");
        $searchResults = $("#searchResults tbody")
        $searchBtn.click(searchMovie);
    }

    function searchMovie() {
        var title = $movieTitleTxt.val();
        var url = SEARCH_URL.replace("TITLE", title);

        $.ajax({
            url: url,
            success: renderSearchResults
        });
    }

    function fetchMovieDetails(event) {
        console.log(event);
    }

    function renderSearchResults(response) {

        var totalResults = response.totalResults;
        var movies = response.Search;

        for (var m = 0; m < movies.length; m++) {

            var movie = movies[m];
            var posterUrl = movie.Poster;
            var title = movie.Title;
            var year = movie.Year;
            var imdbID = movie.imdbID;

            var $img = $("<img>")
                .attr("src", posterUrl)
                    .addClass("posterThumb");

            var $tr = $("<tr>")
                .attr("id", imdbID)
                .click(fetchMovieDetails);


            var $td = $("<td>")
                .append($img)
                .appendTo($tr);

            $td = $("<td>")
                .append(title)
                .appendTo($tr);

            $td = $("<td>")
                .append(year)
                .appendTo($tr);

            $td = $("<td>")
                .append(imdbID)
                .appendTo($tr);
            $searchResults.append($tr);
        }
    }

})();