import{D as qe$1,a as Le$1,c as Te$1,f as _e,g as be,i as Kn,l as Vi,m as _s,o as Oo,p as _n,r as Ie,s as Pt$1,u as Ye,x as ge,y as ee}from"./chunk-DTZUcqF9.js";import{E as te,_ as Ue$1,r as Bn}from"./chunk-B4gmLZ3I.js";import{$n as so,$t as fn,A as Ie$1,At as Zg,B as LC,Bn as qp,Bt as be$1,Cn as m,Ct as Ya,Dt as Z,Fn as pb,Ft as ac,G as Nb,Gn as ra$1,Gt as cs,Hn as qv,I as Kg,Jn as s3,Kn as rn,L as Kr,Mn as on,Mt as Zp,N as Jo,On as ni,Pn as pC,Qn as sf,Rn as qg,S as Fp,Sn as lv,T as Gv,Tn as md,U as Mb,Vn as qr,Vt as cC,Wt as ch,X as Or,Xn as sa$1,Y as Oe$1,Yt as ei,Zt as et,_ as Bu,_n as kx,ar as ti,at as Rt,ct as St,d as Ae$1,dn as j,ft as Vg,g as Br,gn as kp,gr as yd,hn as k,ht as Wg,in as ge$1,ir as tf,lr as uC,mr as vb,nn as gC,pr as v,pt as Vr,rt as R,sr as tt,st as Sd,tt as Qn,u as $g,ut as V,v as Bz,vr as zg,wn as mC,wt as Yg,x as F,xr as zv,xt as Xv,y as Dx,z as L3,zn as qo,zt as bd}from"./main-QKKNVAGI.js";var qt=Math.pow(2,31)-1;var se=class{_overlayRef;instance;containerInstance;_afterDismissed=new V;_afterOpened=new V;_onAction=new V;_durationTimeoutId;_dismissedByAction=!1;constructor(r,e){this._overlayRef=e,this.containerInstance=r,r._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(r){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(r,qt))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}};var At=new v(`MatSnackBarData`);var Y=class{politeness=`polite`;announcementMessage=``;viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition=`center`;verticalPosition=`bottom`};var Qt=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`matSnackBarLabel`,``]],hostAttrs:[1,`mat-mdc-snack-bar-label`,`mdc-snackbar__label`]})}return n})();var Wt=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`matSnackBarActions`,``]],hostAttrs:[1,`mat-mdc-snack-bar-actions`,`mdc-snackbar__actions`]})}return n})();var Xt=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`matSnackBarAction`,``]],hostAttrs:[1,`mat-mdc-snack-bar-action`,`mdc-snackbar__action`]})}return n})();var $t=(()=>{class n{snackBarRef=m(se);data=m(At);action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){function e(t,a){if(t&1){let i=cC();ra$1(0,`div`,1)(1,`button`,2),Zg(`click`,function(){kp(i);let c=uC();return Fp(c.action())}),LC(2),md()()}if(t&2){let i=uC();qo(2),yd(` `,i.data.action,` `)}}return et({type:n,selectors:[[`simple-snack-bar`]],hostAttrs:[1,`mat-mdc-simple-snack-bar`],exportAs:[`matSnackBar`],decls:3,vars:2,consts:[[`matSnackBarLabel`,``],[`matSnackBarActions`,``],[`matButton`,``,`matSnackBarAction`,``,3,`click`]],template:function(a,i){a&1&&(ra$1(0,`div`,0),LC(1),md(),ei(2,e,3,1,`div`,1)),a&2&&(qo(),yd(` `,i.data.message,`
`),qo(),ti(i.hasAction?2:-1))},dependencies:[L3,Qt,Wt,Xt],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2})})()}return n})();var Ee=`_mat-snack-bar-enter`;var Te=`_mat-snack-bar-exit`;var Gt=(()=>{class n extends Ie{_ngZone=m(j);_elementRef=m(be$1);_changeDetectorRef=m(Mb);_platform=m(Ae$1);_animationsDisabled=qr();snackBarConfig=m(Y);_document=m(k);_trackedModals=/* @__PURE__ */ new Set;_enterFallback;_exitFallback;_injector=m(Z);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new V;_onExit=new V;_onEnter=new V;_animationState=`void`;_live;_label;_role;_liveElementId=m(sf).getId(`mat-snack-bar-container-live-`);constructor(){super();let e=this.snackBarConfig;e.politeness===`assertive`&&!e.announcementMessage?this._live=`assertive`:e.politeness===`off`?this._live=`off`:this._live=`polite`,this._platform.FIREFOX&&(this._live===`polite`&&(this._role=`status`),this._live===`assertive`&&(this._role=`alert`))}attachComponentPortal(e){this._assertNotAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),t}attachTemplatePortal(e){this._assertNotAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),t}attachDomPortal=e=>{this._assertNotAttached();let t=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),t};onAnimationEnd(e){e===Te?this._completeExit():e===Ee&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState=`visible`,this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?Bu(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Ee)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-snack-bar-fallback-visible`),this.onAnimationEnd(Ee)},200)))}exit(){return this._destroyed?Kr(void 0):(this._ngZone.run(()=>{this._animationState=`hidden`,this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute(`mat-exit`,``),clearTimeout(this._announceTimeoutId),this._animationsDisabled?Bu(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Te)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(Te),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,t=this.snackBarConfig.panelClass;t&&(Array.isArray(t)?t.forEach(o=>e.classList.add(o)):e.classList.add(t)),this._exposeToModals();let a=this._label.nativeElement,i=`mdc-snackbar__label`;a.classList.toggle(i,!a.querySelector(`.${i}`))}_exposeToModals(){let e=this._liveElementId,t=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let a=0;a<t.length;a++){let i=t[a],o=i.getAttribute(`aria-owns`);this._trackedModals.add(i),o?o.indexOf(e)===-1&&i.setAttribute(`aria-owns`,o+` `+e):i.setAttribute(`aria-owns`,e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let t=e.getAttribute(`aria-owns`);if(t){let a=t.replace(this._liveElementId,``).trim();a.length>0?e.setAttribute(`aria-owns`,a):e.removeAttribute(`aria-owns`)}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,t=e.querySelector(`[aria-hidden]`),a=e.querySelector(`[aria-live]`);if(t&&a){let i=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(i=document.activeElement),t.removeAttribute(`aria-hidden`),a.appendChild(t),i?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){let e=[`label`];function t(a,i){}return et({type:n,selectors:[[`mat-snack-bar-container`]],viewQuery:function(i,o){if(i&1&&Kg(Ye,7)(e,7),i&2){let c;pC(c=mC())&&(o._portalOutlet=c.first),pC(c=mC())&&(o._label=c.first)}},hostAttrs:[1,`mdc-snackbar`,`mat-mdc-snack-bar-container`],hostVars:6,hostBindings:function(i,o){i&1&&Zg(`animationend`,function(s){return o.onAnimationEnd(s.animationName)})(`animationcancel`,function(s){return o.onAnimationEnd(s.animationName)}),i&2&&rn(`mat-snack-bar-container-enter`,o._animationState===`visible`)(`mat-snack-bar-container-exit`,o._animationState===`hidden`)(`mat-snack-bar-container-animations-enabled`,!o._animationsDisabled)},features:[Vr],decls:6,vars:3,consts:[[`label`,``],[1,`mdc-snackbar__surface`,`mat-mdc-snackbar-surface`],[1,`mat-mdc-snack-bar-label`],[`aria-hidden`,`true`],[`cdkPortalOutlet`,``]],template:function(i,o){i&1&&(ra$1(0,`div`,1)(1,`div`,2,0)(3,`div`,3),Vg(4,t,0,0,`ng-template`,4),md(),zg(5,`div`),md()()),i&2&&(qo(5),Jo(`aria-live`,o._live)(`role`,o._role)(`id`,o._liveElementId))},dependencies:[Ye],styles:[`@keyframes _mat-snack-bar-enter {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
@keyframes _mat-snack-bar-exit {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.mat-mdc-snack-bar-container {
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  margin: 8px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snack-bar-container {
  width: 100vw;
}

.mat-snack-bar-container-animations-enabled {
  opacity: 0;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-fallback-visible {
  opacity: 1;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-enter {
  animation: _mat-snack-bar-enter 150ms cubic-bezier(0, 0, 0.2, 1) forwards;
}
.mat-snack-bar-container-animations-enabled.mat-snack-bar-container-exit {
  animation: _mat-snack-bar-exit 75ms cubic-bezier(0.4, 0, 1, 1) forwards;
}

.mat-mdc-snackbar-surface {
  box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  padding-left: 0;
  padding-right: 8px;
}
[dir=rtl] .mat-mdc-snackbar-surface {
  padding-right: 0;
  padding-left: 8px;
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  min-width: 344px;
  max-width: 672px;
}
.mat-mdc-snack-bar-handset .mat-mdc-snackbar-surface {
  width: 100%;
  min-width: 0;
}
@media (forced-colors: active) {
  .mat-mdc-snackbar-surface {
    outline: solid 1px;
  }
}
.mat-mdc-snack-bar-container .mat-mdc-snackbar-surface {
  color: var(--%NS%mat-snack-bar-supporting-text-color, var(--%NS%mat-sys-inverse-on-surface));
  border-radius: var(--%NS%mat-snack-bar-container-shape, var(--%NS%mat-sys-corner-extra-small));
  background-color: var(--%NS%mat-snack-bar-container-color, var(--%NS%mat-sys-inverse-surface));
}

.mdc-snackbar__label {
  width: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  margin: 0;
  padding: 14px 8px 14px 16px;
}
[dir=rtl] .mdc-snackbar__label {
  padding-left: 8px;
  padding-right: 16px;
}
.mat-mdc-snack-bar-container .mdc-snackbar__label {
  font-family: var(--%NS%mat-snack-bar-supporting-text-font, var(--%NS%mat-sys-body-medium-font));
  font-size: var(--%NS%mat-snack-bar-supporting-text-size, var(--%NS%mat-sys-body-medium-size));
  font-weight: var(--%NS%mat-snack-bar-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  line-height: var(--%NS%mat-snack-bar-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
}

.mat-mdc-snack-bar-actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
}

.mat-mdc-snack-bar-handset,
.mat-mdc-snack-bar-container,
.mat-mdc-snack-bar-label {
  flex: 1 1 auto;
}

.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled).mat-unthemed {
  color: var(--%NS%mat-snack-bar-button-color, var(--%NS%mat-sys-inverse-primary));
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) {
  --%NS%mat-button-text-state-layer-color: currentColor;
  --%NS%mat-button-text-ripple-color: currentColor;
}
.mat-mdc-snack-bar-container .mat-mdc-button.mat-mdc-snack-bar-action:not(:disabled) .mat-ripple-element {
  opacity: 0.1;
}
`],encapsulation:2,changeDetection:1})})()}return n})();var Kt=new v(`mat-snack-bar-default-options`,{providedIn:`root`,factory:()=>new Y});var Cn=(()=>{class n{_live=m(Dx);_injector=m(Z);_breakpointObserver=m(tf);_parentSnackBar=m(n,{optional:!0,skipSelf:!0});_defaultConfig=m(Kt);_animationsDisabled=qr();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=$t;snackBarContainerComponent=Gt;handsetCssClass=`mat-mdc-snack-bar-handset`;get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}openFromComponent(e,t){return this._attach(e,t)}openFromTemplate(e,t){return this._attach(e,t)}open(e,t=``,a){let i=R(R({},this._defaultConfig),a);return i.data={message:e,action:t},i.announcementMessage===e&&(i.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,i)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,t){let a=t&&t.viewContainerRef&&t.viewContainerRef.injector,i=Z.create({parent:a||this._injector,providers:[{provide:Y,useValue:t}]}),o=new Te$1(this.snackBarContainerComponent,t.viewContainerRef,i),c=e.attach(o);return c.instance.snackBarConfig=t,c.instance}_attach(e,t){let a=R(R(R({},new Y),this._defaultConfig),t),i=this._createOverlay(a),o=this._attachSnackBarContainer(i,a),c=new se(o,i);if(e instanceof Or){let s=new _e(e,null,{$implicit:a.data,snackBarRef:c});c.instance=o.attachTemplatePortal(s)}else{let s=this._createInjector(a,c),d=new Te$1(e,void 0,s);c.instance=o.attachComponentPortal(d).instance}return this._breakpointObserver.observe(Bz.HandsetPortrait).pipe(so(i.detachments())).subscribe(s=>{i.overlayElement.classList.toggle(this.handsetCssClass,s.matches)}),a.announcementMessage&&o._onAnnounce.subscribe(()=>{this._live.announce(a.announcementMessage,a.politeness)}),this._animateSnackBar(c,a),this._openedSnackBarRef=c,this._openedSnackBarRef}_animateSnackBar(e,t){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),t.announcementMessage&&this._live.clear()}),t.duration&&t.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(t.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let t=new be;t.direction=e.direction;let a=Le$1(this._injector),i=e.direction===`rtl`,o=e.horizontalPosition===`left`||e.horizontalPosition===`start`&&!i||e.horizontalPosition===`end`&&i,c=!o&&e.horizontalPosition!==`center`;return o?a.left(`0`):c?a.right(`0`):a.centerHorizontally(),e.verticalPosition===`top`?a.top(`0`):a.bottom(`0`),t.positionStrategy=a,t.disableAnimations=this._animationsDisabled,qe$1(this._injector,t)}_createInjector(e,t){let a=e&&e.viewContainerRef&&e.viewContainerRef.injector;return Z.create({parent:a||this._injector,providers:[{provide:se,useValue:t},{provide:At,useValue:e.data}]})}static ɵfac=function(t){return new(t||n)};static ɵprov=F({token:n,factory:n.ɵfac})}return n})();var I=new v(`CDK_TABLE`);var we=(()=>{class n{template=m(Or);static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`cdkCellDef`,``]]})}return n})();var Ce=(()=>{class n{template=m(Or);static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`cdkHeaderCellDef`,``]]})}return n})();var Lt=(()=>{class n{template=m(Or);static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`cdkFooterCellDef`,``]]})}return n})();var J=(()=>{class n{_table=m(I,{optional:!0});_hasStickyChanged=!1;get name(){return this._name}set name(e){this._setNameInput(e)}_name;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;get stickyEnd(){return this._stickyEnd}set stickyEnd(e){e!==this._stickyEnd&&(this._stickyEnd=e,this._hasStickyChanged=!0)}_stickyEnd=!1;cell;headerCell;footerCell;cssClassFriendlyName;_columnCssClassName;hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(e){e&&(this._name=e,this.cssClassFriendlyName=e.replace(/[^a-z0-9_-]/gi,`-`),this._updateColumnCssClassName())}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`cdkColumnDef`,``]],contentQueries:function(t,a,i){if(t&1&&Yg(i,we,5)(i,Ce,5)(i,Lt,5),t&2){let o;pC(o=mC())&&(a.cell=o.first),pC(o=mC())&&(a.headerCell=o.first),pC(o=mC())&&(a.footerCell=o.first)}},inputs:{name:[0,`cdkColumnDef`,`name`],sticky:[2,`sticky`,`sticky`,on],stickyEnd:[2,`stickyEnd`,`stickyEnd`,on]}})}return n})();var ve=class{constructor(r,e){e.nativeElement.classList.add(...r._columnCssClassName)}};var Ht=(()=>{class n extends ve{constructor(){super(m(J),m(be$1))}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[`cdk-header-cell`],[`th`,`cdk-header-cell`,``]],hostAttrs:[`role`,`columnheader`,1,`cdk-header-cell`],features:[Vr]})}return n})();var jt=(()=>{class n extends ve{constructor(){let e=m(J),t=m(be$1);super(e,t);let a=e._table?._getCellRole();a&&t.nativeElement.setAttribute(`role`,a)}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[`cdk-cell`],[`td`,`cdk-cell`,``]],hostAttrs:[1,`cdk-cell`],features:[Vr]})}return n})();var Ae=(()=>{class n{template=m(Or);_differs=m(Nb);columns;_columnsDiffer;ngOnChanges(e){if(!this._columnsDiffer){let t=e.columns&&e.columns.currentValue||[];this._columnsDiffer=this._differs.find(t).create(),this._columnsDiffer.diff(t)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(e){return this instanceof de?e.headerCell.template:this instanceof ze?e.footerCell.template:e.cell.template}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,features:[sa$1]})}return n})();var de=(()=>{class n extends Ae{_table=m(I,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[``,`cdkHeaderRowDef`,``]],inputs:{columns:[0,`cdkHeaderRowDef`,`columns`],sticky:[2,`cdkHeaderRowDefSticky`,`sticky`,on]},features:[Vr,sa$1]})}return n})();var ze=(()=>{class n extends Ae{_table=m(I,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[``,`cdkFooterRowDef`,``]],inputs:{columns:[0,`cdkFooterRowDef`,`columns`],sticky:[2,`cdkFooterRowDefSticky`,`sticky`,on]},features:[Vr,sa$1]})}return n})();var De=(()=>{class n extends Ae{_table=m(I,{optional:!0});when;static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[``,`cdkRowDef`,``]],inputs:{columns:[0,`cdkRowDefColumns`,`columns`],when:[0,`cdkRowDefWhen`,`when`]},features:[Vr]})}return n})();var Q=(()=>{class n{_viewContainer=m(Br);cells;context;static mostRecentCellOutlet=null;constructor(){n.mostRecentCellOutlet=this}ngOnDestroy(){n.mostRecentCellOutlet===this&&(n.mostRecentCellOutlet=null)}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`cdkCellOutlet`,``]]})}return n})();var Be=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=et({type:n,selectors:[[`cdk-header-row`],[`tr`,`cdk-header-row`,``]],hostAttrs:[`role`,`row`,1,`cdk-header-row`],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,a){t&1&&Wg(0,0)},dependencies:[Q],encapsulation:2,changeDetection:1})}return n})();var Pe=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=et({type:n,selectors:[[`cdk-row`],[`tr`,`cdk-row`,``]],hostAttrs:[`role`,`row`,1,`cdk-row`],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,a){t&1&&Wg(0,0)},dependencies:[Q],encapsulation:2,changeDetection:1})}return n})();var Vt=(()=>{class n{templateRef=m(Or);_contentClassNames=[`cdk-no-data-row`,`cdk-row`];_cellClassNames=[`cdk-cell`,`cdk-no-data-cell`];_cellSelector=`td, cdk-cell, [cdk-cell], .cdk-cell`;static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[`ng-template`,`cdkNoDataRow`,``]]})}return n})();var zt=[`top`,`bottom`,`left`,`right`];var Oe=class{_isNativeHtmlTable;_stickCellCss;_isBrowser;_needsPositionStickyOnElement;direction;_positionListener;_tableInjector;_elemSizeCache=/* @__PURE__ */ new WeakMap;_resizeObserver=globalThis?.ResizeObserver?new globalThis.ResizeObserver(r=>this._updateCachedSizes(r)):null;_updatedStickyColumnsParamsToReplay=[];_stickyColumnsReplayTimeout=null;_cachedCellWidths=[];_borderCellCss;_destroyed=!1;constructor(r,e,t=!0,a=!0,i,o,c){this._isNativeHtmlTable=r,this._stickCellCss=e,this._isBrowser=t,this._needsPositionStickyOnElement=a,this.direction=i,this._positionListener=o,this._tableInjector=c,this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(r,e){(e.includes(`left`)||e.includes(`right`))&&this._removeFromStickyColumnReplayQueue(r);let t=[];for(let a of r)a.nodeType===a.ELEMENT_NODE&&t.push(a,...Array.from(a.children));Bu({write:()=>{for(let a of t)this._removeStickyStyle(a,e)}},{injector:this._tableInjector})}updateStickyColumns(r,e,t,a=!0,i=!0){if(!r.length||!this._isBrowser||!(e.some(T=>T)||t.some(T=>T))){this._positionListener?.stickyColumnsUpdated({sizes:[]}),this._positionListener?.stickyEndColumnsUpdated({sizes:[]});return}let o=r[0],c=o.children.length,s=this.direction===`rtl`,d=s?`right`:`left`,h=s?`left`:`right`,u=e.lastIndexOf(!0),_=t.indexOf(!0),y,We,Xe;i&&this._updateStickyColumnReplayQueue({rows:[...r],stickyStartStates:[...e],stickyEndStates:[...t]}),Bu({earlyRead:()=>{y=this._getCellWidths(o,a),We=this._getStickyStartColumnPositions(y,e),Xe=this._getStickyEndColumnPositions(y,t)},write:()=>{for(let T of r)for(let R=0;R<c;R++){let $e=T.children[R];e[R]&&this._addStickyStyle($e,d,We[R],R===u),t[R]&&this._addStickyStyle($e,h,Xe[R],R===_)}this._positionListener&&y.some(T=>!!T)&&(this._positionListener.stickyColumnsUpdated({sizes:u===-1?[]:y.slice(0,u+1).map((T,R)=>e[R]?T:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:_===-1?[]:y.slice(_).map((T,R)=>t[R+_]?T:null).reverse()}))}},{injector:this._tableInjector})}stickRows(r,e,t){if(!this._isBrowser)return;let a=t===`bottom`?r.slice().reverse():r,i=t===`bottom`?e.slice().reverse():e,o=[],c=[],s=[];Bu({earlyRead:()=>{for(let d=0,h=0;d<a.length;d++){if(!i[d])continue;o[d]=h;let u=a[d];s[d]=this._isNativeHtmlTable?Array.from(u.children):[u];let _=this._retrieveElementSize(u).height;h+=_,c[d]=_}},write:()=>{let d=i.lastIndexOf(!0);for(let h=0;h<a.length;h++){if(!i[h])continue;let u=o[h],_=h===d;for(let y of s[h])this._addStickyStyle(y,t,u,_)}t===`top`?this._positionListener?.stickyHeaderRowsUpdated({sizes:c,offsets:o,elements:s}):this._positionListener?.stickyFooterRowsUpdated({sizes:c,offsets:o,elements:s})}},{injector:this._tableInjector})}updateStickyFooterContainer(r,e){this._isNativeHtmlTable&&Bu({write:()=>{let t=r.querySelector(`tfoot`);t&&(e.some(a=>!a)?this._removeStickyStyle(t,[`bottom`]):this._addStickyStyle(t,`bottom`,0,!1))}},{injector:this._tableInjector})}destroy(){this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._resizeObserver?.disconnect(),this._destroyed=!0}_removeStickyStyle(r,e){if(!r.classList.contains(this._stickCellCss))return;for(let a of e)r.style[a]=``,r.classList.remove(this._borderCellCss[a]);zt.some(a=>e.indexOf(a)===-1&&r.style[a])?r.style.zIndex=this._getCalculatedZIndex(r):(r.style.zIndex=``,this._needsPositionStickyOnElement&&(r.style.position=``),r.classList.remove(this._stickCellCss))}_addStickyStyle(r,e,t,a){r.classList.add(this._stickCellCss),a&&r.classList.add(this._borderCellCss[e]),r.style[e]=`${t}px`,r.style.zIndex=this._getCalculatedZIndex(r),this._needsPositionStickyOnElement&&(r.style.cssText+=`position: -webkit-sticky; position: sticky; `)}_getCalculatedZIndex(r){let e={top:100,bottom:10,left:1,right:1},t=0;for(let a of zt)r.style[a]&&(t+=e[a]);return t?`${t}`:``}_getCellWidths(r,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;let t=[],a=r.children;for(let i=0;i<a.length;i++){let o=a[i];t.push(this._retrieveElementSize(o).width)}return this._cachedCellWidths=t,t}_getStickyStartColumnPositions(r,e){let t=[],a=0;for(let i=0;i<r.length;i++)e[i]&&(t[i]=a,a+=r[i]);return t}_getStickyEndColumnPositions(r,e){let t=[],a=0;for(let i=r.length;i>0;i--)e[i]&&(t[i]=a,a+=r[i]);return t}_retrieveElementSize(r){let e=this._elemSizeCache.get(r);if(e)return e;let t=r.getBoundingClientRect(),a={width:t.width,height:t.height};return this._resizeObserver&&(this._elemSizeCache.set(r,a),this._resizeObserver.observe(r,{box:`border-box`})),a}_updateStickyColumnReplayQueue(r){this._removeFromStickyColumnReplayQueue(r.rows),this._stickyColumnsReplayTimeout||this._updatedStickyColumnsParamsToReplay.push(r)}_removeFromStickyColumnReplayQueue(r){let e=new Set(r);for(let t of this._updatedStickyColumnsParamsToReplay)t.rows=t.rows.filter(a=>!e.has(a));this._updatedStickyColumnsParamsToReplay=this._updatedStickyColumnsParamsToReplay.filter(t=>!!t.rows.length)}_updateCachedSizes(r){let e=!1;for(let t of r){let a=t.borderBoxSize?.length?{width:t.borderBoxSize[0].inlineSize,height:t.borderBoxSize[0].blockSize}:{width:t.contentRect.width,height:t.contentRect.height};a.width!==this._elemSizeCache.get(t.target)?.width&&en(t.target)&&(e=!0),this._elemSizeCache.set(t.target,a)}e&&this._updatedStickyColumnsParamsToReplay.length&&(this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._stickyColumnsReplayTimeout=setTimeout(()=>{if(!this._destroyed){for(let t of this._updatedStickyColumnsParamsToReplay)this.updateStickyColumns(t.rows,t.stickyStartStates,t.stickyEndStates,!0,!1);this._updatedStickyColumnsParamsToReplay=[],this._stickyColumnsReplayTimeout=null}},0))}};function en(n){return[`cdk-cell`,`cdk-header-cell`,`cdk-footer-cell`].some(r=>n.classList.contains(r))}function Bt(n){return Error(`Could not find column with id "${n}".`)}var le=new v(`STICKY_POSITIONING_LISTENER`);var Le=(()=>{class n{viewContainer=m(Br);elementRef=m(be$1);constructor(){let e=m(I);e._rowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`rowOutlet`,``]]})}return n})();var He=(()=>{class n{viewContainer=m(Br);elementRef=m(be$1);constructor(){let e=m(I);e._headerRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`headerRowOutlet`,``]]})}return n})();var je=(()=>{class n{viewContainer=m(Br);elementRef=m(be$1);constructor(){let e=m(I);e._footerRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`footerRowOutlet`,``]]})}return n})();var Ve=(()=>{class n{viewContainer=m(Br);elementRef=m(be$1);constructor(){let e=m(I);e._noDataRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=tt({type:n,selectors:[[``,`noDataRowOutlet`,``]]})}return n})();var Ue=(()=>{class n{_differs=m(Nb);_changeDetectorRef=m(Mb);_elementRef=m(be$1);_dir=m(kx,{optional:!0});_platform=m(Ae$1);_viewRepeater;_viewportRuler=m(ge);_injector=m(Z);_virtualScrollViewport=m(Oo,{optional:!0,host:!0});_positionListener=m(le,{optional:!0})||m(le,{optional:!0,skipSelf:!0});_document=m(k);_data;_renderedRange;_onDestroy=new V;_renderRows;_renderChangeSubscription=null;_columnDefsByName=/* @__PURE__ */ new Map;_rowDefs;_headerRowDefs;_footerRowDefs;_dataDiffer;_defaultRowDef=null;_customColumnDefs=/* @__PURE__ */ new Set;_customRowDefs=/* @__PURE__ */ new Set;_customHeaderRowDefs=/* @__PURE__ */ new Set;_customFooterRowDefs=/* @__PURE__ */ new Set;_customNoDataRow=null;_headerRowDefChanged=!0;_footerRowDefChanged=!0;_stickyColumnStylesNeedReset=!0;_forceRecalculateCellWidths=!0;_cachedRenderRowsMap=/* @__PURE__ */ new Map;_rowDefsByView=/* @__PURE__ */ new WeakMap;_isNativeHtmlTable;_stickyStyler;stickyCssClass=`cdk-table-sticky`;needsPositionStickyOnElement=!0;_isServer;_isShowingNoDataRow=!1;_hasAllOutlets=!1;_hasInitialized=!1;_headerRowStickyUpdates=new V;_footerRowStickyUpdates=new V;_disableVirtualScrolling=!1;_getCellRole(){if(this._cellRoleInternal===void 0){let e=this._elementRef.nativeElement.getAttribute(`role`);return e===`grid`||e===`treegrid`?`gridcell`:`cell`}return this._cellRoleInternal}_cellRoleInternal=void 0;get trackBy(){return this._trackByFn}set trackBy(e){this._trackByFn=e}_trackByFn;get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&(this._switchDataSource(e),this._changeDetectorRef.markForCheck())}_dataSource;_dataSourceChanges=new V;_dataStream=new V;get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(e){this._multiTemplateDataRows=e,this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}_multiTemplateDataRows=!1;get fixedLayout(){return this._virtualScrollEnabled()?!0:this._fixedLayout}set fixedLayout(e){this._fixedLayout=e,this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}_fixedLayout=!1;recycleRows=!1;contentChanged=new Oe$1;viewChange=new fn({start:0,end:Number.MAX_VALUE});_rowOutlet;_headerRowOutlet;_footerRowOutlet;_noDataRowOutlet;_contentColumnDefs;_contentRowDefs;_contentHeaderRowDefs;_contentFooterRowDefs;_noDataRow;get renderedRows(){return this._renderRows}constructor(){m(new vb(`role`),{optional:!0})||this._elementRef.nativeElement.setAttribute(`role`,`table`),this._isServer=!this._platform.isBrowser,this._isNativeHtmlTable=this._elementRef.nativeElement.nodeName===`TABLE`,this._dataDiffer=this._differs.find([]).create((t,a)=>this.trackBy?this.trackBy(a.dataIndex,a.data):a)}ngOnInit(){this._setupStickyStyler(),this._viewportRuler.change().pipe(so(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentInit(){this._viewRepeater=this.recycleRows||this._virtualScrollEnabled()?new Vi:new _n,this._virtualScrollEnabled()&&this._setupVirtualScrolling(this._virtualScrollViewport),this._hasInitialized=!0}ngAfterContentChecked(){this._canRender()&&this._render()}ngOnDestroy(){this._stickyStyler?.destroy(),[this._rowOutlet?.viewContainer,this._headerRowOutlet?.viewContainer,this._footerRowOutlet?.viewContainer,this._cachedRenderRowsMap,this._customColumnDefs,this._customRowDefs,this._customHeaderRowDefs,this._customFooterRowDefs,this._columnDefsByName].forEach(e=>{e?.clear()}),this._headerRowDefs=[],this._footerRowDefs=[],this._defaultRowDef=null,this._headerRowStickyUpdates.complete(),this._footerRowStickyUpdates.complete(),this._onDestroy.next(),this._onDestroy.complete(),Kn(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();let e=this._dataDiffer.diff(this._renderRows);if(!e){this._updateNoDataRow(),this.contentChanged.next();return}let t=this._rowOutlet.viewContainer;this._viewRepeater.applyChanges(e,t,(a,i,o)=>this._getEmbeddedViewArgs(a.item,o),a=>a.item.data,a=>{if(a.operation===ee.INSERTED&&a.context){this._renderCellTemplateForItem(a.record.item.rowDef,a.context);let i=t.get(a.record.currentIndex);this._rowDefsByView.set(i,a.record.item.rowDef)}}),e.forEachIdentityChange(a=>{let i=a.currentIndex,o=t.get(i);if(this._rowDefsByView.get(o)!==a.item.rowDef){t.remove(i);let c=this._renderRow(this._rowOutlet,a.item.rowDef,i,{$implicit:a.item.data});this._rowDefsByView.set(c,a.item.rowDef)}else o.context.$implicit=a.item.data}),this._updateRowIndexContext(),this._updateNoDataRow(),this.contentChanged.next(),this.updateStickyColumnStyles()}addColumnDef(e){this._customColumnDefs.add(e)}removeColumnDef(e){this._customColumnDefs.delete(e)}addRowDef(e){this._customRowDefs.add(e)}removeRowDef(e){this._customRowDefs.delete(e)}addHeaderRowDef(e){this._customHeaderRowDefs.add(e),this._headerRowDefChanged=!0}removeHeaderRowDef(e){this._customHeaderRowDefs.delete(e),this._headerRowDefChanged=!0}addFooterRowDef(e){this._customFooterRowDefs.add(e),this._footerRowDefChanged=!0}removeFooterRowDef(e){this._customFooterRowDefs.delete(e),this._footerRowDefChanged=!0}setNoDataRow(e){this._customNoDataRow=e}updateStickyHeaderRowStyles(){let e=this._getRenderedRows(this._headerRowOutlet);if(this._isNativeHtmlTable){let a=Pt(this._headerRowOutlet,`thead`);a&&(a.style.display=e.length?``:`none`)}let t=this._headerRowDefs.map(a=>a.sticky);this._stickyStyler.clearStickyPositioning(e,[`top`]),this._stickyStyler.stickRows(e,t,`top`),this._headerRowDefs.forEach(a=>a.resetStickyChanged())}updateStickyFooterRowStyles(){let e=this._getRenderedRows(this._footerRowOutlet);if(this._isNativeHtmlTable){let a=Pt(this._footerRowOutlet,`tfoot`);a&&(a.style.display=e.length?``:`none`)}let t=this._footerRowDefs.map(a=>a.sticky);this._stickyStyler.clearStickyPositioning(e,[`bottom`]),this._stickyStyler.stickRows(e,t,`bottom`),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,t),this._footerRowDefs.forEach(a=>a.resetStickyChanged())}updateStickyColumnStyles(){let e=this._getRenderedRows(this._headerRowOutlet),t=this._getRenderedRows(this._rowOutlet),a=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this.fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...e,...t,...a],[`left`,`right`]),this._stickyColumnStylesNeedReset=!1),e.forEach((i,o)=>{this._addStickyColumnStyles([i],this._headerRowDefs[o])}),this._rowDefs.forEach(i=>{let o=[];for(let c=0;c<t.length;c++)this._renderRows[c].rowDef===i&&o.push(t[c]);this._addStickyColumnStyles(o,i)}),a.forEach((i,o)=>{this._addStickyColumnStyles([i],this._footerRowDefs[o])}),Array.from(this._columnDefsByName.values()).forEach(i=>i.resetStickyChanged())}stickyColumnsUpdated(e){this._positionListener?.stickyColumnsUpdated(e)}stickyEndColumnsUpdated(e){this._positionListener?.stickyEndColumnsUpdated(e)}stickyHeaderRowsUpdated(e){this._headerRowStickyUpdates.next(e),this._positionListener?.stickyHeaderRowsUpdated(e)}stickyFooterRowsUpdated(e){this._footerRowStickyUpdates.next(e),this._positionListener?.stickyFooterRowsUpdated(e)}_outletAssigned(){!this._hasAllOutlets&&this._rowOutlet&&this._headerRowOutlet&&this._footerRowOutlet&&this._noDataRowOutlet&&(this._hasAllOutlets=!0,this._canRender()&&this._render())}_canRender(){return this._hasAllOutlets&&this._hasInitialized}_render(){this._cacheRowDefs(),this._cacheColumnDefs(),!this._headerRowDefs.length&&!this._footerRowDefs.length&&this._rowDefs.length;let t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}_getAllRenderRows(){if(!Array.isArray(this._data)||!this._renderedRange)return[];let e=[],t=Math.min(this._data.length,this._renderedRange.end),a=this._cachedRenderRowsMap;this._cachedRenderRowsMap=/* @__PURE__ */ new Map;for(let i=this._renderedRange.start;i<t;i++){let o=this._data[i],c=this._getRenderRowsForData(o,i,a.get(o));this._cachedRenderRowsMap.has(o)||this._cachedRenderRowsMap.set(o,/* @__PURE__ */ new WeakMap);for(let s=0;s<c.length;s++){let d=c[s],h=this._cachedRenderRowsMap.get(d.data);h.has(d.rowDef)?h.get(d.rowDef).push(d):h.set(d.rowDef,[d]),e.push(d)}}return e}_getRenderRowsForData(e,t,a){return this._getRowDefs(e,t).map(o=>{let c=a&&a.has(o)?a.get(o):[];if(c.length){let s=c.shift();return s.dataIndex=t,s}else return{data:e,rowDef:o,dataIndex:t}})}_cacheColumnDefs(){this._columnDefsByName.clear(),xe(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=xe(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=xe(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=xe(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);let e=this._rowDefs.filter(t=>!t.when);this._defaultRowDef=e[0]}_renderUpdatedColumns(){let e=(o,c)=>{let s=!!c.getColumnsDiff();return o||s},t=this._rowDefs.reduce(e,!1);t&&this._forceRenderDataRows();let a=this._headerRowDefs.reduce(e,!1);a&&this._forceRenderHeaderRows();let i=this._footerRowDefs.reduce(e,!1);return i&&this._forceRenderFooterRows(),t||a||i}_switchDataSource(e){this._data=[],Kn(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),e||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet&&this._rowOutlet.viewContainer.clear()),this._dataSource=e}_observeRenderChanges(){if(!this.dataSource)return;let e;Kn(this.dataSource)?e=this.dataSource.connect(this):qv(this.dataSource)?e=this.dataSource:Array.isArray(this.dataSource)&&(e=Kr(this.dataSource)),this._renderChangeSubscription=ac([e,this.viewChange]).pipe(so(this._onDestroy)).subscribe(([t,a])=>{this._data=t||[],this._renderedRange=a,this._dataStream.next(t),this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((e,t)=>this._renderRow(this._headerRowOutlet,e,t)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((e,t)=>this._renderRow(this._footerRowOutlet,e,t)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(e,t){let a=Array.from(t?.columns||[]).map(c=>{let s=this._columnDefsByName.get(c);if(!s)throw Bt(c);return s}),i=a.map(c=>c.sticky),o=a.map(c=>c.stickyEnd);this._stickyStyler.updateStickyColumns(e,i,o,!this.fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(e){let t=[];for(let a=0;a<e.viewContainer.length;a++){let i=e.viewContainer.get(a);t.push(i.rootNodes[0])}return t}_getRowDefs(e,t){if(this._rowDefs.length===1)return[this._rowDefs[0]];let a=[];if(this.multiTemplateDataRows)a=this._rowDefs.filter(i=>!i.when||i.when(t,e));else{let i=this._rowDefs.find(o=>o.when&&o.when(t,e))||this._defaultRowDef;i&&a.push(i)}return a.length,a}_getEmbeddedViewArgs(e,t){let a=e.rowDef,i={$implicit:e.data};return{templateRef:a.template,context:i,index:t}}_renderRow(e,t,a,i={}){let o=e.viewContainer.createEmbeddedView(t.template,i,a);return this._renderCellTemplateForItem(t,i),o}_renderCellTemplateForItem(e,t){for(let a of this._getCellTemplates(e))Q.mostRecentCellOutlet&&Q.mostRecentCellOutlet._viewContainer.createEmbeddedView(a,t);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){let e=this._rowOutlet.viewContainer;for(let t=0,a=e.length;t<a;t++){let o=e.get(t).context;o.count=a,o.first=t===0,o.last=t===a-1,o.even=t%2===0,o.odd=!o.even,this.multiTemplateDataRows?(o.dataIndex=this._renderRows[t].dataIndex,o.renderIndex=t):o.index=this._renderRows[t].dataIndex}}_getCellTemplates(e){return!e||!e.columns?[]:Array.from(e.columns,t=>{let a=this._columnDefsByName.get(t);if(!a)throw Bt(t);return e.extractCellTemplate(a)})}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){let e=(t,a)=>t||a.hasStickyChanged();this._headerRowDefs.reduce(e,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(e,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(e,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){let e=this._dir?this._dir.value:`ltr`,t=this._injector;this._stickyStyler=new Oe(this._isNativeHtmlTable,this.stickyCssClass,this._platform.isBrowser,this.needsPositionStickyOnElement,e,this,t),(this._dir?this._dir.change:Kr()).pipe(so(this._onDestroy)).subscribe(a=>{this._stickyStyler.direction=a,this.updateStickyColumnStyles()})}_setupVirtualScrolling(e){let t=typeof requestAnimationFrame<`u`?Gv:zv;this.viewChange.next({start:0,end:0}),e.renderedRangeStream.pipe(Xv(0,t),so(this._onDestroy)).subscribe(this.viewChange),e.attach({dataStream:this._dataStream,measureRangeSize:(a,i)=>this._measureRangeSize(a,i)}),ac([e.renderedContentOffset,this._headerRowStickyUpdates]).pipe(so(this._onDestroy)).subscribe(([a,i])=>{if(!(!i.sizes||!i.offsets||!i.elements))for(let o=0;o<i.elements.length;o++){let c=i.elements[o];if(c){let s=i.offsets[o],d=a!==0?Math.max(a-s,s):-s;for(let h of c)h.style.top=`${-d}px`}}}),ac([e.renderedContentOffset,this._footerRowStickyUpdates]).pipe(so(this._onDestroy)).subscribe(([a,i])=>{if(!(!i.sizes||!i.offsets||!i.elements))for(let o=0;o<i.elements.length;o++){let c=i.elements[o];if(c)for(let s of c)s.style.bottom=`${a+i.offsets[o]}px`}})}_getOwnDefs(e){return e.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){let e=this._customNoDataRow||this._noDataRow;if(!e)return;let t=this._rowOutlet.viewContainer.length===0;if(t===this._isShowingNoDataRow)return;let a=this._noDataRowOutlet.viewContainer;if(t){let i=a.createEmbeddedView(e.templateRef),o=i.rootNodes[0];if(i.rootNodes.length===1&&o?.nodeType===this._document.ELEMENT_NODE){o.setAttribute(`role`,`row`),o.classList.add(...e._contentClassNames);let c=o.querySelectorAll(e._cellSelector);for(let s=0;s<c.length;s++)c[s].classList.add(...e._cellClassNames)}}else a.clear();this._isShowingNoDataRow=t,this._changeDetectorRef.markForCheck()}_measureRangeSize(e,t){if(e.start>=e.end||t!==`vertical`)return 0;let a=this.viewChange.value,i=this._rowOutlet.viewContainer;e.start<a.start||(e.end,a.end);let o=e.start-a.start,c=e.end-e.start,s,d;for(let _=0;_<c;_++){let y=i.get(_+o);if(y&&y.rootNodes.length){s=d=y.rootNodes[0];break}}for(let _=c-1;_>-1;_--){let y=i.get(_+o);if(y&&y.rootNodes.length){d=y.rootNodes[y.rootNodes.length-1];break}}let h=s?.getBoundingClientRect?.(),u=d?.getBoundingClientRect?.();return h&&u?u.bottom-h.top:0}_virtualScrollEnabled(){return!this._disableVirtualScrolling&&this._virtualScrollViewport!=null}static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){let e=[[[`caption`]],[[`colgroup`],[`col`]],`*`],t=[`caption`,`colgroup, col`,`*`];function a(c,s){c&1&&Rt(0,2)}function i(c,s){c&1&&(ra$1(0,`thead`,0),Wg(1,1),md(),ra$1(2,`tbody`,0),Wg(3,2)(4,3),md(),ra$1(5,`tfoot`,0),Wg(6,4),md())}function o(c,s){c&1&&Wg(0,1)(1,2)(2,3)(3,4)}return et({type:n,selectors:[[`cdk-table`],[`table`,`cdk-table`,``]],contentQueries:function(s,d,h){if(s&1&&Yg(h,Vt,5)(h,J,5)(h,De,5)(h,de,5)(h,ze,5),s&2){let u;pC(u=mC())&&(d._noDataRow=u.first),pC(u=mC())&&(d._contentColumnDefs=u),pC(u=mC())&&(d._contentRowDefs=u),pC(u=mC())&&(d._contentHeaderRowDefs=u),pC(u=mC())&&(d._contentFooterRowDefs=u)}},hostAttrs:[1,`cdk-table`],hostVars:2,hostBindings:function(s,d){s&2&&rn(`cdk-table-fixed-layout`,d.fixedLayout)},inputs:{trackBy:`trackBy`,dataSource:`dataSource`,multiTemplateDataRows:[2,`multiTemplateDataRows`,`multiTemplateDataRows`,on],fixedLayout:[2,`fixedLayout`,`fixedLayout`,on],recycleRows:[2,`recycleRows`,`recycleRows`,on]},outputs:{contentChanged:`contentChanged`},exportAs:[`cdkTable`],features:[pb([{provide:I,useExisting:n},{provide:le,useValue:null}])],ngContentSelectors:t,decls:5,vars:2,consts:[[`role`,`rowgroup`],[`headerRowOutlet`,``],[`rowOutlet`,``],[`noDataRowOutlet`,``],[`footerRowOutlet`,``]],template:function(s,d){s&1&&(ni(e),Rt(0),Rt(1,1),ei(2,a,1,0),ei(3,i,7,0)(4,o,4,0)),s&2&&(qo(2),ti(d._isServer?2:-1),qo(),ti(d._isNativeHtmlTable?3:4))},dependencies:[He,Le,Ve,je],styles:[`.cdk-table-fixed-layout {
  table-layout: fixed;
}
`],encapsulation:2,changeDetection:1})})()}return n})();function xe(n,r){return n.concat(Array.from(r))}function Pt(n,r){let e=r.toUpperCase(),t=n.viewContainer.element.nativeElement;for(;t;){let a=t.nodeType===1?t.nodeName:null;if(a===e)return t;if(a===`TABLE`)break;t=t.parentNode}return null}var Ut=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Ie$1({type:n});static ɵinj=ge$1({imports:[Pt$1]})}return n})();var ia=(()=>{class n extends Ue{stickyCssClass=`mat-mdc-table-sticky`;needsPositionStickyOnElement=!1;static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵcmp=(function(){let e=[[[`caption`]],[[`colgroup`],[`col`]],`*`],t=[`caption`,`colgroup, col`,`*`];function a(c,s){c&1&&Rt(0,2)}function i(c,s){c&1&&(ra$1(0,`thead`,0),Wg(1,1),md(),ra$1(2,`tbody`,2),Wg(3,3)(4,4),md(),ra$1(5,`tfoot`,0),Wg(6,5),md())}function o(c,s){c&1&&Wg(0,1)(1,3)(2,4)(3,5)}return et({type:n,selectors:[[`mat-table`],[`table`,`mat-table`,``]],hostAttrs:[1,`mat-mdc-table`,`mdc-data-table__table`],hostVars:2,hostBindings:function(s,d){s&2&&rn(`mat-table-fixed-layout`,d.fixedLayout)},exportAs:[`matTable`],features:[pb([{provide:Ue,useExisting:n},{provide:I,useExisting:n},{provide:le,useValue:null}]),Vr],ngContentSelectors:t,decls:5,vars:2,consts:[[`role`,`rowgroup`],[`headerRowOutlet`,``],[`role`,`rowgroup`,1,`mdc-data-table__content`],[`rowOutlet`,``],[`noDataRowOutlet`,``],[`footerRowOutlet`,``]],template:function(s,d){s&1&&(ni(e),Rt(0),Rt(1,1),ei(2,a,1,0),ei(3,i,7,0)(4,o,4,0)),s&2&&(qo(2),ti(d._isServer?2:-1),qo(),ti(d._isNativeHtmlTable?3:4))},dependencies:[He,Le,Ve,je],styles:[`.mat-mdc-table-sticky {
  position: sticky !important;
}

mat-table {
  display: block;
}

mat-header-row {
  min-height: var(--%NS%mat-table-header-container-height, 56px);
}

mat-row {
  min-height: var(--%NS%mat-table-row-item-container-height, 52px);
}

mat-footer-row {
  min-height: var(--%NS%mat-table-footer-container-height, 52px);
}

mat-row, mat-header-row, mat-footer-row {
  display: flex;
  border-width: 0;
  border-bottom-width: 1px;
  border-style: solid;
  align-items: center;
  box-sizing: border-box;
}

mat-cell:first-of-type, mat-header-cell:first-of-type, mat-footer-cell:first-of-type {
  padding-left: 24px;
}
[dir=rtl] mat-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:first-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:first-of-type:not(:only-of-type) {
  padding-left: 0;
  padding-right: 24px;
}
mat-cell:last-of-type, mat-header-cell:last-of-type, mat-footer-cell:last-of-type {
  padding-right: 24px;
}
[dir=rtl] mat-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-header-cell:last-of-type:not(:only-of-type), [dir=rtl] mat-footer-cell:last-of-type:not(:only-of-type) {
  padding-right: 0;
  padding-left: 24px;
}

mat-cell, mat-header-cell, mat-footer-cell {
  flex: 1;
  display: flex;
  align-items: center;
  overflow: hidden;
  word-wrap: break-word;
  min-height: inherit;
}

.mat-mdc-table {
  min-width: 100%;
  border: 0;
  border-spacing: 0;
  table-layout: auto;
  white-space: normal;
  background-color: var(--%NS%mat-table-background-color, var(--%NS%mat-sys-surface));
}

.mat-table-fixed-layout {
  table-layout: fixed;
}

.mdc-data-table__cell {
  box-sizing: border-box;
  overflow: hidden;
  text-align: start;
  text-overflow: ellipsis;
}

.mdc-data-table__cell,
.mdc-data-table__header-cell {
  padding: 0 16px;
}

.mat-mdc-header-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--%NS%mat-table-header-container-height, 56px);
  color: var(--%NS%mat-table-header-headline-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-table-header-headline-font, var(--%NS%mat-sys-title-small-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-header-headline-line-height, var(--%NS%mat-sys-title-small-line-height));
  font-size: var(--%NS%mat-table-header-headline-size, var(--%NS%mat-sys-title-small-size, 14px));
  font-weight: var(--%NS%mat-table-header-headline-weight, var(--%NS%mat-sys-title-small-weight, 500));
}

.mat-mdc-row {
  height: var(--%NS%mat-table-row-item-container-height, 52px);
  color: var(--%NS%mat-table-row-item-label-text-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
}

.mat-mdc-row,
.mdc-data-table__content {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-family: var(--%NS%mat-table-row-item-label-text-font, var(--%NS%mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-row-item-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-table-row-item-label-text-size, var(--%NS%mat-sys-body-medium-size, 14px));
  font-weight: var(--%NS%mat-table-row-item-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}

.mat-mdc-footer-row {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  height: var(--%NS%mat-table-footer-container-height, 52px);
  color: var(--%NS%mat-table-row-item-label-text-color, var(--%NS%mat-sys-on-surface, rgba(0, 0, 0, 0.87)));
  font-family: var(--%NS%mat-table-footer-supporting-text-font, var(--%NS%mat-sys-body-medium-font, Roboto, sans-serif));
  line-height: var(--%NS%mat-table-footer-supporting-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-table-footer-supporting-text-size, var(--%NS%mat-sys-body-medium-size, 14px));
  font-weight: var(--%NS%mat-table-footer-supporting-text-weight, var(--%NS%mat-sys-body-medium-weight));
  letter-spacing: var(--%NS%mat-table-footer-supporting-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
}

.mat-mdc-header-cell {
  border-bottom-color: var(--%NS%mat-table-row-item-outline-color, var(--%NS%mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--%NS%mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--%NS%mat-table-header-headline-tracking, var(--%NS%mat-sys-title-small-tracking));
  font-weight: inherit;
  line-height: inherit;
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  outline: none;
  text-align: start;
}
.mdc-data-table__row:last-child > .mat-mdc-header-cell {
  border-bottom: none;
}

.mat-mdc-cell {
  border-bottom-color: var(--%NS%mat-table-row-item-outline-color, var(--%NS%mat-sys-outline, rgba(0, 0, 0, 0.12)));
  border-bottom-width: var(--%NS%mat-table-row-item-outline-width, 1px);
  border-bottom-style: solid;
  letter-spacing: var(--%NS%mat-table-row-item-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  line-height: inherit;
}
.mdc-data-table__row:last-child > .mat-mdc-cell {
  border-bottom: none;
}

.mat-mdc-footer-cell {
  letter-spacing: var(--%NS%mat-table-row-item-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
}

mat-row.mat-mdc-row,
mat-header-row.mat-mdc-header-row,
mat-footer-row.mat-mdc-footer-row {
  border-bottom: none;
}

.mat-mdc-table tbody,
.mat-mdc-table tfoot,
.mat-mdc-table thead,
.mat-mdc-cell,
.mat-mdc-footer-cell,
.mat-mdc-header-row,
.mat-mdc-row,
.mat-mdc-footer-row,
.mat-mdc-table .mat-mdc-header-cell {
  background: inherit;
}

.mat-mdc-table mat-header-row.mat-mdc-header-row,
.mat-mdc-table mat-row.mat-mdc-row,
.mat-mdc-table mat-footer-row.mat-mdc-footer-cell {
  height: unset;
}

mat-header-cell.mat-mdc-header-cell,
mat-cell.mat-mdc-cell,
mat-footer-cell.mat-mdc-footer-cell {
  align-self: stretch;
}
`],encapsulation:2,changeDetection:1})})()}return n})();var ca=(()=>{class n extends we{static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[``,`matCellDef`,``]],features:[pb([{provide:we,useExisting:n}]),Vr]})}return n})();var ra=(()=>{class n extends Ce{static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[``,`matHeaderCellDef`,``]],features:[pb([{provide:Ce,useExisting:n}]),Vr]})}return n})();var sa=(()=>{class n extends J{get name(){return this._name}set name(e){this._setNameInput(e)}_updateColumnCssClassName(){super._updateColumnCssClassName(),this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`)}static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[``,`matColumnDef`,``]],inputs:{name:[0,`matColumnDef`,`name`]},features:[pb([{provide:J,useExisting:n}]),Vr]})}return n})();var la=(()=>{class n extends Ht{static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[`mat-header-cell`],[`th`,`mat-header-cell`,``]],hostAttrs:[`role`,`columnheader`,1,`mat-mdc-header-cell`,`mdc-data-table__header-cell`],features:[Vr]})}return n})();var da=(()=>{class n extends jt{static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[`mat-cell`],[`td`,`mat-cell`,``]],hostAttrs:[1,`mat-mdc-cell`,`mdc-data-table__cell`],features:[Vr]})}return n})();var ma=(()=>{class n extends de{static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[``,`matHeaderRowDef`,``]],inputs:{columns:[0,`matHeaderRowDef`,`columns`],sticky:[2,`matHeaderRowDefSticky`,`sticky`,on]},features:[pb([{provide:de,useExisting:n}]),Vr]})}return n})();var ha=(()=>{class n extends De{static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵdir=tt({type:n,selectors:[[``,`matRowDef`,``]],inputs:{columns:[0,`matRowDefColumns`,`columns`],when:[0,`matRowDefWhen`,`when`]},features:[pb([{provide:De,useExisting:n}]),Vr]})}return n})();var ua=(()=>{class n extends Be{static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵcmp=et({type:n,selectors:[[`mat-header-row`],[`tr`,`mat-header-row`,``]],hostAttrs:[`role`,`row`,1,`mat-mdc-header-row`,`mdc-data-table__header-row`],exportAs:[`matHeaderRow`],features:[pb([{provide:Be,useExisting:n}]),Vr],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,a){t&1&&Wg(0,0)},dependencies:[Q],encapsulation:2,changeDetection:1})}return n})();var ba=(()=>{class n extends Pe{static ɵfac=(()=>{let e;return function(a){return(e||(e=ch(n)))(a||n)}})();static ɵcmp=et({type:n,selectors:[[`mat-row`],[`tr`,`mat-row`,``]],hostAttrs:[`role`,`row`,1,`mat-mdc-row`,`mdc-data-table__row`],exportAs:[`matRow`],features:[pb([{provide:Pe,useExisting:n}]),Vr],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,a){t&1&&Wg(0,0)},dependencies:[Q],encapsulation:2,changeDetection:1})}return n})();var fa=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Ie$1({type:n});static ɵinj=ge$1({imports:[Ut,Ya]})}return n})();var qe={color:`accent`,clickAction:`check-indeterminate`,disabledInteractive:!1};var tn=new v(`mat-checkbox-default-options`,{providedIn:`root`,factory:()=>qe});var g=(function(n){return n[n.Init=0]=`Init`,n[n.Checked=1]=`Checked`,n[n.Unchecked=2]=`Unchecked`,n[n.Indeterminate=3]=`Indeterminate`,n})(g||{});var Qe=class{source;checked};var nn=(()=>{class n{_elementRef=m(be$1);_changeDetectorRef=m(Mb);_ngZone=m(j);_animationsDisabled=qr();_options=m(tn,{optional:!0});_injector=m(Z);_signalFormField=null;focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let t=new Qe;return t.source=this,t.checked=e,t}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:`mdc-checkbox--anim-unchecked-checked`,uncheckedToIndeterminate:`mdc-checkbox--anim-unchecked-indeterminate`,checkedToUnchecked:`mdc-checkbox--anim-checked-unchecked`,checkedToIndeterminate:`mdc-checkbox--anim-checked-indeterminate`,indeterminateToChecked:`mdc-checkbox--anim-indeterminate-checked`,indeterminateToUnchecked:`mdc-checkbox--anim-indeterminate-unchecked`};ariaLabel=``;ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition=`after`;name=null;change=new Oe$1;indeterminateChange=new Oe$1;value;disableRipple=!1;_inputElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass=``;_currentCheckState=g.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){m(Qn).load(lv);let e=m(new vb(`tabindex`),{optional:!0});this._options=this._options||qe,this.color=this._options.color||qe.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=m(sf).getId(`mat-mdc-checkbox-`),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngOnInit(){this._signalFormField=this._injector.get(Bn,void 0,{optional:!0,self:!0})}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let t=e!=this._indeterminate();this._indeterminate.set(e),t&&(e?this._transitionCheckState(g.Indeterminate):this._transitionCheckState(this.checked?g.Checked:g.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=St(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let t=this._currentCheckState,a=this._getAnimationTargetElement();if(!(t===e||!a)&&(this._currentAnimationClass&&a.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(t,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){a.classList.add(this._currentAnimationClass);let i=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{a.classList.remove(i)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!==`noop`?(this.indeterminate&&e!==`check`&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?g.Checked:g.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e===`noop`)&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,t){if(this._animationsDisabled)return``;switch(e){case g.Init:if(t===g.Checked)return this._animationClasses.uncheckedToChecked;if(t==g.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case g.Unchecked:return t===g.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case g.Checked:return t===g.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case g.Indeterminate:return t===g.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return``}_syncIndeterminate(e){let t=this._inputElement;t&&(t.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_preventBubblingFromLabel(e){e.target&&this._inputElement&&e.target!==this._inputElement.nativeElement&&e.stopPropagation()}static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){let e=[`input`];return et({type:n,selectors:[[`mat-checkbox`]],viewQuery:function(i,o){if(i&1&&Kg(e,5),i&2){let c;pC(c=mC())&&(o._inputElement=c.first)}},hostAttrs:[1,`mat-mdc-checkbox`],hostVars:16,hostBindings:function(i,o){i&2&&(qg(`id`,o.id),Jo(`tabindex`,null)(`aria-label`,null)(`aria-labelledby`,null),bd(o.color?`mat-`+o.color:`mat-accent`),rn(`_mat-animation-noopable`,o._animationsDisabled)(`mdc-checkbox--disabled`,o.disabled)(`mat-mdc-checkbox-disabled`,o.disabled)(`mat-mdc-checkbox-checked`,o.checked)(`mat-mdc-checkbox-disabled-interactive`,o.disabledInteractive))},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],ariaExpanded:[2,`aria-expanded`,`ariaExpanded`,on],ariaControls:[0,`aria-controls`,`ariaControls`],ariaOwns:[0,`aria-owns`,`ariaOwns`],id:`id`,required:[2,`required`,`required`,on],labelPosition:`labelPosition`,name:`name`,value:`value`,disableRipple:[2,`disableRipple`,`disableRipple`,on],tabIndex:[2,`tabIndex`,`tabIndex`,a=>a==null?void 0:Sd(a)],color:`color`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,on],checked:[2,`checked`,`checked`,on],disabled:[2,`disabled`,`disabled`,on],indeterminate:[2,`indeterminate`,`indeterminate`,on]},outputs:{change:`change`,indeterminateChange:`indeterminateChange`},exportAs:[`matCheckbox`],features:[pb([{provide:Ue$1,useExisting:cs(()=>n),multi:!0},{provide:te,useExisting:n,multi:!0}]),sa$1],ngContentSelectors:[`*`],decls:15,vars:23,consts:[[`checkbox`,``],[`input`,``],[`label`,``],[`mat-internal-form-field`,``,3,`click`,`labelPosition`,`for`],[1,`mdc-checkbox`],[`aria-hidden`,`true`,1,`mat-mdc-checkbox-touch-target`],[`type`,`checkbox`,1,`mdc-checkbox__native-control`,3,`blur`,`click`,`change`,`checked`,`indeterminate`,`disabled`,`id`,`required`,`tabIndex`],[`aria-hidden`,`true`,1,`mdc-checkbox__ripple`],[`aria-hidden`,`true`,1,`mdc-checkbox__background`],[`focusable`,`false`,`viewBox`,`0 0 24 24`,1,`mdc-checkbox__checkmark`],[`fill`,`none`,`d`,`M1.73,12.91 8.1,19.28 22.79,4.59`,1,`mdc-checkbox__checkmark-path`],[1,`mdc-checkbox__mixedmark`],[`mat-ripple`,``,`aria-hidden`,`true`,1,`mat-mdc-checkbox-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mat-internal-form-field-label`,`mdc-label`]],template:function(i,o){if(i&1&&(ni(),ra$1(0,`label`,3),Zg(`click`,function(s){return o._preventBubblingFromLabel(s)}),ra$1(1,`span`,4,0),zg(3,`span`,5),ra$1(4,`input`,6,1),Zg(`blur`,function(){return o._onBlur()})(`click`,function(){return o._onInputClick()})(`change`,function(s){return o._onInteractionEvent(s)}),md(),zg(6,`span`,7),ra$1(7,`span`,8),qp(),ra$1(8,`svg`,9),zg(9,`path`,10),md(),Zp(),zg(10,`span`,11),md(),zg(11,`span`,12),md(),ra$1(12,`span`,13,2),Rt(14),md()()),i&2){let c=gC(2);$g(`labelPosition`,o.labelPosition)(`for`,o.inputId),qo(4),rn(`mdc-checkbox--selected`,o.checked),$g(`checked`,o.checked)(`indeterminate`,o.indeterminate)(`disabled`,o.disabled&&!o.disabledInteractive)(`id`,o.inputId)(`required`,o.required)(`tabIndex`,o.disabled&&!o.disabledInteractive?-1:o.tabIndex),Jo(`aria-label`,o.ariaLabel||null)(`aria-labelledby`,o.ariaLabelledby)(`aria-describedby`,o.ariaDescribedby)(`aria-checked`,o.indeterminate?`mixed`:null)(`aria-controls`,o.ariaControls)(`aria-disabled`,o.disabled&&o.disabledInteractive?!0:null)(`aria-expanded`,o.ariaExpanded)(`aria-owns`,o.ariaOwns)(`name`,o.name)(`value`,o.value),qo(7),$g(`matRippleTrigger`,c)(`matRippleDisabled`,o.disableRipple||o.disabled)(`matRippleCentered`,!0)}},dependencies:[s3,_s],styles:[`.mdc-checkbox {
  display: inline-block;
  position: relative;
  flex: 0 0 18px;
  box-sizing: content-box;
  width: 18px;
  height: 18px;
  line-height: 0;
  white-space: nowrap;
  cursor: pointer;
  vertical-align: bottom;
  padding: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  margin: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
}
.mdc-checkbox:hover > .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:hover > .mat-mdc-checkbox-ripple > .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control:focus ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-unselected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-unselected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-unselected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox .mdc-checkbox__native-control:focus:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked + .mdc-checkbox__ripple {
  opacity: var(--%NS%mat-checkbox-selected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  background-color: var(--%NS%mat-checkbox-selected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox:active > .mdc-checkbox__native-control:checked ~ .mat-mdc-checkbox-ripple .mat-ripple-element {
  background-color: var(--%NS%mat-checkbox-selected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control ~ .mat-mdc-checkbox-ripple .mat-ripple-element,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control + .mdc-checkbox__ripple {
  background-color: var(--%NS%mat-checkbox-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
}
.mdc-checkbox .mdc-checkbox__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--%NS%mat-checkbox-state-layer-size, 40px);
  height: var(--%NS%mat-checkbox-state-layer-size, 40px);
  top: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
  right: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
  left: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - var(--%NS%mat-checkbox-state-layer-size, 40px)) / 2);
}

.mdc-checkbox--disabled {
  cursor: default;
  pointer-events: none;
}

.mdc-checkbox__background {
  display: inline-flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 18px;
  height: 18px;
  border: 2px solid currentColor;
  border-radius: 2px;
  background-color: transparent;
  pointer-events: none;
  will-change: background-color, border-color;
  transition: background-color 90ms cubic-bezier(0.4, 0, 0.6, 1), border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
  -webkit-print-color-adjust: exact;
  color-adjust: exact;
  border-color: var(--%NS%mat-checkbox-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
  top: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
  left: calc((var(--%NS%mat-checkbox-state-layer-size, 40px) - 18px) / 2);
}

.mdc-checkbox__native-control:enabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:enabled:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox--disabled .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--%NS%mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}
@media (forced-colors: active) {
  .mdc-checkbox__native-control:disabled:checked ~ .mdc-checkbox__background,
  .mdc-checkbox__native-control:disabled:indeterminate ~ .mdc-checkbox__background {
    border-color: GrayText;
  }
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-unselected-hover-icon-color, var(--%NS%mat-sys-on-surface));
  background-color: transparent;
}

.mdc-checkbox:hover > .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox:hover > .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-hover-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-hover-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox__native-control:focus:focus:not(:checked) ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:not(:indeterminate) ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-unselected-focus-icon-color, var(--%NS%mat-sys-on-surface));
}

.mdc-checkbox__native-control:focus:focus:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:focus:focus:indeterminate ~ .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-selected-focus-icon-color, var(--%NS%mat-sys-primary));
  background-color: var(--%NS%mat-checkbox-selected-focus-icon-color, var(--%NS%mat-sys-primary));
}

.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
  border-color: var(--%NS%mat-checkbox-disabled-unselected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox:hover > .mdc-checkbox__native-control ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox .mdc-checkbox__native-control:focus ~ .mdc-checkbox__background,
  .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__background {
    border-color: GrayText;
  }
}
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  background-color: var(--%NS%mat-checkbox-disabled-selected-icon-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
  border-color: transparent;
}

.mdc-checkbox__checkmark {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  transition: opacity 180ms cubic-bezier(0.4, 0, 0.6, 1);
  color: var(--%NS%mat-checkbox-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__checkmark {
    color: CanvasText;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
  color: var(--%NS%mat-checkbox-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__checkmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__checkmark {
    color: GrayText;
  }
}

.mdc-checkbox__checkmark-path {
  transition: stroke-dashoffset 180ms cubic-bezier(0.4, 0, 0.6, 1);
  stroke: currentColor;
  stroke-width: 3.12px;
  stroke-dashoffset: 29.7833385;
  stroke-dasharray: 29.7833385;
}

.mdc-checkbox__mixedmark {
  width: 100%;
  height: 0;
  transform: scaleX(0) rotate(0deg);
  border-width: 1px;
  border-style: solid;
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  border-color: var(--%NS%mat-checkbox-selected-checkmark-color, var(--%NS%mat-sys-on-primary));
}
@media (forced-colors: active) {
  .mdc-checkbox__mixedmark {
    margin: 0 1px;
  }
}

.mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
  border-color: var(--%NS%mat-checkbox-disabled-selected-checkmark-color, var(--%NS%mat-sys-surface));
}
@media (forced-colors: active) {
  .mdc-checkbox--disabled .mdc-checkbox__mixedmark, .mdc-checkbox--disabled.mat-mdc-checkbox-disabled-interactive .mdc-checkbox__mixedmark {
    border-color: GrayText;
  }
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__background,
.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__background,
.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__background,
.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__background {
  animation-duration: 180ms;
  animation-timing-function: linear;
}

.mdc-checkbox--anim-unchecked-checked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-unchecked-checked-checkmark-path 180ms linear;
  transition: none;
}

.mdc-checkbox--anim-unchecked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-unchecked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-unchecked .mdc-checkbox__checkmark-path {
  animation: mdc-checkbox-checked-unchecked-checkmark-path 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__checkmark {
  animation: mdc-checkbox-checked-indeterminate-checkmark 90ms linear;
  transition: none;
}
.mdc-checkbox--anim-checked-indeterminate .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-checked-indeterminate-mixedmark 90ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__checkmark {
  animation: mdc-checkbox-indeterminate-checked-checkmark 500ms linear;
  transition: none;
}
.mdc-checkbox--anim-indeterminate-checked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-checked-mixedmark 500ms linear;
  transition: none;
}

.mdc-checkbox--anim-indeterminate-unchecked .mdc-checkbox__mixedmark {
  animation: mdc-checkbox-indeterminate-unchecked-mixedmark 300ms linear;
  transition: none;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path {
  stroke-dashoffset: 0;
}

.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transition: opacity 180ms cubic-bezier(0, 0, 0.2, 1), transform 180ms cubic-bezier(0, 0, 0.2, 1);
  opacity: 1;
}
.mdc-checkbox__native-control:checked ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(-45deg);
}

.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__checkmark {
  transform: rotate(45deg);
  opacity: 0;
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mdc-checkbox__native-control:indeterminate ~ .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transform: scaleX(1) rotate(0deg);
  opacity: 1;
}

@keyframes mdc-checkbox-unchecked-checked-checkmark-path {
  0%, 50% {
    stroke-dashoffset: 29.7833385;
  }
  50% {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
  100% {
    stroke-dashoffset: 0;
  }
}
@keyframes mdc-checkbox-unchecked-indeterminate-mixedmark {
  0%, 68.2% {
    transform: scaleX(0);
  }
  68.2% {
    animation-timing-function: cubic-bezier(0, 0, 0, 1);
  }
  100% {
    transform: scaleX(1);
  }
}
@keyframes mdc-checkbox-checked-unchecked-checkmark-path {
  from {
    animation-timing-function: cubic-bezier(0.4, 0, 1, 1);
    opacity: 1;
    stroke-dashoffset: 0;
  }
  to {
    opacity: 0;
    stroke-dashoffset: -29.7833385;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-checkmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(45deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-checkmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(45deg);
    opacity: 0;
  }
  to {
    transform: rotate(360deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-checked-indeterminate-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    transform: rotate(-45deg);
    opacity: 0;
  }
  to {
    transform: rotate(0deg);
    opacity: 1;
  }
}
@keyframes mdc-checkbox-indeterminate-checked-mixedmark {
  from {
    animation-timing-function: cubic-bezier(0.14, 0, 0, 1);
    transform: rotate(0deg);
    opacity: 1;
  }
  to {
    transform: rotate(315deg);
    opacity: 0;
  }
}
@keyframes mdc-checkbox-indeterminate-unchecked-mixedmark {
  0% {
    animation-timing-function: linear;
    transform: scaleX(1);
    opacity: 1;
  }
  32.8%, 100% {
    transform: scaleX(0);
    opacity: 0;
  }
}
.mat-mdc-checkbox {
  display: inline-block;
  position: relative;
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-touch-target,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__native-control,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__ripple,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mat-mdc-checkbox-ripple::before,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__checkmark > .mdc-checkbox__checkmark-path,
.mat-mdc-checkbox._mat-animation-noopable > .mat-internal-form-field > .mdc-checkbox > .mdc-checkbox__background > .mdc-checkbox__mixedmark {
  transition: none !important;
  animation: none !important;
}
.mat-mdc-checkbox label {
  cursor: pointer;
}
.mat-mdc-checkbox .mat-internal-form-field {
  color: var(--%NS%mat-checkbox-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-checkbox-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-checkbox-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-checkbox-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-checkbox-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-checkbox-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive {
  pointer-events: auto;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled.mat-mdc-checkbox-disabled-interactive input {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled label {
  cursor: default;
}
.mat-mdc-checkbox.mat-mdc-checkbox-disabled .mat-internal-form-field-label {
  color: var(--%NS%mat-checkbox-disabled-label-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
@media (forced-colors: active) {
  .mat-mdc-checkbox.mat-mdc-checkbox-disabled .mat-internal-form-field-label {
    color: GrayText;
  }
}
.mat-mdc-checkbox .mat-internal-form-field-label:empty {
  display: none;
}
.mat-mdc-checkbox .mdc-checkbox__ripple {
  opacity: 0;
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple,
.mdc-checkbox__ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-checkbox .mat-mdc-checkbox-ripple:not(:empty),
.mdc-checkbox__ripple:not(:empty) {
  transform: translateZ(0);
}

.mat-mdc-checkbox-ripple .mat-ripple-element {
  opacity: 0.1;
}

.mat-mdc-checkbox-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-checkbox-touch-target-size, 48px);
  width: var(--%NS%mat-checkbox-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-checkbox-touch-target-display, block);
}

.mat-mdc-checkbox .mat-mdc-checkbox-ripple::before {
  border-radius: 50%;
}

.mdc-checkbox__native-control:focus-visible ~ .mat-focus-indicator::before {
  content: "";
}
`],encapsulation:2})})()}return n})();var Fa=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Ie$1({type:n});static ɵinj=ge$1({imports:[nn,Ya]})}return n})();export{da as a,ia as c,nn as d,ra as f,ca as i,la as l,ua as m,Fa as n,fa as o,sa as p,ba as r,ha as s,Cn as t,ma as u};