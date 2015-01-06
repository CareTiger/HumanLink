'use strict';

/**
 * Controller for the references subpage of settings
 */
angular
    .module('Accounts')
    .controller('settingsReferencesCtrl', ['$scope', function ($scope) {
        $scope.addReference = function(name, email) {
            $scope.account.references.push({ name: name, email: email });
        };

        $scope.account = {
            references: [
                {
                    name: 'Si Robertson',
                    email: 'sroberston@gmail.com'
                },
                {
                    name: 'Wayne Hoyt',
                    email: 'whoyt@gmail.com'
                },
                {
                    name: 'Reynold Grover',
                    email: 'rgrover@gmail.com'
                }
            ]
        };
    }]);
