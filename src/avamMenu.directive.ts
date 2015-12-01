module avam.menu{
	export interface IAvamMenuController {
		setActiveElement(elem: ng.IAugmentedJQuery):void;
		getActiveElement() : ng.IAugmentedJQuery;
		isVertical():boolean;
		setRoute(route: string) : void
		setGroupMenuScope(groupMenuItemScope: IGroupMenuItemScope):void;
	}
	
	interface IMenuControllerScope extends ng.IScope{
		toggleMenuOrientation():void;
		isVertical : boolean;
		groupMenuItemScope: IGroupMenuItemScope;
		allowToggle:boolean;
	}
	interface IExternalAttributes extends ng.IAttributes{
		allowToggle:boolean;
	}
	class AvamaMenuController implements IAvamMenuController{Í
		private activeElement:ng.IAugmentedJQuery;
		private route: string;
		
		static $inject =['$scope', '$rootScope'];
		constructor(private scope : IMenuControllerScope, private rootScope: ng.IRootScopeService){
			scope.isVertical =true;
			scope.toggleMenuOrientation = ():void => {
				scope.isVertical = !scope.isVertical;
				this.rootScope.$broadcast('AVAM-MENU-ORIENTATION-CHANGED',{
					isVertical : scope.isVertical
				} );
			}
		}
		
		setActiveElement(elem: ng.IAugmentedJQuery):void{
			this.activeElement=elem;
		}
		getActiveElement(): ng.IAugmentedJQuery{
			return this.activeElement;
		}
		setRoute(route: string) : void{
			this.rootScope.$broadcast('AVAM-MENU-ITEM-CHANGED', {
				route:route
			});
		}
		isVertical():boolean{
			return this.scope.isVertical;
		}
		setGroupMenuScope(groupMenuItemScope: IGroupMenuItemScope):void{
			this.scope.groupMenuItemScope=groupMenuItemScope;
		}
	}
	
	class AvamMenuDirective implements ng.IDirective{
		static instance() : ng.IDirective{
			return new AvamMenuDirective;
		}
		transclude=true;
		scope = {
			allowToggle:'@'
		};
		controller = AvamaMenuController;
		templateUrl = './src/avamMenu.template.html';
		link(scope: IMenuControllerScope,elem : ng.IAugmentedJQuery, attribs: IExternalAttributes):void {
			scope.allowToggle = attribs.allowToggle;
		}			
	}
	angular.module("avam-menu").directive("avamMenu", AvamMenuDirective.instance);
}