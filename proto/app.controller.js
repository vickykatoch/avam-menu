var avam;
(function (avam) {
    var proto;
    (function (proto) {
        'use strict';
        var ApplicationController = (function () {
            function ApplicationController(scope) {
                this.scope = scope;
                this.route = 'Not Initialized';
                this.onRouteChanged();
                this.onOrientationChange();
                scope.isMenuVertical = false;
            }
            ApplicationController.prototype.onRouteChanged = function () {
                var _this = this;
                this.scope.$on('AVAM-MENU-ITEM-CHANGED', function (evt, data) {
                    _this.route = data.route;
                });
            };
            ApplicationController.prototype.onOrientationChange = function () {
                var _this = this;
                this.scope.$on('AVAM-MENU-ORIENTATION-CHANGED', function (evt, data) {
                    _this.scope.isMenuVertical = data.isVertical;
                });
            };
            ApplicationController.$inject = ['$scope'];
            return ApplicationController;
        })();
        angular.module("avam").controller('appController', ApplicationController);
    })(proto = avam.proto || (avam.proto = {}));
})(avam || (avam = {}));
//# sourceMappingURL=app.controller.js.map