import{A as Gr,An as od,B as Jo,Bt as Zd,C as Eb,Cn as na$1,Dt as Vg,E as FC,En as nn,Fn as q$1,Ft as Xe,Gn as sb,Hn as rn,I as Ie,It as Xo,K as Kn,Kn as se,L as It,Lt as YS,M as HC,Mn as ot,Mt as Wg,N as Hi,Nn as pd,On as oC,Pt as XI,Sn as nC,St as UI,Tn as nc,U as Jz,Ut as Zr,V as Js,Vn as rc,W as KI,Wt as _d,X as LC,Xn as tb,Xt as ef,Yn as tC,Yt as dn,_ as Bg,a as ue$1,an as gx,at as Np,bn as m,bt as Sw,cr as zI,dt as Qo,er as ub,et as M3,f as A3,fr as zo,ft as Qy,i as Nt,ir as vy,kn as oc,l as $I,ln as is,lr as za$1,m as At,n as wt,nr as v,nt as Mp,o as g,on as he$1,p as Ae,pr as zp,q as Ko,r as G,rn as ge$1,s as m$1,sr as xw,st as O,t as Mt,tr as ud,u as $g,ur as zg,vt as SC,wn as nb,xn as md,y as Bv}from"./main-CWFRW652.js";import{a as k$1,i as j,n as T,o as z,r as _,t as A}from"./chunk-CFiM4UrB.js";import{D as go,E as gn,S as bn,_ as Ut$1,a as Gt$1,b as _n,i as Gs,j as yn,k as un,l as Mn,m as Rn,n as Ds,r as Dt,s as Je,u as Ms,v as Ys,w as fo}from"./chunk-DwN6WU4M.js";import{C as he$2,D as mt,E as mn,S as Zi,T as ji,_ as Nt$1,a as Et,b as Rr,c as Ir,d as Ki,f as Kn$1,g as Ne,i as Dt$1,l as Ji,m as Ln,o as Fr,p as Li,r as Ba,t as Ar,v as Or,w as ja,x as Vt}from"./chunk-hAqSt7en.js";var qt=`/api/meses`;var de=class a{http=m(vy);horizonte(){return this.http.get(`${qt}/`)}visao(t){return this.http.get(`${qt}/${t}/`)}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var Gt=new v(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var me=class{source;checked;constructor(t,e){this.source=t,this.checked=e}};var ve=(()=>{class a{_elementRef=m(ge$1);_focusMonitor=m(Zd);_changeDetectorRef=m(Eb);defaults=m(Gt);_injector=m(q$1);_signalFormField=null;_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new me(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=Gr();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Ae;toggleChange=new Ae;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){m(Kn).load(Qy);let e=m(new ub(`tabindex`),{optional:!0}),i=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=i.color||`accent`,this.id=this._uniqueId=m(ef).getId(`mat-mdc-slide-toggle-`),this.hideIcon=i.hideIcon??!1,this.disabledInteractive=i.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngOnInit(){this._signalFormField=this._injector.get(Ln,void 0,{optional:!0,self:!0})}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new me(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(i){return new(i||a)};static ɵcmp=(function(){let e=[`switch`],i=[`*`];function s(d,m){d&1&&(Js(0,`span`,11),zp(),Js(1,`svg`,13),Vg(2,`path`,14),ud(),Js(3,`svg`,15),Vg(4,`path`,16),ud()())}return Xe({type:a,selectors:[[`mat-slide-toggle`]],viewQuery:function(m,c){if(m&1&&Wg(e,5),m&2){let _;tC(_=nC())&&(c._switchElement=_.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(m,c){m&2&&($g(`id`,c.id),Ko(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),pd(c.color?`mat-`+c.color:``),nn(`mat-mdc-slide-toggle-focused`,c._focused)(`mat-mdc-slide-toggle-checked`,c.checked)(`mat-slide-toggle-full-width`,c.fullWidth)(`_mat-animation-noopable`,c._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,rn],color:`color`,disabled:[2,`disabled`,`disabled`,rn],fullWidth:[2,`fullWidth`,`fullWidth`,rn],disableRipple:[2,`disableRipple`,`disableRipple`,rn],tabIndex:[2,`tabIndex`,`tabIndex`,d=>d==null?0:_d(d)],checked:[2,`checked`,`checked`,rn],hideIcon:[2,`hideIcon`,`hideIcon`,rn],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,rn]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[sb([{provide:mt,useExisting:is(()=>a),multi:!0},{provide:he$2,useExisting:a,multi:!0}]),na$1],ngContentSelectors:i,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(m,c){if(m&1&&(Jo(),Js(0,`div`,1)(1,`button`,2,0),zg(`click`,function(){return c._handleClick()}),Vg(3,`div`,3)(4,`span`,4),Js(5,`span`,5)(6,`span`,6)(7,`span`,7),Vg(8,`span`,8),ud(),Js(9,`span`,9),Vg(10,`span`,10),ud(),Qo(11,s,5,0,`span`,11),ud()()(),Js(12,`label`,12),zg(`click`,function(Y){return Y.stopPropagation()}),At(13),ud()()),m&2){let _=oC(2);Bg(`labelPosition`,c.labelPosition),zo(),nn(`mdc-switch--selected`,c.checked)(`mdc-switch--unselected`,!c.checked)(`mdc-switch--checked`,c.checked)(`mdc-switch--disabled`,c.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,c.disabledInteractive),Bg(`tabIndex`,c.disabled&&!c.disabledInteractive?-1:c.tabIndex)(`disabled`,c.disabled&&!c.disabledInteractive),Ko(`id`,c.buttonId)(`name`,c.name)(`aria-label`,c.ariaLabel)(`aria-labelledby`,c._getAriaLabelledBy())(`aria-describedby`,c.ariaDescribedby)(`aria-required`,c.required||null)(`aria-checked`,c.checked)(`aria-disabled`,c.disabled&&c.disabledInteractive?`true`:null),zo(9),Bg(`matRippleTrigger`,_)(`matRippleDisabled`,c.disableRipple||c.disabled)(`matRippleCentered`,!0),zo(),Xo(c.hideIcon?-1:11),zo(),Bg(`for`,c.buttonId),Ko(`id`,c._labelId)}},dependencies:[Jz,Gs],styles:[`.mdc-switch {
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
`],encapsulation:2})})()}return a})();var Bt=(()=>{class a{static ɵfac=function(i){return new(i||a)};static ɵmod=Ie({type:a});static ɵinj=he$1({imports:[ve,za$1]})}return a})();var pe=`/api/compras`;var he=class a{http=m(vy);obter(t){return this.http.get(`${pe}/${t}/`)}criar(t){return this.http.post(`${pe}/`,t)}atualizar(t,e){return this.http.patch(`${pe}/${t}/`,e)}excluir(t){return this.http.delete(`${pe}/${t}/`)}ajustarParcela(t,e){return this.http.patch(`/api/lancamentos/${t}/`,{valor:e})}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var q=class a{transform(t){return t?g(t):``}static ɵfac=function(e){return new(e||a)};static ɵpipe=od({name:`competencia`,type:a,pure:!0})};var Wt=/^\d{1,3}(\.\d{3})*(,\d{1,2})?$|^\d+(,\d{1,2})?$/;var Ut=/^\d+(\.\d{1,2})?$/;function k(a){let t=a.trim().replace(/^R\$\s*/,``),e,i;if(Ut.test(t)&&!t.includes(`,`))[e,i=``]=t.split(`.`);else if(Wt.test(t))[e,i=``]=t.replace(/\./g,``).split(`,`);else return null;return`${String(Number(e))}.${i.padEnd(2,`0`)}`}function Z(a){return a.replace(`.`,`,`)}function I(a){let[t,e=``]=a.split(`.`);return Number(t)*100+Number(e.padEnd(2,`0`))}function ge(a){return`${Math.floor(a/100)}.${String(a%100).padStart(2,`0`)}`}function we(a,t){let e=I(a);if(!Number.isInteger(t)||t<1||e<t)return null;let i=Math.floor(e/t);return[ge(i+(e-i*t)),...Array.from({length:t-1},()=>ge(i))]}var jt=(a,t)=>t.id;function Kt(a,t){if(a&1&&(Js(0,`mat-option`,5),SC(1),ud()),a&2){let e=t.$implicit;Bg(`value`,e.id),zo(),tb(e.nome)}}function ea(a,t){a&1&&(Js(0,`mat-error`),SC(1,`Escolha a fonte.`),ud())}function ta(a,t){a&1&&(Js(0,`mat-error`),SC(1,`Informe a descrição.`),ud())}function aa(a,t){a&1&&(Js(0,`mat-error`),SC(1,`Informe a data.`),ud())}function na(a,t){if(a&1&&(Js(0,`mat-hint`),SC(1),FC(2,`competencia`),ud()),a&2){let e=XI();zo(),md(`Sugerida: `,LC(2,1,e))}}function ia(a,t){if(a&1&&Qo(0,na,3,3,`mat-hint`),a&2){let e=XI();Xo(t!==e.form.controls.competencia.value?0:-1)}}function ra(a,t){a&1&&(Js(0,`mat-error`),SC(1,`Informe a competência.`),ud())}function oa(a,t){a&1&&(Js(0,`mat-error`),SC(1,`Valor inválido (ex.: 1.234,56).`),ud())}function la(a,t){a&1&&(Js(0,`mat-error`),SC(1,`De 2 a 120.`),ud())}function ca(a,t){if(a&1&&(Js(0,`mat-form-field`,12)(1,`mat-label`),SC(2,`Parcelas`),ud(),Js(3,`input`,19),Sw(),ud(),Qo(4,la,2,0,`mat-error`),ud()),a&2){let e=XI();zo(3),xw(),zo(),Xo(e.form.controls.n_parcelas.invalid?4:-1)}}function sa(a,t){a&1&&(Js(0,`mat-hint`),SC(1,`Confirmada pela fatura.`),ud())}function da(a,t){if(a&1&&(SC(0),FC(1,`currency`)),a&2){let e=XI();md(` 2ª: `,LC(1,1,e.segunda),` · `)}}function ma(a,t){if(a&1&&(Js(0,`mat-hint`),Qo(1,da,2,3),SC(2),FC(3,`currency`),ud()),a&2){let e=t;zo(),Xo(e.segunda?1:-1),zo(),nb(` `,e.quantidade,` × `,LC(3,3,e.valor),` `)}}function pa(a,t){if(a&1&&(Js(0,`p`,21),SC(1),ud()),a&2){let e=XI(2);zo(),md(`1ª parcela: `,e.form.getError(`primeiraParcela`))}}function ha(a,t){if(a&1&&(Js(0,`mat-form-field`)(1,`mat-label`),SC(2,`Valor da 1ª parcela (R$)`),ud(),Js(3,`input`,20),Sw(),ud(),Qo(4,sa,2,0,`mat-hint`)(5,ma,4,5,`mat-hint`),ud(),Qo(6,pa,2,1,`p`,21)),a&2){let e,i=XI();zo(3),xw(),zo(),Xo(i.form.controls.valor_primeira.disabled?4:(e=i.demaisParcelas())?5:-1,e),zo(2),Xo(i.form.hasError(`primeiraParcela`)&&i.form.controls.valor_primeira.touched?6:-1)}}function ga(a,t){if(a&1){let e=KI();Js(0,`div`,23)(1,`span`),SC(2),ud(),Js(3,`span`),SC(4),FC(5,`competencia`),ud(),Js(6,`input`,25,0),zg(`keydown.enter`,function(s){let d=Np(e).$implicit,m=oC(7),c=XI(3);return s.preventDefault(),Mp(c.ajustarParcela(d,m.value))})(`blur`,function(){let s=Np(e).$implicit,d=oC(7),m=XI(3);return Mp(m.ajustarParcela(s,d.value))}),ud(),Js(8,`span`,26),SC(9),ud()()}if(a&2){let e=t.$implicit,i=XI(2),s=XI();zo(2),nb(``,e.parcela,`/`,i.n_parcelas),zo(2),tb(LC(5,6,e.competencia)),zo(2),Bg(`value`,s.paraCampo(e.valor)),Ko(`aria-label`,`Valor da parcela `+e.parcela),zo(3),tb(e.status===`confirmado`?`Confirmada`:``)}}function ua(a,t){if(a&1&&(Js(0,`section`,22)(1,`h3`),SC(2,`Parcelas`),ud(),$I(3,ga,10,8,`div`,23,jt),Js(5,`p`,24),SC(6,` Ajustar o valor de uma parcela atualiza o total da compra. `),ud()()),a&2){let e=XI();zo(3),zI(e.parcelas)}}function _a(a,t){a&1&&Qo(0,ua,7,0,`section`,22),a&2&&Xo(t.parcelas.length>1?0:-1)}function fa(a,t){a&1&&(Js(0,`p`,13),SC(1),ud()),a&2&&(zo(),tb(t))}function ba(a,t){if(a&1){let e=KI();Js(0,`button`,27),zg(`click`,function(){Np(e);let s=XI();return Mp(s.excluir())}),Js(1,`mat-icon`),SC(2,`delete`),ud(),SC(3,` Excluir `),ud()}}var va=/^\d{4}-\d{2}-\d{2}$/;function wa(a){let t=k(a.value??``);return t===null||I(t)===0?{valor:!0}:null}var ya=a=>{let{parcelada:t,valor_total:e,n_parcelas:i,valor_primeira:s}=a.getRawValue(),d=k(e??``),m=k(s??``);return!t||d===null||!i||i<2?null:m===null||I(m)===0?{primeiraParcela:`Valor inválido.`}:I(d)-I(m)<i-1?{primeiraParcela:`Precisa ser menor que o total e sobrar para as demais.`}:null};var ue=class a{compras=m(he);fonteService=m(Mn);dialog=m(Ut$1);dialogRef=m(Je);compraId=m(Gt$1).compraId;fontes=It([]);compra=It(null);sugerida=It(null);salvando=It(!1);erro=It(null);alterado=It(!1);fontesDisponiveis=HC(()=>this.fontes().filter(t=>t.ativa||t.id===this.compra()?.fonte));form=m(Rr).group({fonte:[null,Ne.required],data:[``,Ne.required],descricao:[``,[Ne.required,Ne.maxLength(200)]],parcelada:[!1],valor_total:[``,[Ne.required,wa]],n_parcelas:[1,[Ne.required,Ne.min(1),Ne.max(120)]],valor_primeira:[``],competencia:[``,Ne.required]},{validators:ya});parcelada=go(this.form.controls.parcelada.valueChanges,{initialValue:!1});valores=go(this.form.valueChanges.pipe(se(()=>this.form.getRawValue())),{initialValue:this.form.getRawValue()});demaisParcelas=HC(()=>{let{valor_total:t,n_parcelas:e,valor_primeira:i}=this.valores(),s=k(t??``),d=k(i??``);if(!this.parcelada()||s===null||d===null||!e||e<2)return null;let m=I(s)-I(d),c=m>0?we(ge(m),e-1):null;return c?c[0]===c[c.length-1]?{quantidade:c.length,valor:c[0],segunda:null}:{quantidade:c.length-1,valor:c[1],segunda:c[0]}:null});constructor(){this.fonteService.listar().subscribe(_=>this.fontes.set(_)),this.compraId!==null&&this.carregarCompra(this.compraId);let{fonte:t,data:e,parcelada:i,valor_total:s,n_parcelas:d,valor_primeira:m,competencia:c}=this.form.controls;Bv(t.valueChanges,e.valueChanges).pipe(ot(()=>t.value!==null&&va.test(e.value)),oc(()=>this.fonteService.competenciaSugerida(t.value,e.value).pipe(rc(()=>Zr(null)))),fo()).subscribe(_=>{this.sugerida.set(_),_&&!c.dirty&&c.setValue(_)}),i.valueChanges.pipe(fo()).subscribe(_=>{d.setValidators([Ne.required,Ne.min(_?2:1),Ne.max(120)]),d.setValue(_?Math.max(2,d.value):1)}),Bv(s.valueChanges,d.valueChanges).pipe(fo()).subscribe(()=>{if(m.dirty||m.disabled)return;let _=k(s.value),Y=_?we(_,d.value):null;m.setValue(Y?Z(Y[0]):``)})}salvar(){if(this.form.invalid||this.salvando()){this.form.markAllAsTouched();return}this.salvando.set(!0),this.erro.set(null);let t=this.form.getRawValue(),e={fonte:t.fonte,data:t.data,descricao:t.descricao.trim(),valor_total:k(t.valor_total),n_parcelas:t.parcelada?t.n_parcelas:1,competencia_inicial:t.competencia};t.parcelada&&this.form.controls.valor_primeira.dirty&&(e.valor_primeira_parcela=k(t.valor_primeira)),(this.compraId===null?this.compras.criar(e):this.compras.atualizar(this.compraId,e)).subscribe({next:()=>this.dialogRef.close(!0),error:s=>{this.salvando.set(!1),this.erro.set(Ys(s))}})}excluir(){let t=this.compra();t&&this.dialog.open(Rn,{data:{titulo:`Excluir "${t.descricao}"?`,mensagem:`As ${t.n_parcelas} parcela(s) desta compra tamb\xE9m ser\xE3o exclu\xEDdas.`,confirmar:`Excluir`}}).afterClosed().pipe(ot(Boolean),oc(()=>this.compras.excluir(t.id))).subscribe({next:()=>this.dialogRef.close(!0),error:e=>this.erro.set(Ys(e))})}ajustarParcela(t,e){let i=k(e);i===null||i===t.valor||this.compras.ajustarParcela(t.id,i).subscribe({next:()=>{this.alterado.set(!0),this.carregarCompra(this.compraId)},error:s=>this.erro.set(Ys(s))})}paraCampo(t){return Z(t)}carregarCompra(t){this.compras.obter(t).subscribe({next:e=>{this.compra.set(e);let i=e.parcelas.find(d=>d.parcela===1),s=this.form.controls;s.parcelada.setValue(e.n_parcelas>1),s.n_parcelas.setValidators([Ne.required,Ne.min(e.n_parcelas>1?2:1)]),this.form.patchValue({fonte:e.fonte,data:e.data,descricao:e.descricao,valor_total:Z(e.valor_total),n_parcelas:e.n_parcelas,valor_primeira:i?Z(i.valor):``,competencia:e.competencia_inicial},{emitEvent:!1}),i?.status===`confirmado`&&s.valor_primeira.disable({emitEvent:!1}),this.form.updateValueAndValidity(),this.form.markAsPristine()},error:e=>this.erro.set(Ys(e))})}static ɵfac=function(e){return new(e||a)};static ɵcmp=Xe({type:a,selectors:[[`app-form-compra`]],decls:47,vars:17,consts:[[`valor`,``],[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-compra`],[`formControlName`,`fonte`],[3,`value`],[`matInput`,``,`formControlName`,`descricao`],[1,`form-compra__linha`],[`matInput`,``,`type`,`date`,`formControlName`,`data`],[`matInput`,``,`type`,`month`,`formControlName`,`competencia`],[`formControlName`,`parcelada`,1,`form-compra__parcelada`],[`matInput`,``,`formControlName`,`valor_total`,`inputmode`,`decimal`,`placeholder`,`0,00`],[1,`form-compra__quantidade`],[`role`,`alert`,1,`form-compra__erro`],[1,`form-compra__acoes`],[`mat-button`,``,`type`,`button`,1,`form-compra__excluir`],[1,`form-compra__espaco`],[`mat-button`,``,`type`,`button`,3,`mat-dialog-close`],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`matInput`,``,`type`,`number`,`min`,`2`,`max`,`120`,`formControlName`,`n_parcelas`],[`matInput`,``,`formControlName`,`valor_primeira`,`inputmode`,`decimal`,`placeholder`,`0,00`],[1,`form-compra__erro`],[`aria-label`,`Parcelas`,1,`form-compra__parcelas`],[1,`form-compra__parcela`],[1,`form-compra__dica`],[`inputmode`,`decimal`,1,`form-compra__valor-parcela`,3,`keydown.enter`,`blur`,`value`],[1,`form-compra__status`],[`mat-button`,``,`type`,`button`,1,`form-compra__excluir`,3,`click`]],template:function(e,i){if(e&1&&(Js(0,`h2`,1),SC(1),ud(),Js(2,`form`,2),zg(`ngSubmit`,function(){return i.salvar()}),Js(3,`mat-dialog-content`,3)(4,`mat-form-field`)(5,`mat-label`),SC(6,`Fonte`),ud(),Js(7,`mat-select`,4),Sw(),$I(8,Kt,2,2,`mat-option`,5,jt),ud(),Qo(10,ea,2,0,`mat-error`),ud(),Js(11,`mat-form-field`)(12,`mat-label`),SC(13,`Descrição`),ud(),Js(14,`input`,6),Sw(),ud(),Qo(15,ta,2,0,`mat-error`),ud(),Js(16,`div`,7)(17,`mat-form-field`)(18,`mat-label`),SC(19,`Data da compra`),ud(),Js(20,`input`,8),Sw(),ud(),Qo(21,aa,2,0,`mat-error`),ud(),Js(22,`mat-form-field`)(23,`mat-label`),SC(24),ud(),Js(25,`input`,9),Sw(),ud(),Qo(26,ia,1,1),Qo(27,ra,2,0,`mat-error`),ud()(),Js(28,`mat-slide-toggle`,10),Sw(),SC(29,`Compra parcelada`),ud(),Js(30,`div`,7)(31,`mat-form-field`)(32,`mat-label`),SC(33),ud(),Js(34,`input`,11),Sw(),ud(),Qo(35,oa,2,0,`mat-error`),ud(),Qo(36,ca,5,1,`mat-form-field`,12),ud(),Qo(37,ha,7,2),Qo(38,_a,1,1),Qo(39,fa,2,1,`p`,13),ud(),Js(40,`mat-dialog-actions`,14),Qo(41,ba,4,0,`button`,15),Vg(42,`span`,16),Js(43,`button`,17),SC(44,`Cancelar`),ud(),Js(45,`button`,18),SC(46,`Salvar`),ud()()()),e&2){let s,d,m;zo(),tb(i.compraId===null?`Nova compra`:`Editar compra`),zo(),Bg(`formGroup`,i.form),zo(5),xw(),zo(),zI(i.fontesDisponiveis()),zo(2),Xo(i.form.controls.fonte.hasError(`required`)?10:-1),zo(4),xw(),zo(),Xo(i.form.controls.descricao.hasError(`required`)?15:-1),zo(5),xw(),zo(),Xo(i.form.controls.data.hasError(`required`)?21:-1),zo(3),tb(i.parcelada()?`Competência da 1ª parcela`:`Competência`),zo(),xw(),zo(),Xo((s=i.sugerida())?26:-1,s),zo(),Xo(i.form.controls.competencia.hasError(`required`)?27:-1),zo(),xw(),zo(5),tb(i.parcelada()?`Valor total (R$)`:`Valor (R$)`),zo(),xw(),zo(),Xo(i.form.controls.valor_total.invalid?35:-1),zo(),Xo(i.parcelada()?36:-1),zo(),Xo(i.parcelada()?37:-1),zo(),Xo((d=i.compra())?38:-1,d),zo(),Xo((m=i.erro())?39:-1,m),zo(2),Xo(i.compra()?41:-1),zo(2),Bg(`mat-dialog-close`,i.alterado()),zo(2),Bg(`disabled`,i.salvando())}},dependencies:[Or,Ir,mn,Ki,Fr,Ar,ji,Li,Nt$1,Zi,A3,M3,bn,un,gn,yn,_n,Vt,Kn$1,Et,Dt$1,Ji,Mt,wt,Ba,ja,Ms,Ds,Dt,Bt,ve,YS,q],styles:[`.form-compra[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(480px,80vw)}.form-compra__linha[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:12px}.form-compra__linha[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 180px}.form-compra__quantidade[_ngcontent-%COMP%]{flex:0 1 120px!important}.form-compra__parcelada[_ngcontent-%COMP%]{margin:4px 0 12px}.form-compra__parcelas[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-small);margin:8px 0}.form-compra__parcela[_ngcontent-%COMP%]{display:grid;grid-template-columns:3.5rem 1fr 7rem 6rem;align-items:center;gap:8px;padding:2px 0}.form-compra__valor-parcela[_ngcontent-%COMP%]{font:inherit;text-align:right;padding:4px 6px;border:1px solid var(--%NS%mat-sys-outline-variant);border-radius:4px;background:transparent;color:inherit}.form-compra__status[_ngcontent-%COMP%], .form-compra__dica[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-body-small);color:var(--%NS%mat-sys-on-surface-variant)}.form-compra__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.form-compra__acoes[_ngcontent-%COMP%]{display:flex}.form-compra__espaco[_ngcontent-%COMP%]{flex:1}.form-compra__excluir[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};var Ca=(a,t)=>t.fonte.id;var Sa=(a,t)=>t.id;function ka(a,t){if(a&1&&(Js(0,`mat-option`,4),SC(1),FC(2,`competencia`),ud()),a&2){let e=t.$implicit;Bg(`value`,e),zo(),tb(LC(2,2,e))}}function xa(a,t){a&1&&(Js(0,`p`,7),SC(1),ud()),a&2&&(zo(),tb(t))}function Na(a,t){if(a&1){let e=KI();Js(0,`button`,14),zg(`click`,function(){let s=Np(e).$implicit,d=XI(4);return Mp(d.abrirLancamento(s))}),Js(1,`span`,15),SC(2),ud(),Js(3,`span`,16),SC(4),ud(),Js(5,`span`,17),SC(6),FC(7,`currency`),ud()()}if(a&2){let e=t.$implicit;nn(`mes__lancamento--importado`,e.origem===`importacao`),zo(2),tb(e.descricao),zo(2),tb(e.parcela),zo(2),tb(LC(7,5,e.valor))}}function Ma(a,t){a&1&&(Js(0,`p`,11),SC(1,`Nenhum lançamento.`),ud())}function Ea(a,t){if(a&1&&(Js(0,`mat-card`,12)(1,`mat-card-header`)(2,`mat-card-title`),SC(3),ud(),Js(4,`mat-card-subtitle`),SC(5),FC(6,`currency`),ud()(),Js(7,`mat-card-content`),$I(8,Na,8,7,`button`,13,Sa,!1,Ma,2,0,`p`,11),ud()()),a&2){let e=t.$implicit;zo(3),tb(e.fonte.nome),zo(2),tb(LC(6,3,e.total)),zo(3),zI(e.lancamentos)}}function Ia(a,t){if(a&1&&(Js(0,`section`,10),$I(1,Ea,11,5,`mat-card`,12,Ca),ud()),a&2){let e=XI();zo(),zI(e.fontes)}}function za(a,t){a&1&&(Js(0,`p`,11),SC(1,` Nenhuma fonte cadastrada. `),Js(2,`a`,18),SC(3,`Cadastre os cartões e o dinheiro`),ud(),SC(4,` para lançar compras. `),ud())}function Da(a,t){if(a&1&&(Js(0,`section`,8)(1,`div`)(2,`span`),SC(3,`Rendimentos`),ud(),Js(4,`strong`),SC(5),FC(6,`currency`),ud()(),Js(7,`div`)(8,`span`),SC(9,`Fixas`),ud(),Js(10,`strong`),SC(11),FC(12,`currency`),ud()(),Js(13,`div`)(14,`span`),SC(15,`Dinheiro e contas`),ud(),Js(16,`strong`),SC(17),FC(18,`currency`),ud()(),Js(19,`div`)(20,`span`),SC(21,`Cartões`),ud(),Js(22,`strong`),SC(23),FC(24,`currency`),ud()(),Js(25,`div`,9)(26,`span`),SC(27,`Saldo`),ud(),Js(28,`strong`),SC(29),FC(30,`currency`),ud()()(),Qo(31,Ia,3,0,`section`,10)(32,za,5,0,`p`,11)),a&2){let e=t,i=XI();zo(5),tb(LC(6,8,e.resumo.total_rendimentos)),zo(6),tb(LC(12,10,e.resumo.total_fixas)),zo(6),tb(LC(18,12,e.resumo.total_dinheiro_e_contas)),zo(6),tb(LC(24,14,e.resumo.total_cartoes)),zo(2),nn(`mes__saldo--negativo`,i.negativo(e.resumo.saldo)),zo(4),tb(LC(30,16,e.resumo.saldo)),zo(2),Xo(e.fontes.length?31:32)}}var Xt=class a{meses=m(de);dialog=m(Ut$1);router=m(ue$1);route=m(G);recarregar$=new dn(void 0);competencia=go(this.route.paramMap.pipe(se(t=>t.get(`competencia`)??``)),{requireSync:!0});visao=It(null);horizonte=It([]);erro=It(null);anterior=HC(()=>this.navegavel(-1));seguinte=HC(()=>this.navegavel(1));opcoes=HC(()=>{let t=this.horizonte().map(i=>i.competencia),e=this.competencia();return t.includes(e)||!e?t:[...t,e].sort()});constructor(){this.recarregar$.pipe(oc(()=>this.meses.horizonte().pipe(rc(()=>Zr([])))),fo()).subscribe(t=>this.horizonte.set(t)),nc([this.route.paramMap,this.recarregar$]).pipe(se(([t])=>t.get(`competencia`)??``),Hi(()=>this.erro.set(null)),oc(t=>this.meses.visao(t).pipe(rc(e=>(this.erro.set(Ys(e,`Não foi possível carregar o mês.`)),Zr(null))))),fo()).subscribe(t=>this.visao.set(t))}irPara(t){this.router.navigate([`/meses`,t])}novaCompra(){this.abrirCompra(null)}abrirLancamento(t){t.compra!==null&&this.abrirCompra(t.compra)}negativo(t){return t.startsWith(`-`)}abrirCompra(t){this.dialog.open(ue,{data:{compraId:t},autoFocus:`first-tabbable`}).afterClosed().pipe(ot(Boolean)).subscribe(()=>this.recarregar$.next())}navegavel(t){try{return m$1(this.competencia(),t)}catch{return null}}static ɵfac=function(e){return new(e||a)};static ɵcmp=Xe({type:a,selectors:[[`app-visao-mensal`]],decls:17,vars:5,consts:[[1,`mes__cabecalho`],[1,`mes__navegacao`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Mês anterior`,3,`click`,`disabled`],[`aria-label`,`Escolher mês`,1,`mes__seletor`,3,`selectionChange`,`value`],[3,`value`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Mês seguinte`,3,`click`,`disabled`],[`mat-flat-button`,``,`type`,`button`,3,`click`],[`role`,`alert`,1,`mes__erro`],[`aria-label`,`Resumo do mês`,1,`mes__resumo`],[1,`mes__saldo`],[1,`mes__blocos`],[1,`mes__vazio`],[`appearance`,`outlined`,1,`mes__bloco`],[`type`,`button`,1,`mes__lancamento`,3,`mes__lancamento--importado`],[`type`,`button`,1,`mes__lancamento`,3,`click`],[1,`mes__descricao`],[1,`mes__parcela`],[1,`mes__valor`],[`routerLink`,`/fontes`]],template:function(e,i){if(e&1&&(Js(0,`header`,0)(1,`div`,1)(2,`button`,2),zg(`click`,function(){return i.irPara(i.anterior())}),Js(3,`mat-icon`),SC(4,`chevron_left`),ud()(),Js(5,`mat-select`,3),zg(`selectionChange`,function(d){return i.irPara(d.value)}),$I(6,ka,3,4,`mat-option`,4,UI),ud(),Js(8,`button`,5),zg(`click`,function(){return i.irPara(i.seguinte())}),Js(9,`mat-icon`),SC(10,`chevron_right`),ud()()(),Js(11,`button`,6),zg(`click`,function(){return i.novaCompra()}),Js(12,`mat-icon`),SC(13,`add`),ud(),SC(14,` Nova compra `),ud()(),Qo(15,xa,2,1,`p`,7),Qo(16,Da,33,18)),e&2){let s,d;zo(2),Bg(`disabled`,!i.anterior()),zo(3),Bg(`value`,i.competencia()),zo(),zI(i.opcoes()),zo(2),Bg(`disabled`,!i.seguinte()),zo(7),Xo((s=i.erro())?15:-1,s),zo(),Xo((d=i.visao())?16:-1,d)}},dependencies:[Nt,A3,M3,gx,j,_,k$1,T,z,A,Mt,wt,Ms,Ds,Dt,YS,q],styles:[`.mes__cabecalho[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.mes__navegacao[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px}.mes__seletor[_ngcontent-%COMP%]{width:14rem;font:var(--%NS%mat-sys-title-large)}.mes__resumo[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:24px;padding:12px 16px;margin-bottom:16px;border-radius:12px;background:var(--%NS%mat-sys-surface-container)}.mes__resumo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.mes__resumo[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-label-medium);color:var(--%NS%mat-sys-on-surface-variant)}.mes__resumo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-medium)}.mes__saldo--negativo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.mes__blocos[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;align-items:start}.mes__lancamento[_ngcontent-%COMP%]{all:unset;box-sizing:border-box;width:100%;display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:6px 4px;border-bottom:1px solid var(--%NS%mat-sys-outline-variant);cursor:pointer}.mes__lancamento[_ngcontent-%COMP%]:hover{background:var(--%NS%mat-sys-surface-container-high)}.mes__lancamento[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--%NS%mat-sys-primary)}.mes__lancamento--importado[_ngcontent-%COMP%]   .mes__descricao[_ngcontent-%COMP%]{background:var(--%NS%mat-sys-tertiary-container);border-radius:4px;padding:0 4px}.mes__descricao[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mes__parcela[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);font:var(--%NS%mat-sys-body-small);align-self:center}.mes__valor[_ngcontent-%COMP%]{text-align:right;font-variant-numeric:tabular-nums}.mes__vazio[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.mes__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};export{Xt as VisaoMensalComponent};