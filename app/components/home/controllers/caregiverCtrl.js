'use strict';

/**
 * Caregiver controller
 */
angular
    .module('Home')
    .controller('caregiverCtrl', ['$scope', '$window', function ($scope, $window) {

        $scope.SignUp = function (){
            $window.location.href = 'accounts#/join';
        };
    }]);
