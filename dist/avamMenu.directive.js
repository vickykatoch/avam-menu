var avam;
(function (avam) {
    var menu;
    (function (menu) {
        var AvamaMenuController = (function () {
            function AvamaMenuController(scope, rootScope) {
                var _this = this;
                this.scope = scope;
                this.rootScope = rootScope;
                scope.isVertical = true;
                $(document).click(function (evt) {
                    if (scope.allowMenuToggle && scope.groupMenuItemScope && !scope.isVertical) {
                        if ($(evt.target).parent().hasClass('avam-group-menu')) {
                            return;
                        }
                        scope.$apply(function () {
                            scope.groupMenuItemScope.closeMenu();
                            evt.preventDefault();
                            evt.stopPropagation();
                        });
                    }
                });
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
            AvamaMenuController.prototype.isVertical = function () {
                return this.scope.isVertical;
            };
            AvamaMenuController.prototype.setGroupMenuScope = function (groupMenuItemScope) {
                this.scope.groupMenuItemScope = groupMenuItemScope;
            };
            AvamaMenuController.$inject = ['$scope', '$rootScope'];
            return AvamaMenuController;
        })();
        var AvamMenuDirective = (function () {
            function AvamMenuDirective() {
                this.transclude = true;
                this.scope = {
                    allowToggle: '@',
                    orientation: '@'
                };
                this.controller = AvamaMenuController;
                this.templateUrl = 'src/avamMenu.template.html';
            }
            AvamMenuDirective.instance = function () {
                return new AvamMenuDirective;
            };
            AvamMenuDirective.prototype.link = function (scope, elem, attribs) {
                scope.allowMenuToggle = attribs.allowToggle && attribs.allowToggle === 'true';
                scope.isVertical = attribs.orientation && attribs.orientation === "vertical";
            };
            return AvamMenuDirective;
        })();
        angular.module("avam-menu").directive("avamMenu", AvamMenuDirective.instance);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));
