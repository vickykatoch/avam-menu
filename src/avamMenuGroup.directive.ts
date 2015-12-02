module avam.menu{
	'use strict';
	export interface IGroupMenuItemScope extends ng.IScope{
		label: string;
		icon: string;
		isOpen: boolean;
		onToggleSubMenu(): void;
		isVertical():boolean;
		closeMenu():void;
		setSubMenuPosition():void;
	}
	
	
	class AvamMenuGroupDirective implements ng.IDirective{
		static instance() : ng.IDirective{
			return new AvamMenuGroupDirective;
		}
		transclude=true;
		require = '^avamMenu';
		scope = {
			label:'@',
			icon: '@'
		};
		templateUrl = 'src/avamMenuGroup.template.html';	
		link(scope : IGroupMenuItemScope , elem : ng.IAugmentedJQuery, attributes : ng.IAttributes, 
				controller : IAvamMenuController) : void {	
					scope.isOpen = false;
					scope.onToggleSubMenu = ():void=>{
						scope.isOpen=!scope.isOpen;
						controller.setGroupMenuScope(scope);
						if (elem.parents('.avam-sub-menu').length == 0)
                    		scope.setSubMenuPosition();

					}
					scope.isVertical =():boolean=>{
						return controller.isVertical() || elem.parents('.avam-sub-menu').length > 0;
					}
					scope.closeMenu=():void=>{
						scope.isOpen=false;
					}
					scope.setSubMenuPosition = ():void=>{
						var pos = elem.offset();
                		$('.avam-sub-menu').css({ 'left': pos.left, 'top': 45 });
					}
				};	
	}
	angular.module("avam-menu").directive("avamMenuGroup", AvamMenuGroupDirective.instance);
	
}