'use strict';

/**
 * Base controller for the home module.
 */
angular
    .module('Home')
    .controller('searchCtrl', ['$scope', '$http', 'userSession',
        function ($scope, $http, userSession) {

            $scope.searchModel = {};
            $scope.searchCaregiverResults = {};
            var results = [];

            var init = function () {
                $http.get('search_caregivers')
                    .then(function (response) {
                        angular.forEach(response.data, function (val, key) {
                            results.push(key);
                        });
                        $scope.searchCaregiverResults = angular.extend(response.data);
                    });
            };
            init();

            /**
             * Go back to the previous page/view.
             * @return void
             */
            $scope.previous = function () {
                $window.history.back();
            };

            $scope.find = function (model) {
                $http.post('search_refined', model)
                    .then(function (response) {
                        angular.forEach(response.data, function (val, key) {
                            results.push(key);
                        });
                        $scope.searchCaregiverResults = angular.extend(response.data);
                    });
            };

        }]);