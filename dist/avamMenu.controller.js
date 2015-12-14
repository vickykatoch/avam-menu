var avam;
(function (avam) {
    var menu;
    (function (menu) {
        var AvamMenuController = (function () {
            function AvamMenuController(scope, rootScope) {
                var _this = this;
                this.scope = scope;
                this.rootScope = rootScope;
                this.isVertical = true;
                this.isVisible = true;
                this.allowMenuToggle = true;
                this.groupMenuItemScope = null;
                scope.$on('AVAM-MENU-VISIBILITY-CHANGED', function (evt, data) {
                    _this.isVisible = data.show;
                    _this.isVertical = data.isVertical;
                    _this.allowMenuToggle = data.allowToggle;
                });
                $(document).click(function (evt) {
                    if (_this.allowMenuToggle && _this.groupMenuItemScope && !_this.isVertical) {
                        if ($(evt.target).parent().hasClass('avam-group-menu')) {
                            return;
                        }
                        scope.$apply(function () {
                            _this.groupMenuItemScope.closeMenu();
                            evt.preventDefault();
                            evt.stopPropagation();
                        });
                    }
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
