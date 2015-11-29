var avam;
(function (avam) {
    var menu;
    (function (menu) {
        var AvamMenuItemDirective = (function () {
            function AvamMenuItemDirective() {
                this.require = '^avamMenu';
                this.scope = {
                    label: '@',
                    icon: '@',
                    route: '@'
                };
                this.templateUrl = './src/avamMenuItem.template.html';
            }
            AvamMenuItemDirective.instance = function () {
                return new AvamMenuItemDirective;
            };
            AvamMenuItemDirective.prototype.link = function (scope, elem, attributes, controller) {
                scope.isActive = function () {
                    return elem === controller.getActiveElement();
                };
                elem.on('click', function (evt) {
                    evt.stopPropagation();
                    evt.preventDefault();
                    scope.$apply(function () {
                        controller.setActiveElement(elem);
                        controller.setRoute(attributes.route);
                    });
                });
            };
            return AvamMenuItemDirective;
        })();
        angular.module("avam-menu").directive("avamMenuItem", AvamMenuItemDirective.instance);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));
//# sourceMappingURL=avamMenuItem.directive.js.map