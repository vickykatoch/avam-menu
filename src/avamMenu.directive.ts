module avam.menu{
	export interface IAvamMenuController {
		setActiveElement(elem: ng.IAugmentedJQuery):void;
		setRoute(route: string) : void;
	}
	class AvamaMenuController implements IAvamMenuController{Í
		private activeElement:ng.IAugmentedJQuery;
		private route: string;
		
		static $inject =['$scope', '$rootScope'];
		constructor(private $scope : ng.IScope, private rootScope: ng.IRootScopeService){
		}
		
		setActiveElement(elem: ng.IAugmentedJQuery):void{
			this.activeElement=elem;
		}
		setRoute(route: string) : void{
			this.rootScope.$broadcast('ROUTE-CHANGED', {
				route:route
			});
		}
	}
	
	class avamMenuDirective implements ng.IDirective{
		static instance() : ng.IDirective{
			return new avamMenuDirective;
		}
		transclude=true;
		scope = {
			
		};
		controller = AvamaMenuController;
		templateUrl = './src/avamMenu.template.html';			
	}
	angular.module("avam-menu").directive("avamMenu", avamMenuDirective.instance);
}