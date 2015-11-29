var avam;
(function (avam) {
    var menu;
    (function (menu) {
        var AvamaMenuController = (function () {
            function AvamaMenuController($scope, rootScope) {
                this.$scope = $scope;
                this.rootScope = rootScope;
            }
            AvamaMenuController.prototype.setActiveElement = function (elem) {
                this.activeElement = elem;
            };
            AvamaMenuController.prototype.setRoute = function (route) {
                this.rootScope.$broadcast('ROUTE-CHANGED', {
                    route: route
                });
            };
            AvamaMenuController.$inject = ['$scope', '$rootScope'];
            return AvamaMenuController;
        })();
        var avamMenuDirective = (function () {
            function avamMenuDirective() {
                this.transclude = true;
                this.scope = {};
                this.controller = AvamaMenuController;
                this.templateUrl = './src/avamMenu.template.html';
            }
            avamMenuDirective.instance = function () {
                return new avamMenuDirective;
            };
            return avamMenuDirective;
        })();
        angular.module("avam-menu").directive("avamMenu", avamMenuDirective.instance);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));
//# sourceMappingURL=avamMenu.directive.js.map