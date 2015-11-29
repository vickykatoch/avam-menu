module avam.proto{
	'use strict';
	
	interface IApplicationController{
		route:string;
		onRouteChanged(): void;
	}
	
	class ApplicationController implements IApplicationController{
		
		public route:string;
		
		static $inject =['$scope'];
		constructor(private scope: ng.IScope){
			this.route = 'Not Initialized';
			this.onRouteChanged();
		}
		
		onRouteChanged(): void{
			this.scope.$on('ROUTE-CHANGED', (evt: ng.IAngularEvent,  data:any):void=>{
				console.log('New Route : ' + data.route);
				this.route=data.route;
			});
		}
	}
	
	angular.module("avam").controller('appController', ApplicationController);
}