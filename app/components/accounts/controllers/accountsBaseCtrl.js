'use strict';

/**
 * Base controller for the accounts module.
 */
angular
    .module('Accounts')
    .controller('accountsBaseCtrl', ['$scope', '$window', function ($scope, $window) {

        // CtrlHelper that is shared between the parent and all children.
        $scope.ctrlHelper = new HL.CtrlHelper();

        /**
         * Go back to the previous page/view.
         */
        $scope.previous = function () {
            $window.history.back();
        };

    }]);
