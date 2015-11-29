module avam.menu{
	'use strict';
	interface IItemScope extends ng.IScope{
		label: string;
		icon: string;
		isOpen: boolean;
		onToggleSubMenu()(): void;
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
		templateUrl = './src/avamMenuGroup.template.html';	
		link(scope : ng.IScope , elem : ng.IAugmentedJQuery, attributes : IAttributes, 
				controller : IAvamMenuController) : void {	
					scope.isOpen = false;
					scope.onToggleSubMenu = ():void=>{
						scope.isOpen=!scope.isOpen;
					}
					
				}		
	}
	angular.module("avam-menu").directive("avamMenuGroup", AvamMenuGroupDirective.instance);
	
}