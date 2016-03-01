/**
 * Created by Bhanu on 01/03/2016.
 */
(function (){

    angular
        .module("MovieApp")
        .controller("NavController",NavController);


    function NavController($location, $scope){
        $scope.$location =  $location;
    };
})();