module avam.menu{
	
	interface IAttributes extends ng.IAttributes{
		label : string;
		icon: string;
		route:string;
	}
	interface IItemScope extends ng.IScope{
		isActive(): boolean;
		isVertical():boolean;
	}
	
	class AvamMenuItemDirective implements ng.IDirective{
		static instance() : ng.IDirective{
			return new AvamMenuItemDirective;
		}
		require = '^avamMenu';
		scope = {
			label:'@',
			icon:'@',
			route:'@'
		};
		templateUrl = 'src/avamMenuItem.template.html';	
		link(scope : IItemScope, elem : ng.IAugmentedJQuery, attributes : IAttributes, 
				controller : IAvamMenuController) : void {		
			
			scope.isActive= ():boolean=>{
				return elem === controller.getActiveElement() && controller.isVertical();
			}
			scope.isVertical =():boolean=>{
				return controller.isVertical() || elem.parents('.avam-sub-menu').length > 0;
			}
			elem.on('click',(evt:UIEvent):void=>{
				//evt.stopPropagation();
				//evt.preventDefault();
				scope.$apply(():void=>{
					controller.setActiveElement(elem);
					controller.setRoute(attributes.route);
				});
			});
		}		
	}
	angular.module("avam-menu").directive("avamMenuItem", AvamMenuItemDirective.instance);
}	