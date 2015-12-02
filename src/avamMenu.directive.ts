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
		allowMenuToggle:boolean;
	}
	interface IExternalAttributes extends ng.IAttributes{
		allowToggle:string;
		orientation:string;
	}
	class AvamaMenuController implements IAvamMenuController{
		private activeElement:ng.IAugmentedJQuery;
		private route: string;
		
		static $inject =['$scope', '$rootScope'];
		constructor(private scope : IMenuControllerScope, private rootScope: ng.IRootScopeService){
			scope.isVertical =true;
			$(document).click((evt: JQueryEventObject):void=>{
					if( scope.allowMenuToggle && scope.groupMenuItemScope && !scope.isVertical){
						if ($(evt.target).parent().hasClass('avam-group-menu')){
							return;
						}	
						scope.$apply(()=>{
							scope.groupMenuItemScope.closeMenu();
							evt.preventDefault();
							evt.stopPropagation();
						})
					}	
				});
			
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
			allowToggle:'@',
			orientation:'@'
		};
		controller = AvamaMenuController;
		templateUrl = 'src/avamMenu.template.html';
		link(scope: IMenuControllerScope,elem : ng.IAugmentedJQuery, attribs: IExternalAttributes):void {
			scope.allowMenuToggle = attribs.allowToggle  && attribs.allowToggle  === 'true';
			scope.isVertical = attribs.orientation && attribs.orientation === "vertical";
		}	
				
	}
	angular.module("avam-menu").directive("avamMenu", AvamMenuDirective.instance);
}