'use strict';

/**
 * Careseeker controller
 */
angular
    .module('Home')
    .controller('careseekerCtrl', ['$scope', '$window',
        function ($scope, $window) {

        $scope.SignUp = function () {
            $window.location.href = 'accounts#/join';
        };

    }]);
