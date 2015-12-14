module avam.menu{
	export interface IAvamMenuScope extends ng.IScope{
		vm: IAvamMenuController;		
	}
	export interface IAvamMenuController {
		toggleMenuOrientation():void;
		setActiveElement(elem: ng.IAugmentedJQuery):void;
		getActiveElement() : ng.IAugmentedJQuery;	
		setAllowToggle(isAllowed:boolean):void;
		getAllowToggle():boolean;		
		setRoute(route: string) : void;
		setGroupMenuScope(groupMenuItemScope: IGroupMenuItemScope):void;
		setVisibility(isVisible:boolean):void;
		isMenuVisible():boolean;
		isMenuVertical():boolean;
		setMenuOrientation(orientation:string):void;
	}
	
	
	export class AvamMenuController implements IAvamMenuController{
		private activeElement:ng.IAugmentedJQuery;
		private isVertical:boolean;
		private isVisible:boolean;
		private allowMenuToggle:boolean;
		private groupMenuItemScope: IGroupMenuItemScope;	
		
		
		static $inject =['$scope', '$rootScope'];
		constructor(private scope : IAvamMenuScope, private rootScope: ng.IRootScopeService){
			scope.$on('AVAM-MENU-VISIBILITY-CHANGED', (evt: ng.IAngularEvent,  data:any):void=>{
				this.isVisible = data.show;
				this.isVertical = data.isMenuVertical;
				this.allowMenuToggle = data.allowToggle;
			});
			
			$(document).click((evt: JQueryEventObject):void=>{
					if( this.allowMenuToggle && this.groupMenuItemScope && !this.isVertical){
						if ($(evt.target).parent().hasClass('avam-group-menu')){
							return;
						}	
						scope.$apply(()=>{
							this.groupMenuItemScope.closeMenu();
							evt.preventDefault();
							evt.stopPropagation();
						})
					}	
				});
			
		}
		
		toggleMenuOrientation():void {
			this.isVertical=!this.isVertical;			
			this.rootScope.$broadcast('AVAM-MENU-ORIENTATION-CHANGED',{
					isVertical : this.isVertical
				} );
		}
		setActiveElement(elem: ng.IAugmentedJQuery):void{
			this.activeElement=elem;
		}
		getActiveElement() : ng.IAugmentedJQuery{
			return this.activeElement;
		}
		setRoute(route: string) : void{
			this.rootScope.$broadcast('AVAM-MENU-ITEM-CHANGED', {
				route:route
			});
		}
		setGroupMenuScope(groupMenuItemScope: IGroupMenuItemScope):void{
			this.groupMenuItemScope=groupMenuItemScope;
		}
		setVisibility(isVisible:boolean):void{
			this.isVisible=isVisible;
		}
		isMenuVisible():boolean{
			return this.isVisible;
		}
		isMenuVertical():boolean{
			return this.isVertical;
		}
		setAllowToggle(isAllowed:boolean):void{
			this.allowMenuToggle=isAllowed;
		}
		getAllowToggle():boolean{
			return this.allowMenuToggle;
		}
		setMenuOrientation(orientation:string):void{
			this.isVertical = orientation && orientation === "vertical";
		}
	}
	
	
}