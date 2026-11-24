import{a as k,i as j,n as T,o as z,r as _,t as A}from"./chunk-D2N1ViA5.js";import{$ as QC,$t as fn$1,A as Ie,At as Zg,B as LC,Bn as qp,Bt as be,Cn as m,Ct as Ya$1,Dn as nC,Dt as Z,F as KC,Fn as pb,Ft as ac,Gn as ra,Gt as cs,Ht as cb,I as Kg,Jn as s3,Kn as rn$1,Kt as eC,L as Kr,M as Jd,Mn as on$1,N as Jo,On as ni,Pn as pC,Pt as ab,Qn as sf,Rn as qg,S as Fp,Sn as lv,Tn as md,U as Mb,Ut as cc,Vn as qr,Vt as cC,Xn as sa,Xt as en$1,Y as Oe,Yn as sT,Yt as ei,Zn as se,Zt as et$1,a as u,ar as ti,at as Rt,bn as lb,br as zn$1,c as ue,ct as St,dn as j$1,dr as ub,er as st$1,f as Ax,fn as j3,gn as kp,gr as yd,in as ge,j as Ix,kn as nn$1,kt as ZC,lr as uC,mn as jw,mr as vb,mt as Vw,n as wt,nn as gC,nr as tb,nt as Qv,o as G,or as tn$1,p as Ay,pr as v,q as O,qt as eS,rt as R,s as Nt,st as Sd,t as Mt,tr as tC,tt as Qn$1,u as $g,ur as uT,vr as zg,wn as mC,xn as lc,yn as lT,yr as zi,z as L3,zn as qo,zt as bd}from"./main-QKKNVAGI.js";import{n as H,r as x,t as A$1}from"./chunk-C7Rbz0c3.js";import{a as b,c as j$2,i as R$1,l as m$1,n as I,o as d,r as N,s as h,t as A$2,u as p}from"./chunk-DyanMFlQ.js";import{C as jt,E as os,O as sn$1,S as hn$1,T as mn$1,_ as cn$1,b as fs,d as Ze,h as as,m as _s,n as Ht,t as Cn$1,v as dn$1,w as kt}from"./chunk-DTZUcqF9.js";import{A as zi$1,C as hn$2,E as te,O as tr,S as Zi,T as kr,_ as Ue,a as Ga$1,b as Xn$1,d as Oe$1,f as Or,g as Tr,i as Et,l as Ki,m as Qi,n as Bi,o as Ha$1,p as Ot,r as Bn$1,s as Ir,t as At,u as Ne,v as Vr,y as Vt}from"./chunk-B4gmLZ3I.js";var ha=`/api/meses`;var Je=class a{http=m(Ay);horizonte(){return this.http.get(`${ha}/`)}visao(t){return this.http.get(`${ha}/${t}/`)}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var Da=new v(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var Ye=class{source;checked;constructor(t,e){this.source=t,this.checked=e}};var ut=(()=>{class a{_elementRef=m(be);_focusMonitor=m(Jd);_changeDetectorRef=m(Mb);defaults=m(Da);_injector=m(Z);_signalFormField=null;_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new Ye(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=qr();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Oe;toggleChange=new Oe;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){m(Qn$1).load(lv);let e=m(new vb(`tabindex`),{optional:!0}),n=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=n.color||`accent`,this.id=this._uniqueId=m(sf).getId(`mat-mdc-slide-toggle-`),this.hideIcon=n.hideIcon??!1,this.disabledInteractive=n.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngOnInit(){this._signalFormField=this._injector.get(Bn$1,void 0,{optional:!0,self:!0})}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Ye(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(n){return new(n||a)};static ɵcmp=(function(){let e=[`switch`],n=[`*`];function l(c,v){c&1&&(ra(0,`span`,11),qp(),ra(1,`svg`,13),zg(2,`path`,14),md(),ra(3,`svg`,15),zg(4,`path`,16),md()())}return et$1({type:a,selectors:[[`mat-slide-toggle`]],viewQuery:function(v,d){if(v&1&&Kg(e,5),v&2){let M;pC(M=mC())&&(d._switchElement=M.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(v,d){v&2&&(qg(`id`,d.id),Jo(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),bd(d.color?`mat-`+d.color:``),rn$1(`mat-mdc-slide-toggle-focused`,d._focused)(`mat-mdc-slide-toggle-checked`,d.checked)(`mat-slide-toggle-full-width`,d.fullWidth)(`_mat-animation-noopable`,d._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,on$1],color:`color`,disabled:[2,`disabled`,`disabled`,on$1],fullWidth:[2,`fullWidth`,`fullWidth`,on$1],disableRipple:[2,`disableRipple`,`disableRipple`,on$1],tabIndex:[2,`tabIndex`,`tabIndex`,c=>c==null?0:Sd(c)],checked:[2,`checked`,`checked`,on$1],hideIcon:[2,`hideIcon`,`hideIcon`,on$1],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,on$1]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[pb([{provide:Ue,useExisting:cs(()=>a),multi:!0},{provide:te,useExisting:a,multi:!0}]),sa],ngContentSelectors:n,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(v,d){if(v&1&&(ni(),ra(0,`div`,1)(1,`button`,2,0),Zg(`click`,function(){return d._handleClick()}),zg(3,`div`,3)(4,`span`,4),ra(5,`span`,5)(6,`span`,6)(7,`span`,7),zg(8,`span`,8),md(),ra(9,`span`,9),zg(10,`span`,10),md(),ei(11,l,5,0,`span`,11),md()()(),ra(12,`label`,12),Zg(`click`,function(ze){return ze.stopPropagation()}),Rt(13),md()()),v&2){let M=gC(2);$g(`labelPosition`,d.labelPosition),qo(),rn$1(`mdc-switch--selected`,d.checked)(`mdc-switch--unselected`,!d.checked)(`mdc-switch--checked`,d.checked)(`mdc-switch--disabled`,d.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,d.disabledInteractive),$g(`tabIndex`,d.disabled&&!d.disabledInteractive?-1:d.tabIndex)(`disabled`,d.disabled&&!d.disabledInteractive),Jo(`id`,d.buttonId)(`name`,d.name)(`aria-label`,d.ariaLabel)(`aria-labelledby`,d._getAriaLabelledBy())(`aria-describedby`,d.ariaDescribedby)(`aria-required`,d.required||null)(`aria-checked`,d.checked)(`aria-disabled`,d.disabled&&d.disabledInteractive?`true`:null),qo(9),$g(`matRippleTrigger`,M)(`matRippleDisabled`,d.disableRipple||d.disabled)(`matRippleCentered`,!0),qo(),ti(d.hideIcon?-1:11),qo(),$g(`for`,d.buttonId),Jo(`id`,d._labelId)}},dependencies:[s3,_s],styles:[`.mdc-switch {
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
`],encapsulation:2})})()}return a})();var ba=(()=>{class a{static ɵfac=function(n){return new(n||a)};static ɵmod=Ie({type:a});static ɵinj=ge({imports:[ut,Ya$1]})}return a})();var Ke=`/api/compras`;var et=class a{http=m(Ay);obter(t){return this.http.get(`${Ke}/${t}/`)}criar(t){return this.http.post(`${Ke}/`,t)}atualizar(t,e){return this.http.patch(`${Ke}/${t}/`,e)}excluir(t){return this.http.delete(`${Ke}/${t}/`)}ajustarParcela(t,e){return this.http.patch(`/api/lancamentos/${t}/`,{valor:e})}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var ya=(a,t)=>t.id;function Pa(a,t){if(a&1&&(ra(0,`mat-option`,5),LC(1),md()),a&2){let e=t.$implicit;$g(`value`,e.id),qo(),ab(e.nome)}}function Va(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Escolha a fonte.`),md())}function Ta(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Informe a descrição.`),md())}function Oa(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Informe a data.`),md())}function Aa(a,t){if(a&1&&(ra(0,`mat-hint`),LC(1),ZC(2,`competencia`),md()),a&2){let e=uC();qo(),yd(`Sugerida: `,KC(2,1,e))}}function za(a,t){if(a&1&&ei(0,Aa,3,3,`mat-hint`),a&2){let e=uC();ti(t!==e.form.controls.competencia.value?0:-1)}}function Ra(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Informe a competência.`),md())}function Ba(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Valor inválido (ex.: 1.234,56).`),md())}function Xa(a,t){a&1&&(ra(0,`mat-error`),LC(1,`De 2 a 120.`),md())}function La(a,t){if(a&1&&(ra(0,`mat-form-field`,12)(1,`mat-label`),LC(2,`Parcelas`),md(),ra(3,`input`,19),jw(),md(),ei(4,Xa,2,0,`mat-error`),md()),a&2){let e=uC();qo(3),Vw(),qo(),ti(e.form.controls.n_parcelas.invalid?4:-1)}}function qa(a,t){a&1&&(ra(0,`mat-hint`),LC(1,`Confirmada pela fatura.`),md())}function $a(a,t){if(a&1&&(LC(0),ZC(1,`currency`)),a&2){let e=uC();yd(` 2ª: `,KC(1,1,e.segunda),` · `)}}function ja(a,t){if(a&1&&(ra(0,`mat-hint`),ei(1,$a,2,3),LC(2),ZC(3,`currency`),md()),a&2){let e=t;qo(),ti(e.segunda?1:-1),qo(),cb(` `,e.quantidade,` × `,KC(3,3,e.valor),` `)}}function Ga(a,t){if(a&1&&(ra(0,`p`,21),LC(1),md()),a&2){let e=uC(2);qo(),yd(`1ª parcela: `,e.form.getError(`primeiraParcela`))}}function Ha(a,t){if(a&1&&(ra(0,`mat-form-field`)(1,`mat-label`),LC(2,`Valor da 1ª parcela (R$)`),md(),ra(3,`input`,20),jw(),md(),ei(4,qa,2,0,`mat-hint`)(5,ja,4,5,`mat-hint`),md(),ei(6,Ga,2,1,`p`,21)),a&2){let e,n=uC();qo(3),Vw(),qo(),ti(n.form.controls.valor_primeira.disabled?4:(e=n.demaisParcelas())?5:-1,e),qo(2),ti(n.form.hasError(`primeiraParcela`)&&n.form.controls.valor_primeira.touched?6:-1)}}function Wa(a,t){if(a&1){let e=cC();ra(0,`div`,23)(1,`span`),LC(2),md(),ra(3,`span`),LC(4),ZC(5,`competencia`),md(),ra(6,`input`,25,0),Zg(`keydown.enter`,function(l){let c=kp(e).$implicit,v=gC(7),d=uC(3);return l.preventDefault(),Fp(d.ajustarParcela(c,v.value))})(`blur`,function(){let l=kp(e).$implicit,c=gC(7),v=uC(3);return Fp(v.ajustarParcela(l,c.value))}),md(),ra(8,`span`,26),LC(9),md()()}if(a&2){let e=t.$implicit,n=uC(2),l=uC();qo(2),cb(``,e.parcela,`/`,n.n_parcelas),qo(2),ab(KC(5,6,e.competencia)),qo(2),$g(`value`,l.paraCampo(e.valor)),Jo(`aria-label`,`Valor da parcela `+e.parcela),qo(3),ab(e.status===`confirmado`?`Confirmada`:``)}}function Za(a,t){if(a&1&&(ra(0,`section`,22)(1,`h3`),LC(2,`Parcelas`),md(),tC(3,Wa,10,8,`div`,23,ya),ra(5,`p`,24),LC(6,` Ajustar o valor de uma parcela atualiza o total da compra. `),md()()),a&2){let e=uC();qo(3),nC(e.parcelas)}}function Ua(a,t){a&1&&ei(0,Za,7,0,`section`,22),a&2&&ti(t.parcelas.length>1?0:-1)}function Qa(a,t){a&1&&(ra(0,`p`,13),LC(1),md()),a&2&&(qo(),ab(t))}function Ja(a,t){if(a&1){let e=cC();ra(0,`button`,27),Zg(`click`,function(){kp(e);let l=uC();return Fp(l.excluir())}),ra(1,`mat-icon`),LC(2,`delete`),md(),LC(3,` Excluir `),md()}}var Ya=/^\d{4}-\d{2}-\d{2}$/;function Ka(a){let t=h(a.value??``);return t===null||R$1(t)===0?{valor:!0}:null}var en=a=>{let{parcelada:t,valor_total:e,n_parcelas:n,valor_primeira:l}=a.getRawValue(),c=h(e??``),v=h(l??``);return!t||c===null||!n||n<2?null:v===null||R$1(v)===0?{primeiraParcela:`Valor inválido.`}:R$1(c)-R$1(v)<n-1?{primeiraParcela:`Precisa ser menor que o total e sobrar para as demais.`}:null};var tt=class a{compras=m(et);fonteService=m(x);dialog=m(Ht);dialogRef=m(Ze);dados=m(jt);compraId=this.dados.compraId;fontes=St([]);compra=St(null);sugerida=St(null);salvando=St(!1);erro=St(null);alterado=St(!1);fontesDisponiveis=eS(()=>this.fontes().filter(t=>t.ativa||t.id===this.compra()?.fonte));form=m(Tr).group({fonte:[null,Ne.required],data:[``,Ne.required],descricao:[``,[Ne.required,Ne.maxLength(200)]],parcelada:[!1],valor_total:[``,[Ne.required,Ka]],n_parcelas:[1,[Ne.required,Ne.min(1),Ne.max(120)]],valor_primeira:[``],competencia:[``,Ne.required]},{validators:en});parcelada=H(this.form.controls.parcelada.valueChanges,{initialValue:!1});valores=H(this.form.valueChanges.pipe(se(()=>this.form.getRawValue())),{initialValue:this.form.getRawValue()});demaisParcelas=eS(()=>{let{valor_total:t,n_parcelas:e,valor_primeira:n}=this.valores(),l=h(t??``),c=h(n??``);if(!this.parcelada()||l===null||c===null||!e||e<2)return null;let v=R$1(l)-R$1(c),d$1=v>0?I(d(v),e-1):null;return d$1?d$1[0]===d$1[d$1.length-1]?{quantidade:d$1.length,valor:d$1[0],segunda:null}:{quantidade:d$1.length-1,valor:d$1[1],segunda:d$1[0]}:null});constructor(){this.fonteService.listar().subscribe(M=>this.fontes.set(M)),this.compraId!==null&&this.carregarCompra(this.compraId);let{fonte:t,data:e,parcelada:n,valor_total:l,n_parcelas:c,valor_primeira:v,competencia:d}=this.form.controls;Qv(t.valueChanges,e.valueChanges).pipe(st$1(()=>t.value!==null&&Ya.test(e.value)),lc(()=>this.fonteService.competenciaSugerida(t.value,e.value).pipe(cc(()=>Kr(null)))),A$1()).subscribe(M=>{this.sugerida.set(M),M&&!d.dirty&&d.setValue(M)}),this.compraId===null&&this.dados.fonteId&&t.setValue(this.dados.fonteId),n.valueChanges.pipe(A$1()).subscribe(M=>{c.setValidators([Ne.required,Ne.min(M?2:1),Ne.max(120)]),c.setValue(M?Math.max(2,c.value):1)}),Qv(l.valueChanges,c.valueChanges).pipe(A$1()).subscribe(()=>{if(v.dirty||v.disabled)return;let M=h(l.value),ze=M?I(M,c.value):null;v.setValue(ze?A$2(ze[0]):``)})}salvar(){if(this.form.invalid||this.salvando()){this.form.markAllAsTouched();return}this.salvando.set(!0),this.erro.set(null);let t=this.form.getRawValue(),e={fonte:t.fonte,data:t.data,descricao:t.descricao.trim(),valor_total:h(t.valor_total),n_parcelas:t.parcelada?t.n_parcelas:1,competencia_inicial:t.competencia};t.parcelada&&this.form.controls.valor_primeira.dirty&&(e.valor_primeira_parcela=h(t.valor_primeira)),(this.compraId===null?this.compras.criar(e):this.compras.atualizar(this.compraId,e)).subscribe({next:()=>this.dialogRef.close(!0),error:l=>{this.salvando.set(!1),this.erro.set(fs(l))}})}excluir(){let t=this.compra();t&&this.dialog.open(Cn$1,{data:{titulo:`Excluir "${t.descricao}"?`,mensagem:`As ${t.n_parcelas} parcela(s) desta compra tamb\xE9m ser\xE3o exclu\xEDdas.`,confirmar:`Excluir`}}).afterClosed().pipe(st$1(Boolean),lc(()=>this.compras.excluir(t.id))).subscribe({next:()=>this.dialogRef.close(!0),error:e=>this.erro.set(fs(e))})}ajustarParcela(t,e){let n=h(e);n===null||n===t.valor||this.compras.ajustarParcela(t.id,n).subscribe({next:()=>{this.alterado.set(!0),this.carregarCompra(this.compraId)},error:l=>this.erro.set(fs(l))})}paraCampo(t){return A$2(t)}carregarCompra(t){this.compras.obter(t).subscribe({next:e=>{this.compra.set(e);let n=e.parcelas.find(c=>c.parcela===1),l=this.form.controls;l.parcelada.setValue(e.n_parcelas>1),l.n_parcelas.setValidators([Ne.required,Ne.min(e.n_parcelas>1?2:1)]),this.form.patchValue({fonte:e.fonte,data:e.data,descricao:e.descricao,valor_total:A$2(e.valor_total),n_parcelas:e.n_parcelas,valor_primeira:n?A$2(n.valor):``,competencia:e.competencia_inicial},{emitEvent:!1}),n?.status===`confirmado`&&l.valor_primeira.disable({emitEvent:!1}),this.form.updateValueAndValidity(),this.form.markAsPristine()},error:e=>this.erro.set(fs(e))})}static ɵfac=function(e){return new(e||a)};static ɵcmp=et$1({type:a,selectors:[[`app-form-compra`]],decls:47,vars:17,consts:[[`valor`,``],[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-compra`],[`formControlName`,`fonte`],[3,`value`],[`matInput`,``,`formControlName`,`descricao`,1,`form-compra__descricao`],[1,`form-compra__linha`],[`matInput`,``,`type`,`date`,`formControlName`,`data`],[`matInput`,``,`type`,`month`,`formControlName`,`competencia`],[`formControlName`,`parcelada`,1,`form-compra__parcelada`],[`matInput`,``,`formControlName`,`valor_total`,`inputmode`,`decimal`,`placeholder`,`0,00`],[1,`form-compra__quantidade`],[`role`,`alert`,1,`form-compra__erro`],[1,`form-compra__acoes`],[`mat-button`,``,`type`,`button`,1,`form-compra__excluir`],[1,`form-compra__espaco`],[`mat-button`,``,`type`,`button`,3,`mat-dialog-close`],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`matInput`,``,`type`,`number`,`min`,`2`,`max`,`120`,`formControlName`,`n_parcelas`],[`matInput`,``,`formControlName`,`valor_primeira`,`inputmode`,`decimal`,`placeholder`,`0,00`],[1,`form-compra__erro`],[`aria-label`,`Parcelas`,1,`form-compra__parcelas`],[1,`form-compra__parcela`],[1,`form-compra__dica`],[`inputmode`,`decimal`,1,`form-compra__valor-parcela`,3,`keydown.enter`,`blur`,`value`],[1,`form-compra__status`],[`mat-button`,``,`type`,`button`,1,`form-compra__excluir`,3,`click`]],template:function(e,n){if(e&1&&(ra(0,`h2`,1),LC(1),md(),ra(2,`form`,2),Zg(`ngSubmit`,function(){return n.salvar()}),ra(3,`mat-dialog-content`,3)(4,`mat-form-field`)(5,`mat-label`),LC(6,`Fonte`),md(),ra(7,`mat-select`,4),jw(),tC(8,Pa,2,2,`mat-option`,5,ya),md(),ei(10,Va,2,0,`mat-error`),md(),ra(11,`mat-form-field`)(12,`mat-label`),LC(13,`Descrição`),md(),ra(14,`input`,6),jw(),md(),ei(15,Ta,2,0,`mat-error`),md(),ra(16,`div`,7)(17,`mat-form-field`)(18,`mat-label`),LC(19,`Data da compra`),md(),ra(20,`input`,8),jw(),md(),ei(21,Oa,2,0,`mat-error`),md(),ra(22,`mat-form-field`)(23,`mat-label`),LC(24),md(),ra(25,`input`,9),jw(),md(),ei(26,za,1,1),ei(27,Ra,2,0,`mat-error`),md()(),ra(28,`mat-slide-toggle`,10),jw(),LC(29,`Compra parcelada`),md(),ra(30,`div`,7)(31,`mat-form-field`)(32,`mat-label`),LC(33),md(),ra(34,`input`,11),jw(),md(),ei(35,Ba,2,0,`mat-error`),md(),ei(36,La,5,1,`mat-form-field`,12),md(),ei(37,Ha,7,2),ei(38,Ua,1,1),ei(39,Qa,2,1,`p`,13),md(),ra(40,`mat-dialog-actions`,14),ei(41,Ja,4,0,`button`,15),zg(42,`span`,16),ra(43,`button`,17),LC(44,`Cancelar`),md(),ra(45,`button`,18),LC(46,`Salvar`),md()()()),e&2){let l,c,v;qo(),ab(n.compraId===null?`Nova compra`:`Editar compra`),qo(),$g(`formGroup`,n.form),qo(5),Vw(),qo(),nC(n.fontesDisponiveis()),qo(2),ti(n.form.controls.fonte.hasError(`required`)?10:-1),qo(4),Vw(),qo(),ti(n.form.controls.descricao.hasError(`required`)?15:-1),qo(5),Vw(),qo(),ti(n.form.controls.data.hasError(`required`)?21:-1),qo(3),ab(n.parcelada()?`Competência da 1ª parcela`:`Competência`),qo(),Vw(),qo(),ti((l=n.sugerida())?26:-1,l),qo(),ti(n.form.controls.competencia.hasError(`required`)?27:-1),qo(),Vw(),qo(5),ab(n.parcelada()?`Valor total (R$)`:`Valor (R$)`),qo(),Vw(),qo(),ti(n.form.controls.valor_total.invalid?35:-1),qo(),ti(n.parcelada()?36:-1),qo(),ti(n.parcelada()?37:-1),qo(),ti((c=n.compra())?38:-1,c),qo(),ti((v=n.erro())?39:-1,v),qo(2),ti(n.compra()?41:-1),qo(2),$g(`mat-dialog-close`,n.alterado()),qo(2),$g(`disabled`,n.salvando())}},dependencies:[kr,Or,hn$2,Ki,Vr,Ir,Bi,zi$1,Et,Qi,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot,Xn$1,At,Vt,tr,Mt,wt,Ga$1,Ha$1,as,os,kt,ba,ut,uT,p],styles:[`.form-compra[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(480px,80vw)}.form-compra__linha[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:12px}.form-compra__linha[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 180px}.form-compra__quantidade[_ngcontent-%COMP%]{flex:0 1 120px!important}.form-compra__parcelada[_ngcontent-%COMP%]{margin:4px 0 12px}.form-compra__parcelas[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-small);margin:8px 0}.form-compra__parcela[_ngcontent-%COMP%]{display:grid;grid-template-columns:3.5rem 1fr 7rem 6rem;align-items:center;gap:8px;padding:2px 0}.form-compra__valor-parcela[_ngcontent-%COMP%]{font:inherit;text-align:right;padding:4px 6px;border:1px solid var(--%NS%mat-sys-outline-variant);border-radius:4px;background:transparent;color:inherit}.form-compra__status[_ngcontent-%COMP%], .form-compra__dica[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-body-small);color:var(--%NS%mat-sys-on-surface-variant)}.form-compra__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.form-compra__acoes[_ngcontent-%COMP%]{display:flex}.form-compra__espaco[_ngcontent-%COMP%]{flex:1}.form-compra__excluir[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};var tn=new v(`MAT_PROGRESS_BAR_DEFAULT_OPTIONS`);var Ca=(()=>{class a{_elementRef=m(be);_ngZone=m(j$1);_changeDetectorRef=m(Mb);_renderer=m(zn$1);_cleanupTransitionEnd;constructor(){let e=Ix(),n=m(tn,{optional:!0});this._isNoopAnimation=e===`di-disabled`,e===`reduced-motion`&&this._elementRef.nativeElement.classList.add(`mat-progress-bar-reduced-motion`),n&&(n.color&&(this.color=this._defaultColor=n.color),this.mode=n.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor=`primary`;get value(){return this._value}set value(e){this._value=wa(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=wa(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new Oe;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode=`determinate`;ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,`transitionend`,this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode===`buffer`?this.bufferValue:100}%`}_isIndeterminate(){return this.mode===`indeterminate`||this.mode===`query`}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains(`mdc-linear-progress__primary-bar`)||(this.mode===`determinate`||this.mode===`buffer`)&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static ɵfac=function(n){return new(n||a)};static ɵcmp=(function(){function e(n,l){n&1&&nn$1(0,`div`,2)}return et$1({type:a,selectors:[[`mat-progress-bar`]],hostAttrs:[`role`,`progressbar`,`aria-valuemin`,`0`,`aria-valuemax`,`100`,`tabindex`,`-1`,1,`mat-mdc-progress-bar`,`mdc-linear-progress`],hostVars:10,hostBindings:function(l,c){l&2&&(Jo(`aria-valuenow`,c._isIndeterminate()?null:c.value)(`mode`,c.mode),bd(`mat-`+c.color),rn$1(`_mat-animation-noopable`,c._isNoopAnimation)(`mdc-linear-progress--animation-ready`,!c._isNoopAnimation)(`mdc-linear-progress--indeterminate`,c._isIndeterminate()))},inputs:{color:`color`,value:[2,`value`,`value`,Sd],bufferValue:[2,`bufferValue`,`bufferValue`,Sd],mode:`mode`},outputs:{animationEnd:`animationEnd`},exportAs:[`matProgressBar`],decls:7,vars:5,consts:[[`aria-hidden`,`true`,1,`mdc-linear-progress__buffer`],[1,`mdc-linear-progress__buffer-bar`],[1,`mdc-linear-progress__buffer-dots`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__primary-bar`],[1,`mdc-linear-progress__bar-inner`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__secondary-bar`]],template:function(l,c){l&1&&(en$1(0,`div`,0),nn$1(1,`div`,1),ei(2,e,1,0,`div`,2),tn$1(),en$1(3,`div`,3),nn$1(4,`span`,4),tn$1(),en$1(5,`div`,5),nn$1(6,`span`,4),tn$1()),l&2&&(qo(),tb(`flex-basis`,c._getBufferBarFlexBasis()),qo(),ti(c.mode===`buffer`?2:-1),qo(),tb(`transform`,c._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
  --%NS%mat-progress-bar-animation-multiplier: 1;
  display: block;
  text-align: start;
}
.mat-mdc-progress-bar[mode=query] {
  transform: scaleX(-1);
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-dots,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__secondary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__bar-inner.mdc-linear-progress__bar-inner {
  animation: none;
}
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__primary-bar,
.mat-mdc-progress-bar._mat-animation-noopable .mdc-linear-progress__buffer-bar {
  transition: transform 1ms;
}

.mat-progress-bar-reduced-motion {
  --%NS%mat-progress-bar-animation-multiplier: 2;
}

.mdc-linear-progress {
  position: relative;
  width: 100%;
  transform: translateZ(0);
  outline: 1px solid transparent;
  overflow-x: hidden;
  transition: opacity 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: max(var(--%NS%mat-progress-bar-track-height, 4px), var(--%NS%mat-progress-bar-active-indicator-height, 4px));
}
@media (forced-colors: active) {
  .mdc-linear-progress {
    outline-color: CanvasText;
  }
}

.mdc-linear-progress__bar {
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  animation: none;
  transform-origin: top left;
  transition: transform 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  height: var(--%NS%mat-progress-bar-active-indicator-height, 4px);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__bar {
  transition: none;
}
[dir=rtl] .mdc-linear-progress__bar {
  right: 0;
  transform-origin: center right;
}

.mdc-linear-progress__bar-inner {
  display: inline-block;
  position: absolute;
  width: 100%;
  animation: none;
  border-top-style: solid;
  border-color: var(--%NS%mat-progress-bar-active-indicator-color, var(--%NS%mat-sys-primary));
  border-top-width: var(--%NS%mat-progress-bar-active-indicator-height, 4px);
}

.mdc-linear-progress__buffer {
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  width: 100%;
  overflow: hidden;
  height: var(--%NS%mat-progress-bar-track-height, 4px);
  border-radius: var(--%NS%mat-progress-bar-track-shape, var(--%NS%mat-sys-corner-none));
}

.mdc-linear-progress__buffer-dots {
  background-image: radial-gradient(circle, var(--%NS%mat-progress-bar-track-color, var(--%NS%mat-sys-surface-variant)) calc(var(--%NS%mat-progress-bar-track-height, 4px) / 2), transparent 0);
  background-repeat: repeat-x;
  background-size: calc(calc(var(--%NS%mat-progress-bar-track-height, 4px) / 2) * 5);
  background-position: left;
  flex: auto;
  transform: rotate(180deg);
  animation: mdc-linear-progress-buffering calc(250ms * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
@media (forced-colors: active) {
  .mdc-linear-progress__buffer-dots {
    background-color: ButtonBorder;
  }
}
[dir=rtl] .mdc-linear-progress__buffer-dots {
  animation: mdc-linear-progress-buffering-reverse calc(250ms * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
  transform: rotate(0);
}

.mdc-linear-progress__buffer-bar {
  flex: 0 1 100%;
  transition: flex-basis 250ms 0ms cubic-bezier(0.4, 0, 0.6, 1);
  background-color: var(--%NS%mat-progress-bar-track-color, var(--%NS%mat-sys-surface-variant));
}

.mdc-linear-progress__primary-bar {
  transform: scaleX(0);
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  left: -145.166611%;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation: mdc-linear-progress-primary-indeterminate-translate calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-primary-indeterminate-scale calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__primary-bar {
  animation-name: mdc-linear-progress-primary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__primary-bar {
  right: -145.166611%;
  left: auto;
}

.mdc-linear-progress__secondary-bar {
  display: none;
}
.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  left: -54.888891%;
  display: block;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation: mdc-linear-progress-secondary-indeterminate-translate calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
.mdc-linear-progress--indeterminate.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar > .mdc-linear-progress__bar-inner {
  animation: mdc-linear-progress-secondary-indeterminate-scale calc(2s * var(--%NS%mat-progress-bar-animation-multiplier)) infinite linear;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--animation-ready .mdc-linear-progress__secondary-bar {
  animation-name: mdc-linear-progress-secondary-indeterminate-translate-reverse;
}
[dir=rtl] .mdc-linear-progress.mdc-linear-progress--indeterminate .mdc-linear-progress__secondary-bar {
  right: -54.888891%;
  left: auto;
}

@keyframes mdc-linear-progress-buffering {
  from {
    transform: rotate(180deg) translateX(calc(var(--%NS%mat-progress-bar-track-height, 4px) * -2.5));
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(83.67142%);
  }
  100% {
    transform: translateX(200.611057%);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-scale {
  0% {
    transform: scaleX(0.08);
  }
  36.65% {
    animation-timing-function: cubic-bezier(0.334731, 0.12482, 0.785844, 1);
    transform: scaleX(0.08);
  }
  69.15% {
    animation-timing-function: cubic-bezier(0.06, 0.11, 0.6, 1);
    transform: scaleX(0.661479);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(84.386165%);
  }
  100% {
    transform: translateX(160.277782%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-scale {
  0% {
    animation-timing-function: cubic-bezier(0.205028, 0.057051, 0.57661, 0.453971);
    transform: scaleX(0.08);
  }
  19.15% {
    animation-timing-function: cubic-bezier(0.152313, 0.196432, 0.648374, 1.004315);
    transform: scaleX(0.457104);
  }
  44.15% {
    animation-timing-function: cubic-bezier(0.257759, -0.003163, 0.211762, 1.38179);
    transform: scaleX(0.72796);
  }
  100% {
    transform: scaleX(0.08);
  }
}
@keyframes mdc-linear-progress-primary-indeterminate-translate-reverse {
  0% {
    transform: translateX(0);
  }
  20% {
    animation-timing-function: cubic-bezier(0.5, 0, 0.701732, 0.495819);
    transform: translateX(0);
  }
  59.15% {
    animation-timing-function: cubic-bezier(0.302435, 0.381352, 0.55, 0.956352);
    transform: translateX(-83.67142%);
  }
  100% {
    transform: translateX(-200.611057%);
  }
}
@keyframes mdc-linear-progress-secondary-indeterminate-translate-reverse {
  0% {
    animation-timing-function: cubic-bezier(0.15, 0, 0.515058, 0.409685);
    transform: translateX(0);
  }
  25% {
    animation-timing-function: cubic-bezier(0.31033, 0.284058, 0.8, 0.733712);
    transform: translateX(-37.651913%);
  }
  48.35% {
    animation-timing-function: cubic-bezier(0.4, 0.627035, 0.6, 0.902026);
    transform: translateX(-84.386165%);
  }
  100% {
    transform: translateX(-160.277782%);
  }
}
@keyframes mdc-linear-progress-buffering-reverse {
  from {
    transform: translateX(-10px);
  }
}
`],encapsulation:2})})()}return a})();function wa(a,t=0,e=100){return Math.max(t,Math.min(e,a))}var xa=(()=>{class a{static ɵfac=function(n){return new(n||a)};static ɵmod=Ie({type:a});static ɵinj=ge({imports:[Ya$1]})}return a})();var Sa={nova:`Nova`,existente:`Já lançada`,suspeita:`Confira`,ignorada:`Ignorada`};var ka={vincular:`É a mesma`,inserir:`Criar`,ignorar:`Ignorar`};var Ma=`/api/importacoes`;var it=class a{http=m(Ay);previa(t,e,n){let l=this.envio(t,e);return n&&l.append(`competencia`,n),this.http.post(`${Ma}/previa/`,l)}importar(t,e,n,l){let c=this.envio(t,e);return c.append(`competencia`,n),c.append(`decisoes`,JSON.stringify(l)),this.http.post(`${Ma}/`,c)}envio(t,e){let n=new FormData;return n.append(`fonte`,String(t)),n.append(`arquivo`,e,e.name),n}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var nn=(a,t)=>t.indice;var Na=(a,t)=>t.id;function rn(a,t){a&1&&zg(0,`mat-progress-bar`,3)}function on(a,t){if(a&1&&(LC(0),ZC(1,`currency`)),a&2){let e=uC();yd(` · fatura `,KC(1,1,e.total_da_fatura),` `)}}function sn(a,t){if(a&1&&(ra(0,`li`),LC(1),ZC(2,`lowercase`),md()),a&2){let e=t.$implicit,n=uC(2);bd(`importar__selo importar__selo--`+e),qo(),cb(` `,n.contagem().porClasse[e],` `,KC(2,4,n.classificacoes[e]),` `)}}function ln(a,t){if(a&1&&(ra(0,`small`,24),LC(1),ZC(2,`currency`),ZC(3,`competencia`),md()),a&2){let e=t;qo(),ub(` ↳ `,e.descricao,` `,e.parcela,` · `,KC(2,4,e.valor),` · `,KC(3,6,e.competencia),` `)}}function cn(a,t){if(a&1&&(ra(0,`small`,25),LC(1),md()),a&2){let e=uC().$implicit;qo(),ab(e.motivo)}}function dn(a,t){if(a&1&&(ra(0,`mat-option`,32),LC(1),md()),a&2){let e=t.$implicit,n=uC(4);$g(`value`,e),qo(),ab(n.rotulosDeDecisao[e])}}function mn(a,t){if(a&1){let e=cC();ra(0,`mat-select`,31),Zg(`selectionChange`,function(l){kp(e);let c=uC().$implicit,v=uC(2);return Fp(v.decidir(c,l.value))}),tC(1,dn,2,2,`mat-option`,32,eC),md()}if(a&2){let e=uC().$implicit,n=uC(2);$g(`value`,n.decisaoDe(e)),Jo(`aria-label`,`O que fazer com `+e.descricao),qo(),nC(e.decisoes)}}function pn(a,t){if(a&1&&(ra(0,`div`,21)(1,`span`,22),LC(2),ZC(3,`date`),md(),ra(4,`span`,23)(5,`span`),LC(6),md(),ei(7,ln,4,8,`small`,24),ei(8,cn,2,1,`small`,25),md(),ra(9,`span`,26),LC(10),md(),ra(11,`span`,27),LC(12),ZC(13,`currency`),md(),ra(14,`span`,28)(15,`span`),LC(16),md()(),ra(17,`span`,29),ei(18,mn,3,2,`mat-select`,30),md()()),a&2){let e,n=t.$implicit,l=uC(2);rn$1(`importar__linha--ignorada`,l.decisaoDe(n)===`ignorar`),qo(2),ab(QC(3,12,n.data,`dd/MM`)),qo(4),ab(n.descricao),qo(),ti((e=n.vinculo)?7:-1,e),qo(),ti(n.motivo&&n.classificacao!==`ignorada`?8:-1),qo(2),ab(n.parcela),qo(2),ab(KC(13,15,n.valor)),qo(3),bd(`importar__selo importar__selo--`+n.classificacao),qo(),yd(` `,l.classificacoes[n.classificacao],` `),qo(2),ti(n.decisoes.length>1?18:-1)}}function un(a,t){a&1&&(ra(0,`p`,19),LC(1,`Nenhum lançamento na fatura.`),md())}function _n(a,t){if(a&1&&(ra(0,`li`),LC(1),ZC(2,`currency`),md()),a&2){let e=t.$implicit;qo(),lb(``,e.descricao,` `,e.parcela,` · `,KC(2,3,e.valor))}}function gn(a,t){if(a&1&&(ra(0,`section`,20)(1,`h3`),LC(2),ZC(3,`competencia`),md(),ra(4,`p`),LC(5,`Nada é apagado. Confira se foram antecipados ou cobrados em outro cartão.`),md(),ra(6,`ul`),tC(7,_n,3,5,`li`,null,Na),md()()),a&2){let e=uC();qo(2),yd(`Previstos em `,KC(3,1,e.competencia),` que não vieram na fatura`),qo(5),nC(e.faltas)}}function fn(a,t){if(a&1){let e=cC();ra(0,`p`,10),LC(1),ZC(2,`date`),md(),ra(3,`div`,11)(4,`mat-form-field`,12)(5,`mat-label`),LC(6,`Competência`),md(),ra(7,`input`,13),jw(),Zg(`change`,function(){kp(e);let l=uC();return Fp(l.trocarCompetencia())}),md(),ra(8,`mat-hint`),LC(9),ZC(10,`competencia`),md()(),ra(11,`div`,14)(12,`mat-icon`),LC(13),md(),ra(14,`span`),LC(15),ZC(16,`currency`),ei(17,on,2,3),md()()(),ra(18,`ul`,15),tC(19,sn,3,6,`li`,16,eC),md(),ra(21,`div`,17),tC(22,pn,19,17,`div`,18,nn,!1,un,2,0,`p`,19),md(),ei(25,gn,9,3,`section`,20)}if(a&2){let e=t,n=uC();qo(),lb(` `,e.banco,` · emitida em `,QC(2,13,e.emitida_em,`dd/MM/yyyy`),` · `,n.nomeDaFonte(),` `),qo(6),$g(`formControl`,n.competencia)(`readonly`,n.carregando()),Vw(),qo(2),yd(`Sugerida: `,KC(10,16,e.competencia_sugerida)),qo(2),rn$1(`importar__total--diverge`,!n.totalConfere()),qo(2),ab(n.totalConfere()?`check_circle`:`warning`),qo(2),yd(` Lido `,KC(16,18,e.total_lido),` `),qo(2),ti(e.total_da_fatura?17:-1),qo(2),nC(n.ordemDasClasses),qo(3),nC(e.linhas),qo(3),ti(e.faltas.length?25:-1)}}function hn(a,t){if(a&1&&(ra(0,`mat-option`,32),LC(1),md()),a&2){let e=t.$implicit;$g(`value`,e.id),qo(),ab(e.nome)}}function bn(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Escolha a fonte da fatura.`),md())}function vn(a,t){if(a&1){let e=cC();ra(0,`p`,33),LC(1,` Por enquanto, o PDF de extrato do app Bradesco Cartões. Nada é gravado antes de você revisar. `),md(),ra(2,`mat-form-field`)(3,`mat-label`),LC(4,`Fonte`),md(),ra(5,`mat-select`,34),jw(),tC(6,hn,2,2,`mat-option`,32,Na),md(),ei(8,bn,2,0,`mat-error`),md(),ra(9,`div`,35)(10,`input`,36,0),Zg(`change`,function(l){kp(e);let c=uC();return Fp(c.escolherArquivo(l))}),md(),ra(12,`button`,37),Zg(`click`,function(){kp(e);let l=gC(11);return Fp(l.click())}),ra(13,`mat-icon`),LC(14,`attach_file`),md(),LC(15,` Escolher PDF `),md(),ra(16,`span`,38),LC(17),md()()}if(a&2){let e=uC();qo(5),$g(`formControl`,e.fonte),Vw(),qo(),nC(e.fontes()),qo(2),ti(e.fonte.hasError(`required`)?8:-1),qo(9),ab(e.arquivo()?.name??`Nenhum arquivo escolhido`)}}function yn(a,t){a&1&&(ra(0,`p`,4),LC(1),md()),a&2&&(qo(),ab(t))}function wn(a,t){if(a&1){let e=cC();ra(0,`button`,39),Zg(`click`,function(){kp(e);let l=uC();return Fp(l.voltar())}),ra(1,`mat-icon`),LC(2,`arrow_back`),md(),LC(3,` Voltar `),md()}if(a&2){let e=uC();$g(`disabled`,e.carregando())}}function Cn(a,t){if(a&1){let e=cC();ra(0,`button`,40),Zg(`click`,function(){kp(e);let l=uC();return Fp(l.importar())}),LC(1),md()}if(a&2){let e=uC();$g(`disabled`,e.carregando()||e.competencia.invalid),qo(),cb(` Importar (`,e.contagem().porDecisao.inserir,` novas, `,e.contagem().porDecisao.vincular,` confirmadas) `)}}function xn(a,t){if(a&1){let e=cC();ra(0,`button`,40),Zg(`click`,function(){kp(e);let l=uC();return Fp(l.lerFatura())}),LC(1,` Ler fatura `),md()}if(a&2){let e=uC();$g(`disabled`,e.carregando())}}var rt=class a{importacoes=m(it);dialogRef=m(Ze);classificacoes=Sa;ordemDasClasses=[`nova`,`existente`,`suspeita`,`ignorada`];rotulosDeDecisao=ka;fontes=St([]);fonte=new Oe$1(null,Ne.required);arquivo=St(null);competencia=new Oe$1(``,{nonNullable:!0,validators:[Ne.required,j$2]});previa=St(null);decisoes=St({});carregando=St(!1);erro=St(null);contagem=eS(()=>{let t=this.previa(),e={nova:0,existente:0,suspeita:0,ignorada:0},n={vincular:0,inserir:0,ignorar:0};for(let l of t?.linhas??[])e[l.classificacao]++,n[this.decisaoDe(l)]++;return{porClasse:e,porDecisao:n}});totalConfere=eS(()=>{let t=this.previa();return!t?.total_da_fatura||t.total_da_fatura===t.total_lido});constructor(){m(x).listar().subscribe(t=>this.fontes.set(t.filter(e=>e.ativa)))}nomeDaFonte(){return this.fontes().find(t=>t.id===this.fonte.value)?.nome??``}escolherArquivo(t){let e=t.target;this.arquivo.set(e.files?.[0]??null),this.erro.set(null)}lerFatura(){if(this.fonte.invalid||!this.arquivo()){this.fonte.markAsTouched(),this.erro.set(this.arquivo()?null:`Escolha o PDF da fatura.`);return}this.carregarPrevia()}trocarCompetencia(){this.competencia.valid&&this.competencia.value!==this.previa()?.competencia&&this.carregarPrevia(this.competencia.value)}voltar(){this.previa.set(null),this.decisoes.set({}),this.erro.set(null)}decisaoDe(t){return this.decisoes()[t.indice]??t.decisao}decidir(t,e){this.decisoes.update(n=>{let l=R({},n);return e===t.decisao?delete l[t.indice]:l[t.indice]=e,l})}importar(){let t=this.previa();!t||this.carregando()||this.executar(this.importacoes.importar(this.fonte.value,this.arquivo(),t.competencia,this.decisoes()),e=>this.dialogRef.close(e.competencia))}carregarPrevia(t){this.executar(this.importacoes.previa(this.fonte.value,this.arquivo(),t),e=>{this.previa.set(e),this.decisoes.set({}),this.competencia.setValue(e.competencia)})}executar(t,e){this.carregando.set(!0),this.erro.set(null),t.subscribe({next:n=>{this.carregando.set(!1),e(n)},error:n=>{this.carregando.set(!1),this.erro.set(fs(n,`Não foi possível ler a fatura.`))}})}static ɵfac=function(e){return new(e||a)};static ɵcmp=et$1({type:a,selectors:[[`app-importar-fatura`]],decls:14,vars:5,consts:[[`seletor`,``],[`mat-dialog-title`,``],[1,`importar`],[`mode`,`indeterminate`,1,`importar__progresso`],[`role`,`alert`,1,`importar__erro`],[1,`importar__acoes`],[`mat-button`,``,`type`,`button`,3,`disabled`],[1,`importar__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`button`,3,`disabled`],[1,`importar__origem`],[1,`importar__topo`],[1,`importar__competencia`],[`matInput`,``,`type`,`month`,3,`change`,`formControl`,`readonly`],[1,`importar__total`],[`aria-label`,`Resumo da prévia`,1,`importar__contagem`],[3,`class`],[`role`,`table`,`aria-label`,`Linhas da fatura`,1,`importar__linhas`],[`role`,`row`,1,`importar__linha`,3,`importar__linha--ignorada`],[1,`importar__vazio`],[1,`importar__faltas`],[`role`,`row`,1,`importar__linha`],[`role`,`cell`,1,`importar__data`],[`role`,`cell`,1,`importar__descricao`],[1,`importar__vinculo`],[1,`importar__motivo`],[`role`,`cell`,1,`importar__parcela`],[`role`,`cell`,1,`importar__valor`],[`role`,`cell`],[`role`,`cell`,1,`importar__decisao`],[`panelWidth`,``,3,`value`],[`panelWidth`,``,3,`selectionChange`,`value`],[3,`value`],[1,`importar__explicacao`],[3,`formControl`],[1,`importar__arquivo`],[`type`,`file`,`accept`,`application/pdf,.pdf`,`hidden`,``,3,`change`],[`mat-stroked-button`,``,`type`,`button`,3,`click`],[1,`importar__nome-arquivo`],[`mat-button`,``,`type`,`button`,3,`click`,`disabled`],[`mat-flat-button`,``,`type`,`button`,3,`click`,`disabled`]],template:function(e,n){if(e&1&&(ra(0,`h2`,1),LC(1,`Importar fatura`),md(),ra(2,`mat-dialog-content`,2),ei(3,rn,1,0,`mat-progress-bar`,3),ei(4,fn,26,20)(5,vn,18,3),ei(6,yn,2,1,`p`,4),md(),ra(7,`mat-dialog-actions`,5),ei(8,wn,4,1,`button`,6),zg(9,`span`,7),ra(10,`button`,8),LC(11,`Cancelar`),md(),ei(12,Cn,2,3,`button`,9)(13,xn,2,1,`button`,9),md()),e&2){let l,c;qo(3),ti(n.carregando()?3:-1),qo(),ti((l=n.previa())?4:5,l),qo(2),ti((c=n.erro())?6:-1,c),qo(2),ti(n.previa()?8:-1),qo(4),ti(n.previa()?12:13)}},dependencies:[kr,hn$2,Vr,Zi,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot,Xn$1,At,Vt,tr,Mt,wt,Ga$1,Ha$1,xa,Ca,as,os,kt,p,uT,lT,sT],styles:[`.importar[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;min-width:min(400px,80vw)}.importar__progresso[_ngcontent-%COMP%]{position:sticky;top:0}.importar__explicacao[_ngcontent-%COMP%], .importar__origem[_ngcontent-%COMP%], .importar__vazio[_ngcontent-%COMP%], .importar__faltas[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);margin:0}.importar__arquivo[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.importar__nome-arquivo[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);overflow-wrap:anywhere}.importar__topo[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:16px}.importar__competencia[_ngcontent-%COMP%]{width:12rem}.importar__total[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;color:var(--%NS%mat-sys-on-surface-variant)}.importar__total[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-primary)}.importar__total--diverge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .importar__total--diverge[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.importar__contagem[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0;padding:0}.importar__selo[_ngcontent-%COMP%]{display:inline-block;padding:2px 8px;border-radius:999px;font:var(--%NS%mat-sys-label-medium);white-space:nowrap;background:var(--%NS%mat-sys-surface-container-highest);color:var(--%NS%mat-sys-on-surface)}.importar__selo--nova[_ngcontent-%COMP%]{background:var(--%NS%mat-sys-primary-container);color:var(--%NS%mat-sys-on-primary-container)}.importar__selo--suspeita[_ngcontent-%COMP%]{background:var(--%NS%mat-sys-tertiary-container);color:var(--%NS%mat-sys-on-tertiary-container)}.importar__selo--ignorada[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.importar__linhas[_ngcontent-%COMP%]{display:flex;flex-direction:column}.importar__linha[_ngcontent-%COMP%]{display:grid;grid-template-columns:3rem minmax(0,1fr) 3rem 6.5rem 6.5rem 8rem;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid var(--%NS%mat-sys-outline-variant)}.importar__linha--ignorada[_ngcontent-%COMP%]{opacity:.55}.importar__data[_ngcontent-%COMP%], .importar__parcela[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);font-variant-numeric:tabular-nums}.importar__descricao[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-width:0}.importar__descricao[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.importar__vinculo[_ngcontent-%COMP%], .importar__motivo[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.importar__valor[_ngcontent-%COMP%]{text-align:right;font-variant-numeric:tabular-nums}.importar__faltas[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-small);margin:8px 0 4px}.importar__faltas[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:4px 0 0}.importar__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.importar__acoes[_ngcontent-%COMP%]{display:flex}.importar__espaco[_ngcontent-%COMP%]{flex:1}@media(max-width:640px){.importar__linha[_ngcontent-%COMP%]{grid-template-columns:3rem minmax(0,1fr) auto}.importar__descricao[_ngcontent-%COMP%]{grid-column:2/-1}.importar__parcela[_ngcontent-%COMP%]:empty{display:none}}`]})};var vt=`/api/avulsos`;var ot=class a{http=m(Ay);criar(t){return this.http.post(`${vt}/`,t)}atualizar(t,e){return this.http.patch(`${vt}/${t}/`,e)}excluir(t){return this.http.delete(`${vt}/${t}/`)}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};function Sn(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Informe a descrição.`),md())}function kn(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Valor inválido (ex.: 1.234,56).`),md())}function Mn(a,t){a&1&&(ra(0,`p`,6),LC(1),md()),a&2&&(qo(),ab(t))}function Nn(a,t){if(a&1){let e=cC();ra(0,`button`,12),Zg(`click`,function(){kp(e);let l=uC();return Fp(l.excluir())}),ra(1,`mat-icon`),LC(2,`delete`),md(),LC(3,` Excluir `),md()}if(a&2){let e=uC();$g(`disabled`,e.salvando())}}var Ae=class a{service=m(ot);dialogRef=m(Ze);dados=m(jt);salvando=St(!1);erro=St(null);form=m(Tr).group({descricao:[this.dados.avulso?.descricao??``,[Ne.required,Ne.maxLength(200)]],valor:[this.dados.avulso?A$2(this.dados.avulso.valor):``,[Ne.required,N]]});salvar(){if(this.form.invalid||this.salvando()){this.form.markAllAsTouched();return}let t=this.form.controls.descricao.value.trim(),e=b(this.form.controls.valor.value),{avulso:n,grupo:l,competencia:c}=this.dados;this.executar(n?this.service.atualizar(n.id,{descricao:t,valor:e}):this.service.criar({grupo:l,competencia:c,descricao:t,valor:e}))}excluir(){this.dados.avulso&&this.executar(this.service.excluir(this.dados.avulso.id))}executar(t){this.salvando.set(!0),this.erro.set(null),t.subscribe({next:()=>this.dialogRef.close(!0),error:e=>{this.salvando.set(!1),this.erro.set(fs(e))}})}static ɵfac=function(e){return new(e||a)};static ɵcmp=et$1({type:a,selectors:[[`app-form-avulso`]],decls:25,vars:12,consts:[[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-avulso`],[1,`form-avulso__explicacao`],[`matInput`,``,`formControlName`,`descricao`,3,`placeholder`],[`matInput`,``,`formControlName`,`valor`,`inputmode`,`decimal`,`placeholder`,`0,00`],[`role`,`alert`,1,`form-avulso__erro`],[1,`form-avulso__acoes`],[`mat-button`,``,`type`,`button`,1,`form-avulso__excluir`,3,`disabled`],[1,`form-avulso__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`mat-button`,``,`type`,`button`,1,`form-avulso__excluir`,3,`click`,`disabled`]],template:function(e,n){if(e&1&&(ra(0,`h2`,0),LC(1),ZC(2,`competencia`),md(),ra(3,`form`,1),Zg(`ngSubmit`,function(){return n.salvar()}),ra(4,`mat-dialog-content`,2)(5,`p`,3),LC(6,` Só neste mês. Para algo que se repete, cadastre um recorrente. `),md(),ra(7,`mat-form-field`)(8,`mat-label`),LC(9,`Descrição`),md(),ra(10,`input`,4),jw(),md(),ei(11,Sn,2,0,`mat-error`),md(),ra(12,`mat-form-field`)(13,`mat-label`),LC(14,`Valor (R$)`),md(),ra(15,`input`,5),jw(),md(),ei(16,kn,2,0,`mat-error`),md(),ei(17,Mn,2,1,`p`,6),md(),ra(18,`mat-dialog-actions`,7),ei(19,Nn,4,1,`button`,8),zg(20,`span`,9),ra(21,`button`,10),LC(22,`Cancelar`),md(),ra(23,`button`,11),LC(24,`Salvar`),md()()()),e&2){let l;qo(),lb(` `,n.dados.avulso?`Editar`:`Novo`,` `,n.dados.grupo===`rendimento`?`rendimento`:`gasto fixo`,` de `,KC(2,10,n.dados.competencia),`
`),qo(2),$g(`formGroup`,n.form),qo(7),$g(`placeholder`,n.dados.grupo===`rendimento`?`Ex.: Icloud (Natalia)`:`Ex.: Docs moto`),Vw(),qo(),ti(n.form.controls.descricao.hasError(`required`)?11:-1),qo(4),Vw(),qo(),ti(n.form.controls.valor.invalid?16:-1),qo(),ti((l=n.erro())?17:-1,l),qo(2),ti(n.dados.avulso?19:-1),qo(4),$g(`disabled`,n.salvando())}},dependencies:[kr,Or,hn$2,Vr,Ir,Et,Qi,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot,Xn$1,At,tr,Mt,wt,Ga$1,Ha$1,p],styles:[`.form-avulso[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(400px,80vw)}.form-avulso__explicacao[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.form-avulso__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.form-avulso__acoes[_ngcontent-%COMP%]{display:flex}.form-avulso__espaco[_ngcontent-%COMP%]{flex:1}.form-avulso__excluir[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};function En(a,t){a&1&&LC(0,` Valor estimado pelo último informado. Informe o valor real da conta deste mês. `)}function In(a,t){a&1&&LC(0,` Valor real informado para este mês. `)}function Dn(a,t){if(a&1&&ei(0,En,1,0)(1,In,1,0),a&2){let e=uC();ti(e.dados.item.pendente?0:1)}}function Fn(a,t){a&1&&LC(0,` Muda o valor só neste mês. Para mudar daqui em diante, faça um reajuste no recorrente. `)}function Pn(a,t){a&1&&(ra(0,`mat-error`),LC(1,`Valor inválido (ex.: 1.234,56).`),md())}function Vn(a,t){a&1&&(ra(0,`p`,5),LC(1),md()),a&2&&(qo(),ab(t))}function Tn(a,t){if(a&1){let e=cC();ra(0,`button`,11),Zg(`click`,function(){kp(e);let l=uC();return Fp(l.desfazer())}),LC(1),md()}if(a&2){let e=uC();$g(`disabled`,e.salvando()),qo(),yd(` `,e.dados.item.variavel?`Voltar à estimativa`:`Voltar ao valor previsto`,` `)}}var st=class a{service=m(m$1);dialogRef=m(Ze);dados=m(jt);salvando=St(!1);erro=St(null);form=m(Tr).group({valor:[A$2(this.dados.item.valor),[Ne.required,N]]});temValorDoMes=this.dados.item.ajustado||this.dados.item.variavel&&!this.dados.item.pendente;salvar(){if(this.form.invalid){this.form.markAllAsTouched();return}let{item:t,competencia:e}=this.dados;this.executar(this.service.definirNoMes(t.id,e,b(this.form.controls.valor.value)))}desfazer(){let{item:t,competencia:e}=this.dados;this.executar(this.service.limparNoMes(t.id,e))}executar(t){this.salvando.set(!0),this.erro.set(null),t.subscribe({next:()=>this.dialogRef.close(!0),error:e=>{this.salvando.set(!1),this.erro.set(fs(e))}})}static ɵfac=function(e){return new(e||a)};static ɵcmp=et$1({type:a,selectors:[[`app-valor-do-mes`]],decls:21,vars:11,consts:[[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`valor-do-mes`],[1,`valor-do-mes__explicacao`],[`matInput`,``,`formControlName`,`valor`,`inputmode`,`decimal`,`cdkFocusInitial`,``],[`role`,`alert`,1,`valor-do-mes__erro`],[1,`valor-do-mes__acoes`],[`mat-button`,``,`type`,`button`,3,`disabled`],[1,`valor-do-mes__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`mat-button`,``,`type`,`button`,3,`click`,`disabled`]],template:function(e,n){if(e&1&&(ra(0,`h2`,0),LC(1),ZC(2,`competencia`),md(),ra(3,`form`,1),Zg(`ngSubmit`,function(){return n.salvar()}),ra(4,`mat-dialog-content`,2)(5,`p`,3),ei(6,Dn,2,1)(7,Fn,1,0),md(),ra(8,`mat-form-field`)(9,`mat-label`),LC(10),md(),ra(11,`input`,4),jw(),md(),ei(12,Pn,2,0,`mat-error`),md(),ei(13,Vn,2,1,`p`,5),md(),ra(14,`mat-dialog-actions`,6),ei(15,Tn,2,2,`button`,7),zg(16,`span`,8),ra(17,`button`,9),LC(18,`Cancelar`),md(),ra(19,`button`,10),LC(20,`Salvar`),md()()()),e&2){let l;qo(),cb(``,n.dados.item.descricao,` · `,KC(2,9,n.dados.competencia)),qo(2),$g(`formGroup`,n.form),qo(3),ti(n.dados.item.variavel?6:7),qo(4),ab(n.dados.item.variavel?`Valor real (R$)`:`Valor neste mês (R$)`),qo(),Vw(),qo(),ti(n.form.controls.valor.invalid?12:-1),qo(),ti((l=n.erro())?13:-1,l),qo(2),ti(n.temValorDoMes?15:-1),qo(4),$g(`disabled`,n.salvando())}},dependencies:[kr,Or,hn$2,Vr,Ir,Et,Qi,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot,Xn$1,At,tr,Ga$1,Ha$1,p],styles:[`.valor-do-mes[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(400px,80vw)}.valor-do-mes__explicacao[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.valor-do-mes__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.valor-do-mes__acoes[_ngcontent-%COMP%]{display:flex}.valor-do-mes__espaco[_ngcontent-%COMP%]{flex:1}`]})};var On=(a,t)=>t.valor;var An=(a,t)=>t.fonte.id;var zn=(a,t)=>t.tipo+t.id;var Rn=(a,t)=>t.id;function Bn(a,t){if(a&1&&(ra(0,`mat-option`,4),LC(1),ZC(2,`competencia`),md()),a&2){let e=t.$implicit;$g(`value`,e),qo(),ab(KC(2,2,e))}}function Xn(a,t){a&1&&(ra(0,`p`,9),LC(1),md()),a&2&&(qo(),ab(t))}function Ln(a,t){a&1&&LC(0,` estimado `)}function qn(a,t){a&1&&LC(0,` ajustado `)}function $n(a,t){a&1&&LC(0,` só este mês `)}function jn(a,t){if(a&1){let e=cC();ra(0,`button`,19),Zg(`click`,function(){let l=kp(e).$implicit,c=uC().$implicit,v=uC(2);return Fp(v.abrirItem(l,c.valor))}),ra(1,`span`,20),LC(2),md(),ra(3,`span`,21),ei(4,Ln,1,0)(5,qn,1,0)(6,$n,1,0),md(),ra(7,`span`,22),LC(8),ZC(9,`currency`),md()()}if(a&2){let e=t.$implicit;qo(2),ab(e.descricao),qo(2),ti(e.pendente?4:e.ajustado?5:e.tipo===`avulso`?6:-1),qo(3),rn$1(`mes__valor--estimado`,e.pendente),qo(),ab(KC(9,5,e.valor))}}function Gn(a,t){a&1&&(ra(0,`p`,14),LC(1,` Nada neste mês. `),ra(2,`a`,23),LC(3,`Cadastre os recorrentes`),md(),LC(4,`. `),md())}function Hn(a,t){if(a&1){let e=cC();ra(0,`mat-card`,13)(1,`mat-card-header`,15)(2,`mat-card-title`),LC(3),md(),ra(4,`mat-card-subtitle`),LC(5),ZC(6,`currency`),md(),ra(7,`button`,16),Zg(`click`,function(){let l=kp(e).$implicit,c=uC(2);return Fp(c.novoAvulso(l.valor))}),ra(8,`mat-icon`),LC(9,`add`),md()()(),ra(10,`mat-card-content`,17),tC(11,jn,10,7,`button`,18,zn,!1,Gn,5,0,`p`,14),md()()}if(a&2){let e=t.$implicit;qo(3),ab(e.titulo),qo(2),ab(KC(6,5,e.total)),qo(2),$g(`title`,`Adicionar só neste mês`),Jo(`aria-label`,`Adicionar `+e.titulo.toLowerCase()+` só deste mês`),qo(4),nC(e.itens)}}function Wn(a,t){if(a&1){let e=cC();ra(0,`button`,16),Zg(`click`,function(){kp(e);let l=uC().$implicit,c=uC(2);return Fp(c.novaCompra(l.fonte.id))}),ra(1,`mat-icon`),LC(2,`add`),md()()}if(a&2){let e=uC().$implicit;$g(`title`,`Nova compra em `+e.fonte.nome),Jo(`aria-label`,`Nova compra em `+e.fonte.nome)}}function Zn(a,t){if(a&1){let e=cC();ra(0,`button`,19),Zg(`click`,function(){let l=kp(e).$implicit,c=uC(3);return Fp(c.abrirLancamento(l))}),ra(1,`span`,20),LC(2),md(),ra(3,`span`,21),LC(4),md(),ra(5,`span`,22),LC(6),ZC(7,`currency`),md()()}if(a&2){let e=t.$implicit;rn$1(`mes__lancamento--importado`,e.origem===`importacao`),qo(2),ab(e.descricao),qo(2),ab(e.parcela),qo(2),ab(KC(7,5,e.valor))}}function Un(a,t){a&1&&(ra(0,`p`,14),LC(1,`Nenhum lançamento.`),md())}function Qn(a,t){if(a&1&&(ra(0,`mat-card`,13)(1,`mat-card-header`,15)(2,`mat-card-title`),LC(3),md(),ra(4,`mat-card-subtitle`),LC(5),ZC(6,`currency`),md(),ei(7,Wn,3,2,`button`,24),md(),ra(8,`mat-card-content`,17),tC(9,Zn,8,7,`button`,25,Rn,!1,Un,2,0,`p`,14),md()()),a&2){let e=t.$implicit;qo(3),ab(e.fonte.nome),qo(2),ab(KC(6,4,e.total)),qo(2),ti(e.fonte.ativa?7:-1),qo(2),nC(e.lancamentos)}}function Jn(a,t){a&1&&(ra(0,`p`,14),LC(1,` Nenhuma fonte cadastrada. `),ra(2,`a`,26),LC(3,`Cadastre os cartões e o dinheiro`),md(),LC(4,` para lançar compras. `),md())}function Yn(a,t){if(a&1&&(ra(0,`section`,10)(1,`div`)(2,`span`),LC(3,`Rendimentos`),md(),ra(4,`strong`),LC(5),ZC(6,`currency`),md()(),ra(7,`div`)(8,`span`),LC(9,`Fixas`),md(),ra(10,`strong`),LC(11),ZC(12,`currency`),md()(),ra(13,`div`)(14,`span`),LC(15,`Dinheiro e contas`),md(),ra(16,`strong`),LC(17),ZC(18,`currency`),md()(),ra(19,`div`)(20,`span`),LC(21,`Cartões`),md(),ra(22,`strong`),LC(23),ZC(24,`currency`),md()(),ra(25,`div`,11)(26,`span`),LC(27,`Saldo`),md(),ra(28,`strong`),LC(29),ZC(30,`currency`),md()()(),ra(31,`section`,12),tC(32,Hn,14,7,`mat-card`,13,On),tC(34,Qn,12,6,`mat-card`,13,An),md(),ei(36,Jn,5,0,`p`,14)),a&2){let e=t,n=uC();qo(5),ab(KC(6,8,e.resumo.total_rendimentos)),qo(6),ab(KC(12,10,e.resumo.total_fixas)),qo(6),ab(KC(18,12,e.resumo.total_dinheiro_e_contas)),qo(6),ab(KC(24,14,e.resumo.total_cartoes)),qo(2),rn$1(`mes__saldo--negativo`,n.negativo(e.resumo.saldo)),qo(4),ab(KC(30,16,e.resumo.saldo)),qo(3),nC(n.grupos()),qo(2),nC(e.fontes),qo(2),ti(e.fontes.length?-1:36)}}var Ea=class a{meses=m(Je);dialog=m(Ht);router=m(ue);route=m(G);recarregar$=new fn$1(void 0);competencia=H(this.route.paramMap.pipe(se(t=>t.get(`competencia`)??``)),{requireSync:!0});visao=St(null);horizonte=St([]);erro=St(null);anterior=eS(()=>this.navegavel(-1));seguinte=eS(()=>this.navegavel(1));opcoes=eS(()=>{let t=this.horizonte().map(n=>n.competencia),e=this.competencia();return t.includes(e)||!e?t:[...t,e].sort()});grupos=eS(()=>{let t=this.visao();return t?[{valor:`rendimento`,titulo:`Rendimentos`,itens:t.rendimentos,total:t.resumo.total_rendimentos},{valor:`fixa`,titulo:`Fixas`,itens:t.fixas,total:t.resumo.total_fixas}]:[]});constructor(){this.recarregar$.pipe(lc(()=>this.meses.horizonte().pipe(cc(()=>Kr([])))),A$1()).subscribe(t=>this.horizonte.set(t)),ac([this.route.paramMap,this.recarregar$]).pipe(se(([t])=>t.get(`competencia`)??``),zi(()=>this.erro.set(null)),lc(t=>this.meses.visao(t).pipe(cc(e=>(this.erro.set(fs(e,`Não foi possível carregar o mês.`)),Kr(null))))),A$1()).subscribe(t=>this.visao.set(t))}irPara(t){this.router.navigate([`/meses`,t])}novaCompra(t=null){this.abrirCompra(null,t)}importarFatura(){this.dialog.open(rt,{width:`min(960px, 95vw)`,maxWidth:`95vw`,autoFocus:`first-tabbable`}).afterClosed().pipe(st$1(Boolean)).subscribe(t=>{this.irPara(t),this.recarregar$.next()})}abrirLancamento(t){t.compra!==null&&this.abrirCompra(t.compra)}novoAvulso(t){this.aoFechar(this.dialog.open(Ae,{data:{grupo:t,competencia:this.competencia(),avulso:null}}))}abrirItem(t,e){let n=this.competencia();this.aoFechar(t.tipo===`recorrente`?this.dialog.open(st,{data:{item:t,competencia:n}}):this.dialog.open(Ae,{data:{grupo:e,competencia:n,avulso:t}}))}negativo(t){return t.startsWith(`-`)}abrirCompra(t,e=null){this.aoFechar(this.dialog.open(tt,{data:{compraId:t,fonteId:e},autoFocus:e===null?`first-tabbable`:`.form-compra__descricao`}))}aoFechar(t){t.afterClosed().pipe(st$1(Boolean)).subscribe(()=>this.recarregar$.next())}navegavel(t){try{return u(this.competencia(),t)}catch{return null}}static ɵfac=function(e){return new(e||a)};static ɵcmp=et$1({type:a,selectors:[[`app-visao-mensal`]],decls:22,vars:5,consts:[[1,`mes__cabecalho`],[1,`mes__navegacao`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Mês anterior`,3,`click`,`disabled`],[`aria-label`,`Escolher mês`,1,`mes__seletor`,3,`selectionChange`,`value`],[3,`value`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Mês seguinte`,3,`click`,`disabled`],[1,`mes__acoes`],[`mat-stroked-button`,``,`type`,`button`,1,`mes__importar`,3,`click`],[`mat-flat-button`,``,`type`,`button`,1,`mes__nova-compra`,3,`click`],[`role`,`alert`,1,`mes__erro`],[`aria-label`,`Resumo do mês`,1,`mes__resumo`],[1,`mes__saldo`],[1,`mes__blocos`],[`appearance`,`outlined`,1,`mes__bloco`],[1,`mes__vazio`],[1,`mes__bloco-cabecalho`],[`mat-icon-button`,``,`type`,`button`,1,`mes__adicionar`,3,`click`,`title`],[1,`mes__bloco-conteudo`],[`type`,`button`,1,`mes__lancamento`],[`type`,`button`,1,`mes__lancamento`,3,`click`],[1,`mes__descricao`],[1,`mes__parcela`],[1,`mes__valor`],[`routerLink`,`/recorrentes`],[`mat-icon-button`,``,`type`,`button`,1,`mes__adicionar`,3,`title`],[`type`,`button`,1,`mes__lancamento`,3,`mes__lancamento--importado`],[`routerLink`,`/fontes`]],template:function(e,n){if(e&1&&(ra(0,`header`,0)(1,`div`,1)(2,`button`,2),Zg(`click`,function(){return n.irPara(n.anterior())}),ra(3,`mat-icon`),LC(4,`chevron_left`),md()(),ra(5,`mat-select`,3),Zg(`selectionChange`,function(c){return n.irPara(c.value)}),tC(6,Bn,3,4,`mat-option`,4,eC),md(),ra(8,`button`,5),Zg(`click`,function(){return n.irPara(n.seguinte())}),ra(9,`mat-icon`),LC(10,`chevron_right`),md()()(),ra(11,`div`,6)(12,`button`,7),Zg(`click`,function(){return n.importarFatura()}),ra(13,`mat-icon`),LC(14,`upload_file`),md(),LC(15,` Importar fatura `),md(),ra(16,`button`,8),Zg(`click`,function(){return n.novaCompra()}),ra(17,`mat-icon`),LC(18,`add`),md(),LC(19,` Nova compra `),md()()(),ei(20,Xn,2,1,`p`,9),ei(21,Yn,37,18)),e&2){let l,c;qo(2),$g(`disabled`,!n.anterior()),qo(3),$g(`value`,n.competencia()),qo(),nC(n.opcoes()),qo(2),$g(`disabled`,!n.seguinte()),qo(12),ti((l=n.erro())?20:-1,l),qo(),ti((c=n.visao())?21:-1,c)}},dependencies:[Nt,j3,L3,Ax,j,_,k,T,z,A,Mt,wt,as,os,kt,uT,p],styles:[`[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%}.mes__cabecalho[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.mes__acoes[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.mes__navegacao[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px}.mes__seletor[_ngcontent-%COMP%]{width:14rem;font:var(--%NS%mat-sys-title-large)}.mes__resumo[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:24px;padding:12px 16px;margin-bottom:16px;border-radius:12px;background:var(--%NS%mat-sys-surface-container)}.mes__resumo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.mes__resumo[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-label-medium);color:var(--%NS%mat-sys-on-surface-variant)}.mes__resumo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-medium)}.mes__saldo--negativo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.mes__blocos[_ngcontent-%COMP%]{flex:1;min-height:20rem;display:flex;gap:16px;align-items:stretch;overflow-x:auto;overflow-y:hidden;padding-bottom:8px;scroll-snap-type:x proximity}.mes__bloco[_ngcontent-%COMP%]{flex:0 0 min(320px,85vw);max-height:100%;display:flex;flex-direction:column;scroll-snap-align:start}.mes__bloco-conteudo[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto}.mes__lancamento[_ngcontent-%COMP%]{all:unset;box-sizing:border-box;width:100%;display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:6px 4px;border-bottom:1px solid var(--%NS%mat-sys-outline-variant);cursor:pointer}.mes__lancamento[_ngcontent-%COMP%]:hover{background:var(--%NS%mat-sys-surface-container-high)}.mes__lancamento[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--%NS%mat-sys-primary)}.mes__lancamento--importado[_ngcontent-%COMP%]   .mes__descricao[_ngcontent-%COMP%]{background:var(--%NS%mat-sys-tertiary-container);border-radius:4px;padding:0 4px}.mes__descricao[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mes__parcela[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);font:var(--%NS%mat-sys-body-small);align-self:center}.mes__valor[_ngcontent-%COMP%]{text-align:right;font-variant-numeric:tabular-nums}.mes__bloco-cabecalho[_ngcontent-%COMP%]{position:relative}.mes__adicionar[_ngcontent-%COMP%]{position:absolute;top:4px;right:4px}.mes__valor--estimado[_ngcontent-%COMP%]{font-style:italic;color:var(--%NS%mat-sys-on-surface-variant)}.mes__vazio[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.mes__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};export{Ea as VisaoMensalComponent};