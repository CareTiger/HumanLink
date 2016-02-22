'use strict';

/**
 * Notifications controller
 */
angular
    .module('Settings')
    .controller('notificationsCtrl', ['$scope', '$http', 'userSession',
        function ($scope, $http, userSession) {

            $scope.notificationModel = {};
            $scope.usr = userSession;
            var account_id = $scope.usr.userdata.account_id;

            var init = function () {
                $http.get('/get_settings_notifications?account_id=' + account_id)
                    .then(function (response) {
                        $scope.notificationModel = response.data;
                    })
            };
            init();

            $scope.updateNotifications = function (model) {
                //add the usr object
                model = angular.extend(model, {'account_id': account_id});
                $http.post('/post_settings_notifications', model)
                    .success(function (data, status) {
                        $scope.siteAlert.type = "success";
                        $scope.siteAlert.message = "Your settings were updated successfully.";
                    })
                    .error(function () {
                        $scope.siteAlert.type = "danger";
                        $scope.siteAlert.message = "Oops. There was a problem. Please try again.";
                    });
            };

        }]);
