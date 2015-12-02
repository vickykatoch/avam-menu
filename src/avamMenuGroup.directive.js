var avam;
(function (avam) {
    var menu;
    (function (menu) {
        'use strict';
        var AvamMenuGroupDirective = (function () {
            function AvamMenuGroupDirective() {
                this.transclude = true;
                this.require = '^avamMenu';
                this.scope = {
                    label: '@',
                    icon: '@'
                };
                this.templateUrl = './src/avamMenuGroup.template.html';
            }
            AvamMenuGroupDirective.instance = function () {
                return new AvamMenuGroupDirective;
            };
            AvamMenuGroupDirective.prototype.link = function (scope, elem, attributes, controller) {
                scope.isOpen = false;
                scope.onToggleSubMenu = function () {
                    scope.isOpen = !scope.isOpen;
                    controller.setGroupMenuScope(scope);
                    if (elem.parents('.avam-sub-menu').length == 0)
                        scope.setSubMenuPosition();
                };
                scope.isVertical = function () {
                    return controller.isVertical() || elem.parents('.avam-sub-menu').length > 0;
                };
                scope.closeMenu = function () {
                    scope.isOpen = false;
                };
                scope.setSubMenuPosition = function () {
                    var pos = elem.offset();
                    $('.avam-sub-menu').css({ 'left': pos.left + 5, 'top': 45 });
                };
            };
            ;
            return AvamMenuGroupDirective;
        })();
        angular.module("avam-menu").directive("avamMenuGroup", AvamMenuGroupDirective.instance);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));
//# sourceMappingURL=avamMenuGroup.directive.js.map