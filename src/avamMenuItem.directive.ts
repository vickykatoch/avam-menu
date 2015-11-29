module avam.menu{
	
	
	
	// class avamMenuItemLink implements ng.IDirectiveLinkFn{
		
	// 	// scope: IScope,
	// 	// instanceElement: IAugmentedJQuery,
	// 	// instanceAttributes: IAttributes,
	// 	// controller: {},
	// 	// transclude: ITranscludeFunction
	// }
	
	// interface IAvamMenuController {
	// 	toggleVisibility():void;
	// }
	// class AvamMenuController implements IAvamMenuController{
	// 	static $inject =['$scope'];
	// 	constructor(private $scope: ng.IScope){
			
	// 	}
	// 	toggleVisibility():void {
			
	// 	}
	// }
	interface IAttributes extends ng.IAttributes{
		label : string;
		icon: string;
		route:string;
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
		templateUrl = './src/avamMenuItem.template.html';	
		link(scope : ng.IScope, elem : ng.IAugmentedJQuery, attributes : IAttributes, 
				controller : IAvamMenuController) : void {
			elem.on('click',(evt:UIEvent):void=>{
				evt.stopPropagation();
				evt.preventDefault();
				controller.setActiveElement(elem);
				controller.setRoute(attributes.route);
			});
		}
		
	}
	angular.module("avam-menu").directive("avamMenuItem", AvamMenuItemDirective.instance);
}	