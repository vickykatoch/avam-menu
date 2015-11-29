var avam;
(function (avam) {
    var menu;
    (function (menu) {
        var AvamaMenuController = (function () {
            function AvamaMenuController(scope, rootScope) {
                var _this = this;
                this.scope = scope;
                this.rootScope = rootScope;
                scope.toggleMenuOrientation = function () {
                    scope.isVertical = !scope.isVertical;
                    _this.rootScope.$broadcast('AVAM-MENU-ORIENTATION-CHANGED', {
                        isVertical: scope.isVertical
                    });
                };
            }
            AvamaMenuController.prototype.setActiveElement = function (elem) {
                this.activeElement = elem;
            };
            AvamaMenuController.prototype.getActiveElement = function () {
                return this.activeElement;
            };
            AvamaMenuController.prototype.setRoute = function (route) {
                this.rootScope.$broadcast('AVAM-MENU-ITEM-CHANGED', {
                    route: route
                });
            };
            AvamaMenuController.$inject = ['$scope', '$rootScope'];
            return AvamaMenuController;
        })();
        var AvamMenuDirective = (function () {
            function AvamMenuDirective() {
                this.transclude = true;
                this.scope = {};
                this.controller = AvamaMenuController;
                this.templateUrl = './src/avamMenu.template.html';
            }
            AvamMenuDirective.instance = function () {
                return new AvamMenuDirective;
            };
            return AvamMenuDirective;
        })();
        angular.module("avam-menu").directive("avamMenu", AvamMenuDirective.instance);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));
//# sourceMappingURL=avamMenu.directive.js.map