var avam;
(function (avam) {
    var menu;
    (function (menu) {
        'use strict';
        var AvamGroupMenuDirective = (function () {
            function AvamGroupMenuDirective() {
                this.transclude = true;
                this.require = '^avamMenu';
                this.scope = {
                    label: '@',
                    icon: '@'
                };
                this.templateUrl = './src/avamGroupMenu.template.html';
            }
            AvamGroupMenuDirective.instance = function () {
                return new AvamGroupMenuDirective;
            };
            AvamGroupMenuDirective.prototype.link = function (scope, elem, attributes, controller) {
            };
            return AvamGroupMenuDirective;
        })();
        angular.module("avam-menu").directive("avamGroupMenu", AvamGroupMenuDirective.instance);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));
//# sourceMappingURL=avamGroupMenu.directive.js.map