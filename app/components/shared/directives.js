'use strict';

/**
 * Set focus on the element.
 * Example:
 *   <input type="text" hl-focus />
 */
angular
    .module('Common')
    .directive('hlFocus', function () {
        return {
            link: function (scope, element) {
                element[0].focus();
            }
        };
    });

/**
 * Attaches some data to the current scope.
 * Example:
 *   <hl-preload hl-key="foo" hl-value='{"a": "z", "b": [1, 2]}'></<hl-preload>
 *   will result in the current $scope to have a "foo" property with the
 *   given JSON value in hl-value.
 */
angular
    .module('Common')
    .directive('hlPreload', function () {
        return {
            restrict: 'E',
            link: function (scope, element, attrs) {
                scope[attrs.hlKey] = JSON.parse(attrs.hlValue);
                element.remove();
            }
        };
    });


/**
 * Selects a boolean in <select> options.
 * This is to fix an AngularJS problem:
 *     https://github.com/angular/angular.js/issues/6297
 */
angular
    .module('Common')
    .directive('hlSelectBoolean', function () {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    if (value === 'true' || value === 'false') {
                        return value === 'true';
                    }
                    return null;
                });
                ngModel.$formatters.push(function (value) {
                    if (typeof(value) === 'boolean') {
                        return value ? 'true' : 'false';
                    }
                    return '';
                });
            }
        };
    });
