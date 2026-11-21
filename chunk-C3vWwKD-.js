import{a as k,i as j,n as T,o as z,r as _,t as A}from"./chunk-CqnGnZQ3.js";import{$t as dd,B as Jo,Bt as Zg,Cn as m,Dn as nc,En as na$1,F as Hv,Fn as on,Ft as Xo,Gn as rn,H as Jy,Hn as rC,Ht as Zr,I as Id,Jn as se,Jt as be,L as Ie,Ln as ot,M as Gp,Mn as oC,Mt as XS,N as Gr,Nn as ob,O as GI,On as nf,Ot as WI,P as Hg,Pn as oc,Pt as Xe$1,Qn as t3,S as Ey,Un as rb,V as Js,W as Kd,Wn as rc,Xn as ss,Xt as cb,Z as Mw,a as m$1,ar as wb,at as Qo,b as Ct,c as ue,dr as zC,dt as Rt,en as eC,et as O,f as Ae,fn as ib,fr as zI,gn as jC,ir as vx,it as Qn,j as Go,jt as XI,k as Gg,kt as Wg,ln as ge,lt as Rp,n as wt,o as G,p as Ap,pr as za$1,qn as sC,rn as fb,rr as v,s as Nt,sn as fn,sr as xC,st as R3,t as Mt,tn as ei,tt as O3,un as hd,ur as xw,vt as Ug,wn as md,wt as VC,yt as Ui,zn as q}from"./main-HCA32W7W.js";import{n as H,r as x,t as A$1}from"./chunk-BK3By9N9.js";import{a as b,i as R,l as m$2,n as I,o as d,r as N,s as h,t as A$2,u as p}from"./chunk-CD8qKyy2.js";import{C as jt,E as os,O as sn,S as hn,T as mn,_ as cn,b as fs,d as Ze,h as as,m as _s,n as Ht,t as Cn,v as dn,w as kt}from"./chunk-DfWNqKKI.js";import{D as tr,S as hn$1,T as te,_ as Vr,a as Ga$1,d as Or,f as Ot,g as Ue$1,h as Tr,i as Et,k as zi,l as Ki,n as Bi,o as Ha$1,p as Qi,r as Bn,s as Ir,t as At,u as Ne,v as Vt,w as kr,y as Xn}from"./chunk-CN4gGvBO.js";var Qt=`/api/meses`;var Te=class a{http=m(Ey);horizonte(){return this.http.get(`${Qt}/`)}visao(t){return this.http.get(`${Qt}/${t}/`)}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var ia=new v(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var ze=class{source;checked;constructor(t,e){this.source=t,this.checked=e}};var Xe=(()=>{class a{_elementRef=m(be);_focusMonitor=m(Kd);_changeDetectorRef=m(wb);defaults=m(ia);_injector=m(q);_signalFormField=null;_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new ze(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Gr();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Ae;toggleChange=new Ae;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){m(Qn).load(Jy);let e=m(new fb(`tabindex`),{optional:!0}),o=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=o.color||`accent`,this.id=this._uniqueId=m(nf).getId(`mat-mdc-slide-toggle-`),this.hideIcon=o.hideIcon??!1,this.disabledInteractive=o.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngOnInit(){this._signalFormField=this._injector.get(Bn,void 0,{optional:!0,self:!0})}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new ze(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(o){return new(o||a)};static ɵcmp=(function(){let e=[`switch`],o=[`*`];function s(d,g){d&1&&(Js(0,`span`,11),Gp(),Js(1,`svg`,13),Ug(2,`path`,14),dd(),Js(3,`svg`,15),Ug(4,`path`,16),dd()())}return Xe$1({type:a,selectors:[[`mat-slide-toggle`]],viewQuery:function(g,c){if(g&1&&Zg(e,5),g&2){let C;rC(C=oC())&&(c._switchElement=C.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(g,c){g&2&&(Gg(`id`,c.id),Qo(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),md(c.color?`mat-`+c.color:``),rn(`mat-mdc-slide-toggle-focused`,c._focused)(`mat-mdc-slide-toggle-checked`,c.checked)(`mat-slide-toggle-full-width`,c.fullWidth)(`_mat-animation-noopable`,c._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,on],color:`color`,disabled:[2,`disabled`,`disabled`,on],fullWidth:[2,`fullWidth`,`fullWidth`,on],disableRipple:[2,`disableRipple`,`disableRipple`,on],tabIndex:[2,`tabIndex`,`tabIndex`,d=>d==null?0:Id(d)],checked:[2,`checked`,`checked`,on],hideIcon:[2,`hideIcon`,`hideIcon`,on],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,on]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[cb([{provide:Ue$1,useExisting:ss(()=>a),multi:!0},{provide:te,useExisting:a,multi:!0}]),na$1],ngContentSelectors:o,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(g,c){if(g&1&&(ei(),Js(0,`div`,1)(1,`button`,2,0),Wg(`click`,function(){return c._handleClick()}),Ug(3,`div`,3)(4,`span`,4),Js(5,`span`,5)(6,`span`,6)(7,`span`,7),Ug(8,`span`,8),dd(),Js(9,`span`,9),Ug(10,`span`,10),dd(),Xo(11,s,5,0,`span`,11),dd()()(),Js(12,`label`,12),Wg(`click`,function(Ne){return Ne.stopPropagation()}),Rt(13),dd()()),g&2){let C=sC(2);Hg(`labelPosition`,c.labelPosition),Go(),rn(`mdc-switch--selected`,c.checked)(`mdc-switch--unselected`,!c.checked)(`mdc-switch--checked`,c.checked)(`mdc-switch--disabled`,c.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,c.disabledInteractive),Hg(`tabIndex`,c.disabled&&!c.disabledInteractive?-1:c.tabIndex)(`disabled`,c.disabled&&!c.disabledInteractive),Qo(`id`,c.buttonId)(`name`,c.name)(`aria-label`,c.ariaLabel)(`aria-labelledby`,c._getAriaLabelledBy())(`aria-describedby`,c.ariaDescribedby)(`aria-required`,c.required||null)(`aria-checked`,c.checked)(`aria-disabled`,c.disabled&&c.disabledInteractive?`true`:null),Go(9),Hg(`matRippleTrigger`,C)(`matRippleDisabled`,c.disableRipple||c.disabled)(`matRippleCentered`,!0),Go(),Jo(c.hideIcon?-1:11),Go(),Hg(`for`,c.buttonId),Qo(`id`,c._labelId)}},dependencies:[t3,_s],styles:[`.mdc-switch {
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
  flex-shrink: 0;
  margin: 0;
  outline: none;
  overflow: visible;
  padding: 0;
  position: relative;
  width: var(--%NS%mat-slide-toggle-track-width, 52px);
}
.mdc-switch.mdc-switch--disabled {
  cursor: default;
  pointer-events: none;
}
.mdc-switch.mat-mdc-slide-toggle-disabled-interactive {
  pointer-events: auto;
}

.mdc-switch__track {
  overflow: hidden;
  position: relative;
  width: 100%;
  height: var(--%NS%mat-slide-toggle-track-height, 32px);
  border-radius: var(--%NS%mat-slide-toggle-track-shape, var(--%NS%mat-sys-corner-full));
}
.mdc-switch--disabled.mdc-switch .mdc-switch__track {
  opacity: var(--%NS%mat-slide-toggle-disabled-track-opacity, 0.12);
}
.mdc-switch__track::before, .mdc-switch__track::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  height: 100%;
  left: 0;
  position: absolute;
  width: 100%;
  border-width: var(--%NS%mat-slide-toggle-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-track-outline-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--selected .mdc-switch__track::before, .mdc-switch--selected .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-selected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-selected-track-outline-color, transparent);
}
.mdc-switch--disabled .mdc-switch__track::before, .mdc-switch--disabled .mdc-switch__track::after {
  border-width: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-width, 2px);
  border-color: var(--%NS%mat-slide-toggle-disabled-unselected-track-outline-color, var(--%NS%mat-sys-on-surface));
}
@media (forced-colors: active) {
  .mdc-switch__track {
    border-color: currentColor;
  }
}
.mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0, 0, 0.2, 1);
  transform: translateX(0);
  background: var(--%NS%mat-slide-toggle-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__track::before {
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch--selected .mdc-switch__track::before {
  transform: translateX(-100%);
}
.mdc-switch--selected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::before {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-hover-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-focus-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch:enabled:active .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-track-color, var(--%NS%mat-sys-surface-variant));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::before, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::before, .mdc-switch.mdc-switch--disabled .mdc-switch__track::before {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-track-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch__track::after {
  transform: translateX(-100%);
  background: var(--%NS%mat-slide-toggle-selected-track-color, var(--%NS%mat-sys-primary));
}
[dir=rtl] .mdc-switch__track::after {
  transform: translateX(100%);
}
.mdc-switch--selected .mdc-switch__track::after {
  transform: translateX(0);
}
.mdc-switch--selected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-visible-track-opacity, 1);
  transition: var(--%NS%mat-slide-toggle-visible-track-transition, opacity 75ms);
}
.mdc-switch--unselected .mdc-switch__track::after {
  opacity: var(--%NS%mat-slide-toggle-hidden-track-opacity, 0);
  transition: var(--%NS%mat-slide-toggle-hidden-track-transition, opacity 75ms);
}
.mdc-switch:enabled:hover:not(:focus):not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:focus:not(:active) .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-track-color, var(--%NS%mat-sys-primary));
}
.mdc-switch:enabled:active .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-track-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__track::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__track::after, .mdc-switch.mdc-switch--disabled .mdc-switch__track::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-track-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch__handle-track {
  height: 100%;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: transform 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  left: 0;
  right: auto;
  transform: translateX(0);
  width: calc(100% - var(--%NS%mat-slide-toggle-handle-width));
}
[dir=rtl] .mdc-switch__handle-track {
  left: auto;
  right: 0;
}
.mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(100%);
}
[dir=rtl] .mdc-switch--selected .mdc-switch__handle-track {
  transform: translateX(-100%);
}

.mdc-switch__handle {
  display: flex;
  pointer-events: auto;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  right: auto;
  transition: width 75ms cubic-bezier(0.4, 0, 0.2, 1), height 75ms cubic-bezier(0.4, 0, 0.2, 1), margin 75ms cubic-bezier(0.4, 0, 0.2, 1);
  width: var(--%NS%mat-slide-toggle-handle-width);
  height: var(--%NS%mat-slide-toggle-handle-height);
  border-radius: var(--%NS%mat-slide-toggle-handle-shape, var(--%NS%mat-sys-corner-full));
}
[dir=rtl] .mdc-switch__handle {
  left: auto;
  right: 0;
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-handle-size, 16px);
  margin: var(--%NS%mat-slide-toggle-unselected-handle-horizontal-margin, 0 8px);
}
.mat-mdc-slide-toggle .mdc-switch--unselected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-unselected-with-icon-handle-horizontal-margin, 0 4px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-selected-handle-size, 24px);
  margin: var(--%NS%mat-slide-toggle-selected-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch--selected .mdc-switch__handle:has(.mdc-switch__icons) {
  margin: var(--%NS%mat-slide-toggle-selected-with-icon-handle-horizontal-margin, 0 24px);
}
.mat-mdc-slide-toggle .mdc-switch__handle:has(.mdc-switch__icons) {
  width: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
  height: var(--%NS%mat-slide-toggle-with-icon-handle-size, 24px);
}
.mat-mdc-slide-toggle .mdc-switch:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  width: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
  height: var(--%NS%mat-slide-toggle-pressed-handle-size, 28px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%selected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-selected-pressed-handle-horizontal-margin, 0 22px);
}
.mat-mdc-slide-toggle .mdc-switch--%NS%unselected:active:not(.mdc-switch--disabled) .mdc-switch__handle {
  margin: var(--%NS%mat-slide-toggle-unselected-pressed-handle-horizontal-margin, 0 2px);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-handle-opacity, 1);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__handle::after {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-handle-opacity, 0.38);
}
.mdc-switch__handle::before, .mdc-switch__handle::after {
  border: 1px solid transparent;
  border-radius: inherit;
  box-sizing: border-box;
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  position: absolute;
  top: 0;
  transition: background-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1), border-color 75ms 0ms cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}
@media (forced-colors: active) {
  .mdc-switch__handle::before, .mdc-switch__handle::after {
    border-color: currentColor;
  }
}
.mdc-switch--%NS%selected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-handle-color, var(--%NS%mat-sys-on-primary));
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-handle-color, var(--%NS%mat-sys-primary-container));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-handle-color, var(--%NS%mat-sys-primary-container));
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:hover:not(:focus):not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:focus:not(:active) .mdc-switch__handle::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--disabled.mdc-switch--%NS%selected:active .mdc-switch__handle::after, .mdc-switch--selected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-selected-handle-color, var(--%NS%mat-sys-surface));
}
.mdc-switch--%NS%unselected:enabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-handle-color, var(--%NS%mat-sys-outline));
}
.mdc-switch--%NS%unselected:enabled:hover:not(:focus):not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:focus:not(:active) .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-handle-color, var(--%NS%mat-sys-on-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__handle::after {
  background: var(--%NS%mat-slide-toggle-disabled-unselected-handle-color, var(--%NS%mat-sys-on-surface));
}
.mdc-switch__handle::before {
  background: var(--%NS%mat-slide-toggle-handle-surface-color);
}

.mdc-switch__shadow {
  border-radius: inherit;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.mdc-switch:enabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-handle-elevation-shadow);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:hover:not(:focus):not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:focus:not(:active) .mdc-switch__shadow, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:active .mdc-switch__shadow, .mdc-switch.mdc-switch--disabled .mdc-switch__shadow {
  box-shadow: var(--%NS%mat-slide-toggle-disabled-handle-elevation-shadow);
}

.mdc-switch__ripple {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: -1;
  width: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
  height: var(--%NS%mat-slide-toggle-state-layer-size, 40px);
}
.mdc-switch__ripple::after {
  content: "";
  opacity: 0;
}
.mdc-switch--disabled .mdc-switch__ripple::after {
  display: none;
}
.mat-mdc-slide-toggle-disabled-interactive .mdc-switch__ripple::after {
  display: block;
}
.mdc-switch:hover .mdc-switch__ripple::after {
  transition: 75ms opacity cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:focus .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:active .mdc-switch__ripple::after, .mat-mdc-slide-toggle-disabled-interactive.mdc-switch--%NS%disabled:enabled:hover:not(:focus) .mdc-switch__ripple::after, .mdc-switch--%NS%unselected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%unselected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-slide-toggle-unselected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}
.mdc-switch--%NS%selected:enabled:hover:not(:focus) .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-hover-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-hover-state-layer-opacity, var(--%NS%mat-sys-hover-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:focus .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-focus-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-focus-state-layer-opacity, var(--%NS%mat-sys-focus-state-layer-opacity));
}
.mdc-switch--%NS%selected:enabled:active .mdc-switch__ripple::after {
  background: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-color, var(--%NS%mat-sys-primary));
  opacity: var(--%NS%mat-slide-toggle-selected-pressed-state-layer-opacity, var(--%NS%mat-sys-pressed-state-layer-opacity));
  transition: opacity 75ms linear;
}

.mdc-switch__icons {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 1;
  transform: translateZ(0);
}
.mdc-switch--disabled.mdc-switch--unselected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-unselected-icon-opacity, 0.38);
}
.mdc-switch--disabled.mdc-switch--selected .mdc-switch__icons {
  opacity: var(--%NS%mat-slide-toggle-disabled-selected-icon-opacity, 0.38);
}

.mdc-switch__icon {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  transition: opacity 30ms 0ms cubic-bezier(0.4, 0, 1, 1);
}
.mdc-switch--unselected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-unselected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--unselected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-unselected-icon-color, var(--%NS%mat-sys-surface-variant));
}
.mdc-switch--selected .mdc-switch__icon {
  width: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  height: var(--%NS%mat-slide-toggle-selected-icon-size, 16px);
  fill: var(--%NS%mat-slide-toggle-selected-icon-color, var(--%NS%mat-sys-on-primary-container));
}
.mdc-switch--selected.mdc-switch--disabled .mdc-switch__icon {
  fill: var(--%NS%mat-slide-toggle-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface));
}

.mdc-switch--selected .mdc-switch__icon--on,
.mdc-switch--unselected .mdc-switch__icon--off {
  opacity: 1;
  transition: opacity 45ms 30ms cubic-bezier(0, 0, 0.2, 1);
}

.mat-mdc-slide-toggle {
  -webkit-user-select: none;
  user-select: none;
  display: inline-block;
  -webkit-tap-highlight-color: transparent;
  outline: 0;
}
.mat-mdc-slide-toggle .mat-icon {
  min-height: fit-content;
  flex-shrink: 0;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple,
.mat-mdc-slide-toggle .mdc-switch__ripple::after {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.mat-mdc-slide-toggle .mat-mdc-slide-toggle-ripple:not(:empty),
.mat-mdc-slide-toggle .mdc-switch__ripple::after:not(:empty) {
  transform: translateZ(0);
}
.mat-mdc-slide-toggle.mat-mdc-slide-toggle-focused .mat-focus-indicator::before {
  content: "";
}
.mat-mdc-slide-toggle .mat-internal-form-field {
  color: var(--%NS%mat-slide-toggle-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-slide-toggle-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-slide-toggle-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-slide-toggle-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-slide-toggle-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-slide-toggle-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
}
.mat-mdc-slide-toggle .mat-ripple-element {
  opacity: 0.12;
}
.mat-mdc-slide-toggle .mat-focus-indicator::before {
  border-radius: 50%;
}
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle-track,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__icon,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__handle::after,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::before,
.mat-mdc-slide-toggle._mat-animation-noopable .mdc-switch__track::after {
  transition: none;
}
.mat-mdc-slide-toggle .mdc-switch:enabled + .mdc-label {
  cursor: pointer;
}
.mat-mdc-slide-toggle .mdc-switch--disabled + label {
  color: var(--%NS%mat-slide-toggle-disabled-label-text-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-slide-toggle label:empty {
  display: none;
}

.mat-slide-toggle-full-width {
  width: 100%;
}
.mat-slide-toggle-full-width .mat-internal-form-field {
  width: 100%;
  justify-content: space-between;
}
.mat-slide-toggle-full-width .mat-internal-form-field label {
  margin: 0;
  flex-grow: 1;
  text-align: end;
}
.mat-slide-toggle-full-width .mdc-form-field--align-end label {
  text-align: start;
}

.mat-mdc-slide-toggle-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-slide-toggle-touch-target-size, 48px);
  width: 100%;
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-slide-toggle-touch-target-display, block);
}
[dir=rtl] .mat-mdc-slide-toggle-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})})()}return a})();var Zt=(()=>{class a{static ɵfac=function(o){return new(o||a)};static ɵmod=Ie({type:a});static ɵinj=ge({imports:[Xe,za$1]})}return a})();var Oe=`/api/compras`;var Re=class a{http=m(Ey);obter(t){return this.http.get(`${Oe}/${t}/`)}criar(t){return this.http.post(`${Oe}/`,t)}atualizar(t,e){return this.http.patch(`${Oe}/${t}/`,e)}excluir(t){return this.http.delete(`${Oe}/${t}/`)}ajustarParcela(t,e){return this.http.patch(`/api/lancamentos/${t}/`,{valor:e})}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var aa=(a,t)=>t.id;function la(a,t){if(a&1&&(Js(0,`mat-option`,5),xC(1),dd()),a&2){let e=t.$implicit;Hg(`value`,e.id),Go(),rb(e.nome)}}function sa(a,t){a&1&&(Js(0,`mat-error`),xC(1,`Escolha a fonte.`),dd())}function ca(a,t){a&1&&(Js(0,`mat-error`),xC(1,`Informe a descrição.`),dd())}function da(a,t){a&1&&(Js(0,`mat-error`),xC(1,`Informe a data.`),dd())}function ma(a,t){if(a&1&&(Js(0,`mat-hint`),xC(1),jC(2,`competencia`),dd()),a&2){let e=eC();Go(),hd(`Sugerida: `,VC(2,1,e))}}function pa(a,t){if(a&1&&Xo(0,ma,3,3,`mat-hint`),a&2){let e=eC();Jo(t!==e.form.controls.competencia.value?0:-1)}}function ua(a,t){a&1&&(Js(0,`mat-error`),xC(1,`Informe a competência.`),dd())}function ha(a,t){a&1&&(Js(0,`mat-error`),xC(1,`Valor inválido (ex.: 1.234,56).`),dd())}function ga(a,t){a&1&&(Js(0,`mat-error`),xC(1,`De 2 a 120.`),dd())}function _a(a,t){if(a&1&&(Js(0,`mat-form-field`,12)(1,`mat-label`),xC(2,`Parcelas`),dd(),Js(3,`input`,19),xw(),dd(),Xo(4,ga,2,0,`mat-error`),dd()),a&2){let e=eC();Go(3),Mw(),Go(),Jo(e.form.controls.n_parcelas.invalid?4:-1)}}function fa(a,t){a&1&&(Js(0,`mat-hint`),xC(1,`Confirmada pela fatura.`),dd())}function va(a,t){if(a&1&&(xC(0),jC(1,`currency`)),a&2){let e=eC();hd(` 2ª: `,VC(1,1,e.segunda),` · `)}}function ba(a,t){if(a&1&&(Js(0,`mat-hint`),Xo(1,va,2,3),xC(2),jC(3,`currency`),dd()),a&2){let e=t;Go(),Jo(e.segunda?1:-1),Go(),ob(` `,e.quantidade,` × `,VC(3,3,e.valor),` `)}}function ya(a,t){if(a&1&&(Js(0,`p`,21),xC(1),dd()),a&2){let e=eC(2);Go(),hd(`1ª parcela: `,e.form.getError(`primeiraParcela`))}}function wa(a,t){if(a&1&&(Js(0,`mat-form-field`)(1,`mat-label`),xC(2,`Valor da 1ª parcela (R$)`),dd(),Js(3,`input`,20),xw(),dd(),Xo(4,fa,2,0,`mat-hint`)(5,ba,4,5,`mat-hint`),dd(),Xo(6,ya,2,1,`p`,21)),a&2){let e,o=eC();Go(3),Mw(),Go(),Jo(o.form.controls.valor_primeira.disabled?4:(e=o.demaisParcelas())?5:-1,e),Go(2),Jo(o.form.hasError(`primeiraParcela`)&&o.form.controls.valor_primeira.touched?6:-1)}}function Ca(a,t){if(a&1){let e=XI();Js(0,`div`,23)(1,`span`),xC(2),dd(),Js(3,`span`),xC(4),jC(5,`competencia`),dd(),Js(6,`input`,25,0),Wg(`keydown.enter`,function(s){let d=Ap(e).$implicit,g=sC(7),c=eC(3);return s.preventDefault(),Rp(c.ajustarParcela(d,g.value))})(`blur`,function(){let s=Ap(e).$implicit,d=sC(7),g=eC(3);return Rp(g.ajustarParcela(s,d.value))}),dd(),Js(8,`span`,26),xC(9),dd()()}if(a&2){let e=t.$implicit,o=eC(2),s=eC();Go(2),ob(``,e.parcela,`/`,o.n_parcelas),Go(2),rb(VC(5,6,e.competencia)),Go(2),Hg(`value`,s.paraCampo(e.valor)),Qo(`aria-label`,`Valor da parcela `+e.parcela),Go(3),rb(e.status===`confirmado`?`Confirmada`:``)}}function xa(a,t){if(a&1&&(Js(0,`section`,22)(1,`h3`),xC(2,`Parcelas`),dd(),GI(3,Ca,10,8,`div`,23,aa),Js(5,`p`,24),xC(6,` Ajustar o valor de uma parcela atualiza o total da compra. `),dd()()),a&2){let e=eC();Go(3),WI(e.parcelas)}}function Sa(a,t){a&1&&Xo(0,xa,7,0,`section`,22),a&2&&Jo(t.parcelas.length>1?0:-1)}function ka(a,t){a&1&&(Js(0,`p`,13),xC(1),dd()),a&2&&(Go(),rb(t))}function Ma(a,t){if(a&1){let e=XI();Js(0,`button`,27),Wg(`click`,function(){Ap(e);let s=eC();return Rp(s.excluir())}),Js(1,`mat-icon`),xC(2,`delete`),dd(),xC(3,` Excluir `),dd()}}var Na=/^\d{4}-\d{2}-\d{2}$/;function Ea(a){let t=h(a.value??``);return t===null||R(t)===0?{valor:!0}:null}var Ia=a=>{let{parcelada:t,valor_total:e,n_parcelas:o,valor_primeira:s}=a.getRawValue(),d=h(e??``),g=h(s??``);return!t||d===null||!o||o<2?null:g===null||R(g)===0?{primeiraParcela:`Valor inválido.`}:R(d)-R(g)<o-1?{primeiraParcela:`Precisa ser menor que o total e sobrar para as demais.`}:null};var Le=class a{compras=m(Re);fonteService=m(x);dialog=m(Ht);dialogRef=m(Ze);compraId=m(jt).compraId;fontes=Ct([]);compra=Ct(null);sugerida=Ct(null);salvando=Ct(!1);erro=Ct(null);alterado=Ct(!1);fontesDisponiveis=zC(()=>this.fontes().filter(t=>t.ativa||t.id===this.compra()?.fonte));form=m(Tr).group({fonte:[null,Ne.required],data:[``,Ne.required],descricao:[``,[Ne.required,Ne.maxLength(200)]],parcelada:[!1],valor_total:[``,[Ne.required,Ea]],n_parcelas:[1,[Ne.required,Ne.min(1),Ne.max(120)]],valor_primeira:[``],competencia:[``,Ne.required]},{validators:Ia});parcelada=H(this.form.controls.parcelada.valueChanges,{initialValue:!1});valores=H(this.form.valueChanges.pipe(se(()=>this.form.getRawValue())),{initialValue:this.form.getRawValue()});demaisParcelas=zC(()=>{let{valor_total:t,n_parcelas:e,valor_primeira:o}=this.valores(),s=h(t??``),d$1=h(o??``);if(!this.parcelada()||s===null||d$1===null||!e||e<2)return null;let g=R(s)-R(d$1),c=g>0?I(d(g),e-1):null;return c?c[0]===c[c.length-1]?{quantidade:c.length,valor:c[0],segunda:null}:{quantidade:c.length-1,valor:c[1],segunda:c[0]}:null});constructor(){this.fonteService.listar().subscribe(C=>this.fontes.set(C)),this.compraId!==null&&this.carregarCompra(this.compraId);let{fonte:t,data:e,parcelada:o,valor_total:s,n_parcelas:d,valor_primeira:g,competencia:c}=this.form.controls;Hv(t.valueChanges,e.valueChanges).pipe(ot(()=>t.value!==null&&Na.test(e.value)),oc(()=>this.fonteService.competenciaSugerida(t.value,e.value).pipe(rc(()=>Zr(null)))),A$1()).subscribe(C=>{this.sugerida.set(C),C&&!c.dirty&&c.setValue(C)}),o.valueChanges.pipe(A$1()).subscribe(C=>{d.setValidators([Ne.required,Ne.min(C?2:1),Ne.max(120)]),d.setValue(C?Math.max(2,d.value):1)}),Hv(s.valueChanges,d.valueChanges).pipe(A$1()).subscribe(()=>{if(g.dirty||g.disabled)return;let C=h(s.value),Ne=C?I(C,d.value):null;g.setValue(Ne?A$2(Ne[0]):``)})}salvar(){if(this.form.invalid||this.salvando()){this.form.markAllAsTouched();return}this.salvando.set(!0),this.erro.set(null);let t=this.form.getRawValue(),e={fonte:t.fonte,data:t.data,descricao:t.descricao.trim(),valor_total:h(t.valor_total),n_parcelas:t.parcelada?t.n_parcelas:1,competencia_inicial:t.competencia};t.parcelada&&this.form.controls.valor_primeira.dirty&&(e.valor_primeira_parcela=h(t.valor_primeira)),(this.compraId===null?this.compras.criar(e):this.compras.atualizar(this.compraId,e)).subscribe({next:()=>this.dialogRef.close(!0),error:s=>{this.salvando.set(!1),this.erro.set(fs(s))}})}excluir(){let t=this.compra();t&&this.dialog.open(Cn,{data:{titulo:`Excluir "${t.descricao}"?`,mensagem:`As ${t.n_parcelas} parcela(s) desta compra tamb\xE9m ser\xE3o exclu\xEDdas.`,confirmar:`Excluir`}}).afterClosed().pipe(ot(Boolean),oc(()=>this.compras.excluir(t.id))).subscribe({next:()=>this.dialogRef.close(!0),error:e=>this.erro.set(fs(e))})}ajustarParcela(t,e){let o=h(e);o===null||o===t.valor||this.compras.ajustarParcela(t.id,o).subscribe({next:()=>{this.alterado.set(!0),this.carregarCompra(this.compraId)},error:s=>this.erro.set(fs(s))})}paraCampo(t){return A$2(t)}carregarCompra(t){this.compras.obter(t).subscribe({next:e=>{this.compra.set(e);let o=e.parcelas.find(d=>d.parcela===1),s=this.form.controls;s.parcelada.setValue(e.n_parcelas>1),s.n_parcelas.setValidators([Ne.required,Ne.min(e.n_parcelas>1?2:1)]),this.form.patchValue({fonte:e.fonte,data:e.data,descricao:e.descricao,valor_total:A$2(e.valor_total),n_parcelas:e.n_parcelas,valor_primeira:o?A$2(o.valor):``,competencia:e.competencia_inicial},{emitEvent:!1}),o?.status===`confirmado`&&s.valor_primeira.disable({emitEvent:!1}),this.form.updateValueAndValidity(),this.form.markAsPristine()},error:e=>this.erro.set(fs(e))})}static ɵfac=function(e){return new(e||a)};static ɵcmp=Xe$1({type:a,selectors:[[`app-form-compra`]],decls:47,vars:17,consts:[[`valor`,``],[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-compra`],[`formControlName`,`fonte`],[3,`value`],[`matInput`,``,`formControlName`,`descricao`],[1,`form-compra__linha`],[`matInput`,``,`type`,`date`,`formControlName`,`data`],[`matInput`,``,`type`,`month`,`formControlName`,`competencia`],[`formControlName`,`parcelada`,1,`form-compra__parcelada`],[`matInput`,``,`formControlName`,`valor_total`,`inputmode`,`decimal`,`placeholder`,`0,00`],[1,`form-compra__quantidade`],[`role`,`alert`,1,`form-compra__erro`],[1,`form-compra__acoes`],[`mat-button`,``,`type`,`button`,1,`form-compra__excluir`],[1,`form-compra__espaco`],[`mat-button`,``,`type`,`button`,3,`mat-dialog-close`],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`matInput`,``,`type`,`number`,`min`,`2`,`max`,`120`,`formControlName`,`n_parcelas`],[`matInput`,``,`formControlName`,`valor_primeira`,`inputmode`,`decimal`,`placeholder`,`0,00`],[1,`form-compra__erro`],[`aria-label`,`Parcelas`,1,`form-compra__parcelas`],[1,`form-compra__parcela`],[1,`form-compra__dica`],[`inputmode`,`decimal`,1,`form-compra__valor-parcela`,3,`keydown.enter`,`blur`,`value`],[1,`form-compra__status`],[`mat-button`,``,`type`,`button`,1,`form-compra__excluir`,3,`click`]],template:function(e,o){if(e&1&&(Js(0,`h2`,1),xC(1),dd(),Js(2,`form`,2),Wg(`ngSubmit`,function(){return o.salvar()}),Js(3,`mat-dialog-content`,3)(4,`mat-form-field`)(5,`mat-label`),xC(6,`Fonte`),dd(),Js(7,`mat-select`,4),xw(),GI(8,la,2,2,`mat-option`,5,aa),dd(),Xo(10,sa,2,0,`mat-error`),dd(),Js(11,`mat-form-field`)(12,`mat-label`),xC(13,`Descrição`),dd(),Js(14,`input`,6),xw(),dd(),Xo(15,ca,2,0,`mat-error`),dd(),Js(16,`div`,7)(17,`mat-form-field`)(18,`mat-label`),xC(19,`Data da compra`),dd(),Js(20,`input`,8),xw(),dd(),Xo(21,da,2,0,`mat-error`),dd(),Js(22,`mat-form-field`)(23,`mat-label`),xC(24),dd(),Js(25,`input`,9),xw(),dd(),Xo(26,pa,1,1),Xo(27,ua,2,0,`mat-error`),dd()(),Js(28,`mat-slide-toggle`,10),xw(),xC(29,`Compra parcelada`),dd(),Js(30,`div`,7)(31,`mat-form-field`)(32,`mat-label`),xC(33),dd(),Js(34,`input`,11),xw(),dd(),Xo(35,ha,2,0,`mat-error`),dd(),Xo(36,_a,5,1,`mat-form-field`,12),dd(),Xo(37,wa,7,2),Xo(38,Sa,1,1),Xo(39,ka,2,1,`p`,13),dd(),Js(40,`mat-dialog-actions`,14),Xo(41,Ma,4,0,`button`,15),Ug(42,`span`,16),Js(43,`button`,17),xC(44,`Cancelar`),dd(),Js(45,`button`,18),xC(46,`Salvar`),dd()()()),e&2){let s,d,g;Go(),rb(o.compraId===null?`Nova compra`:`Editar compra`),Go(),Hg(`formGroup`,o.form),Go(5),Mw(),Go(),WI(o.fontesDisponiveis()),Go(2),Jo(o.form.controls.fonte.hasError(`required`)?10:-1),Go(4),Mw(),Go(),Jo(o.form.controls.descricao.hasError(`required`)?15:-1),Go(5),Mw(),Go(),Jo(o.form.controls.data.hasError(`required`)?21:-1),Go(3),rb(o.parcelada()?`Competência da 1ª parcela`:`Competência`),Go(),Mw(),Go(),Jo((s=o.sugerida())?26:-1,s),Go(),Jo(o.form.controls.competencia.hasError(`required`)?27:-1),Go(),Mw(),Go(5),rb(o.parcelada()?`Valor total (R$)`:`Valor (R$)`),Go(),Mw(),Go(),Jo(o.form.controls.valor_total.invalid?35:-1),Go(),Jo(o.parcelada()?36:-1),Go(),Jo(o.parcelada()?37:-1),Go(),Jo((d=o.compra())?38:-1,d),Go(),Jo((g=o.erro())?39:-1,g),Go(2),Jo(o.compra()?41:-1),Go(2),Hg(`mat-dialog-close`,o.alterado()),Go(2),Hg(`disabled`,o.salvando())}},dependencies:[kr,Or,hn$1,Ki,Vr,Ir,Bi,zi,Et,Qi,O3,R3,mn,sn,cn,hn,dn,Ot,Xn,At,Vt,tr,Mt,wt,Ga$1,Ha$1,as,os,kt,Zt,Xe,XS,p],styles:[`.form-compra[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(480px,80vw)}.form-compra__linha[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:12px}.form-compra__linha[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 180px}.form-compra__quantidade[_ngcontent-%COMP%]{flex:0 1 120px!important}.form-compra__parcelada[_ngcontent-%COMP%]{margin:4px 0 12px}.form-compra__parcelas[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-small);margin:8px 0}.form-compra__parcela[_ngcontent-%COMP%]{display:grid;grid-template-columns:3.5rem 1fr 7rem 6rem;align-items:center;gap:8px;padding:2px 0}.form-compra__valor-parcela[_ngcontent-%COMP%]{font:inherit;text-align:right;padding:4px 6px;border:1px solid var(--%NS%mat-sys-outline-variant);border-radius:4px;background:transparent;color:inherit}.form-compra__status[_ngcontent-%COMP%], .form-compra__dica[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-body-small);color:var(--%NS%mat-sys-on-surface-variant)}.form-compra__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.form-compra__acoes[_ngcontent-%COMP%]{display:flex}.form-compra__espaco[_ngcontent-%COMP%]{flex:1}.form-compra__excluir[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};var Ue=`/api/avulsos`;var $e=class a{http=m(Ey);criar(t){return this.http.post(`${Ue}/`,t)}atualizar(t,e){return this.http.patch(`${Ue}/${t}/`,e)}excluir(t){return this.http.delete(`${Ue}/${t}/`)}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};function Da(a,t){a&1&&(Js(0,`mat-error`),xC(1,`Informe a descrição.`),dd())}function Fa(a,t){a&1&&(Js(0,`mat-error`),xC(1,`Valor inválido (ex.: 1.234,56).`),dd())}function Va(a,t){a&1&&(Js(0,`p`,6),xC(1),dd()),a&2&&(Go(),rb(t))}function Aa(a,t){if(a&1){let e=XI();Js(0,`button`,12),Wg(`click`,function(){Ap(e);let s=eC();return Rp(s.excluir())}),Js(1,`mat-icon`),xC(2,`delete`),dd(),xC(3,` Excluir `),dd()}if(a&2){let e=eC();Hg(`disabled`,e.salvando())}}var Me=class a{service=m($e);dialogRef=m(Ze);dados=m(jt);salvando=Ct(!1);erro=Ct(null);form=m(Tr).group({descricao:[this.dados.avulso?.descricao??``,[Ne.required,Ne.maxLength(200)]],valor:[this.dados.avulso?A$2(this.dados.avulso.valor):``,[Ne.required,N]]});salvar(){if(this.form.invalid||this.salvando()){this.form.markAllAsTouched();return}let t=this.form.controls.descricao.value.trim(),e=b(this.form.controls.valor.value),{avulso:o,grupo:s,competencia:d}=this.dados;this.executar(o?this.service.atualizar(o.id,{descricao:t,valor:e}):this.service.criar({grupo:s,competencia:d,descricao:t,valor:e}))}excluir(){this.dados.avulso&&this.executar(this.service.excluir(this.dados.avulso.id))}executar(t){this.salvando.set(!0),this.erro.set(null),t.subscribe({next:()=>this.dialogRef.close(!0),error:e=>{this.salvando.set(!1),this.erro.set(fs(e))}})}static ɵfac=function(e){return new(e||a)};static ɵcmp=Xe$1({type:a,selectors:[[`app-form-avulso`]],decls:25,vars:12,consts:[[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-avulso`],[1,`form-avulso__explicacao`],[`matInput`,``,`formControlName`,`descricao`,3,`placeholder`],[`matInput`,``,`formControlName`,`valor`,`inputmode`,`decimal`,`placeholder`,`0,00`],[`role`,`alert`,1,`form-avulso__erro`],[1,`form-avulso__acoes`],[`mat-button`,``,`type`,`button`,1,`form-avulso__excluir`,3,`disabled`],[1,`form-avulso__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`mat-button`,``,`type`,`button`,1,`form-avulso__excluir`,3,`click`,`disabled`]],template:function(e,o){if(e&1&&(Js(0,`h2`,0),xC(1),jC(2,`competencia`),dd(),Js(3,`form`,1),Wg(`ngSubmit`,function(){return o.salvar()}),Js(4,`mat-dialog-content`,2)(5,`p`,3),xC(6,` Só neste mês. Para algo que se repete, cadastre um recorrente. `),dd(),Js(7,`mat-form-field`)(8,`mat-label`),xC(9,`Descrição`),dd(),Js(10,`input`,4),xw(),dd(),Xo(11,Da,2,0,`mat-error`),dd(),Js(12,`mat-form-field`)(13,`mat-label`),xC(14,`Valor (R$)`),dd(),Js(15,`input`,5),xw(),dd(),Xo(16,Fa,2,0,`mat-error`),dd(),Xo(17,Va,2,1,`p`,6),dd(),Js(18,`mat-dialog-actions`,7),Xo(19,Aa,4,1,`button`,8),Ug(20,`span`,9),Js(21,`button`,10),xC(22,`Cancelar`),dd(),Js(23,`button`,11),xC(24,`Salvar`),dd()()()),e&2){let s;Go(),ib(` `,o.dados.avulso?`Editar`:`Novo`,` `,o.dados.grupo===`rendimento`?`rendimento`:`gasto fixo`,` de `,VC(2,10,o.dados.competencia),`
`),Go(2),Hg(`formGroup`,o.form),Go(7),Hg(`placeholder`,o.dados.grupo===`rendimento`?`Ex.: Icloud (Natalia)`:`Ex.: Docs moto`),Mw(),Go(),Jo(o.form.controls.descricao.hasError(`required`)?11:-1),Go(4),Mw(),Go(),Jo(o.form.controls.valor.invalid?16:-1),Go(),Jo((s=o.erro())?17:-1,s),Go(2),Jo(o.dados.avulso?19:-1),Go(4),Hg(`disabled`,o.salvando())}},dependencies:[kr,Or,hn$1,Vr,Ir,Et,Qi,O3,R3,mn,sn,cn,hn,dn,Ot,Xn,At,tr,Mt,wt,Ga$1,Ha$1,p],styles:[`.form-avulso[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(400px,80vw)}.form-avulso__explicacao[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.form-avulso__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.form-avulso__acoes[_ngcontent-%COMP%]{display:flex}.form-avulso__espaco[_ngcontent-%COMP%]{flex:1}.form-avulso__excluir[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};function Pa(a,t){a&1&&xC(0,` Valor estimado pelo último informado. Informe o valor real da conta deste mês. `)}function Ta(a,t){a&1&&xC(0,` Valor real informado para este mês. `)}function za(a,t){if(a&1&&Xo(0,Pa,1,0)(1,Ta,1,0),a&2){let e=eC();Jo(e.dados.item.pendente?0:1)}}function Oa(a,t){a&1&&xC(0,` Muda o valor só neste mês. Para mudar daqui em diante, faça um reajuste no recorrente. `)}function Ra(a,t){a&1&&(Js(0,`mat-error`),xC(1,`Valor inválido (ex.: 1.234,56).`),dd())}function La(a,t){a&1&&(Js(0,`p`,5),xC(1),dd()),a&2&&(Go(),rb(t))}function $a(a,t){if(a&1){let e=XI();Js(0,`button`,11),Wg(`click`,function(){Ap(e);let s=eC();return Rp(s.desfazer())}),xC(1),dd()}if(a&2){let e=eC();Hg(`disabled`,e.salvando()),Go(),hd(` `,e.dados.item.variavel?`Voltar à estimativa`:`Voltar ao valor previsto`,` `)}}var qe=class a{service=m(m$2);dialogRef=m(Ze);dados=m(jt);salvando=Ct(!1);erro=Ct(null);form=m(Tr).group({valor:[A$2(this.dados.item.valor),[Ne.required,N]]});temValorDoMes=this.dados.item.ajustado||this.dados.item.variavel&&!this.dados.item.pendente;salvar(){if(this.form.invalid){this.form.markAllAsTouched();return}let{item:t,competencia:e}=this.dados;this.executar(this.service.definirNoMes(t.id,e,b(this.form.controls.valor.value)))}desfazer(){let{item:t,competencia:e}=this.dados;this.executar(this.service.limparNoMes(t.id,e))}executar(t){this.salvando.set(!0),this.erro.set(null),t.subscribe({next:()=>this.dialogRef.close(!0),error:e=>{this.salvando.set(!1),this.erro.set(fs(e))}})}static ɵfac=function(e){return new(e||a)};static ɵcmp=Xe$1({type:a,selectors:[[`app-valor-do-mes`]],decls:21,vars:11,consts:[[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`valor-do-mes`],[1,`valor-do-mes__explicacao`],[`matInput`,``,`formControlName`,`valor`,`inputmode`,`decimal`,`cdkFocusInitial`,``],[`role`,`alert`,1,`valor-do-mes__erro`],[1,`valor-do-mes__acoes`],[`mat-button`,``,`type`,`button`,3,`disabled`],[1,`valor-do-mes__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`mat-button`,``,`type`,`button`,3,`click`,`disabled`]],template:function(e,o){if(e&1&&(Js(0,`h2`,0),xC(1),jC(2,`competencia`),dd(),Js(3,`form`,1),Wg(`ngSubmit`,function(){return o.salvar()}),Js(4,`mat-dialog-content`,2)(5,`p`,3),Xo(6,za,2,1)(7,Oa,1,0),dd(),Js(8,`mat-form-field`)(9,`mat-label`),xC(10),dd(),Js(11,`input`,4),xw(),dd(),Xo(12,Ra,2,0,`mat-error`),dd(),Xo(13,La,2,1,`p`,5),dd(),Js(14,`mat-dialog-actions`,6),Xo(15,$a,2,2,`button`,7),Ug(16,`span`,8),Js(17,`button`,9),xC(18,`Cancelar`),dd(),Js(19,`button`,10),xC(20,`Salvar`),dd()()()),e&2){let s;Go(),ob(``,o.dados.item.descricao,` · `,VC(2,9,o.dados.competencia)),Go(2),Hg(`formGroup`,o.form),Go(3),Jo(o.dados.item.variavel?6:7),Go(4),rb(o.dados.item.variavel?`Valor real (R$)`:`Valor neste mês (R$)`),Go(),Mw(),Go(),Jo(o.form.controls.valor.invalid?12:-1),Go(),Jo((s=o.erro())?13:-1,s),Go(2),Jo(o.temValorDoMes?15:-1),Go(4),Hg(`disabled`,o.salvando())}},dependencies:[kr,Or,hn$1,Vr,Ir,Et,Qi,O3,R3,mn,sn,cn,hn,dn,Ot,Xn,At,tr,Ga$1,Ha$1,p],styles:[`.valor-do-mes[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(400px,80vw)}.valor-do-mes__explicacao[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.valor-do-mes__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.valor-do-mes__acoes[_ngcontent-%COMP%]{display:flex}.valor-do-mes__espaco[_ngcontent-%COMP%]{flex:1}`]})};var qa=(a,t)=>t.valor;var Ba=(a,t)=>t.fonte.id;var ja=(a,t)=>t.tipo+t.id;var Ga=(a,t)=>t.id;function Xa(a,t){if(a&1&&(Js(0,`mat-option`,4),xC(1),jC(2,`competencia`),dd()),a&2){let e=t.$implicit;Hg(`value`,e),Go(),rb(VC(2,2,e))}}function Ha(a,t){a&1&&(Js(0,`p`,7),xC(1),dd()),a&2&&(Go(),rb(t))}function Wa(a,t){a&1&&xC(0,` estimado `)}function Ua(a,t){a&1&&xC(0,` ajustado `)}function Qa(a,t){a&1&&xC(0,` só este mês `)}function Za(a,t){if(a&1){let e=XI();Js(0,`button`,17),Wg(`click`,function(){let s=Ap(e).$implicit,d=eC().$implicit,g=eC(2);return Rp(g.abrirItem(s,d.valor))}),Js(1,`span`,18),xC(2),dd(),Js(3,`span`,19),Xo(4,Wa,1,0)(5,Ua,1,0)(6,Qa,1,0),dd(),Js(7,`span`,20),xC(8),jC(9,`currency`),dd()()}if(a&2){let e=t.$implicit;Go(2),rb(e.descricao),Go(2),Jo(e.pendente?4:e.ajustado?5:e.tipo===`avulso`?6:-1),Go(3),rn(`mes__valor--estimado`,e.pendente),Go(),rb(VC(9,5,e.valor))}}function Ya(a,t){a&1&&(Js(0,`p`,12),xC(1,` Nada neste mês. `),Js(2,`a`,21),xC(3,`Cadastre os recorrentes`),dd(),xC(4,`. `),dd())}function Ja(a,t){if(a&1){let e=XI();Js(0,`mat-card`,11)(1,`mat-card-header`,13)(2,`mat-card-title`),xC(3),dd(),Js(4,`mat-card-subtitle`),xC(5),jC(6,`currency`),dd(),Js(7,`button`,14),Wg(`click`,function(){let s=Ap(e).$implicit,d=eC(2);return Rp(d.novoAvulso(s.valor))}),Js(8,`mat-icon`),xC(9,`add`),dd()()(),Js(10,`mat-card-content`,15),GI(11,Za,10,7,`button`,16,ja,!1,Ya,5,0,`p`,12),dd()()}if(a&2){let e=t.$implicit;Go(3),rb(e.titulo),Go(2),rb(VC(6,5,e.total)),Go(2),Hg(`title`,`Adicionar só neste mês`),Qo(`aria-label`,`Adicionar `+e.titulo.toLowerCase()+` só deste mês`),Go(4),WI(e.itens)}}function Ka(a,t){if(a&1){let e=XI();Js(0,`button`,17),Wg(`click`,function(){let s=Ap(e).$implicit,d=eC(3);return Rp(d.abrirLancamento(s))}),Js(1,`span`,18),xC(2),dd(),Js(3,`span`,19),xC(4),dd(),Js(5,`span`,20),xC(6),jC(7,`currency`),dd()()}if(a&2){let e=t.$implicit;rn(`mes__lancamento--importado`,e.origem===`importacao`),Go(2),rb(e.descricao),Go(2),rb(e.parcela),Go(2),rb(VC(7,5,e.valor))}}function en(a,t){a&1&&(Js(0,`p`,12),xC(1,`Nenhum lançamento.`),dd())}function tn(a,t){if(a&1&&(Js(0,`mat-card`,11)(1,`mat-card-header`)(2,`mat-card-title`),xC(3),dd(),Js(4,`mat-card-subtitle`),xC(5),jC(6,`currency`),dd()(),Js(7,`mat-card-content`,15),GI(8,Ka,8,7,`button`,22,Ga,!1,en,2,0,`p`,12),dd()()),a&2){let e=t.$implicit;Go(3),rb(e.fonte.nome),Go(2),rb(VC(6,3,e.total)),Go(3),WI(e.lancamentos)}}function an(a,t){a&1&&(Js(0,`p`,12),xC(1,` Nenhuma fonte cadastrada. `),Js(2,`a`,23),xC(3,`Cadastre os cartões e o dinheiro`),dd(),xC(4,` para lançar compras. `),dd())}function nn(a,t){if(a&1&&(Js(0,`section`,8)(1,`div`)(2,`span`),xC(3,`Rendimentos`),dd(),Js(4,`strong`),xC(5),jC(6,`currency`),dd()(),Js(7,`div`)(8,`span`),xC(9,`Fixas`),dd(),Js(10,`strong`),xC(11),jC(12,`currency`),dd()(),Js(13,`div`)(14,`span`),xC(15,`Dinheiro e contas`),dd(),Js(16,`strong`),xC(17),jC(18,`currency`),dd()(),Js(19,`div`)(20,`span`),xC(21,`Cartões`),dd(),Js(22,`strong`),xC(23),jC(24,`currency`),dd()(),Js(25,`div`,9)(26,`span`),xC(27,`Saldo`),dd(),Js(28,`strong`),xC(29),jC(30,`currency`),dd()()(),Js(31,`section`,10),GI(32,Ja,14,7,`mat-card`,11,qa),GI(34,tn,11,5,`mat-card`,11,Ba),dd(),Xo(36,an,5,0,`p`,12)),a&2){let e=t,o=eC();Go(5),rb(VC(6,8,e.resumo.total_rendimentos)),Go(6),rb(VC(12,10,e.resumo.total_fixas)),Go(6),rb(VC(18,12,e.resumo.total_dinheiro_e_contas)),Go(6),rb(VC(24,14,e.resumo.total_cartoes)),Go(2),rn(`mes__saldo--negativo`,o.negativo(e.resumo.saldo)),Go(4),rb(VC(30,16,e.resumo.saldo)),Go(3),WI(o.grupos()),Go(2),WI(e.fontes),Go(2),Jo(e.fontes.length?-1:36)}}var na=class a{meses=m(Te);dialog=m(Ht);router=m(ue);route=m(G);recarregar$=new fn(void 0);competencia=H(this.route.paramMap.pipe(se(t=>t.get(`competencia`)??``)),{requireSync:!0});visao=Ct(null);horizonte=Ct([]);erro=Ct(null);anterior=zC(()=>this.navegavel(-1));seguinte=zC(()=>this.navegavel(1));opcoes=zC(()=>{let t=this.horizonte().map(o=>o.competencia),e=this.competencia();return t.includes(e)||!e?t:[...t,e].sort()});grupos=zC(()=>{let t=this.visao();return t?[{valor:`rendimento`,titulo:`Rendimentos`,itens:t.rendimentos,total:t.resumo.total_rendimentos},{valor:`fixa`,titulo:`Fixas`,itens:t.fixas,total:t.resumo.total_fixas}]:[]});constructor(){this.recarregar$.pipe(oc(()=>this.meses.horizonte().pipe(rc(()=>Zr([])))),A$1()).subscribe(t=>this.horizonte.set(t)),nc([this.route.paramMap,this.recarregar$]).pipe(se(([t])=>t.get(`competencia`)??``),Ui(()=>this.erro.set(null)),oc(t=>this.meses.visao(t).pipe(rc(e=>(this.erro.set(fs(e,`Não foi possível carregar o mês.`)),Zr(null))))),A$1()).subscribe(t=>this.visao.set(t))}irPara(t){this.router.navigate([`/meses`,t])}novaCompra(){this.abrirCompra(null)}abrirLancamento(t){t.compra!==null&&this.abrirCompra(t.compra)}novoAvulso(t){this.aoFechar(this.dialog.open(Me,{data:{grupo:t,competencia:this.competencia(),avulso:null}}))}abrirItem(t,e){let o=this.competencia();this.aoFechar(t.tipo===`recorrente`?this.dialog.open(qe,{data:{item:t,competencia:o}}):this.dialog.open(Me,{data:{grupo:e,competencia:o,avulso:t}}))}negativo(t){return t.startsWith(`-`)}abrirCompra(t){this.aoFechar(this.dialog.open(Le,{data:{compraId:t},autoFocus:`first-tabbable`}))}aoFechar(t){t.afterClosed().pipe(ot(Boolean)).subscribe(()=>this.recarregar$.next())}navegavel(t){try{return m$1(this.competencia(),t)}catch{return null}}static ɵfac=function(e){return new(e||a)};static ɵcmp=Xe$1({type:a,selectors:[[`app-visao-mensal`]],decls:17,vars:5,consts:[[1,`mes__cabecalho`],[1,`mes__navegacao`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Mês anterior`,3,`click`,`disabled`],[`aria-label`,`Escolher mês`,1,`mes__seletor`,3,`selectionChange`,`value`],[3,`value`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Mês seguinte`,3,`click`,`disabled`],[`mat-flat-button`,``,`type`,`button`,3,`click`],[`role`,`alert`,1,`mes__erro`],[`aria-label`,`Resumo do mês`,1,`mes__resumo`],[1,`mes__saldo`],[1,`mes__blocos`],[`appearance`,`outlined`,1,`mes__bloco`],[1,`mes__vazio`],[1,`mes__bloco-cabecalho`],[`mat-icon-button`,``,`type`,`button`,1,`mes__adicionar`,3,`click`,`title`],[1,`mes__bloco-conteudo`],[`type`,`button`,1,`mes__lancamento`],[`type`,`button`,1,`mes__lancamento`,3,`click`],[1,`mes__descricao`],[1,`mes__parcela`],[1,`mes__valor`],[`routerLink`,`/recorrentes`],[`type`,`button`,1,`mes__lancamento`,3,`mes__lancamento--importado`],[`routerLink`,`/fontes`]],template:function(e,o){if(e&1&&(Js(0,`header`,0)(1,`div`,1)(2,`button`,2),Wg(`click`,function(){return o.irPara(o.anterior())}),Js(3,`mat-icon`),xC(4,`chevron_left`),dd()(),Js(5,`mat-select`,3),Wg(`selectionChange`,function(d){return o.irPara(d.value)}),GI(6,Xa,3,4,`mat-option`,4,zI),dd(),Js(8,`button`,5),Wg(`click`,function(){return o.irPara(o.seguinte())}),Js(9,`mat-icon`),xC(10,`chevron_right`),dd()()(),Js(11,`button`,6),Wg(`click`,function(){return o.novaCompra()}),Js(12,`mat-icon`),xC(13,`add`),dd(),xC(14,` Nova compra `),dd()(),Xo(15,Ha,2,1,`p`,7),Xo(16,nn,37,18)),e&2){let s,d;Go(2),Hg(`disabled`,!o.anterior()),Go(3),Hg(`value`,o.competencia()),Go(),WI(o.opcoes()),Go(2),Hg(`disabled`,!o.seguinte()),Go(7),Jo((s=o.erro())?15:-1,s),Go(),Jo((d=o.visao())?16:-1,d)}},dependencies:[Nt,O3,R3,vx,j,_,k,T,z,A,Mt,wt,as,os,kt,XS,p],styles:[`[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%}.mes__cabecalho[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.mes__navegacao[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px}.mes__seletor[_ngcontent-%COMP%]{width:14rem;font:var(--%NS%mat-sys-title-large)}.mes__resumo[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:24px;padding:12px 16px;margin-bottom:16px;border-radius:12px;background:var(--%NS%mat-sys-surface-container)}.mes__resumo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.mes__resumo[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-label-medium);color:var(--%NS%mat-sys-on-surface-variant)}.mes__resumo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-medium)}.mes__saldo--negativo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.mes__blocos[_ngcontent-%COMP%]{flex:1;min-height:20rem;display:flex;gap:16px;align-items:stretch;overflow-x:auto;overflow-y:hidden;padding-bottom:8px;scroll-snap-type:x proximity}.mes__bloco[_ngcontent-%COMP%]{flex:0 0 min(320px,85vw);max-height:100%;display:flex;flex-direction:column;scroll-snap-align:start}.mes__bloco-conteudo[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto}.mes__lancamento[_ngcontent-%COMP%]{all:unset;box-sizing:border-box;width:100%;display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:6px 4px;border-bottom:1px solid var(--%NS%mat-sys-outline-variant);cursor:pointer}.mes__lancamento[_ngcontent-%COMP%]:hover{background:var(--%NS%mat-sys-surface-container-high)}.mes__lancamento[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--%NS%mat-sys-primary)}.mes__lancamento--importado[_ngcontent-%COMP%]   .mes__descricao[_ngcontent-%COMP%]{background:var(--%NS%mat-sys-tertiary-container);border-radius:4px;padding:0 4px}.mes__descricao[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mes__parcela[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);font:var(--%NS%mat-sys-body-small);align-self:center}.mes__valor[_ngcontent-%COMP%]{text-align:right;font-variant-numeric:tabular-nums}.mes__bloco-cabecalho[_ngcontent-%COMP%]{position:relative}.mes__adicionar[_ngcontent-%COMP%]{position:absolute;top:4px;right:4px}.mes__valor--estimado[_ngcontent-%COMP%]{font-style:italic;color:var(--%NS%mat-sys-on-surface-variant)}.mes__vazio[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.mes__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};export{na as VisaoMensalComponent};