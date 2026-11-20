import{A as yn,D as un,E as go,O as ve,S as fe,T as gn,_ as Ut,a as Ie,b as bn,c as Ko,d as Ms,f as Nt,g as Ue$1,h as Te,i as Hi,k as wn,l as Le$1,m as Rn,n as Dt,o as J,p as Qe,r as Gt,s as Je$1,t as Ds,u as Mn,v as Ys,w as ge,x as bo,y as _n}from"./chunk-5a1_tJ5t.js";import{$ as Lr,A as Gg,An as ot$1,At as Vv,B as Ie$1,Bn as rc,C as Db,Ct as Sw,Dt as V,E as F,En as oC,Et as Ug,Ft as XI,G as Jo,Gt as Zr,It as Xe,J as Kd,Jn as ss,Jt as dd,Kt as _d,Lt as Xo,M as Gr,Nn as q,Nt as Wg,O as Fv,Qt as ef,Sn as nC,V as It,Vn as rn,W as Je$2,Wn as sb,X as Ko$1,Xn as tC,Xt as e3,Y as Kn$1,Yt as dn,Zn as tb,Zt as ea$1,_n as k,_t as R3,an as ge$1,at as Ne,bn as m,bt as Rv,cn as he,dn as ix,f as A3,fn as j$1,fr as zo,ft as Oz,gt as R,hn as jr,ht as Qy,ir as vx,j as Gp,jn as pd,k as Ga,kn as oo,kt as Vg,l as $I,ln as ic,lr as zI,m as At,mt as Qo,n as wt,nn as fd,nr as ud,ot as Np,p as Ae,pr as zp,pt as Pg,q as KI,rr as v,rt as Mp,sn as gx,sr as xw,t as Mt,tr as ub,u as $g,un as ih,ur as zg,ut as Ov,v as Bg,vt as Rr,w as Eb,wn as nn,xn as md,xt as SC,yn as ku,zn as ra$1}from"./main-IA4GKXD3.js";import{C as he$1,E as mt,S as er,T as mn,_ as Vr,a as Dt$1,b as Yi,f as Ne$1,g as Tr,h as Rr$1,i as Bi,k as zi,m as Or,o as Et,p as Nt$1,r as Ba$1,t as Ar,u as Ln$1,v as Vt,w as ja,x as Yn$1,y as Xi}from"./chunk-BxGt_sJy.js";var na=Math.pow(2,31)-1;var Ce=class{_overlayRef;instance;containerInstance;_afterDismissed=new V;_afterOpened=new V;_onAction=new V;_durationTimeoutId;_dismissedByAction=!1;constructor(r,e){this._overlayRef=e,this.containerInstance=r,r._onExit.subscribe(()=>this._finishDismiss())}dismiss(){this._afterDismissed.closed||this.containerInstance.exit(),clearTimeout(this._durationTimeoutId)}dismissWithAction(){this._onAction.closed||(this._dismissedByAction=!0,this._onAction.next(),this._onAction.complete(),this.dismiss()),clearTimeout(this._durationTimeoutId)}closeWithAction(){this.dismissWithAction()}_dismissAfter(r){this._durationTimeoutId=setTimeout(()=>this.dismiss(),Math.min(r,na))}_open(){this._afterOpened.closed||(this._afterOpened.next(),this._afterOpened.complete())}_finishDismiss(){this._overlayRef.dispose(),this._onAction.closed||this._onAction.complete(),this._afterDismissed.next({dismissedByAction:this._dismissedByAction}),this._afterDismissed.complete(),this._dismissedByAction=!1}afterDismissed(){return this._afterDismissed}afterOpened(){return this.containerInstance._onEnter}onAction(){return this._onAction}};var Fn=new v(`MatSnackBarData`);var me=class{politeness=`polite`;announcementMessage=``;viewContainerRef;duration=0;panelClass;direction;data=null;horizontalPosition=`center`;verticalPosition=`bottom`};var aa=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`matSnackBarLabel`,``]],hostAttrs:[1,`mat-mdc-snack-bar-label`,`mdc-snackbar__label`]})}return n})();var oa=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`matSnackBarActions`,``]],hostAttrs:[1,`mat-mdc-snack-bar-actions`,`mdc-snackbar__actions`]})}return n})();var ia=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`matSnackBarAction`,``]],hostAttrs:[1,`mat-mdc-snack-bar-action`,`mdc-snackbar__action`]})}return n})();var ra=(()=>{class n{snackBarRef=m(Ce);data=m(Fn);action(){this.snackBarRef.dismissWithAction()}get hasAction(){return!!this.data.action}static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){function e(t,a){if(t&1){let o=KI();ea$1(0,`div`,1)(1,`button`,2),zg(`click`,function(){Np(o);let c=XI();return Mp(c.action())}),SC(2),ud()()}if(t&2){let o=XI();zo(2),md(` `,o.data.action,` `)}}return Xe({type:n,selectors:[[`simple-snack-bar`]],hostAttrs:[1,`mat-mdc-simple-snack-bar`],exportAs:[`matSnackBar`],decls:3,vars:2,consts:[[`matSnackBarLabel`,``],[`matSnackBarActions`,``],[`matButton`,``,`matSnackBarAction`,``,3,`click`]],template:function(a,o){a&1&&(ea$1(0,`div`,0),SC(1),ud(),Qo(2,e,3,1,`div`,1)),a&2&&(zo(),md(` `,o.data.message,`
`),zo(),Xo(o.hasAction?2:-1))},dependencies:[A3,aa,oa,ia],styles:[`.mat-mdc-simple-snack-bar {
  display: flex;
}
.mat-mdc-simple-snack-bar .mat-mdc-snack-bar-label {
  max-height: 50vh;
  overflow: auto;
}
`],encapsulation:2})})()}return n})();var Ke=`_mat-snack-bar-enter`;var Ze=`_mat-snack-bar-exit`;var ca=(()=>{class n extends Te{_ngZone=m(j$1);_elementRef=m(ge$1);_changeDetectorRef=m(Eb);_platform=m(Ne);_animationsDisabled=Gr();snackBarConfig=m(me);_document=m(k);_trackedModals=/* @__PURE__ */ new Set;_enterFallback;_exitFallback;_injector=m(q);_announceDelay=150;_announceTimeoutId;_destroyed=!1;_portalOutlet;_onAnnounce=new V;_onExit=new V;_onEnter=new V;_animationState=`void`;_live;_label;_role;_liveElementId=m(ef).getId(`mat-snack-bar-container-live-`);constructor(){super();let e=this.snackBarConfig;e.politeness===`assertive`&&!e.announcementMessage?this._live=`assertive`:e.politeness===`off`?this._live=`off`:this._live=`polite`,this._platform.FIREFOX&&(this._live===`polite`&&(this._role=`status`),this._live===`assertive`&&(this._role=`alert`))}attachComponentPortal(e){this._assertNotAttached();let t=this._portalOutlet.attachComponentPortal(e);return this._afterPortalAttached(),t}attachTemplatePortal(e){this._assertNotAttached();let t=this._portalOutlet.attachTemplatePortal(e);return this._afterPortalAttached(),t}attachDomPortal=e=>{this._assertNotAttached();let t=this._portalOutlet.attachDomPortal(e);return this._afterPortalAttached(),t};onAnimationEnd(e){e===Ze?this._completeExit():e===Ke&&(clearTimeout(this._enterFallback),this._ngZone.run(()=>{this._onEnter.next(),this._onEnter.complete()}))}enter(){this._destroyed||(this._animationState=`visible`,this._changeDetectorRef.markForCheck(),this._changeDetectorRef.detectChanges(),this._screenReaderAnnounce(),this._animationsDisabled?ku(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Ke)))},{injector:this._injector}):(clearTimeout(this._enterFallback),this._enterFallback=setTimeout(()=>{this._elementRef.nativeElement.classList.add(`mat-snack-bar-fallback-visible`),this.onAnimationEnd(Ke)},200)))}exit(){return this._destroyed?Zr(void 0):(this._ngZone.run(()=>{this._animationState=`hidden`,this._changeDetectorRef.markForCheck(),this._elementRef.nativeElement.setAttribute(`mat-exit`,``),clearTimeout(this._announceTimeoutId),this._animationsDisabled?ku(()=>{this._ngZone.run(()=>queueMicrotask(()=>this.onAnimationEnd(Ze)))},{injector:this._injector}):(clearTimeout(this._exitFallback),this._exitFallback=setTimeout(()=>this.onAnimationEnd(Ze),200))}),this._onExit)}ngOnDestroy(){this._destroyed=!0,this._clearFromModals(),this._completeExit()}_completeExit(){clearTimeout(this._exitFallback),queueMicrotask(()=>{this._onExit.next(),this._onExit.complete()})}_afterPortalAttached(){let e=this._elementRef.nativeElement,t=this.snackBarConfig.panelClass;t&&(Array.isArray(t)?t.forEach(i=>e.classList.add(i)):e.classList.add(t)),this._exposeToModals();let a=this._label.nativeElement,o=`mdc-snackbar__label`;a.classList.toggle(o,!a.querySelector(`.${o}`))}_exposeToModals(){let e=this._liveElementId,t=this._document.querySelectorAll(`body > .cdk-overlay-container [aria-modal="true"]`);for(let a=0;a<t.length;a++){let o=t[a],i=o.getAttribute(`aria-owns`);this._trackedModals.add(o),i?i.indexOf(e)===-1&&o.setAttribute(`aria-owns`,i+` `+e):o.setAttribute(`aria-owns`,e)}}_clearFromModals(){this._trackedModals.forEach(e=>{let t=e.getAttribute(`aria-owns`);if(t){let a=t.replace(this._liveElementId,``).trim();a.length>0?e.setAttribute(`aria-owns`,a):e.removeAttribute(`aria-owns`)}}),this._trackedModals.clear()}_assertNotAttached(){this._portalOutlet.hasAttached()}_screenReaderAnnounce(){this._announceTimeoutId||this._ngZone.runOutsideAngular(()=>{this._announceTimeoutId=setTimeout(()=>{if(this._destroyed)return;let e=this._elementRef.nativeElement,t=e.querySelector(`[aria-hidden]`),a=e.querySelector(`[aria-live]`);if(t&&a){let o=null;this._platform.isBrowser&&document.activeElement instanceof HTMLElement&&t.contains(document.activeElement)&&(o=document.activeElement),t.removeAttribute(`aria-hidden`),a.appendChild(t),o?.focus(),this._onAnnounce.next(),this._onAnnounce.complete()}},this._announceDelay)})}static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){let e=[`label`];function t(a,o){}return Xe({type:n,selectors:[[`mat-snack-bar-container`]],viewQuery:function(o,i){if(o&1&&Wg(Ue$1,7)(e,7),o&2){let c;tC(c=nC())&&(i._portalOutlet=c.first),tC(c=nC())&&(i._label=c.first)}},hostAttrs:[1,`mdc-snackbar`,`mat-mdc-snack-bar-container`],hostVars:6,hostBindings:function(o,i){o&1&&zg(`animationend`,function(l){return i.onAnimationEnd(l.animationName)})(`animationcancel`,function(l){return i.onAnimationEnd(l.animationName)}),o&2&&nn(`mat-snack-bar-container-enter`,i._animationState===`visible`)(`mat-snack-bar-container-exit`,i._animationState===`hidden`)(`mat-snack-bar-container-animations-enabled`,!i._animationsDisabled)},features:[jr],decls:6,vars:3,consts:[[`label`,``],[1,`mdc-snackbar__surface`,`mat-mdc-snackbar-surface`],[1,`mat-mdc-snack-bar-label`],[`aria-hidden`,`true`],[`cdkPortalOutlet`,``]],template:function(o,i){o&1&&(ea$1(0,`div`,1)(1,`div`,2,0)(3,`div`,3),Pg(4,t,0,0,`ng-template`,4),ud(),Vg(5,`div`),ud()()),o&2&&(zo(5),Ko$1(`aria-live`,i._live)(`role`,i._role)(`id`,i._liveElementId))},dependencies:[Ue$1],styles:[`@keyframes _mat-snack-bar-enter {
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
`],encapsulation:2,changeDetection:1})})()}return n})();var sa=new v(`mat-snack-bar-default-options`,{providedIn:`root`,factory:()=>new me});var In=(()=>{class n{_live=m(ix);_injector=m(q);_breakpointObserver=m(Kd);_parentSnackBar=m(n,{optional:!0,skipSelf:!0});_defaultConfig=m(sa);_animationsDisabled=Gr();_snackBarRefAtThisLevel=null;simpleSnackBarComponent=ra;snackBarContainerComponent=ca;handsetCssClass=`mat-mdc-snack-bar-handset`;get _openedSnackBarRef(){let e=this._parentSnackBar;return e?e._openedSnackBarRef:this._snackBarRefAtThisLevel}set _openedSnackBarRef(e){this._parentSnackBar?this._parentSnackBar._openedSnackBarRef=e:this._snackBarRefAtThisLevel=e}openFromComponent(e,t){return this._attach(e,t)}openFromTemplate(e,t){return this._attach(e,t)}open(e,t=``,a){let o=R(R({},this._defaultConfig),a);return o.data={message:e,action:t},o.announcementMessage===e&&(o.announcementMessage=void 0),this.openFromComponent(this.simpleSnackBarComponent,o)}dismiss(){this._openedSnackBarRef&&this._openedSnackBarRef.dismiss()}ngOnDestroy(){this._snackBarRefAtThisLevel&&this._snackBarRefAtThisLevel.dismiss()}_attachSnackBarContainer(e,t){let a=t&&t.viewContainerRef&&t.viewContainerRef.injector,o=q.create({parent:a||this._injector,providers:[{provide:me,useValue:t}]}),i=new Ie(this.snackBarContainerComponent,t.viewContainerRef,o),c=e.attach(i);return c.instance.snackBarConfig=t,c.instance}_attach(e,t){let a=R(R(R({},new me),this._defaultConfig),t),o=this._createOverlay(a),i=this._attachSnackBarContainer(o,a),c=new Ce(i,o);if(e instanceof Rr){let l=new ge(e,null,{$implicit:a.data,snackBarRef:c});c.instance=i.attachTemplatePortal(l)}else{let l=this._createInjector(a,c),h=new Ie(e,void 0,l);c.instance=i.attachComponentPortal(h).instance}return this._breakpointObserver.observe(Oz.HandsetPortrait).pipe(oo(o.detachments())).subscribe(l=>{o.overlayElement.classList.toggle(this.handsetCssClass,l.matches)}),a.announcementMessage&&i._onAnnounce.subscribe(()=>{this._live.announce(a.announcementMessage,a.politeness)}),this._animateSnackBar(c,a),this._openedSnackBarRef=c,this._openedSnackBarRef}_animateSnackBar(e,t){e.afterDismissed().subscribe(()=>{this._openedSnackBarRef==e&&(this._openedSnackBarRef=null),t.announcementMessage&&this._live.clear()}),t.duration&&t.duration>0&&e.afterOpened().subscribe(()=>e._dismissAfter(t.duration)),this._openedSnackBarRef?(this._openedSnackBarRef.afterDismissed().subscribe(()=>{e.containerInstance.enter()}),this._openedSnackBarRef.dismiss()):e.containerInstance.enter()}_createOverlay(e){let t=new ve;t.direction=e.direction;let a=Le$1(this._injector),o=e.direction===`rtl`,i=e.horizontalPosition===`left`||e.horizontalPosition===`start`&&!o||e.horizontalPosition===`end`&&o,c=!i&&e.horizontalPosition!==`center`;return i?a.left(`0`):c?a.right(`0`):a.centerHorizontally(),e.verticalPosition===`top`?a.top(`0`):a.bottom(`0`),t.positionStrategy=a,t.disableAnimations=this._animationsDisabled,Qe(this._injector,t)}_createInjector(e,t){let a=e&&e.viewContainerRef&&e.viewContainerRef.injector;return q.create({parent:a||this._injector,providers:[{provide:Ce,useValue:t},{provide:Fn,useValue:e.data}]})}static ɵfac=function(t){return new(t||n)};static ɵprov=F({token:n,factory:n.ɵfac})}return n})();var j=new v(`CDK_TABLE`);var Le=(()=>{class n{template=m(Rr);static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`cdkCellDef`,``]]})}return n})();var He=(()=>{class n{template=m(Rr);static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`cdkHeaderCellDef`,``]]})}return n})();var zn=(()=>{class n{template=m(Rr);static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`cdkFooterCellDef`,``]]})}return n})();var ue=(()=>{class n{_table=m(j,{optional:!0});_hasStickyChanged=!1;get name(){return this._name}set name(e){this._setNameInput(e)}_name;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;get stickyEnd(){return this._stickyEnd}set stickyEnd(e){e!==this._stickyEnd&&(this._stickyEnd=e,this._hasStickyChanged=!0)}_stickyEnd=!1;cell;headerCell;footerCell;cssClassFriendlyName;_columnCssClassName;hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}_updateColumnCssClassName(){this._columnCssClassName=[`cdk-column-${this.cssClassFriendlyName}`]}_setNameInput(e){e&&(this._name=e,this.cssClassFriendlyName=e.replace(/[^a-z0-9_-]/gi,`-`),this._updateColumnCssClassName())}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`cdkColumnDef`,``]],contentQueries:function(t,a,o){if(t&1&&Gg(o,Le,5)(o,He,5)(o,zn,5),t&2){let i;tC(i=nC())&&(a.cell=i.first),tC(i=nC())&&(a.headerCell=i.first),tC(i=nC())&&(a.footerCell=i.first)}},inputs:{name:[0,`cdkColumnDef`,`name`],sticky:[2,`sticky`,`sticky`,rn],stickyEnd:[2,`stickyEnd`,`stickyEnd`,rn]}})}return n})();var Pe=class{constructor(r,e){e.nativeElement.classList.add(...r._columnCssClassName)}};var Pn=(()=>{class n extends Pe{constructor(){super(m(ue),m(ge$1))}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[`cdk-header-cell`],[`th`,`cdk-header-cell`,``]],hostAttrs:[`role`,`columnheader`,1,`cdk-header-cell`],features:[jr]})}return n})();var Ln=(()=>{class n extends Pe{constructor(){let e=m(ue),t=m(ge$1);super(e,t);let a=e._table?._getCellRole();a&&t.nativeElement.setAttribute(`role`,a)}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[`cdk-cell`],[`td`,`cdk-cell`,``]],hostAttrs:[1,`cdk-cell`],features:[jr]})}return n})();var Je=(()=>{class n{template=m(Rr);_differs=m(Db);columns;_columnsDiffer;ngOnChanges(e){if(!this._columnsDiffer){let t=e.columns&&e.columns.currentValue||[];this._columnsDiffer=this._differs.find(t).create(),this._columnsDiffer.diff(t)}}getColumnsDiff(){return this._columnsDiffer.diff(this.columns)}extractCellTemplate(e){return this instanceof De?e.headerCell.template:this instanceof et?e.footerCell.template:e.cell.template}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,features:[ra$1]})}return n})();var De=(()=>{class n extends Je{_table=m(j,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[``,`cdkHeaderRowDef`,``]],inputs:{columns:[0,`cdkHeaderRowDef`,`columns`],sticky:[2,`cdkHeaderRowDefSticky`,`sticky`,rn]},features:[jr,ra$1]})}return n})();var et=(()=>{class n extends Je{_table=m(j,{optional:!0});_hasStickyChanged=!1;get sticky(){return this._sticky}set sticky(e){e!==this._sticky&&(this._sticky=e,this._hasStickyChanged=!0)}_sticky=!1;ngOnChanges(e){super.ngOnChanges(e)}hasStickyChanged(){let e=this._hasStickyChanged;return this.resetStickyChanged(),e}resetStickyChanged(){this._hasStickyChanged=!1}static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[``,`cdkFooterRowDef`,``]],inputs:{columns:[0,`cdkFooterRowDef`,`columns`],sticky:[2,`cdkFooterRowDefSticky`,`sticky`,rn]},features:[jr,ra$1]})}return n})();var Ve=(()=>{class n extends Je{_table=m(j,{optional:!0});when;static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[``,`cdkRowDef`,``]],inputs:{columns:[0,`cdkRowDefColumns`,`columns`],when:[0,`cdkRowDefWhen`,`when`]},features:[jr]})}return n})();var ie=(()=>{class n{_viewContainer=m(Lr);cells;context;static mostRecentCellOutlet=null;constructor(){n.mostRecentCellOutlet=this}ngOnDestroy(){n.mostRecentCellOutlet===this&&(n.mostRecentCellOutlet=null)}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`cdkCellOutlet`,``]]})}return n})();var tt=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=Xe({type:n,selectors:[[`cdk-header-row`],[`tr`,`cdk-header-row`,``]],hostAttrs:[`role`,`row`,1,`cdk-header-row`],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,a){t&1&&Ug(0,0)},dependencies:[ie],encapsulation:2,changeDetection:1})}return n})();var nt=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵcmp=Xe({type:n,selectors:[[`cdk-row`],[`tr`,`cdk-row`,``]],hostAttrs:[`role`,`row`,1,`cdk-row`],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,a){t&1&&Ug(0,0)},dependencies:[ie],encapsulation:2,changeDetection:1})}return n})();var Hn=(()=>{class n{templateRef=m(Rr);_contentClassNames=[`cdk-no-data-row`,`cdk-row`];_cellClassNames=[`cdk-cell`,`cdk-no-data-cell`];_cellSelector=`td, cdk-cell, [cdk-cell], .cdk-cell`;static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[`ng-template`,`cdkNoDataRow`,``]]})}return n})();var On=[`top`,`bottom`,`left`,`right`];var Ye=class{_isNativeHtmlTable;_stickCellCss;_isBrowser;_needsPositionStickyOnElement;direction;_positionListener;_tableInjector;_elemSizeCache=/* @__PURE__ */ new WeakMap;_resizeObserver=globalThis?.ResizeObserver?new globalThis.ResizeObserver(r=>this._updateCachedSizes(r)):null;_updatedStickyColumnsParamsToReplay=[];_stickyColumnsReplayTimeout=null;_cachedCellWidths=[];_borderCellCss;_destroyed=!1;constructor(r,e,t=!0,a=!0,o,i,c){this._isNativeHtmlTable=r,this._stickCellCss=e,this._isBrowser=t,this._needsPositionStickyOnElement=a,this.direction=o,this._positionListener=i,this._tableInjector=c,this._borderCellCss={top:`${e}-border-elem-top`,bottom:`${e}-border-elem-bottom`,left:`${e}-border-elem-left`,right:`${e}-border-elem-right`}}clearStickyPositioning(r,e){(e.includes(`left`)||e.includes(`right`))&&this._removeFromStickyColumnReplayQueue(r);let t=[];for(let a of r)a.nodeType===a.ELEMENT_NODE&&t.push(a,...Array.from(a.children));ku({write:()=>{for(let a of t)this._removeStickyStyle(a,e)}},{injector:this._tableInjector})}updateStickyColumns(r,e,t,a=!0,o=!0){if(!r.length||!this._isBrowser||!(e.some(V=>V)||t.some(V=>V))){this._positionListener?.stickyColumnsUpdated({sizes:[]}),this._positionListener?.stickyEndColumnsUpdated({sizes:[]});return}let i=r[0],c=i.children.length,l=this.direction===`rtl`,h=l?`right`:`left`,p=l?`left`:`right`,k=e.lastIndexOf(!0),x=t.indexOf(!0),v,mt,ht;o&&this._updateStickyColumnReplayQueue({rows:[...r],stickyStartStates:[...e],stickyEndStates:[...t]}),ku({earlyRead:()=>{v=this._getCellWidths(i,a),mt=this._getStickyStartColumnPositions(v,e),ht=this._getStickyEndColumnPositions(v,t)},write:()=>{for(let V of r)for(let N=0;N<c;N++){let ut=V.children[N];e[N]&&this._addStickyStyle(ut,h,mt[N],N===k),t[N]&&this._addStickyStyle(ut,p,ht[N],N===x)}this._positionListener&&v.some(V=>!!V)&&(this._positionListener.stickyColumnsUpdated({sizes:k===-1?[]:v.slice(0,k+1).map((V,N)=>e[N]?V:null)}),this._positionListener.stickyEndColumnsUpdated({sizes:x===-1?[]:v.slice(x).map((V,N)=>t[N+x]?V:null).reverse()}))}},{injector:this._tableInjector})}stickRows(r,e,t){if(!this._isBrowser)return;let a=t===`bottom`?r.slice().reverse():r,o=t===`bottom`?e.slice().reverse():e,i=[],c=[],l=[];ku({earlyRead:()=>{for(let h=0,p=0;h<a.length;h++){if(!o[h])continue;i[h]=p;let k=a[h];l[h]=this._isNativeHtmlTable?Array.from(k.children):[k];let x=this._retrieveElementSize(k).height;p+=x,c[h]=x}},write:()=>{let h=o.lastIndexOf(!0);for(let p=0;p<a.length;p++){if(!o[p])continue;let k=i[p],x=p===h;for(let v of l[p])this._addStickyStyle(v,t,k,x)}t===`top`?this._positionListener?.stickyHeaderRowsUpdated({sizes:c,offsets:i,elements:l}):this._positionListener?.stickyFooterRowsUpdated({sizes:c,offsets:i,elements:l})}},{injector:this._tableInjector})}updateStickyFooterContainer(r,e){this._isNativeHtmlTable&&ku({write:()=>{let t=r.querySelector(`tfoot`);t&&(e.some(a=>!a)?this._removeStickyStyle(t,[`bottom`]):this._addStickyStyle(t,`bottom`,0,!1))}},{injector:this._tableInjector})}destroy(){this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._resizeObserver?.disconnect(),this._destroyed=!0}_removeStickyStyle(r,e){if(!r.classList.contains(this._stickCellCss))return;for(let a of e)r.style[a]=``,r.classList.remove(this._borderCellCss[a]);On.some(a=>e.indexOf(a)===-1&&r.style[a])?r.style.zIndex=this._getCalculatedZIndex(r):(r.style.zIndex=``,this._needsPositionStickyOnElement&&(r.style.position=``),r.classList.remove(this._stickCellCss))}_addStickyStyle(r,e,t,a){r.classList.add(this._stickCellCss),a&&r.classList.add(this._borderCellCss[e]),r.style[e]=`${t}px`,r.style.zIndex=this._getCalculatedZIndex(r),this._needsPositionStickyOnElement&&(r.style.cssText+=`position: -webkit-sticky; position: sticky; `)}_getCalculatedZIndex(r){let e={top:100,bottom:10,left:1,right:1},t=0;for(let a of On)r.style[a]&&(t+=e[a]);return t?`${t}`:``}_getCellWidths(r,e=!0){if(!e&&this._cachedCellWidths.length)return this._cachedCellWidths;let t=[],a=r.children;for(let o=0;o<a.length;o++){let i=a[o];t.push(this._retrieveElementSize(i).width)}return this._cachedCellWidths=t,t}_getStickyStartColumnPositions(r,e){let t=[],a=0;for(let o=0;o<r.length;o++)e[o]&&(t[o]=a,a+=r[o]);return t}_getStickyEndColumnPositions(r,e){let t=[],a=0;for(let o=r.length;o>0;o--)e[o]&&(t[o]=a,a+=r[o]);return t}_retrieveElementSize(r){let e=this._elemSizeCache.get(r);if(e)return e;let t=r.getBoundingClientRect(),a={width:t.width,height:t.height};return this._resizeObserver&&(this._elemSizeCache.set(r,a),this._resizeObserver.observe(r,{box:`border-box`})),a}_updateStickyColumnReplayQueue(r){this._removeFromStickyColumnReplayQueue(r.rows),this._stickyColumnsReplayTimeout||this._updatedStickyColumnsParamsToReplay.push(r)}_removeFromStickyColumnReplayQueue(r){let e=new Set(r);for(let t of this._updatedStickyColumnsParamsToReplay)t.rows=t.rows.filter(a=>!e.has(a));this._updatedStickyColumnsParamsToReplay=this._updatedStickyColumnsParamsToReplay.filter(t=>!!t.rows.length)}_updateCachedSizes(r){let e=!1;for(let t of r){let a=t.borderBoxSize?.length?{width:t.borderBoxSize[0].inlineSize,height:t.borderBoxSize[0].blockSize}:{width:t.contentRect.width,height:t.contentRect.height};a.width!==this._elemSizeCache.get(t.target)?.width&&da(t.target)&&(e=!0),this._elemSizeCache.set(t.target,a)}e&&this._updatedStickyColumnsParamsToReplay.length&&(this._stickyColumnsReplayTimeout&&clearTimeout(this._stickyColumnsReplayTimeout),this._stickyColumnsReplayTimeout=setTimeout(()=>{if(!this._destroyed){for(let t of this._updatedStickyColumnsParamsToReplay)this.updateStickyColumns(t.rows,t.stickyStartStates,t.stickyEndStates,!0,!1);this._updatedStickyColumnsParamsToReplay=[],this._stickyColumnsReplayTimeout=null}},0))}};function da(n){return[`cdk-cell`,`cdk-header-cell`,`cdk-footer-cell`].some(r=>n.classList.contains(r))}function An(n){return Error(`Could not find column with id "${n}".`)}var we=new v(`STICKY_POSITIONING_LISTENER`);var at=(()=>{class n{viewContainer=m(Lr);elementRef=m(ge$1);constructor(){let e=m(j);e._rowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`rowOutlet`,``]]})}return n})();var ot=(()=>{class n{viewContainer=m(Lr);elementRef=m(ge$1);constructor(){let e=m(j);e._headerRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`headerRowOutlet`,``]]})}return n})();var it=(()=>{class n{viewContainer=m(Lr);elementRef=m(ge$1);constructor(){let e=m(j);e._footerRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`footerRowOutlet`,``]]})}return n})();var rt=(()=>{class n{viewContainer=m(Lr);elementRef=m(ge$1);constructor(){let e=m(j);e._noDataRowOutlet=this,e._outletAssigned()}static ɵfac=function(t){return new(t||n)};static ɵdir=Je$2({type:n,selectors:[[``,`noDataRowOutlet`,``]]})}return n})();var ct=(()=>{class n{_differs=m(Db);_changeDetectorRef=m(Eb);_elementRef=m(ge$1);_dir=m(vx,{optional:!0});_platform=m(Ne);_viewRepeater;_viewportRuler=m(fe);_injector=m(q);_virtualScrollViewport=m(Ko,{optional:!0,host:!0});_positionListener=m(we,{optional:!0})||m(we,{optional:!0,skipSelf:!0});_document=m(k);_data;_renderedRange;_onDestroy=new V;_renderRows;_renderChangeSubscription=null;_columnDefsByName=/* @__PURE__ */ new Map;_rowDefs;_headerRowDefs;_footerRowDefs;_dataDiffer;_defaultRowDef=null;_customColumnDefs=/* @__PURE__ */ new Set;_customRowDefs=/* @__PURE__ */ new Set;_customHeaderRowDefs=/* @__PURE__ */ new Set;_customFooterRowDefs=/* @__PURE__ */ new Set;_customNoDataRow=null;_headerRowDefChanged=!0;_footerRowDefChanged=!0;_stickyColumnStylesNeedReset=!0;_forceRecalculateCellWidths=!0;_cachedRenderRowsMap=/* @__PURE__ */ new Map;_rowDefsByView=/* @__PURE__ */ new WeakMap;_isNativeHtmlTable;_stickyStyler;stickyCssClass=`cdk-table-sticky`;needsPositionStickyOnElement=!0;_isServer;_isShowingNoDataRow=!1;_hasAllOutlets=!1;_hasInitialized=!1;_headerRowStickyUpdates=new V;_footerRowStickyUpdates=new V;_disableVirtualScrolling=!1;_getCellRole(){if(this._cellRoleInternal===void 0){let e=this._elementRef.nativeElement.getAttribute(`role`);return e===`grid`||e===`treegrid`?`gridcell`:`cell`}return this._cellRoleInternal}_cellRoleInternal=void 0;get trackBy(){return this._trackByFn}set trackBy(e){this._trackByFn=e}_trackByFn;get dataSource(){return this._dataSource}set dataSource(e){this._dataSource!==e&&(this._switchDataSource(e),this._changeDetectorRef.markForCheck())}_dataSource;_dataSourceChanges=new V;_dataStream=new V;get multiTemplateDataRows(){return this._multiTemplateDataRows}set multiTemplateDataRows(e){this._multiTemplateDataRows=e,this._rowOutlet&&this._rowOutlet.viewContainer.length&&(this._forceRenderDataRows(),this.updateStickyColumnStyles())}_multiTemplateDataRows=!1;get fixedLayout(){return this._virtualScrollEnabled()?!0:this._fixedLayout}set fixedLayout(e){this._fixedLayout=e,this._forceRecalculateCellWidths=!0,this._stickyColumnStylesNeedReset=!0}_fixedLayout=!1;recycleRows=!1;contentChanged=new Ae;viewChange=new dn({start:0,end:Number.MAX_VALUE});_rowOutlet;_headerRowOutlet;_footerRowOutlet;_noDataRowOutlet;_contentColumnDefs;_contentRowDefs;_contentHeaderRowDefs;_contentFooterRowDefs;_noDataRow;get renderedRows(){return this._renderRows}constructor(){m(new ub(`role`),{optional:!0})||this._elementRef.nativeElement.setAttribute(`role`,`table`),this._isServer=!this._platform.isBrowser,this._isNativeHtmlTable=this._elementRef.nativeElement.nodeName===`TABLE`,this._dataDiffer=this._differs.find([]).create((t,a)=>this.trackBy?this.trackBy(a.dataIndex,a.data):a)}ngOnInit(){this._setupStickyStyler(),this._viewportRuler.change().pipe(oo(this._onDestroy)).subscribe(()=>{this._forceRecalculateCellWidths=!0})}ngAfterContentInit(){this._viewRepeater=this.recycleRows||this._virtualScrollEnabled()?new Hi:new wn,this._virtualScrollEnabled()&&this._setupVirtualScrolling(this._virtualScrollViewport),this._hasInitialized=!0}ngAfterContentChecked(){this._canRender()&&this._render()}ngOnDestroy(){this._stickyStyler?.destroy(),[this._rowOutlet?.viewContainer,this._headerRowOutlet?.viewContainer,this._footerRowOutlet?.viewContainer,this._cachedRenderRowsMap,this._customColumnDefs,this._customRowDefs,this._customHeaderRowDefs,this._customFooterRowDefs,this._columnDefsByName].forEach(e=>{e?.clear()}),this._headerRowDefs=[],this._footerRowDefs=[],this._defaultRowDef=null,this._headerRowStickyUpdates.complete(),this._footerRowStickyUpdates.complete(),this._onDestroy.next(),this._onDestroy.complete(),bo(this.dataSource)&&this.dataSource.disconnect(this)}renderRows(){this._renderRows=this._getAllRenderRows();let e=this._dataDiffer.diff(this._renderRows);if(!e){this._updateNoDataRow(),this.contentChanged.next();return}let t=this._rowOutlet.viewContainer;this._viewRepeater.applyChanges(e,t,(a,o,i)=>this._getEmbeddedViewArgs(a.item,i),a=>a.item.data,a=>{if(a.operation===J.INSERTED&&a.context){this._renderCellTemplateForItem(a.record.item.rowDef,a.context);let o=t.get(a.record.currentIndex);this._rowDefsByView.set(o,a.record.item.rowDef)}}),e.forEachIdentityChange(a=>{let o=a.currentIndex,i=t.get(o);if(this._rowDefsByView.get(i)!==a.item.rowDef){t.remove(o);let c=this._renderRow(this._rowOutlet,a.item.rowDef,o,{$implicit:a.item.data});this._rowDefsByView.set(c,a.item.rowDef)}else i.context.$implicit=a.item.data}),this._updateRowIndexContext(),this._updateNoDataRow(),this.contentChanged.next(),this.updateStickyColumnStyles()}addColumnDef(e){this._customColumnDefs.add(e)}removeColumnDef(e){this._customColumnDefs.delete(e)}addRowDef(e){this._customRowDefs.add(e)}removeRowDef(e){this._customRowDefs.delete(e)}addHeaderRowDef(e){this._customHeaderRowDefs.add(e),this._headerRowDefChanged=!0}removeHeaderRowDef(e){this._customHeaderRowDefs.delete(e),this._headerRowDefChanged=!0}addFooterRowDef(e){this._customFooterRowDefs.add(e),this._footerRowDefChanged=!0}removeFooterRowDef(e){this._customFooterRowDefs.delete(e),this._footerRowDefChanged=!0}setNoDataRow(e){this._customNoDataRow=e}updateStickyHeaderRowStyles(){let e=this._getRenderedRows(this._headerRowOutlet);if(this._isNativeHtmlTable){let a=Bn(this._headerRowOutlet,`thead`);a&&(a.style.display=e.length?``:`none`)}let t=this._headerRowDefs.map(a=>a.sticky);this._stickyStyler.clearStickyPositioning(e,[`top`]),this._stickyStyler.stickRows(e,t,`top`),this._headerRowDefs.forEach(a=>a.resetStickyChanged())}updateStickyFooterRowStyles(){let e=this._getRenderedRows(this._footerRowOutlet);if(this._isNativeHtmlTable){let a=Bn(this._footerRowOutlet,`tfoot`);a&&(a.style.display=e.length?``:`none`)}let t=this._footerRowDefs.map(a=>a.sticky);this._stickyStyler.clearStickyPositioning(e,[`bottom`]),this._stickyStyler.stickRows(e,t,`bottom`),this._stickyStyler.updateStickyFooterContainer(this._elementRef.nativeElement,t),this._footerRowDefs.forEach(a=>a.resetStickyChanged())}updateStickyColumnStyles(){let e=this._getRenderedRows(this._headerRowOutlet),t=this._getRenderedRows(this._rowOutlet),a=this._getRenderedRows(this._footerRowOutlet);(this._isNativeHtmlTable&&!this.fixedLayout||this._stickyColumnStylesNeedReset)&&(this._stickyStyler.clearStickyPositioning([...e,...t,...a],[`left`,`right`]),this._stickyColumnStylesNeedReset=!1),e.forEach((o,i)=>{this._addStickyColumnStyles([o],this._headerRowDefs[i])}),this._rowDefs.forEach(o=>{let i=[];for(let c=0;c<t.length;c++)this._renderRows[c].rowDef===o&&i.push(t[c]);this._addStickyColumnStyles(i,o)}),a.forEach((o,i)=>{this._addStickyColumnStyles([o],this._footerRowDefs[i])}),Array.from(this._columnDefsByName.values()).forEach(o=>o.resetStickyChanged())}stickyColumnsUpdated(e){this._positionListener?.stickyColumnsUpdated(e)}stickyEndColumnsUpdated(e){this._positionListener?.stickyEndColumnsUpdated(e)}stickyHeaderRowsUpdated(e){this._headerRowStickyUpdates.next(e),this._positionListener?.stickyHeaderRowsUpdated(e)}stickyFooterRowsUpdated(e){this._footerRowStickyUpdates.next(e),this._positionListener?.stickyFooterRowsUpdated(e)}_outletAssigned(){!this._hasAllOutlets&&this._rowOutlet&&this._headerRowOutlet&&this._footerRowOutlet&&this._noDataRowOutlet&&(this._hasAllOutlets=!0,this._canRender()&&this._render())}_canRender(){return this._hasAllOutlets&&this._hasInitialized}_render(){this._cacheRowDefs(),this._cacheColumnDefs(),!this._headerRowDefs.length&&!this._footerRowDefs.length&&this._rowDefs.length;let t=this._renderUpdatedColumns()||this._headerRowDefChanged||this._footerRowDefChanged;this._stickyColumnStylesNeedReset=this._stickyColumnStylesNeedReset||t,this._forceRecalculateCellWidths=t,this._headerRowDefChanged&&(this._forceRenderHeaderRows(),this._headerRowDefChanged=!1),this._footerRowDefChanged&&(this._forceRenderFooterRows(),this._footerRowDefChanged=!1),this.dataSource&&this._rowDefs.length>0&&!this._renderChangeSubscription?this._observeRenderChanges():this._stickyColumnStylesNeedReset&&this.updateStickyColumnStyles(),this._checkStickyStates()}_getAllRenderRows(){if(!Array.isArray(this._data)||!this._renderedRange)return[];let e=[],t=Math.min(this._data.length,this._renderedRange.end),a=this._cachedRenderRowsMap;this._cachedRenderRowsMap=/* @__PURE__ */ new Map;for(let o=this._renderedRange.start;o<t;o++){let i=this._data[o],c=this._getRenderRowsForData(i,o,a.get(i));this._cachedRenderRowsMap.has(i)||this._cachedRenderRowsMap.set(i,/* @__PURE__ */ new WeakMap);for(let l=0;l<c.length;l++){let h=c[l],p=this._cachedRenderRowsMap.get(h.data);p.has(h.rowDef)?p.get(h.rowDef).push(h):p.set(h.rowDef,[h]),e.push(h)}}return e}_getRenderRowsForData(e,t,a){return this._getRowDefs(e,t).map(i=>{let c=a&&a.has(i)?a.get(i):[];if(c.length){let l=c.shift();return l.dataIndex=t,l}else return{data:e,rowDef:i,dataIndex:t}})}_cacheColumnDefs(){this._columnDefsByName.clear(),ze(this._getOwnDefs(this._contentColumnDefs),this._customColumnDefs).forEach(t=>{this._columnDefsByName.has(t.name),this._columnDefsByName.set(t.name,t)})}_cacheRowDefs(){this._headerRowDefs=ze(this._getOwnDefs(this._contentHeaderRowDefs),this._customHeaderRowDefs),this._footerRowDefs=ze(this._getOwnDefs(this._contentFooterRowDefs),this._customFooterRowDefs),this._rowDefs=ze(this._getOwnDefs(this._contentRowDefs),this._customRowDefs);let e=this._rowDefs.filter(t=>!t.when);this._defaultRowDef=e[0]}_renderUpdatedColumns(){let e=(i,c)=>{let l=!!c.getColumnsDiff();return i||l},t=this._rowDefs.reduce(e,!1);t&&this._forceRenderDataRows();let a=this._headerRowDefs.reduce(e,!1);a&&this._forceRenderHeaderRows();let o=this._footerRowDefs.reduce(e,!1);return o&&this._forceRenderFooterRows(),t||a||o}_switchDataSource(e){this._data=[],bo(this.dataSource)&&this.dataSource.disconnect(this),this._renderChangeSubscription&&(this._renderChangeSubscription.unsubscribe(),this._renderChangeSubscription=null),e||(this._dataDiffer&&this._dataDiffer.diff([]),this._rowOutlet&&this._rowOutlet.viewContainer.clear()),this._dataSource=e}_observeRenderChanges(){if(!this.dataSource)return;let e;bo(this.dataSource)?e=this.dataSource.connect(this):Fv(this.dataSource)?e=this.dataSource:Array.isArray(this.dataSource)&&(e=Zr(this.dataSource)),this._renderChangeSubscription=rc([e,this.viewChange]).pipe(oo(this._onDestroy)).subscribe(([t,a])=>{this._data=t||[],this._renderedRange=a,this._dataStream.next(t),this.renderRows()})}_forceRenderHeaderRows(){this._headerRowOutlet.viewContainer.length>0&&this._headerRowOutlet.viewContainer.clear(),this._headerRowDefs.forEach((e,t)=>this._renderRow(this._headerRowOutlet,e,t)),this.updateStickyHeaderRowStyles()}_forceRenderFooterRows(){this._footerRowOutlet.viewContainer.length>0&&this._footerRowOutlet.viewContainer.clear(),this._footerRowDefs.forEach((e,t)=>this._renderRow(this._footerRowOutlet,e,t)),this.updateStickyFooterRowStyles()}_addStickyColumnStyles(e,t){let a=Array.from(t?.columns||[]).map(c=>{let l=this._columnDefsByName.get(c);if(!l)throw An(c);return l}),o=a.map(c=>c.sticky),i=a.map(c=>c.stickyEnd);this._stickyStyler.updateStickyColumns(e,o,i,!this.fixedLayout||this._forceRecalculateCellWidths)}_getRenderedRows(e){let t=[];for(let a=0;a<e.viewContainer.length;a++){let o=e.viewContainer.get(a);t.push(o.rootNodes[0])}return t}_getRowDefs(e,t){if(this._rowDefs.length===1)return[this._rowDefs[0]];let a=[];if(this.multiTemplateDataRows)a=this._rowDefs.filter(o=>!o.when||o.when(t,e));else{let o=this._rowDefs.find(i=>i.when&&i.when(t,e))||this._defaultRowDef;o&&a.push(o)}return a.length,a}_getEmbeddedViewArgs(e,t){let a=e.rowDef,o={$implicit:e.data};return{templateRef:a.template,context:o,index:t}}_renderRow(e,t,a,o={}){let i=e.viewContainer.createEmbeddedView(t.template,o,a);return this._renderCellTemplateForItem(t,o),i}_renderCellTemplateForItem(e,t){for(let a of this._getCellTemplates(e))ie.mostRecentCellOutlet&&ie.mostRecentCellOutlet._viewContainer.createEmbeddedView(a,t);this._changeDetectorRef.markForCheck()}_updateRowIndexContext(){let e=this._rowOutlet.viewContainer;for(let t=0,a=e.length;t<a;t++){let i=e.get(t).context;i.count=a,i.first=t===0,i.last=t===a-1,i.even=t%2===0,i.odd=!i.even,this.multiTemplateDataRows?(i.dataIndex=this._renderRows[t].dataIndex,i.renderIndex=t):i.index=this._renderRows[t].dataIndex}}_getCellTemplates(e){return!e||!e.columns?[]:Array.from(e.columns,t=>{let a=this._columnDefsByName.get(t);if(!a)throw An(t);return e.extractCellTemplate(a)})}_forceRenderDataRows(){this._dataDiffer.diff([]),this._rowOutlet.viewContainer.clear(),this.renderRows()}_checkStickyStates(){let e=(t,a)=>t||a.hasStickyChanged();this._headerRowDefs.reduce(e,!1)&&this.updateStickyHeaderRowStyles(),this._footerRowDefs.reduce(e,!1)&&this.updateStickyFooterRowStyles(),Array.from(this._columnDefsByName.values()).reduce(e,!1)&&(this._stickyColumnStylesNeedReset=!0,this.updateStickyColumnStyles())}_setupStickyStyler(){let e=this._dir?this._dir.value:`ltr`,t=this._injector;this._stickyStyler=new Ye(this._isNativeHtmlTable,this.stickyCssClass,this._platform.isBrowser,this.needsPositionStickyOnElement,e,this,t),(this._dir?this._dir.change:Zr()).pipe(oo(this._onDestroy)).subscribe(a=>{this._stickyStyler.direction=a,this.updateStickyColumnStyles()})}_setupVirtualScrolling(e){let t=typeof requestAnimationFrame<`u`?Ov:Rv;this.viewChange.next({start:0,end:0}),e.renderedRangeStream.pipe(Vv(0,t),oo(this._onDestroy)).subscribe(this.viewChange),e.attach({dataStream:this._dataStream,measureRangeSize:(a,o)=>this._measureRangeSize(a,o)}),rc([e.renderedContentOffset,this._headerRowStickyUpdates]).pipe(oo(this._onDestroy)).subscribe(([a,o])=>{if(!(!o.sizes||!o.offsets||!o.elements))for(let i=0;i<o.elements.length;i++){let c=o.elements[i];if(c){let l=o.offsets[i],h=a!==0?Math.max(a-l,l):-l;for(let p of c)p.style.top=`${-h}px`}}}),rc([e.renderedContentOffset,this._footerRowStickyUpdates]).pipe(oo(this._onDestroy)).subscribe(([a,o])=>{if(!(!o.sizes||!o.offsets||!o.elements))for(let i=0;i<o.elements.length;i++){let c=o.elements[i];if(c)for(let l of c)l.style.bottom=`${a+o.offsets[i]}px`}})}_getOwnDefs(e){return e.filter(t=>!t._table||t._table===this)}_updateNoDataRow(){let e=this._customNoDataRow||this._noDataRow;if(!e)return;let t=this._rowOutlet.viewContainer.length===0;if(t===this._isShowingNoDataRow)return;let a=this._noDataRowOutlet.viewContainer;if(t){let o=a.createEmbeddedView(e.templateRef),i=o.rootNodes[0];if(o.rootNodes.length===1&&i?.nodeType===this._document.ELEMENT_NODE){i.setAttribute(`role`,`row`),i.classList.add(...e._contentClassNames);let c=i.querySelectorAll(e._cellSelector);for(let l=0;l<c.length;l++)c[l].classList.add(...e._cellClassNames)}}else a.clear();this._isShowingNoDataRow=t,this._changeDetectorRef.markForCheck()}_measureRangeSize(e,t){if(e.start>=e.end||t!==`vertical`)return 0;let a=this.viewChange.value,o=this._rowOutlet.viewContainer;e.start<a.start||(e.end,a.end);let i=e.start-a.start,c=e.end-e.start,l,h;for(let x=0;x<c;x++){let v=o.get(x+i);if(v&&v.rootNodes.length){l=h=v.rootNodes[0];break}}for(let x=c-1;x>-1;x--){let v=o.get(x+i);if(v&&v.rootNodes.length){h=v.rootNodes[v.rootNodes.length-1];break}}let p=l?.getBoundingClientRect?.(),k=h?.getBoundingClientRect?.();return p&&k?k.bottom-p.top:0}_virtualScrollEnabled(){return!this._disableVirtualScrolling&&this._virtualScrollViewport!=null}static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){let e=[[[`caption`]],[[`colgroup`],[`col`]],`*`],t=[`caption`,`colgroup, col`,`*`];function a(c,l){c&1&&At(0,2)}function o(c,l){c&1&&(ea$1(0,`thead`,0),Ug(1,1),ud(),ea$1(2,`tbody`,0),Ug(3,2)(4,3),ud(),ea$1(5,`tfoot`,0),Ug(6,4),ud())}function i(c,l){c&1&&Ug(0,1)(1,2)(2,3)(3,4)}return Xe({type:n,selectors:[[`cdk-table`],[`table`,`cdk-table`,``]],contentQueries:function(l,h,p){if(l&1&&Gg(p,Hn,5)(p,ue,5)(p,Ve,5)(p,De,5)(p,et,5),l&2){let k;tC(k=nC())&&(h._noDataRow=k.first),tC(k=nC())&&(h._contentColumnDefs=k),tC(k=nC())&&(h._contentRowDefs=k),tC(k=nC())&&(h._contentHeaderRowDefs=k),tC(k=nC())&&(h._contentFooterRowDefs=k)}},hostAttrs:[1,`cdk-table`],hostVars:2,hostBindings:function(l,h){l&2&&nn(`cdk-table-fixed-layout`,h.fixedLayout)},inputs:{trackBy:`trackBy`,dataSource:`dataSource`,multiTemplateDataRows:[2,`multiTemplateDataRows`,`multiTemplateDataRows`,rn],fixedLayout:[2,`fixedLayout`,`fixedLayout`,rn],recycleRows:[2,`recycleRows`,`recycleRows`,rn]},outputs:{contentChanged:`contentChanged`},exportAs:[`cdkTable`],features:[sb([{provide:j,useExisting:n},{provide:we,useValue:null}])],ngContentSelectors:t,decls:5,vars:2,consts:[[`role`,`rowgroup`],[`headerRowOutlet`,``],[`rowOutlet`,``],[`noDataRowOutlet`,``],[`footerRowOutlet`,``]],template:function(l,h){l&1&&(Jo(e),At(0),At(1,1),Qo(2,a,1,0),Qo(3,o,7,0)(4,i,4,0)),l&2&&(zo(2),Xo(h._isServer?2:-1),zo(),Xo(h._isNativeHtmlTable?3:4))},dependencies:[ot,at,rt,it],styles:[`.cdk-table-fixed-layout {
  table-layout: fixed;
}
`],encapsulation:2,changeDetection:1})})()}return n})();function ze(n,r){return n.concat(Array.from(r))}function Bn(n,r){let e=r.toUpperCase(),t=n.viewContainer.element.nativeElement;for(;t;){let a=t.nodeType===1?t.nodeName:null;if(a===e)return t;if(a===`TABLE`)break;t=t.parentNode}return null}var Vn=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Ie$1({type:n});static ɵinj=he({imports:[Nt]})}return n})();var jn=(()=>{class n extends ct{stickyCssClass=`mat-mdc-table-sticky`;needsPositionStickyOnElement=!1;static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵcmp=(function(){let e=[[[`caption`]],[[`colgroup`],[`col`]],`*`],t=[`caption`,`colgroup, col`,`*`];function a(c,l){c&1&&At(0,2)}function o(c,l){c&1&&(ea$1(0,`thead`,0),Ug(1,1),ud(),ea$1(2,`tbody`,2),Ug(3,3)(4,4),ud(),ea$1(5,`tfoot`,0),Ug(6,5),ud())}function i(c,l){c&1&&Ug(0,1)(1,3)(2,4)(3,5)}return Xe({type:n,selectors:[[`mat-table`],[`table`,`mat-table`,``]],hostAttrs:[1,`mat-mdc-table`,`mdc-data-table__table`],hostVars:2,hostBindings:function(l,h){l&2&&nn(`mat-table-fixed-layout`,h.fixedLayout)},exportAs:[`matTable`],features:[sb([{provide:ct,useExisting:n},{provide:j,useExisting:n},{provide:we,useValue:null}]),jr],ngContentSelectors:t,decls:5,vars:2,consts:[[`role`,`rowgroup`],[`headerRowOutlet`,``],[`role`,`rowgroup`,1,`mdc-data-table__content`],[`rowOutlet`,``],[`noDataRowOutlet`,``],[`footerRowOutlet`,``]],template:function(l,h){l&1&&(Jo(e),At(0),At(1,1),Qo(2,a,1,0),Qo(3,o,7,0)(4,i,4,0)),l&2&&(zo(2),Xo(h._isServer?2:-1),zo(),Xo(h._isNativeHtmlTable?3:4))},dependencies:[ot,at,rt,it],styles:[`.mat-mdc-table-sticky {
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
`],encapsulation:2,changeDetection:1})})()}return n})();var Un=(()=>{class n extends Le{static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[``,`matCellDef`,``]],features:[sb([{provide:Le,useExisting:n}]),jr]})}return n})();var qn=(()=>{class n extends He{static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[``,`matHeaderCellDef`,``]],features:[sb([{provide:He,useExisting:n}]),jr]})}return n})();var $n=(()=>{class n extends ue{get name(){return this._name}set name(e){this._setNameInput(e)}_updateColumnCssClassName(){super._updateColumnCssClassName(),this._columnCssClassName.push(`mat-column-${this.cssClassFriendlyName}`)}static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[``,`matColumnDef`,``]],inputs:{name:[0,`matColumnDef`,`name`]},features:[sb([{provide:ue,useExisting:n}]),jr]})}return n})();var Qn=(()=>{class n extends Pn{static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[`mat-header-cell`],[`th`,`mat-header-cell`,``]],hostAttrs:[`role`,`columnheader`,1,`mat-mdc-header-cell`,`mdc-data-table__header-cell`],features:[jr]})}return n})();var Wn=(()=>{class n extends Ln{static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[`mat-cell`],[`td`,`mat-cell`,``]],hostAttrs:[1,`mat-mdc-cell`,`mdc-data-table__cell`],features:[jr]})}return n})();var Gn=(()=>{class n extends De{static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[``,`matHeaderRowDef`,``]],inputs:{columns:[0,`matHeaderRowDef`,`columns`],sticky:[2,`matHeaderRowDefSticky`,`sticky`,rn]},features:[sb([{provide:De,useExisting:n}]),jr]})}return n})();var Xn=(()=>{class n extends Ve{static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵdir=Je$2({type:n,selectors:[[``,`matRowDef`,``]],inputs:{columns:[0,`matRowDefColumns`,`columns`],when:[0,`matRowDefWhen`,`when`]},features:[sb([{provide:Ve,useExisting:n}]),jr]})}return n})();var Kn=(()=>{class n extends tt{static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵcmp=Xe({type:n,selectors:[[`mat-header-row`],[`tr`,`mat-header-row`,``]],hostAttrs:[`role`,`row`,1,`mat-mdc-header-row`,`mdc-data-table__header-row`],exportAs:[`matHeaderRow`],features:[sb([{provide:tt,useExisting:n}]),jr],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,a){t&1&&Ug(0,0)},dependencies:[ie],encapsulation:2,changeDetection:1})}return n})();var Zn=(()=>{class n extends nt{static ɵfac=(()=>{let e;return function(a){return(e||(e=ih(n)))(a||n)}})();static ɵcmp=Xe({type:n,selectors:[[`mat-row`],[`tr`,`mat-row`,``]],hostAttrs:[`role`,`row`,1,`mat-mdc-row`,`mdc-data-table__row`],exportAs:[`matRow`],features:[sb([{provide:nt,useExisting:n}]),jr],decls:1,vars:0,consts:[[`cdkCellOutlet`,``]],template:function(t,a){t&1&&Ug(0,0)},dependencies:[ie],encapsulation:2,changeDetection:1})}return n})();var Yn=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Ie$1({type:n});static ɵinj=he({imports:[Vn,Ga]})}return n})();var je=[{valor:`cartao`,rotulo:`Cartão`},{valor:`dinheiro`,rotulo:`Dinheiro`},{valor:`conta`,rotulo:`Conta`}];var Jn=(()=>{class n{labelPosition=`after`;static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){return Xe({type:n,selectors:[[``,`mat-internal-form-field`,``]],hostAttrs:[1,`mdc-form-field`,`mat-internal-form-field`],hostVars:2,hostBindings:function(a,o){a&2&&nn(`mdc-form-field--align-end`,o.labelPosition===`before`)},inputs:{labelPosition:`labelPosition`},ngContentSelectors:[`*`],decls:1,vars:0,template:function(a,o){a&1&&(Jo(),At(0))},styles:[`.mat-internal-form-field {
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}
.mat-internal-form-field > label, .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
  order: 0;
}
[dir=rtl] .mat-internal-form-field > label, [dir=rtl] .mat-internal-form-field > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
}

.mdc-form-field--align-end > label, .mdc-form-field--align-end > .mat-internal-form-field-label {
  margin-left: auto;
  margin-right: 0;
  padding-left: 0;
  padding-right: 4px;
  order: -1;
}
[dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end label, [dir=rtl] .mdc-form-field--align-end .mdc-form-field--align-end .mat-internal-form-field-label {
  margin-left: 0;
  margin-right: auto;
  padding-left: 4px;
  padding-right: 0;
}
`],encapsulation:2})})()}return n})();var st={color:`accent`,clickAction:`check-indeterminate`,disabledInteractive:!1};var ha=new v(`mat-checkbox-default-options`,{providedIn:`root`,factory:()=>st});var D=(function(n){return n[n.Init=0]=`Init`,n[n.Checked=1]=`Checked`,n[n.Unchecked=2]=`Unchecked`,n[n.Indeterminate=3]=`Indeterminate`,n})(D||{});var lt=class{source;checked};var dt=(()=>{class n{_elementRef=m(ge$1);_changeDetectorRef=m(Eb);_ngZone=m(j$1);_animationsDisabled=Gr();_options=m(ha,{optional:!0});_injector=m(q);_signalFormField=null;focus(){this._inputElement.nativeElement.focus()}_createChangeEvent(e){let t=new lt;return t.source=this,t.checked=e,t}_getAnimationTargetElement(){return this._inputElement?.nativeElement}_animationClasses={uncheckedToChecked:`mdc-checkbox--anim-unchecked-checked`,uncheckedToIndeterminate:`mdc-checkbox--anim-unchecked-indeterminate`,checkedToUnchecked:`mdc-checkbox--anim-checked-unchecked`,checkedToIndeterminate:`mdc-checkbox--anim-checked-indeterminate`,indeterminateToChecked:`mdc-checkbox--anim-indeterminate-checked`,indeterminateToUnchecked:`mdc-checkbox--anim-indeterminate-unchecked`};ariaLabel=``;ariaLabelledby=null;ariaDescribedby;ariaExpanded;ariaControls;ariaOwns;_uniqueId;id;get inputId(){return`${this.id||this._uniqueId}-input`}required=!1;labelPosition=`after`;name=null;change=new Ae;indeterminateChange=new Ae;value;disableRipple=!1;_inputElement;tabIndex;color;disabledInteractive;_onTouched=()=>{};_currentAnimationClass=``;_currentCheckState=D.Init;_controlValueAccessorChangeFn=()=>{};_validatorChangeFn=()=>{};constructor(){m(Kn$1).load(Qy);let e=m(new ub(`tabindex`),{optional:!0});this._options=this._options||st,this.color=this._options.color||st.color,this.tabIndex=e==null?0:parseInt(e)||0,this.id=this._uniqueId=m(ef).getId(`mat-mdc-checkbox-`),this.disabledInteractive=this._options?.disabledInteractive??!1}ngOnChanges(e){e.required&&this._validatorChangeFn()}ngOnInit(){this._signalFormField=this._injector.get(Ln$1,void 0,{optional:!0,self:!0})}ngAfterViewInit(){this._syncIndeterminate(this.indeterminate)}get checked(){return this._checked}set checked(e){e!=this.checked&&(this._checked=e,this._changeDetectorRef.markForCheck())}_checked=!1;get disabled(){return this._disabled}set disabled(e){e!==this.disabled&&(this._disabled=e,this._changeDetectorRef.markForCheck())}_disabled=!1;get indeterminate(){return this._indeterminate()}set indeterminate(e){let t=e!=this._indeterminate();this._indeterminate.set(e),t&&(e?this._transitionCheckState(D.Indeterminate):this._transitionCheckState(this.checked?D.Checked:D.Unchecked),this.indeterminateChange.emit(e)),this._syncIndeterminate(e)}_indeterminate=It(!1);_isRippleDisabled(){return this.disableRipple||this.disabled}_onLabelTextChange(){this._changeDetectorRef.detectChanges()}writeValue(e){this.checked=!!e}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this._onTouched=e}setDisabledState(e){this.disabled=e}validate(e){return this.required&&e.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(e){this._validatorChangeFn=e}_transitionCheckState(e){let t=this._currentCheckState,a=this._getAnimationTargetElement();if(!(t===e||!a)&&(this._currentAnimationClass&&a.classList.remove(this._currentAnimationClass),this._currentAnimationClass=this._getAnimationClassForCheckStateTransition(t,e),this._currentCheckState=e,this._currentAnimationClass.length>0)){a.classList.add(this._currentAnimationClass);let o=this._currentAnimationClass;this._ngZone.runOutsideAngular(()=>{setTimeout(()=>{a.classList.remove(o)},1e3)})}}_emitChangeEvent(){this._controlValueAccessorChangeFn(this.checked),this.change.emit(this._createChangeEvent(this.checked)),this._inputElement&&(this._inputElement.nativeElement.checked=this.checked)}toggle(){this.checked=!this.checked,this._controlValueAccessorChangeFn(this.checked)}_handleInputClick(){let e=this._options?.clickAction;!this.disabled&&e!==`noop`?(this.indeterminate&&e!==`check`&&Promise.resolve().then(()=>{this._indeterminate.set(!1),this.indeterminateChange.emit(!1)}),this._checked=!this._checked,this._transitionCheckState(this._checked?D.Checked:D.Unchecked),this._emitChangeEvent()):(this.disabled&&this.disabledInteractive||!this.disabled&&e===`noop`)&&(this._inputElement.nativeElement.checked=this.checked,this._inputElement.nativeElement.indeterminate=this.indeterminate)}_onInteractionEvent(e){e.stopPropagation()}_onBlur(){Promise.resolve().then(()=>{this._onTouched(),this._changeDetectorRef.markForCheck()})}_getAnimationClassForCheckStateTransition(e,t){if(this._animationsDisabled)return``;switch(e){case D.Init:if(t===D.Checked)return this._animationClasses.uncheckedToChecked;if(t==D.Indeterminate)return this._checked?this._animationClasses.checkedToIndeterminate:this._animationClasses.uncheckedToIndeterminate;break;case D.Unchecked:return t===D.Checked?this._animationClasses.uncheckedToChecked:this._animationClasses.uncheckedToIndeterminate;case D.Checked:return t===D.Unchecked?this._animationClasses.checkedToUnchecked:this._animationClasses.checkedToIndeterminate;case D.Indeterminate:return t===D.Checked?this._animationClasses.indeterminateToChecked:this._animationClasses.indeterminateToUnchecked}return``}_syncIndeterminate(e){let t=this._inputElement;t&&(t.nativeElement.indeterminate=e)}_onInputClick(){this._handleInputClick()}_preventBubblingFromLabel(e){e.target&&this._inputElement&&e.target!==this._inputElement.nativeElement&&e.stopPropagation()}static ɵfac=function(t){return new(t||n)};static ɵcmp=(function(){let e=[`input`];return Xe({type:n,selectors:[[`mat-checkbox`]],viewQuery:function(o,i){if(o&1&&Wg(e,5),o&2){let c;tC(c=nC())&&(i._inputElement=c.first)}},hostAttrs:[1,`mat-mdc-checkbox`],hostVars:16,hostBindings:function(o,i){o&2&&($g(`id`,i.id),Ko$1(`tabindex`,null)(`aria-label`,null)(`aria-labelledby`,null),pd(i.color?`mat-`+i.color:`mat-accent`),nn(`_mat-animation-noopable`,i._animationsDisabled)(`mdc-checkbox--disabled`,i.disabled)(`mat-mdc-checkbox-disabled`,i.disabled)(`mat-mdc-checkbox-checked`,i.checked)(`mat-mdc-checkbox-disabled-interactive`,i.disabledInteractive))},inputs:{ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],ariaExpanded:[2,`aria-expanded`,`ariaExpanded`,rn],ariaControls:[0,`aria-controls`,`ariaControls`],ariaOwns:[0,`aria-owns`,`ariaOwns`],id:`id`,required:[2,`required`,`required`,rn],labelPosition:`labelPosition`,name:`name`,value:`value`,disableRipple:[2,`disableRipple`,`disableRipple`,rn],tabIndex:[2,`tabIndex`,`tabIndex`,a=>a==null?void 0:_d(a)],color:`color`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,rn],checked:[2,`checked`,`checked`,rn],disabled:[2,`disabled`,`disabled`,rn],indeterminate:[2,`indeterminate`,`indeterminate`,rn]},outputs:{change:`change`,indeterminateChange:`indeterminateChange`},exportAs:[`matCheckbox`],features:[sb([{provide:mt,useExisting:ss(()=>n),multi:!0},{provide:he$1,useExisting:n,multi:!0}]),ra$1],ngContentSelectors:[`*`],decls:15,vars:23,consts:[[`checkbox`,``],[`input`,``],[`label`,``],[`mat-internal-form-field`,``,3,`click`,`labelPosition`,`for`],[1,`mdc-checkbox`],[`aria-hidden`,`true`,1,`mat-mdc-checkbox-touch-target`],[`type`,`checkbox`,1,`mdc-checkbox__native-control`,3,`blur`,`click`,`change`,`checked`,`indeterminate`,`disabled`,`id`,`required`,`tabIndex`],[`aria-hidden`,`true`,1,`mdc-checkbox__ripple`],[`aria-hidden`,`true`,1,`mdc-checkbox__background`],[`focusable`,`false`,`viewBox`,`0 0 24 24`,1,`mdc-checkbox__checkmark`],[`fill`,`none`,`d`,`M1.73,12.91 8.1,19.28 22.79,4.59`,1,`mdc-checkbox__checkmark-path`],[1,`mdc-checkbox__mixedmark`],[`mat-ripple`,``,`aria-hidden`,`true`,1,`mat-mdc-checkbox-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mat-internal-form-field-label`,`mdc-label`]],template:function(o,i){if(o&1&&(Jo(),ea$1(0,`label`,3),zg(`click`,function(l){return i._preventBubblingFromLabel(l)}),ea$1(1,`span`,4,0),Vg(3,`span`,5),ea$1(4,`input`,6,1),zg(`blur`,function(){return i._onBlur()})(`click`,function(){return i._onInputClick()})(`change`,function(l){return i._onInteractionEvent(l)}),ud(),Vg(6,`span`,7),ea$1(7,`span`,8),zp(),ea$1(8,`svg`,9),Vg(9,`path`,10),ud(),Gp(),Vg(10,`span`,11),ud(),Vg(11,`span`,12),ud(),ea$1(12,`span`,13,2),At(14),ud()()),o&2){let c=oC(2);Bg(`labelPosition`,i.labelPosition)(`for`,i.inputId),zo(4),nn(`mdc-checkbox--selected`,i.checked),Bg(`checked`,i.checked)(`indeterminate`,i.indeterminate)(`disabled`,i.disabled&&!i.disabledInteractive)(`id`,i.inputId)(`required`,i.required)(`tabIndex`,i.disabled&&!i.disabledInteractive?-1:i.tabIndex),Ko$1(`aria-label`,i.ariaLabel||null)(`aria-labelledby`,i.ariaLabelledby)(`aria-describedby`,i.ariaDescribedby)(`aria-checked`,i.indeterminate?`mixed`:null)(`aria-controls`,i.ariaControls)(`aria-disabled`,i.disabled&&i.disabledInteractive?!0:null)(`aria-expanded`,i.ariaExpanded)(`aria-owns`,i.ariaOwns)(`name`,i.name)(`value`,i.value),zo(7),Bg(`matRippleTrigger`,c)(`matRippleDisabled`,i.disableRipple||i.disabled)(`matRippleCentered`,!0)}},dependencies:[e3,Jn],styles:[`.mdc-checkbox {
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
`],encapsulation:2})})()}return n})();var ea=(()=>{class n{static ɵfac=function(t){return new(t||n)};static ɵmod=Ie$1({type:n});static ɵinj=he({imports:[dt,Ga]})}return n})();var pa=(n,r)=>r.valor;function ka(n,r){n&1&&(ea$1(0,`mat-error`),SC(1,`Informe o nome.`),ud())}function _a(n,r){if(n&1&&(ea$1(0,`mat-option`,5),SC(1),ud()),n&2){let e=r.$implicit;Bg(`value`,e.valor),zo(),tb(e.rotulo)}}function ya(n,r){n&1&&(ea$1(0,`mat-error`),SC(1,`Entre 1 e 31.`),ud())}function ga(n,r){n&1&&(ea$1(0,`mat-error`),SC(1,`Entre 1 e 31.`),ud())}function xa(n,r){if(n&1&&(ea$1(0,`div`,6)(1,`mat-form-field`)(2,`mat-label`),SC(3,`Dia de fechamento`),ud(),ea$1(4,`input`,13),Sw(),ud(),Qo(5,ya,2,0,`mat-error`),ud(),ea$1(6,`mat-form-field`)(7,`mat-label`),SC(8,`Dia de vencimento`),ud(),ea$1(9,`input`,14),Sw(),ud(),Qo(10,ga,2,0,`mat-error`),ud()()),n&2){let e=XI();zo(4),xw(),zo(),Xo(e.form.controls.dia_fechamento.invalid?5:-1),zo(4),xw(),zo(),Xo(e.form.controls.dia_vencimento.invalid?10:-1)}}function va(n,r){n&1&&(ea$1(0,`mat-checkbox`,8),Sw(),SC(1,`Ativa`),ud()),n&2&&xw()}function Ca(n,r){n&1&&(ea$1(0,`p`,9),SC(1),ud()),n&2&&(zo(),tb(r))}var Ue=[Ne$1.min(1),Ne$1.max(31)];var qe=class n{fontes=m(Mn);dialogRef=m(Je$1);fonte=m(Gt);tipos=je;salvando=It(!1);erro=It(null);form=m(Or).group({nome:[this.fonte?.nome??``,[Ne$1.required,Ne$1.maxLength(60)]],tipo:[this.fonte?.tipo??`cartao`,Ne$1.required],dia_fechamento:[this.fonte?.dia_fechamento,Ue],dia_vencimento:[this.fonte?.dia_vencimento,Ue],ordem:[this.fonte?.ordem??0,[Ne$1.min(0)]],ativa:[this.fonte?.ativa??!0]});eCartao=go(this.form.controls.tipo.valueChanges,{initialValue:this.form.controls.tipo.value});constructor(){this.ajustarDiasObrigatorios(this.form.controls.tipo.value),this.form.controls.tipo.valueChanges.subscribe(r=>this.ajustarDiasObrigatorios(r))}salvar(){if(this.form.invalid||this.salvando()){this.form.markAllAsTouched();return}this.salvando.set(!0),this.erro.set(null);let r=this.form.getRawValue();(this.fonte?this.fontes.atualizar(this.fonte.id,r):this.fontes.criar(r)).subscribe({next:t=>this.dialogRef.close(t),error:t=>{this.salvando.set(!1),this.erro.set(Ys(t))}})}ajustarDiasObrigatorios(r){for(let e of[this.form.controls.dia_fechamento,this.form.controls.dia_vencimento])e.setValidators(r===`cartao`?[Ne$1.required,...Ue]:Ue),r!==`cartao`&&e.setValue(null),e.updateValueAndValidity({emitEvent:!1})}static ɵfac=function(e){return new(e||n)};static ɵcmp=Xe({type:n,selectors:[[`app-form-fonte`]],decls:29,vars:7,consts:[[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-fonte`],[`matInput`,``,`formControlName`,`nome`,`placeholder`,`Ex.: Bradesco 9241`],[`formControlName`,`tipo`],[3,`value`],[1,`form-fonte__dias`],[`matInput`,``,`type`,`number`,`min`,`0`,`formControlName`,`ordem`],[`formControlName`,`ativa`],[`role`,`alert`,1,`form-fonte__erro`],[`align`,`end`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`matInput`,``,`type`,`number`,`min`,`1`,`max`,`31`,`formControlName`,`dia_fechamento`],[`matInput`,``,`type`,`number`,`min`,`1`,`max`,`31`,`formControlName`,`dia_vencimento`]],template:function(e,t){if(e&1&&(ea$1(0,`h2`,0),SC(1),ud(),ea$1(2,`form`,1),zg(`ngSubmit`,function(){return t.salvar()}),ea$1(3,`mat-dialog-content`,2)(4,`mat-form-field`)(5,`mat-label`),SC(6,`Nome`),ud(),ea$1(7,`input`,3),Sw(),ud(),ea$1(8,`mat-hint`),SC(9,`Só um apelido. Nunca o número do cartão.`),ud(),Qo(10,ka,2,0,`mat-error`),ud(),ea$1(11,`mat-form-field`)(12,`mat-label`),SC(13,`Tipo`),ud(),ea$1(14,`mat-select`,4),Sw(),$I(15,_a,2,2,`mat-option`,5,pa),ud()(),Qo(17,xa,11,2,`div`,6),ea$1(18,`mat-form-field`)(19,`mat-label`),SC(20,`Ordem na visão mensal`),ud(),ea$1(21,`input`,7),Sw(),ud()(),Qo(22,va,2,0,`mat-checkbox`,8),Qo(23,Ca,2,1,`p`,9),ud(),ea$1(24,`mat-dialog-actions`,10)(25,`button`,11),SC(26,`Cancelar`),ud(),ea$1(27,`button`,12),SC(28,`Salvar`),ud()()()),e&2){let a;zo(),tb(t.fonte?`Editar fonte`:`Nova fonte`),zo(),Bg(`formGroup`,t.form),zo(5),xw(),zo(3),Xo(t.form.controls.nome.hasError(`required`)?10:-1),zo(4),xw(),zo(),zI(t.tipos),zo(2),Xo(t.eCartao()===`cartao`?17:-1),zo(4),xw(),zo(),Xo(t.fonte?22:-1),zo(),Xo((a=t.erro())?23:-1,a),zo(4),Bg(`disabled`,t.salvando())}},dependencies:[Tr,Rr$1,mn,Yi,Ar,Vr,Bi,zi,Nt$1,Xi,R3,A3,ea,dt,bn,un,gn,yn,_n,Vt,Yn$1,Et,Dt$1,er,Ba$1,ja,Ms,Ds,Dt],styles:[`.form-fonte[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(400px,80vw)}.form-fonte__dias[_ngcontent-%COMP%]{display:flex;gap:12px}.form-fonte__dias[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1}.form-fonte__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};function wa(n,r){n&1&&(ea$1(0,`th`,14),SC(1,`Nome`),ud())}function Da(n,r){if(n&1&&(ea$1(0,`td`,15),SC(1),ud()),n&2){let e=r.$implicit;zo(),tb(e.nome)}}function Sa(n,r){n&1&&(ea$1(0,`th`,14),SC(1,`Tipo`),ud())}function Ra(n,r){if(n&1&&(ea$1(0,`td`,15),SC(1),ud()),n&2){let e=r.$implicit,t=XI(2);zo(),tb(t.rotuloDoTipo(e))}}function Ma(n,r){n&1&&(ea$1(0,`th`,14),SC(1,`Fecha`),ud())}function Ea(n,r){if(n&1&&(ea$1(0,`td`,15),SC(1),ud()),n&2){let e=r.$implicit;zo(),tb(e.dia_fechamento??`—`)}}function Na(n,r){n&1&&(ea$1(0,`th`,14),SC(1,`Vence`),ud())}function Ta(n,r){if(n&1&&(ea$1(0,`td`,15),SC(1),ud()),n&2){let e=r.$implicit;zo(),tb(e.dia_vencimento??`—`)}}function Fa(n,r){n&1&&(ea$1(0,`th`,14),SC(1,`Situação`),ud())}function Ia(n,r){if(n&1&&(ea$1(0,`td`,15),SC(1),ud()),n&2){let e=r.$implicit;zo(),tb(e.ativa?`Ativa`:`Inativa`)}}function Oa(n,r){n&1&&Vg(0,`th`,14)}function Aa(n,r){if(n&1){let e=KI();ea$1(0,`td`,16)(1,`button`,17),zg(`click`,function(){let a=Np(e).$implicit,o=XI(2);return Mp(o.abrir(a))}),ea$1(2,`mat-icon`),SC(3,`edit`),ud()(),ea$1(4,`button`,17),zg(`click`,function(){let a=Np(e).$implicit,o=XI(2);return Mp(o.excluir(a))}),ea$1(5,`mat-icon`),SC(6,`delete`),ud()()()}if(n&2){let e=r.$implicit;zo(),Ko$1(`aria-label`,`Editar `+e.nome),zo(3),Ko$1(`aria-label`,`Excluir `+e.nome)}}function Ba(n,r){n&1&&Vg(0,`tr`,18)}function za(n,r){if(n&1&&Vg(0,`tr`,19),n&2){let e=r.$implicit;nn(`fontes__inativa`,!e.ativa)}}function Pa(n,r){if(n&1&&(ea$1(0,`table`,2),dd(1,3),Pg(2,wa,2,0,`th`,4)(3,Da,2,1,`td`,5),fd(),dd(4,6),Pg(5,Sa,2,0,`th`,4)(6,Ra,2,1,`td`,5),fd(),dd(7,7),Pg(8,Ma,2,0,`th`,4)(9,Ea,2,1,`td`,5),fd(),dd(10,8),Pg(11,Na,2,0,`th`,4)(12,Ta,2,1,`td`,5),fd(),dd(13,9),Pg(14,Fa,2,0,`th`,4)(15,Ia,2,1,`td`,5),fd(),dd(16,10),Pg(17,Oa,1,0,`th`,4)(18,Aa,7,2,`td`,11),fd(),Pg(19,Ba,1,0,`tr`,12)(20,za,1,2,`tr`,13),ud()),n&2){let e=XI();Bg(`dataSource`,e.fontes()),zo(19),Bg(`matHeaderRowDef`,e.colunas),zo(),Bg(`matRowDefColumns`,e.colunas)}}function La(n,r){n&1&&(ea$1(0,`p`),SC(1,`Nenhuma fonte cadastrada. Comece pelos cartões e pelo dinheiro.`),ud())}var ta=class n{service=m(Mn);dialog=m(Ut);snackBar=m(In);fontes=It([]);colunas=[`nome`,`tipo`,`fechamento`,`vencimento`,`situacao`,`acoes`];constructor(){this.carregar()}rotuloDoTipo(r){return je.find(e=>e.valor===r.tipo)?.rotulo??r.tipo}abrir(r=null){this.dialog.open(qe,{data:r}).afterClosed().pipe(ot$1(Boolean)).subscribe(()=>this.carregar())}excluir(r){this.dialog.open(Rn,{data:{titulo:`Excluir ${r.nome}?`,mensagem:`Esta ação não pode ser desfeita.`,confirmar:`Excluir`}}).afterClosed().pipe(ot$1(Boolean),ic(()=>this.service.excluir(r.id))).subscribe({next:()=>this.carregar(),error:e=>this.snackBar.open(Ys(e),`Fechar`)})}carregar(){this.service.listar().subscribe({next:r=>this.fontes.set(r),error:r=>this.snackBar.open(Ys(r),`Fechar`)})}static ɵfac=function(e){return new(e||n)};static ɵcmp=Xe({type:n,selectors:[[`app-fontes`]],decls:9,vars:1,consts:[[1,`fontes__cabecalho`],[`mat-flat-button`,``,`type`,`button`,3,`click`],[`mat-table`,``,1,`fontes__tabela`,3,`dataSource`],[`matColumnDef`,`nome`],[`mat-header-cell`,``,4,`matHeaderCellDef`],[`mat-cell`,``,4,`matCellDef`],[`matColumnDef`,`tipo`],[`matColumnDef`,`fechamento`],[`matColumnDef`,`vencimento`],[`matColumnDef`,`situacao`],[`matColumnDef`,`acoes`],[`mat-cell`,``,`class`,`fontes__acoes`,4,`matCellDef`],[`mat-header-row`,``,4,`matHeaderRowDef`],[`mat-row`,``,3,`fontes__inativa`,4,`matRowDef`,`matRowDefColumns`],[`mat-header-cell`,``],[`mat-cell`,``],[`mat-cell`,``,1,`fontes__acoes`],[`mat-icon-button`,``,`type`,`button`,3,`click`],[`mat-header-row`,``],[`mat-row`,``]],template:function(e,t){e&1&&(ea$1(0,`header`,0)(1,`h1`),SC(2,`Fontes`),ud(),ea$1(3,`button`,1),zg(`click`,function(){return t.abrir()}),ea$1(4,`mat-icon`),SC(5,`add`),ud(),SC(6,` Nova fonte `),ud()(),Qo(7,Pa,21,3,`table`,2)(8,La,2,0,`p`)),e&2&&(zo(7),Xo(t.fontes().length?7:8))},dependencies:[R3,A3,gx,Mt,wt,Yn,jn,qn,Gn,$n,Un,Xn,Qn,Wn,Kn,Zn],styles:[`.fontes__cabecalho[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;gap:16px}.fontes__cabecalho[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-headline-small)}.fontes__tabela[_ngcontent-%COMP%]{max-width:900px}.fontes__acoes[_ngcontent-%COMP%]{text-align:right;white-space:nowrap}.fontes__inativa[_ngcontent-%COMP%]{opacity:.6}`]})};export{ta as FontesComponent};