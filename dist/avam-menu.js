var avam;
(function (avam) {
    var menu;
    (function (menu) {
        angular.module("avam-menu", ["ngAnimate"]);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));

angular.module("avam-menu").run(["$templateCache", function($templateCache) {$templateCache.put("src/avamMenu.template.html","<div class=\"avam-menu-panel\" \n	ng-class=\"{\'avam-menu-panel-horizontal\' : !vm.isMenuVertical(), \'avam-menu-panel-vertical\' : vm.isMenuVertical()}\">\n	<ul class=\"avam-menu\" ng-transclude>\n	</ul>\n	<a class=\"glyphicon avam-layout-btn pull-right\" \n		ng-class=\"{\'avam-layout-btn-horizontal glyphicon-menu-left\' : !vm.isMenuVertical(), \'glyphicon-menu-up\' : vm.isMenuVertical()}\"\n		ng-show=\"vm.getAllowToggle()\"\n		ng-click=\"vm.toggleMenuOrientation()\">\n	</a>\n</div>");
$templateCache.put("src/avamMenuGroup.template.html","<li class=\"avam-selectable-item avam-group-menu\" ng-click=\"onToggleSubMenu()\"\n	ng-class=\"{\'avam-menu-item-horizontal\' : !isVertical()}\">\n	<div class=\"avam-noselect\" >\n		<i class=\"glyphicon {{icon}} avam-menu-icon\"></i>\n		{{label}}\n		<i class=\"glyphicon glyphicon-menu-left avam-menu-group-indicator\"\n			ng-class=\"{\'glyphicon-menu-down\' : isOpen}\"\n			ng-show=\"isVertical()\"\n			></i>\n	</div>\n</li>\n<div ng-show=\"isOpen\" class=\"avam-sub-menu avam-fade-in-animation\" \n	ng-class=\"{\'avam-drop-down-menu\' :  !isVertical()}\">\n	<ul ng-transclude></ul>\n</div>");
$templateCache.put("src/avamMenuItem.template.html","<li class=\"avam-selectable-item\" \n	ng-class=\"{\'avam-menu-item-horizontal\' : !isVertical()}\">\n	<div class=\"avam-noselect\">\n		<i class=\"glyphicon {{icon}} avam-menu-icon\"></i>\n		{{label}}\n	</div>\n	<i class=\"glyphicon glyphicon-triangle-left avam-menu-active-indicator\" \n		ng-if=\"isActive()\"></i>\n</li>");}]);
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
                this.templateUrl = 'src/avamMenuItem.template.html';
            }
            AvamMenuItemDirective.instance = function () {
                return new AvamMenuItemDirective;
            };
            AvamMenuItemDirective.prototype.link = function (scope, elem, attributes, controller) {
                scope.isActive = function () {
                    return elem === controller.getActiveElement() && controller.isMenuVertical();
                };
                scope.isVertical = function () {
                    return controller.isMenuVertical() || elem.parents('.avam-sub-menu').length > 0;
                };
                elem.on('click', function (evt) {
                    //evt.stopPropagation();
                    //evt.preventDefault();
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
                this.templateUrl = 'src/avamMenuGroup.template.html';
            }
            AvamMenuGroupDirective.instance = function () {
                return new AvamMenuGroupDirective;
            };
            AvamMenuGroupDirective.prototype.link = function (scope, elem, attributes, controller) {
                scope.isOpen = false;
                scope.onToggleSubMenu = function () {
                    scope.isOpen = !scope.isOpen;
                    if (!scope.isVertical() && elem.parents('.avam-sub-menu').length == 0) {
                        controller.setGroupMenuScope(scope);
                        scope.setSubMenuPosition();
                    }
                };
                scope.isVertical = function () {
                    return controller.isMenuVertical() || elem.parents('.avam-sub-menu').length > 0;
                };
                scope.closeMenu = function () {
                    scope.isOpen = false;
                };
                scope.setSubMenuPosition = function () {
                    var pos = elem.offset(), top = elem.parents('.avam-menu-panel').height();
                    $('.avam-sub-menu').css({ 'left': pos.left, 'top': top });
                };
            };
            ;
            return AvamMenuGroupDirective;
        })();
        angular.module("avam-menu").directive("avamMenuGroup", AvamMenuGroupDirective.instance);
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));

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

var avam;
(function (avam) {
    var menu;
    (function (menu) {
        var AvamMenuController = (function () {
            function AvamMenuController(scope, rootScope) {
                var _this = this;
                this.scope = scope;
                this.rootScope = rootScope;
                scope.$on('AVAM-MENU-VISIBILITY-CHANGED', function (evt, data) {
                    _this.isVisible = data.show;
                    _this.isVertical = data.isMenuVertical;
                    _this.allowMenuToggle = data.allowToggle;
                });
            }
            AvamMenuController.prototype.toggleMenuOrientation = function () {
                this.isVertical = !this.isVertical;
                this.rootScope.$broadcast('AVAM-MENU-ORIENTATION-CHANGED', {
                    isVertical: this.isVertical
                });
            };
            AvamMenuController.prototype.setActiveElement = function (elem) {
                this.activeElement = elem;
            };
            AvamMenuController.prototype.getActiveElement = function () {
                return this.activeElement;
            };
            AvamMenuController.prototype.setRoute = function (route) {
                this.rootScope.$broadcast('AVAM-MENU-ITEM-CHANGED', {
                    route: route
                });
            };
            AvamMenuController.prototype.setGroupMenuScope = function (groupMenuItemScope) {
                this.groupMenuItemScope = groupMenuItemScope;
            };
            AvamMenuController.prototype.setVisibility = function (isVisible) {
                this.isVisible = isVisible;
            };
            AvamMenuController.prototype.isMenuVisible = function () {
                return this.isVisible;
            };
            AvamMenuController.prototype.isMenuVertical = function () {
                return this.isVertical;
            };
            AvamMenuController.prototype.setAllowToggle = function (isAllowed) {
                this.allowMenuToggle = isAllowed;
            };
            AvamMenuController.prototype.getAllowToggle = function () {
                return this.allowMenuToggle;
            };
            AvamMenuController.prototype.setMenuOrientation = function (orientation) {
                this.isVertical = orientation && orientation === "vertical";
            };
            AvamMenuController.$inject = ['$scope', '$rootScope'];
            return AvamMenuController;
        })();
        menu.AvamMenuController = AvamMenuController;
    })(menu = avam.menu || (avam.menu = {}));
})(avam || (avam = {}));
