module avam.proto{
	'use strict';
	
	interface IApplicationController{
		onRouteChanged(): void;
		onOrientationChange(): void;
		toggleMenu():void;
		route:string;
	}
	interface IApplicationScope extends ng.IScope{
		isMenuVertical: boolean;
	}
	
	
	class ApplicationController implements IApplicationController{
		public route:string;
		private show:boolean;
		static $inject =['$scope','$rootScope'];
		constructor(private scope: IApplicationScope, private rootScope : ng.IRootScopeService){
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
		toggleMenu():void{
			this.show= !this.show;
			this.rootScope.$broadcast('AVAM-MENU-VISIBILITY-CHANGED', {
				show : this.show,
				isMenuVertical: !this.scope.isMenuVertical,
				allowToggle:true
			});
		}
	}
	
	angular.module("avam").controller('appController', ApplicationController);
}