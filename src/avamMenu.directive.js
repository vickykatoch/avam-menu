var avam;
(function (avam) {
    var menu;
    (function (menu) {
        var AvamMenuDirective = (function () {
            function AvamMenuDirective() {
                this.transclude = true;
                this.scope = {
                    allowToggle: '@',
                    orientation: '@'
                };
                this.controller = menu.AvamMenuController;
                this.controllerAs = "vm";
                this.templateUrl = 'src/avamMenu.template.html';
            }
            AvamMenuDirective.instance = function () {
                return new AvamMenuDirective;
            };
            AvamMenuDirective.prototype.link = function (scope, elem, attribs) {
                scope.vm.setAllowToggle(attribs.allowToggle && attribs.allowToggle === 'true');
                scope.vm.setMenuOrientation(attribs.orientation);
            };
            return AvamMenuDirective;
        })();
        angular.module("avam-menu").directive("avamMenu", AvamMenuDirective.instance);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));
//# sourceMappingURL=avamMenu.directive.js.map