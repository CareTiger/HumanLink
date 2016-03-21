'use strict';

/**
 * Preview provider profile controller
 */
angular
    .module('Home')
    .controller('previewProviderProfileCtrl', ['$scope', '$window', '$stateParams', '$http', 'userSession',
        function ($scope, $window, $stateParams, $http, userSession) {

            var provider_id = $stateParams.caregiver_key;
            $scope.profile = {};
            $scope.usr = userSession;
            var account_id = $scope.usr.userdata.account_id;

            var init = function () {
                $http.get('/caregiver_profile?account_id=' + provider_id)
                    .then(function (response) {
                        $scope.profile = response.data;
                    });
            };
            init();

            $scope.connect = function(){
                $http({
                    url: '/post_connection_request',
                    method: "POST",
                    params: {from_id: account_id, to_id: provider_id, message: "I want to connect with you."}
                }).then(function (response) {
                    $scope.siteAlert.type = "success";
                    $scope.siteAlert.message = response.data.message;
                }, function (response) {
                    $scope.siteAlert.type = "danger";
                    $scope.siteAlert.message = ("Oops. " + response.status + " Error. Please try again.");
                });
            }
        }]);
