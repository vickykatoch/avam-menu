module avam.menu{
	interface IExternalAttributes extends ng.IAttributes{
		allowToggle:string;
		orientation:string;
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
		controller = AvamMenuController;
		controllerAs = "vm";
		templateUrl = 'src/avamMenu.template.html';
		
		link(scope: IAvamMenuScope,elem : ng.IAugmentedJQuery, attribs: IExternalAttributes):void {
			scope.vm.setAllowToggle(attribs.allowToggle  && attribs.allowToggle  === 'true');
			scope.vm.setMenuOrientation(attribs.orientation);			
		}	
				
	}
	angular.module("avam-menu").directive("avamMenu", AvamMenuDirective.instance);
}