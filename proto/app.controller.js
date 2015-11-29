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
            }
            ApplicationController.prototype.onRouteChanged = function () {
                var _this = this;
                this.scope.$on('ROUTE-CHANGED', function (evt, data) {
                    console.log('New Route : ' + data.route);
                    _this.route = data.route;
                });
            };
            ApplicationController.$inject = ['$scope'];
            return ApplicationController;
        })();
        angular.module("avam").controller('appController', ApplicationController);
    })(proto = avam.proto || (avam.proto = {}));
})(avam || (avam = {}));
//# sourceMappingURL=app.controller.js.map