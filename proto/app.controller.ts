module avam.proto{
	'use strict';
	
	interface IApplicationController{
		onRouteChanged(): void;
		onOrientationChange(): void;
		route:string;
	}
	interface IApplicationScope extends ng.IScope{
		isMenuVertical: boolean;
	}
	
	
	class ApplicationController implements IApplicationController{
		public route:string;
		
		static $inject =['$scope'];
		constructor(private scope: IApplicationScope){
			this.route = 'Not Initialized';
			this.onRouteChanged();
			this.onOrientationChange();
			scope.isMenuVertical=false;
		}
		
		onRouteChanged(): void{
			this.scope.$on('AVAM-MENU-ITEM-CHANGED',  (evt: ng.IAngularEvent,  data:any):void=>{
				this.route=data.route;
			});
		}
		onOrientationChange(): void{
			this.scope.$on('AVAM-MENU-ORIENTATION-CHANGED',  (evt: ng.IAngularEvent,  data:any):void=>{
				this.scope.isMenuVertical=data.isVertical;
			});
		}
		
	}
	
	angular.module("avam").controller('appController', ApplicationController);
}