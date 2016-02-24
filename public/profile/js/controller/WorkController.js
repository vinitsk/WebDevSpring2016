(function () {
    angular
        .module("profileApp")
        .controller("WorkController", WorkController);

    function WorkController($scope) {

        $scope.onSwipeLeft = function (ev) {
            alert('You swiped left!!');
        };

        $scope.onSwipeRight = function (ev) {
            alert('You swiped right!!');
        };
        $scope.onSwipeUp = function (ev) {
            alert('You swiped up!!');
        };

        $scope.onSwipeDown = function (ev) {
            alert('You swiped down!!');
        };
    };

})();