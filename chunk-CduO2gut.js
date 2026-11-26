import{a as k,i as j,n as T,o as z,r as _,t as A}from"./chunk-DyhxKKLl.js";import{$n as se,$t as en$1,An as nn$1,At as Zg,Bn as qo,Cn as lv,Cr as zn$1,Ct as YC,En as md,Ft as aT,Gn as rC,H as Mb,Hn as qr,Ht as be,I as Kg,In as pb,It as ab,J as Oe,Jn as rn$1,Jt as dC,K as O,Kt as cs,L as Kr,Lt as ac,N as Jd,On as nC,Ot as Z,P as Jo,Pn as on,Q as QC,Qn as sa,Qt as ei$1,S as Fp,Sn as lc,Sr as zi$1,Tn as mC,Tt as Yg,Ut as cb,Vn as qp,Vt as bd,Wt as cc,Xn as s3,Xt as eC,Yt as dT,_ as Bu,ar as tb,at as Rx,bn as lC,br as yd,c as Nt,cr as ti,ct as St,d as $g,en as et,er as sf,et as Qn$1,fn as j$1,fr as uT,gn as jw,gr as vb,gt as XC,hr as v,i as f,ir as tS,it as Rt$1,j as Ie,kn as ni$1,l as ue,lr as tn$1,mn as jC,mt as Vw,n as wt,nn as fv,nr as st,nt as R,o as u,on as ge,p as Ay,pn as j3,pr as ub,qn as ra,r as D,rr as tC,s as G,sn as hC,st as Sd,t as Mt,tn as fn$1,tt as Qv,ur as tt$1,vn as kp,wn as m,wt as Ya$1,xn as lb,xr as zg,y as Cx,yr as xb,z as L3,zn as qg,zt as bC}from"./main-NPQRSX2A.js";import{n as H,r as x,t as A$1}from"./chunk-DAovEHac.js";import{a as b,c as j$2,i as R$1,l as m$1,n as I,o as d,r as N,s as h,t as A$2,u as p}from"./chunk-Dn-vAQpj.js";import{C as ls,D as sn$1,O as ss,S as kt,_ as dn$1,b as hn$1,d as Ze,g as cn$1,h as bs,k as ys,l as Wn$1,r as Ht$1,t as Cn$1,w as mn$1,x as jt$1}from"./chunk-BGUIGi54.js";import{C as hn$2,E as te,O as tr,S as Zi$1,T as kr,_ as Ue,a as Ga$1,b as Xn$1,d as Oe$1,f as Or,g as Tr,i as Et,j as zi$2,k as vt,l as Ki,m as Qi$1,n as Bi$1,o as Ha$1,p as Ot$1,r as Bn$1,s as Ir,t as At$1,u as Ne,v as Vr,y as Vt$1}from"./chunk-BbyauqjR.js";var qa=`/api/meses`;var Dt=class a{http=m(Ay);horizonte(){return this.http.get(`${qa}/`)}visao(t){return this.http.get(`${qa}/${t}/`)}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var tn=new v(`mat-slide-toggle-default-options`,{providedIn:`root`,factory:()=>({disableToggleValue:!1,hideIcon:!1,disabledInteractive:!1})});var Pt=class{source;checked;constructor(t,e){this.source=t,this.checked=e}};var Yt=(()=>{class a{_elementRef=m(be);_focusMonitor=m(Jd);_changeDetectorRef=m(Mb);defaults=m(tn);_injector=m(Z);_signalFormField=null;_onChange=e=>{};_onTouched=()=>{};_validatorOnChange=()=>{};_uniqueId;_checked=!1;_createChangeEvent(e){return new Pt(this,e)}_labelId;get buttonId(){return`${this.id||this._uniqueId}-button`}_switchElement;focus(){this._switchElement.nativeElement.focus()}_noopAnimations=qr();_focused=!1;name=null;id;labelPosition=`after`;ariaLabel=null;ariaLabelledby=null;ariaDescribedby;required=!1;color;disabled=!1;fullWidth=!1;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked=e,this._changeDetectorRef.markForCheck()}hideIcon;disabledInteractive;change=new Oe;toggleChange=new Oe;get inputId(){return`${this.id||this._uniqueId}-input`}constructor(){m(Qn$1).load(lv);let e=m(new vb(`tabindex`),{optional:!0}),n=this.defaults;this.tabIndex=e==null?0:parseInt(e)||0,this.color=n.color||`accent`,this.id=this._uniqueId=m(sf).getId(`mat-mdc-slide-toggle-`),this.hideIcon=n.hideIcon??!1,this.disabledInteractive=n.disabledInteractive??!1,this._labelId=this._uniqueId+`-label`}ngOnInit(){this._signalFormField=this._injector.get(Bn$1,void 0,{optional:!0,self:!0})}ngAfterContentInit(){this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{e===`keyboard`||e===`program`?(this._focused=!0,this._changeDetectorRef.markForCheck()):e||Promise.resolve().then(()=>{this._focused=!1,this._onTouched(),this._changeDetectorRef.markForCheck()})})}ngOnChanges(e){e.required&&this._validatorOnChange()}ngOnDestroy(){this._focusMonitor.stopMonitoring(this._elementRef)}writeValue(e){this.checked=!!e}registerOnChange(e){this._onChange=e}registerOnTouched(e){this._onTouched=e}validate(e){return this.required&&e.value!==!0&&!this._signalFormField?{required:!0}:null}registerOnValidatorChange(e){this._validatorOnChange=e}setDisabledState(e){this.disabled=e,this._changeDetectorRef.markForCheck()}toggle(){this.checked=!this.checked,this._onChange(this.checked)}_emitChangeEvent(){this._onChange(this.checked),this.change.emit(this._createChangeEvent(this.checked))}_handleClick(){this.disabled||(this.toggleChange.emit(),this.defaults.disableToggleValue||(this.checked=!this.checked,this._onChange(this.checked),this.change.emit(new Pt(this,this.checked))))}_getAriaLabelledBy(){return this.ariaLabelledby?this.ariaLabelledby:this.ariaLabel?null:this._labelId}static ɵfac=function(n){return new(n||a)};static ɵcmp=(function(){let e=[`switch`],n=[`*`];function s(d,f){d&1&&(ra(0,`span`,11),qp(),ra(1,`svg`,13),zg(2,`path`,14),md(),ra(3,`svg`,15),zg(4,`path`,16),md()())}return et({type:a,selectors:[[`mat-slide-toggle`]],viewQuery:function(f,c){if(f&1&&Kg(e,5),f&2){let V;mC(V=hC())&&(c._switchElement=V.first)}},hostAttrs:[1,`mat-mdc-slide-toggle`],hostVars:15,hostBindings:function(f,c){f&2&&(qg(`id`,c.id),Jo(`tabindex`,null)(`aria-label`,null)(`name`,null)(`aria-labelledby`,null),bd(c.color?`mat-`+c.color:``),rn$1(`mat-mdc-slide-toggle-focused`,c._focused)(`mat-mdc-slide-toggle-checked`,c.checked)(`mat-slide-toggle-full-width`,c.fullWidth)(`_mat-animation-noopable`,c._noopAnimations))},inputs:{name:`name`,id:`id`,labelPosition:`labelPosition`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],required:[2,`required`,`required`,on],color:`color`,disabled:[2,`disabled`,`disabled`,on],fullWidth:[2,`fullWidth`,`fullWidth`,on],disableRipple:[2,`disableRipple`,`disableRipple`,on],tabIndex:[2,`tabIndex`,`tabIndex`,d=>d==null?0:Sd(d)],checked:[2,`checked`,`checked`,on],hideIcon:[2,`hideIcon`,`hideIcon`,on],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,on]},outputs:{change:`change`,toggleChange:`toggleChange`},exportAs:[`matSlideToggle`],features:[pb([{provide:Ue,useExisting:cs(()=>a),multi:!0},{provide:te,useExisting:a,multi:!0}]),sa],ngContentSelectors:n,decls:14,vars:27,consts:[[`switch`,``],[`mat-internal-form-field`,``,3,`labelPosition`],[`role`,`switch`,`type`,`button`,1,`mdc-switch`,3,`click`,`tabIndex`,`disabled`],[1,`mat-mdc-slide-toggle-touch-target`],[1,`mdc-switch__track`],[1,`mdc-switch__handle-track`],[1,`mdc-switch__handle`],[1,`mdc-switch__shadow`],[1,`mdc-elevation-overlay`],[1,`mdc-switch__ripple`],[`mat-ripple`,``,1,`mat-mdc-slide-toggle-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mdc-switch__icons`],[1,`mdc-label`,3,`click`,`for`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--on`],[`d`,`M19.69,5.23L8.96,15.96l-4.23-4.23L2.96,13.5l6,6L21.46,7L19.69,5.23z`],[`viewBox`,`0 0 24 24`,`aria-hidden`,`true`,1,`mdc-switch__icon`,`mdc-switch__icon--off`],[`d`,`M20 13H4v-2h16v2z`]],template:function(f,c){if(f&1&&(ni$1(),ra(0,`div`,1)(1,`button`,2,0),Zg(`click`,function(){return c._handleClick()}),zg(3,`div`,3)(4,`span`,4),ra(5,`span`,5)(6,`span`,6)(7,`span`,7),zg(8,`span`,8),md(),ra(9,`span`,9),zg(10,`span`,10),md(),ei$1(11,s,5,0,`span`,11),md()()(),ra(12,`label`,12),Zg(`click`,function(T){return T.stopPropagation()}),Rt$1(13),md()()),f&2){let V=bC(2);$g(`labelPosition`,c.labelPosition),qo(),rn$1(`mdc-switch--selected`,c.checked)(`mdc-switch--unselected`,!c.checked)(`mdc-switch--checked`,c.checked)(`mdc-switch--disabled`,c.disabled)(`mat-mdc-slide-toggle-disabled-interactive`,c.disabledInteractive),$g(`tabIndex`,c.disabled&&!c.disabledInteractive?-1:c.tabIndex)(`disabled`,c.disabled&&!c.disabledInteractive),Jo(`id`,c.buttonId)(`name`,c.name)(`aria-label`,c.ariaLabel)(`aria-labelledby`,c._getAriaLabelledBy())(`aria-describedby`,c.ariaDescribedby)(`aria-required`,c.required||null)(`aria-checked`,c.checked)(`aria-disabled`,c.disabled&&c.disabledInteractive?`true`:null),qo(9),$g(`matRippleTrigger`,V)(`matRippleDisabled`,c.disableRipple||c.disabled)(`matRippleCentered`,!0),qo(),ti(c.hideIcon?-1:11),qo(),$g(`for`,c.buttonId),Jo(`id`,c._labelId)}},dependencies:[s3,bs],styles:[`.mdc-switch {
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
`],encapsulation:2})})()}return a})();var $a=(()=>{class a{static ɵfac=function(n){return new(n||a)};static ɵmod=Ie({type:a});static ɵinj=ge({imports:[Yt,Ya$1]})}return a})();var At=`/api/compras`;var Tt=class a{http=m(Ay);obter(t){return this.http.get(`${At}/${t}/`)}criar(t){return this.http.post(`${At}/`,t)}atualizar(t,e){return this.http.patch(`${At}/${t}/`,e)}excluir(t){return this.http.delete(`${At}/${t}/`)}ajustarParcela(t,e){return this.http.patch(`/api/lancamentos/${t}/`,{valor:e})}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var Ot=`/api/familias`;var je=class a{http=m(Ay);obter(t){return this.http.get(`${Ot}/${t}/`)}criar(t){return this.http.post(`${Ot}/`,t)}alterar(t,e){return this.http.post(`${Ot}/${t}/alterar/`,e)}encerrar(t,e){return this.http.post(`${Ot}/${t}/encerrar/`,{a_partir_de:e})}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var Vt=class{source;value;constructor(t,e){this.source=t,this.value=e}};var nn={provide:Ue,useExisting:cs(()=>Kt),multi:!0};var Ga=new v(`MatRadioGroup`);var rn=new v(`mat-radio-default-options`,{providedIn:`root`,factory:()=>({color:`accent`,disabledInteractive:!1})});var Kt=(()=>{class a{_changeDetector=m(Mb);_value=null;_name=m(sf).getId(`mat-radio-group-`);_selected=null;_isInitialized=!1;_labelPosition=`after`;_disabled=!1;_required=!1;_buttonChanges;_controlValueAccessorChangeFn=()=>{};onTouched=()=>{};change=new Oe;_radios;color;get name(){return this._name}set name(e){this._name=e,this._updateRadioButtonNames()}get labelPosition(){return this._labelPosition}set labelPosition(e){this._labelPosition=e===`before`?`before`:`after`,this._markRadiosForCheck()}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this._updateSelectedRadioFromValue(),this._checkSelectedRadioButton())}_checkSelectedRadioButton(){this._selected&&!this._selected.checked&&(this._selected.checked=!0)}get selected(){return this._selected}set selected(e){this._selected=e,this.value=e?e.value:null,this._checkSelectedRadioButton()}get disabled(){return this._disabled}set disabled(e){this._disabled=e,this._markRadiosForCheck()}get required(){return this._required}set required(e){this._required=e,this._markRadiosForCheck()}get disabledInteractive(){return this._disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e,this._markRadiosForCheck()}_disabledInteractive=!1;ngAfterContentInit(){this._isInitialized=!0,this._buttonChanges=this._radios.changes.subscribe(()=>{this.selected&&!this._radios.find(e=>e===this.selected)&&(this._selected=null)})}ngOnDestroy(){this._buttonChanges?.unsubscribe()}_touch(){this.onTouched&&this.onTouched()}_updateRadioButtonNames(){this._radios&&this._radios.forEach(e=>{e.name=this.name,e._markForCheck()})}_updateSelectedRadioFromValue(){let e=this._selected!==null&&this._selected.value===this._value;this._radios&&!e&&(this._selected=null,this._radios.forEach(n=>{n.checked=this.value===n.value,n.checked&&(this._selected=n)}))}_emitChangeEvent(){this._isInitialized&&this.change.emit(new Vt(this._selected,this._value))}_markRadiosForCheck(){this._radios&&this._radios.forEach(e=>e._markForCheck())}writeValue(e){this.value=e,this._changeDetector.markForCheck()}registerOnChange(e){this._controlValueAccessorChangeFn=e}registerOnTouched(e){this.onTouched=e}setDisabledState(e){this.disabled=e,this._changeDetector.markForCheck()}static ɵfac=function(n){return new(n||a)};static ɵdir=tt$1({type:a,selectors:[[`mat-radio-group`]],contentQueries:function(n,s,d){if(n&1&&Yg(d,zt,5),n&2){let f;mC(f=hC())&&(s._radios=f)}},hostAttrs:[`role`,`radiogroup`,1,`mat-mdc-radio-group`],inputs:{color:`color`,name:`name`,labelPosition:`labelPosition`,value:`value`,selected:`selected`,disabled:[2,`disabled`,`disabled`,on],required:[2,`required`,`required`,on],disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,on]},outputs:{change:`change`},exportAs:[`matRadioGroup`],features:[pb([nn,{provide:Ga,useExisting:a}])]})}return a})();var zt=(()=>{class a{_elementRef=m(be);_changeDetector=m(Mb);_focusMonitor=m(Jd);_radioDispatcher=m(Wn$1);_defaultOptions=m(rn,{optional:!0});_ngZone=m(j$1);_renderer=m(zn$1);_uniqueId=m(sf).getId(`mat-radio-`);_cleanupClick;id=this._uniqueId;name;ariaLabel;ariaLabelledby;ariaDescribedby;disableRipple=!1;tabIndex=0;get checked(){return this._checked}set checked(e){this._checked!==e&&(this._checked=e,e&&this.radioGroup&&this.radioGroup.value!==this.value?this.radioGroup.selected=this:!e&&this.radioGroup&&this.radioGroup.value===this.value&&(this.radioGroup.selected=null),e&&this._radioDispatcher.notify(this.id,this.name),this._changeDetector.markForCheck())}get value(){return this._value}set value(e){this._value!==e&&(this._value=e,this.radioGroup!==null&&(this.checked||(this.checked=this.radioGroup.value===e),this.checked&&(this.radioGroup.selected=this)))}get labelPosition(){return this._labelPosition||this.radioGroup&&this.radioGroup.labelPosition||`after`}set labelPosition(e){this._labelPosition=e}_labelPosition;get disabled(){return this._disabled||this.radioGroup!==null&&this.radioGroup.disabled}set disabled(e){this._setDisabled(e)}get required(){return this._required||this.radioGroup&&this.radioGroup.required}set required(e){e!==this._required&&this._changeDetector.markForCheck(),this._required=e}get color(){return this._color||this.radioGroup&&this.radioGroup.color||this._defaultOptions&&this._defaultOptions.color||`accent`}set color(e){this._color=e}_color;get disabledInteractive(){return this._disabledInteractive||this.radioGroup!==null&&this.radioGroup.disabledInteractive}set disabledInteractive(e){this._disabledInteractive=e}_disabledInteractive;change=new Oe;radioGroup;get inputId(){return`${this.id||this._uniqueId}-input`}_checked=!1;_disabled=!1;_required=!1;_value=null;_removeUniqueSelectionListener=()=>{};_previousTabIndex;_inputElement;_rippleTrigger;_noopAnimations=qr();_injector=m(Z);constructor(){m(Qn$1).load(lv);let e=m(Ga,{optional:!0}),n=m(new vb(`tabindex`),{optional:!0});this.radioGroup=e,this._disabledInteractive=this._defaultOptions?.disabledInteractive??!1,n&&(this.tabIndex=Sd(n,0))}focus(e,n){n?this._focusMonitor.focusVia(this._inputElement,n,e):this._inputElement.nativeElement.focus(e)}_markForCheck(){this._changeDetector.markForCheck()}ngOnInit(){this.radioGroup&&(this.checked=this.radioGroup.value===this._value,this.checked&&(this.radioGroup.selected=this),this.name=this.radioGroup.name),this._removeUniqueSelectionListener=this._radioDispatcher.listen((e,n)=>{e!==this.id&&n===this.name&&(this.checked=!1)})}ngDoCheck(){this._updateTabIndex()}ngAfterViewInit(){this._updateTabIndex(),this._focusMonitor.monitor(this._elementRef,!0).subscribe(e=>{!e&&this.radioGroup&&this.radioGroup._touch()}),this._ngZone.runOutsideAngular(()=>{this._cleanupClick=this._renderer.listen(this._inputElement.nativeElement,`click`,this._onInputClick)})}ngOnDestroy(){this._cleanupClick?.(),this._focusMonitor.stopMonitoring(this._elementRef),this._removeUniqueSelectionListener()}_emitChangeEvent(){this.change.emit(new Vt(this,this._value))}_isRippleDisabled(){return this.disableRipple||this.disabled}_onInputInteraction(e){if(e.stopPropagation(),!this.checked&&!this.disabled){let n=this.radioGroup&&this.value!==this.radioGroup.value;this.checked=!0,this._emitChangeEvent(),this.radioGroup&&(this.radioGroup._controlValueAccessorChangeFn(this.value),n&&this.radioGroup._emitChangeEvent())}}_setDisabled(e){this._disabled!==e&&(this._disabled=e,this._changeDetector.markForCheck())}_onInputClick=e=>{this.disabled&&this.disabledInteractive&&e.preventDefault()};_updateTabIndex(){let e=this.radioGroup,n;if(!e||!e.selected||this.disabled?n=this.tabIndex:n=e.selected===this?this.tabIndex:-1,n!==this._previousTabIndex){let s=this._inputElement?.nativeElement;s&&(s.setAttribute(`tabindex`,n+``),this._previousTabIndex=n,Bu(()=>{queueMicrotask(()=>{e&&e.selected&&e.selected!==this&&document.activeElement===s&&(e.selected?._inputElement.nativeElement.focus(),document.activeElement===s&&this._inputElement.nativeElement.blur())})},{injector:this._injector}))}}static ɵfac=function(n){return new(n||a)};static ɵcmp=(function(){let e=[`input`],n=[`formField`];return et({type:a,selectors:[[`mat-radio-button`]],viewQuery:function(f,c){if(f&1&&Kg(e,5)(n,7,be),f&2){let V;mC(V=hC())&&(c._inputElement=V.first),mC(V=hC())&&(c._rippleTrigger=V.first)}},hostAttrs:[1,`mat-mdc-radio-button`],hostVars:19,hostBindings:function(f,c){f&1&&Zg(`focus`,function(){return c._inputElement.nativeElement.focus()}),f&2&&(Jo(`id`,c.id)(`tabindex`,null)(`aria-label`,null)(`aria-labelledby`,null)(`aria-describedby`,null),rn$1(`mat-primary`,c.color===`primary`)(`mat-accent`,c.color===`accent`)(`mat-warn`,c.color===`warn`)(`mat-mdc-radio-checked`,c.checked)(`mat-mdc-radio-disabled`,c.disabled)(`mat-mdc-radio-disabled-interactive`,c.disabledInteractive)(`_mat-animation-noopable`,c._noopAnimations))},inputs:{id:`id`,name:`name`,ariaLabel:[0,`aria-label`,`ariaLabel`],ariaLabelledby:[0,`aria-labelledby`,`ariaLabelledby`],ariaDescribedby:[0,`aria-describedby`,`ariaDescribedby`],disableRipple:[2,`disableRipple`,`disableRipple`,on],tabIndex:[2,`tabIndex`,`tabIndex`,d=>d==null?0:Sd(d)],checked:[2,`checked`,`checked`,on],value:`value`,labelPosition:`labelPosition`,disabled:[2,`disabled`,`disabled`,on],required:[2,`required`,`required`,on],color:`color`,disabledInteractive:[2,`disabledInteractive`,`disabledInteractive`,on]},outputs:{change:`change`},exportAs:[`matRadioButton`],ngContentSelectors:[`*`],decls:13,vars:17,consts:[[`formField`,``],[`input`,``],[`mat-internal-form-field`,``,3,`labelPosition`,`for`],[1,`mdc-radio`],[1,`mat-mdc-radio-touch-target`],[`type`,`radio`,`aria-invalid`,`false`,1,`mdc-radio__native-control`,3,`change`,`id`,`checked`,`disabled`,`required`],[`aria-hidden`,`true`,1,`mdc-radio__background`],[1,`mdc-radio__outer-circle`],[1,`mdc-radio__inner-circle`],[`mat-ripple`,``,`aria-hidden`,`true`,1,`mat-radio-ripple`,`mat-focus-indicator`,3,`matRippleTrigger`,`matRippleDisabled`,`matRippleCentered`],[1,`mat-ripple-element`,`mat-radio-persistent-ripple`],[1,`mat-internal-form-field-label`,`mdc-label`]],template:function(f,c){f&1&&(ni$1(),ra(0,`label`,2,0)(2,`span`,3),zg(3,`span`,4),ra(4,`input`,5,1),Zg(`change`,function(T){return c._onInputInteraction(T)}),md(),ra(6,`span`,6),zg(7,`span`,7)(8,`span`,8),md(),ra(9,`span`,9),zg(10,`span`,10),md()(),ra(11,`span`,11),Rt$1(12),md()()),f&2&&($g(`labelPosition`,c.labelPosition)(`for`,c.inputId),qo(2),rn$1(`mdc-radio--disabled`,c.disabled),qo(2),$g(`id`,c.inputId)(`checked`,c.checked)(`disabled`,c.disabled&&!c.disabledInteractive)(`required`,c.required),Jo(`name`,c.name)(`value`,c.value)(`aria-label`,c.ariaLabel)(`aria-labelledby`,c.ariaLabelledby)(`aria-describedby`,c.ariaDescribedby)(`aria-disabled`,c.disabled&&c.disabledInteractive?`true`:null),qo(5),$g(`matRippleTrigger`,c._rippleTrigger.nativeElement)(`matRippleDisabled`,c._isRippleDisabled())(`matRippleCentered`,!0))},dependencies:[s3,bs],styles:[`.mat-mdc-radio-button {
  -webkit-tap-highlight-color: transparent;
}
.mat-mdc-radio-button .mdc-radio {
  display: inline-block;
  position: relative;
  flex: 0 0 auto;
  box-sizing: content-box;
  width: 20px;
  height: 20px;
  will-change: opacity, transform, border-color, color;
  padding: calc((var(--%NS%mat-radio-state-layer-size, 40px) - 20px) / 2);
  cursor: pointer;
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:not([disabled]):not(:focus) ~ .mdc-radio__background::before {
  opacity: 0.04;
  transform: scale(1);
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:not([disabled]) ~ .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-unselected-hover-icon-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-selected-hover-icon-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio:hover > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--%NS%mat-radio-selected-hover-icon-color, var(--%NS%mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-unselected-pressed-icon-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-selected-pressed-icon-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio:active > .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--%NS%mat-radio-selected-pressed-icon-color, var(--%NS%mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__background {
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  width: 20px;
  height: 20px;
}
.mat-mdc-radio-button .mdc-radio__background::before {
  position: absolute;
  transform: scale(0, 0);
  border-radius: 50%;
  opacity: 0;
  pointer-events: none;
  content: "";
  transition: opacity 90ms cubic-bezier(0.4, 0, 0.6, 1), transform 90ms cubic-bezier(0.4, 0, 0.6, 1);
  width: var(--%NS%mat-radio-state-layer-size, 40px);
  height: var(--%NS%mat-radio-state-layer-size, 40px);
  top: calc(-1 * (var(--%NS%mat-radio-state-layer-size, 40px) - 20px) / 2);
  left: calc(-1 * (var(--%NS%mat-radio-state-layer-size, 40px) - 20px) / 2);
}
.mat-mdc-radio-button .mdc-radio__outer-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  transition: border-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-radio-button .mdc-radio__inner-circle {
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  transform: scale(0);
  border-radius: 50%;
  transition: transform 90ms cubic-bezier(0.4, 0, 0.6, 1), background-color 90ms cubic-bezier(0.4, 0, 0.6, 1);
}
@media (forced-colors: active) {
  .mat-mdc-radio-button .mdc-radio__inner-circle {
    background-color: CanvasText !important;
  }
}
.mat-mdc-radio-button .mdc-radio__native-control {
  position: absolute;
  margin: 0;
  padding: 0;
  opacity: 0;
  top: 0;
  right: 0;
  left: 0;
  cursor: inherit;
  z-index: 1;
  width: var(--%NS%mat-radio-state-layer-size, 40px);
  height: var(--%NS%mat-radio-state-layer-size, 40px);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background {
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 1), transform 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__outer-circle, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__outer-circle {
  transition: border-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle, .mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__inner-circle {
  transition: transform 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:focus + .mdc-radio__background::before {
  transform: scale(1);
  opacity: 0.12;
  transition: opacity 90ms cubic-bezier(0, 0, 0.2, 1), transform 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-disabled-unselected-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-radio-disabled-unselected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background {
  cursor: default;
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:disabled + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--%NS%mat-radio-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface, currentColor));
  opacity: var(--%NS%mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-unselected-icon-color, var(--%NS%mat-sys-on-surface-variant));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-selected-icon-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--%NS%mat-radio-selected-icon-color, var(--%NS%mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-selected-focus-icon-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-radio-button .mdc-radio__native-control:enabled:focus:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--%NS%mat-radio-selected-focus-icon-color, var(--%NS%mat-sys-primary, currentColor));
}
.mat-mdc-radio-button .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle {
  transform: scale(0.5);
  transition: transform 90ms cubic-bezier(0, 0, 0.2, 1), background-color 90ms cubic-bezier(0, 0, 0.2, 1);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled {
  pointer-events: auto;
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:not(:checked) + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-disabled-unselected-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-radio-disabled-unselected-icon-opacity, 0.38);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--%NS%disabled:hover .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__outer-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus + .mdc-radio__background > .mdc-radio__outer-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control + .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface));
  opacity: var(--%NS%mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--%NS%disabled:hover .mdc-radio__native-control:checked + .mdc-radio__background > .mdc-radio__inner-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control:checked:focus + .mdc-radio__background > .mdc-radio__inner-circle,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__native-control + .mdc-radio__background > .mdc-radio__inner-circle {
  background-color: var(--%NS%mat-radio-disabled-selected-icon-color, var(--%NS%mat-sys-on-surface, currentColor));
  opacity: var(--%NS%mat-radio-disabled-selected-icon-opacity, 0.38);
}
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__background::before,
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__outer-circle,
.mat-mdc-radio-button._mat-animation-noopable .mdc-radio__inner-circle {
  transition: none !important;
}
.mat-mdc-radio-button .mat-internal-form-field-label:empty {
  display: none;
}
.mat-mdc-radio-button .mdc-radio__background::before {
  background-color: var(--%NS%mat-radio-ripple-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-radio-button.mat-mdc-radio-checked .mat-ripple-element,
.mat-mdc-radio-button.mat-mdc-radio-checked .mdc-radio__background::before {
  background-color: var(--%NS%mat-radio-checked-ripple-color, var(--%NS%mat-sys-primary));
}
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mat-ripple-element,
.mat-mdc-radio-button.mat-mdc-radio-disabled-interactive .mdc-radio--disabled .mdc-radio__background::before {
  background-color: var(--%NS%mat-radio-ripple-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-radio-button .mat-internal-form-field {
  color: var(--%NS%mat-radio-label-text-color, var(--%NS%mat-sys-on-surface));
  font-family: var(--%NS%mat-radio-label-text-font, var(--%NS%mat-sys-body-medium-font));
  line-height: var(--%NS%mat-radio-label-text-line-height, var(--%NS%mat-sys-body-medium-line-height));
  font-size: var(--%NS%mat-radio-label-text-size, var(--%NS%mat-sys-body-medium-size));
  letter-spacing: var(--%NS%mat-radio-label-text-tracking, var(--%NS%mat-sys-body-medium-tracking));
  font-weight: var(--%NS%mat-radio-label-text-weight, var(--%NS%mat-sys-body-medium-weight));
  cursor: pointer;
}
.mat-mdc-radio-button .mdc-radio--disabled + .mat-internal-form-field-label {
  color: var(--%NS%mat-radio-disabled-label-color, color-mix(in srgb, var(--%NS%mat-sys-on-surface) 38%, transparent));
}
.mat-mdc-radio-button .mat-radio-ripple {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  pointer-events: none;
  border-radius: 50%;
}
.mat-mdc-radio-button .mat-radio-ripple > .mat-ripple-element {
  opacity: 0.14;
}
.mat-mdc-radio-button .mat-radio-ripple::before {
  border-radius: 50%;
}
.mat-mdc-radio-button .mdc-radio > .mdc-radio__native-control:focus:enabled:not(:checked) ~ .mdc-radio__background > .mdc-radio__outer-circle {
  border-color: var(--%NS%mat-radio-unselected-focus-icon-color, var(--%NS%mat-sys-on-surface));
}
.mat-mdc-radio-button.cdk-focused .mat-focus-indicator::before {
  content: "";
}

.mat-mdc-radio-disabled {
  cursor: default;
  pointer-events: none;
}
.mat-mdc-radio-disabled.mat-mdc-radio-disabled-interactive {
  pointer-events: auto;
}

.mat-mdc-radio-touch-target {
  position: absolute;
  top: 50%;
  left: 50%;
  height: var(--%NS%mat-radio-touch-target-size, 48px);
  width: var(--%NS%mat-radio-touch-target-size, 48px);
  transform: translate(-50%, -50%);
  display: var(--%NS%mat-radio-touch-target-display, block);
}
[dir=rtl] .mat-mdc-radio-touch-target {
  left: auto;
  right: 50%;
  transform: translate(50%, -50%);
}
`],encapsulation:2})})()}return a})();var Xa=(()=>{class a{static ɵfac=function(n){return new(n||a)};static ɵmod=Ie({type:a});static ɵinj=ge({imports:[fv,zt,Ya$1]})}return a})();var ea=12;function tt(a=``){return new Oe$1(a,{nonNullable:!0,validators:[Ne.required,Ne.maxLength(60)]})}function Rt(a){let t=a.findIndex(e=>e.administrador);return{nomes:new vt(a.map(e=>tt(e.nome))),administrador:new Oe$1(t===-1?null:t)}}function Bt({nomes:a,administrador:t}){return a.controls.map((e,n)=>({nome:e.value.trim(),administrador:n===t.value}))}function ja(a,t,e){let n=a.length,s=(f(t,e)%n+n)%n;return[...a.slice(s),...a.slice(0,s)]}function ln(a,t){a&1&&(ra(0,`mat-hint`),jC(1),YC(2,`competencia`),md()),a&2&&(qo(),yd(`Paga em `,QC(2,1,t)))}function sn(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Informe o nome.`),md())}function dn(a,t){if(a&1){let e=lC();ra(0,`div`,4)(1,`mat-form-field`,6)(2,`mat-label`),jC(3),md(),ra(4,`input`,7),jw(),md(),ei$1(5,ln,3,3,`mat-hint`),ei$1(6,sn,2,0,`mat-error`),md(),ra(7,`mat-radio-button`,8),jC(8,`Eu`),md(),ra(9,`button`,9),Zg(`click`,function(){let s=kp(e).$index,d=dC();return Fp(d.mover(s,-1))}),ra(10,`mat-icon`),jC(11,`arrow_upward`),md()(),ra(12,`button`,9),Zg(`click`,function(){let s=kp(e).$index,d=dC();return Fp(d.mover(s,1))}),ra(13,`mat-icon`),jC(14,`arrow_downward`),md()()()}if(a&2){let e,n=t.$implicit,s=t.$index,d=t.$count,f=dC();qo(3),yd(``,s+1,`º mês`),qo(),$g(`formControl`,n),Vw(),qo(),ti((e=f.mesDe(s))?5:-1,e),qo(),ti(n.hasError(`required`)?6:-1),qo(),$g(`value`,s),Jo(`title`,`Administro: sem rendimento no meu mês`),qo(2),$g(`disabled`,s===0),Jo(`aria-label`,`Subir o `+(s+1)+`º`),qo(3),$g(`disabled`,s===d-1),Jo(`aria-label`,`Descer o `+(s+1)+`º`)}}var He=class a{form=xb.required();inicio=xb(null);maximo=ea;mesDe(t){let e=this.inicio();return e&&/^\d{4}-\d{2}$/.test(e)?u(e,t):null}definirQuantidade(t){let{nomes:e,administrador:n}=this.form(),s=Math.trunc(Number(t));if(!(!Number.isFinite(s)||s<1||s>ea)){for(;e.length<s;)e.push(tt());for(;e.length>s;)e.removeAt(e.length-1);(n.value??-1)>=s&&n.setValue(null),e.markAsDirty()}}mover(t,e){let{nomes:n,administrador:s}=this.form(),d=t+e;if(d<0||d>=n.length)return;let f=n.at(t);n.removeAt(t),n.insert(d,f),s.value===t?s.setValue(d):s.value===d&&s.setValue(t),n.markAsDirty()}static ɵfac=function(e){return new(e||a)};static ɵcmp=et({type:a,selectors:[[`app-membros-da-familia`]],inputs:{form:[1,`form`],inicio:[1,`inicio`]},decls:12,vars:4,consts:[[`quantidade`,``],[1,`membros__quantidade`],[`matInput`,``,`type`,`number`,`min`,`1`,3,`input`,`max`,`value`],[`aria-label`,`Quem administra a família`,1,`membros`,3,`formControl`],[1,`membros__membro`],[1,`membros__dica`],[1,`membros__nome`],[`matInput`,``,1,`membros__campo`,3,`formControl`],[3,`value`],[`mat-icon-button`,``,`type`,`button`,3,`click`,`disabled`]],template:function(e,n){if(e&1){let s=lC();ra(0,`mat-form-field`,1)(1,`mat-label`),jC(2,`Quantidade de membros`),md(),ra(3,`input`,2,0),Zg(`input`,function(){kp(s);let f=bC(4);return Fp(n.definirQuantidade(f.value))}),md(),ra(5,`mat-hint`),jC(6),md()(),ra(7,`mat-radio-group`,3),jw(),nC(8,dn,15,10,`div`,4,tC),md(),ra(10,`p`,5),jC(11,` Cada m\xEAs um membro paga, nesta ordem, e o valor dele entra nos rendimentos. Marque "Eu" no seu nome: no seu m\xEAs n\xE3o h\xE1 o que receber.
`),md()}e&2&&(qo(3),$g(`max`,n.maximo)(`value`,n.form().nomes.length),qo(3),yd(`De 1 a `,n.maximo,`.`),qo(),$g(`formControl`,n.form().administrador),Vw(),qo(),rC(n.form().nomes.controls))},dependencies:[kr,hn$2,Vr,Zi$1,j3,Rx,Ot$1,Xn$1,At$1,Vt$1,tr,Mt,wt,Ga$1,Ha$1,Xa,Kt,zt,p],styles:[`[_nghost-%COMP%]{display:flex;flex-direction:column;gap:4px}.membros__quantidade[_ngcontent-%COMP%]{max-width:200px}.membros[_ngcontent-%COMP%]{display:flex;flex-direction:column}.membros__membro[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px}.membros__nome[_ngcontent-%COMP%]{flex:1}.membros__dica[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-body-small);color:var(--%NS%mat-sys-on-surface-variant);margin:0}`]})};var Ha=(a,t)=>t.id;function cn(a,t){if(a&1&&(ra(0,`mat-option`,5),jC(1),md()),a&2){let e=t.$implicit;$g(`value`,e.id),qo(),ab(e.nome)}}function mn(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Escolha a fonte.`),md())}function pn(a,t){a&1&&(ra(0,`mat-hint`),jC(1,`Ex.: Apple icloud`),md())}function un(a,t){if(a&1&&(ra(0,`mat-error`),jC(1),md()),a&2){let e=dC();qo(),ab(e.familia()?`Informe a família.`:`Informe a descrição.`)}}function _n(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Informe a data.`),md())}function bn(a,t){if(a&1&&(ra(0,`mat-hint`),jC(1),YC(2,`competencia`),md()),a&2){let e=dC();qo(),yd(`Sugerida: `,QC(2,1,e))}}function fn(a,t){if(a&1&&ei$1(0,bn,3,3,`mat-hint`),a&2){let e=dC();ti(t!==e.form.controls.competencia.value?0:-1)}}function gn(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Informe a competência.`),md())}function hn(a,t){a&1&&(ra(0,`mat-slide-toggle`,11),jw(),jC(1,`Família`),md()),a&2&&Vw()}function vn(a,t){a&1&&(ra(0,`mat-slide-toggle`,12),jw(),jC(1,`Compra parcelada`),md()),a&2&&Vw()}function yn(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Valor inválido (ex.: 1.234,56).`),md())}function Cn(a,t){a&1&&(ra(0,`mat-error`),jC(1,`De 2 a 120.`),md())}function xn(a,t){if(a&1&&(ra(0,`mat-form-field`,14)(1,`mat-label`),jC(2,`Parcelas`),md(),ra(3,`input`,22),jw(),md(),ei$1(4,Cn,2,0,`mat-error`),md()),a&2){let e=dC();qo(3),Vw(),qo(),ti(e.form.controls.n_parcelas.invalid?4:-1)}}function wn(a,t){if(a&1&&zg(0,`app-membros-da-familia`,15),a&2){let e=dC();$g(`form`,e.membros)(`inicio`,e.form.controls.competencia.value)}}function kn(a,t){a&1&&(ra(0,`mat-hint`),jC(1,`Confirmada pela fatura.`),md())}function Sn(a,t){if(a&1&&(jC(0),YC(1,`currency`)),a&2){let e=dC();yd(` 2ª: `,QC(1,1,e.segunda),` · `)}}function Mn(a,t){if(a&1&&(ra(0,`mat-hint`),ei$1(1,Sn,2,3),jC(2),YC(3,`currency`),md()),a&2){let e=t;qo(),ti(e.segunda?1:-1),qo(),cb(` `,e.quantidade,` × `,QC(3,3,e.valor),` `)}}function Nn(a,t){if(a&1&&(ra(0,`p`,24),jC(1),md()),a&2){let e=dC(2);qo(),yd(`1ª parcela: `,e.form.getError(`primeiraParcela`))}}function En(a,t){if(a&1&&(ra(0,`mat-form-field`)(1,`mat-label`),jC(2,`Valor da 1ª parcela (R$)`),md(),ra(3,`input`,23),jw(),md(),ei$1(4,kn,2,0,`mat-hint`)(5,Mn,4,5,`mat-hint`),md(),ei$1(6,Nn,2,1,`p`,24)),a&2){let e,n=dC();qo(3),Vw(),qo(),ti(n.form.controls.valor_primeira.disabled?4:(e=n.demaisParcelas())?5:-1,e),qo(2),ti(n.form.hasError(`primeiraParcela`)&&n.form.controls.valor_primeira.touched?6:-1)}}function In(a,t){if(a&1){let e=lC();ra(0,`div`,26)(1,`span`),jC(2),md(),ra(3,`span`),jC(4),YC(5,`competencia`),md(),ra(6,`input`,28,0),Zg(`keydown.enter`,function(s){let d=kp(e).$implicit,f=bC(7),c=dC(3);return s.preventDefault(),Fp(c.ajustarParcela(d,f.value))})(`blur`,function(){let s=kp(e).$implicit,d=bC(7),f=dC(3);return Fp(f.ajustarParcela(s,d.value))}),md(),ra(8,`span`,29),jC(9),md()()}if(a&2){let e=t.$implicit,n=dC(2),s=dC();qo(2),cb(``,e.parcela,`/`,n.n_parcelas),qo(2),ab(QC(5,6,e.competencia)),qo(2),$g(`value`,s.paraCampo(e.valor)),Jo(`aria-label`,`Valor da parcela `+e.parcela),qo(3),ab(e.status===`confirmado`?`Confirmada`:``)}}function Fn(a,t){if(a&1&&(ra(0,`section`,25)(1,`h3`),jC(2,`Parcelas`),md(),nC(3,In,10,8,`div`,26,Ha),ra(5,`p`,27),jC(6,` Ajustar o valor de uma parcela atualiza o total da compra. `),md()()),a&2){let e=dC();qo(3),rC(e.parcelas)}}function Dn(a,t){a&1&&ei$1(0,Fn,7,0,`section`,25),a&2&&ti(t.parcelas.length>1?0:-1)}function Pn(a,t){a&1&&(ra(0,`p`,16),jC(1),md()),a&2&&(qo(),ab(t))}function An(a,t){if(a&1){let e=lC();ra(0,`button`,30),Zg(`click`,function(){kp(e);let s=dC();return Fp(s.excluir())}),ra(1,`mat-icon`),jC(2,`delete`),md(),jC(3,` Excluir `),md()}}var Tn=/^\d{4}-\d{2}-\d{2}$/;function On(a){let t=h(a.value??``);return t===null||R$1(t)===0?{valor:!0}:null}var Vn=a=>{let{parcelada:t,valor_total:e,n_parcelas:n,valor_primeira:s}=a.getRawValue(),d=h(e??``),f=h(s??``);return!t||d===null||!n||n<2?null:f===null||R$1(f)===0?{primeiraParcela:`Valor inválido.`}:R$1(d)-R$1(f)<n-1?{primeiraParcela:`Precisa ser menor que o total e sobrar para as demais.`}:null};var qt=class a{compras=m(Tt);familias=m(je);fonteService=m(x);dialog=m(Ht$1);dialogRef=m(Ze);dados=m(jt$1);compraId=this.dados.compraId;fontes=St([]);compra=St(null);sugerida=St(null);salvando=St(!1);erro=St(null);alterado=St(!1);fontesDisponiveis=tS(()=>this.fontes().filter(t=>t.ativa||t.id===this.compra()?.fonte));form=m(Tr).group({fonte:[null,Ne.required],data:[``,Ne.required],descricao:[``,[Ne.required,Ne.maxLength(200)]],parcelada:[!1],familia:[!1],valor_total:[``,[Ne.required,On]],n_parcelas:[1,[Ne.required,Ne.min(1),Ne.max(120)]],valor_primeira:[``],competencia:[``,Ne.required]},{validators:Vn});parcelada=H(this.form.controls.parcelada.valueChanges,{initialValue:!1});familia=H(this.form.controls.familia.valueChanges,{initialValue:!1});membros=Rt([{nome:``,administrador:!0}]);valores=H(this.form.valueChanges.pipe(se(()=>this.form.getRawValue())),{initialValue:this.form.getRawValue()});demaisParcelas=tS(()=>{let{valor_total:t,n_parcelas:e,valor_primeira:n}=this.valores(),s=h(t??``),d$1=h(n??``);if(!this.parcelada()||s===null||d$1===null||!e||e<2)return null;let f=R$1(s)-R$1(d$1),c=f>0?I(d(f),e-1):null;return c?c[0]===c[c.length-1]?{quantidade:c.length,valor:c[0],segunda:null}:{quantidade:c.length-1,valor:c[1],segunda:c[0]}:null});constructor(){this.fonteService.listar().subscribe(T=>this.fontes.set(T)),this.compraId!==null&&this.carregarCompra(this.compraId);let{fonte:t,data:e,parcelada:n,familia:s,valor_total:d,n_parcelas:f,valor_primeira:c,competencia:V}=this.form.controls;Qv(t.valueChanges,e.valueChanges).pipe(st(()=>t.value!==null&&Tn.test(e.value)),lc(()=>this.fonteService.competenciaSugerida(t.value,e.value).pipe(cc(()=>Kr(null)))),A$1()).subscribe(T=>{this.sugerida.set(T),T&&!V.dirty&&V.setValue(T)}),this.compraId===null&&this.dados.fonteId&&t.setValue(this.dados.fonteId),s.valueChanges.pipe(A$1()).subscribe(T=>{T&&n.setValue(!1)}),n.valueChanges.pipe(A$1()).subscribe(T=>{f.setValidators([Ne.required,Ne.min(T?2:1),Ne.max(120)]),f.setValue(T?Math.max(2,f.value):1)}),Qv(d.valueChanges,f.valueChanges).pipe(A$1()).subscribe(()=>{if(c.dirty||c.disabled)return;let T=h(d.value),na=T?I(T,f.value):null;c.setValue(na?A$2(na[0]):``)})}salvar(){let t=this.form.controls.familia.value;if(this.form.invalid||t&&this.membros.nomes.invalid||this.salvando()){this.form.markAllAsTouched(),this.membros.nomes.markAllAsTouched();return}this.salvando.set(!0),this.erro.set(null);let e=this.form.getRawValue();if(t){this.concluir(this.familias.criar({fonte:e.fonte,nome:e.descricao.trim(),valor:h(e.valor_total),inicio:e.competencia,membros:Bt(this.membros)}));return}let n={fonte:e.fonte,data:e.data,descricao:e.descricao.trim(),valor_total:h(e.valor_total),n_parcelas:e.parcelada?e.n_parcelas:1,competencia_inicial:e.competencia};e.parcelada&&this.form.controls.valor_primeira.dirty&&(n.valor_primeira_parcela=h(e.valor_primeira)),this.concluir(this.compraId===null?this.compras.criar(n):this.compras.atualizar(this.compraId,n))}concluir(t){t.subscribe({next:()=>this.dialogRef.close(!0),error:e=>{this.salvando.set(!1),this.erro.set(ys(e))}})}excluir(){let t=this.compra();t&&this.dialog.open(Cn$1,{data:{titulo:`Excluir "${t.descricao}"?`,mensagem:`As ${t.n_parcelas} parcela(s) desta compra tamb\xE9m ser\xE3o exclu\xEDdas.`,confirmar:`Excluir`}}).afterClosed().pipe(st(Boolean),lc(()=>this.compras.excluir(t.id))).subscribe({next:()=>this.dialogRef.close(!0),error:e=>this.erro.set(ys(e))})}ajustarParcela(t,e){let n=h(e);n===null||n===t.valor||this.compras.ajustarParcela(t.id,n).subscribe({next:()=>{this.alterado.set(!0),this.carregarCompra(this.compraId)},error:s=>this.erro.set(ys(s))})}paraCampo(t){return A$2(t)}carregarCompra(t){this.compras.obter(t).subscribe({next:e=>{this.compra.set(e);let n=e.parcelas.find(d=>d.parcela===1),s=this.form.controls;s.parcelada.setValue(e.n_parcelas>1),s.n_parcelas.setValidators([Ne.required,Ne.min(e.n_parcelas>1?2:1)]),this.form.patchValue({fonte:e.fonte,data:e.data,descricao:e.descricao,valor_total:A$2(e.valor_total),n_parcelas:e.n_parcelas,valor_primeira:n?A$2(n.valor):``,competencia:e.competencia_inicial},{emitEvent:!1}),n?.status===`confirmado`&&s.valor_primeira.disable({emitEvent:!1}),this.form.updateValueAndValidity(),this.form.markAsPristine()},error:e=>this.erro.set(ys(e))})}static ɵfac=function(e){return new(e||a)};static ɵcmp=et({type:a,selectors:[[`app-form-compra`]],decls:50,vars:23,consts:[[`valor`,``],[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-compra`],[`formControlName`,`fonte`],[3,`value`],[`matInput`,``,`formControlName`,`descricao`,1,`form-compra__descricao`],[1,`form-compra__linha`],[`matInput`,``,`type`,`date`,`formControlName`,`data`],[`matInput`,``,`type`,`month`,`formControlName`,`competencia`],[1,`form-compra__opcoes`],[`formControlName`,`familia`,1,`form-compra__familia`],[`formControlName`,`parcelada`,1,`form-compra__parcelada`],[`matInput`,``,`formControlName`,`valor_total`,`inputmode`,`decimal`,`placeholder`,`0,00`],[1,`form-compra__quantidade`],[3,`form`,`inicio`],[`role`,`alert`,1,`form-compra__erro`],[1,`form-compra__acoes`],[`mat-button`,``,`type`,`button`,1,`form-compra__excluir`],[1,`form-compra__espaco`],[`mat-button`,``,`type`,`button`,3,`mat-dialog-close`],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`matInput`,``,`type`,`number`,`min`,`2`,`max`,`120`,`formControlName`,`n_parcelas`],[`matInput`,``,`formControlName`,`valor_primeira`,`inputmode`,`decimal`,`placeholder`,`0,00`],[1,`form-compra__erro`],[`aria-label`,`Parcelas`,1,`form-compra__parcelas`],[1,`form-compra__parcela`],[1,`form-compra__dica`],[`inputmode`,`decimal`,1,`form-compra__valor-parcela`,3,`keydown.enter`,`blur`,`value`],[1,`form-compra__status`],[`mat-button`,``,`type`,`button`,1,`form-compra__excluir`,3,`click`]],template:function(e,n){if(e&1&&(ra(0,`h2`,1),jC(1),md(),ra(2,`form`,2),Zg(`ngSubmit`,function(){return n.salvar()}),ra(3,`mat-dialog-content`,3)(4,`mat-form-field`)(5,`mat-label`),jC(6,`Fonte`),md(),ra(7,`mat-select`,4),jw(),nC(8,cn,2,2,`mat-option`,5,Ha),md(),ei$1(10,mn,2,0,`mat-error`),md(),ra(11,`mat-form-field`)(12,`mat-label`),jC(13),md(),ra(14,`input`,6),jw(),md(),ei$1(15,pn,2,0,`mat-hint`),ei$1(16,un,2,1,`mat-error`),md(),ra(17,`div`,7)(18,`mat-form-field`)(19,`mat-label`),jC(20),md(),ra(21,`input`,8),jw(),md(),ei$1(22,_n,2,0,`mat-error`),md(),ra(23,`mat-form-field`)(24,`mat-label`),jC(25),md(),ra(26,`input`,9),jw(),md(),ei$1(27,fn,1,1),ei$1(28,gn,2,0,`mat-error`),md()(),ra(29,`div`,10),ei$1(30,hn,2,0,`mat-slide-toggle`,11),ei$1(31,vn,2,0,`mat-slide-toggle`,12),md(),ra(32,`div`,7)(33,`mat-form-field`)(34,`mat-label`),jC(35),md(),ra(36,`input`,13),jw(),md(),ei$1(37,yn,2,0,`mat-error`),md(),ei$1(38,xn,5,1,`mat-form-field`,14),md(),ei$1(39,wn,1,2,`app-membros-da-familia`,15),ei$1(40,En,7,2),ei$1(41,Dn,1,1),ei$1(42,Pn,2,1,`p`,16),md(),ra(43,`mat-dialog-actions`,17),ei$1(44,An,4,0,`button`,18),zg(45,`span`,19),ra(46,`button`,20),jC(47,`Cancelar`),md(),ra(48,`button`,21),jC(49,`Salvar`),md()()()),e&2){let s,d,f;qo(),yd(` `,n.compraId!==null?`Editar compra`:n.familia()?`Nova família`:`Nova compra`,`
`),qo(),$g(`formGroup`,n.form),qo(5),Vw(),qo(),rC(n.fontesDisponiveis()),qo(2),ti(n.form.controls.fonte.hasError(`required`)?10:-1),qo(3),ab(n.familia()?`Identificação da família`:`Descrição`),qo(),Vw(),qo(),ti(n.familia()?15:-1),qo(),ti(n.form.controls.descricao.hasError(`required`)?16:-1),qo(4),ab(n.familia()?`Data da 1ª cobrança`:`Data da compra`),qo(),Vw(),qo(),ti(n.form.controls.data.hasError(`required`)?22:-1),qo(3),ab(n.familia()?`Competência do 1º mês`:n.parcelada()?`Competência da 1ª parcela`:`Competência`),qo(),Vw(),qo(),ti((s=n.sugerida())?27:-1,s),qo(),ti(n.form.controls.competencia.hasError(`required`)?28:-1),qo(2),ti(n.compraId===null?30:-1),qo(),ti(n.familia()?-1:31),qo(4),ab(n.familia()?`Mensalidade (R$)`:n.parcelada()?`Valor total (R$)`:`Valor (R$)`),qo(),Vw(),qo(),ti(n.form.controls.valor_total.invalid?37:-1),qo(),ti(n.parcelada()?38:-1),qo(),ti(n.familia()?39:-1),qo(),ti(n.parcelada()?40:-1),qo(),ti((d=n.compra())?41:-1,d),qo(),ti((f=n.erro())?42:-1,f),qo(2),ti(n.compra()?44:-1),qo(2),$g(`mat-dialog-close`,n.alterado()),qo(2),$g(`disabled`,n.salvando())}},dependencies:[kr,Or,hn$2,Ki,Vr,Ir,Bi$1,zi$2,Et,Qi$1,He,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot$1,Xn$1,At$1,Vt$1,tr,Mt,wt,Ga$1,Ha$1,ls,ss,kt,$a,Yt,dT,p],styles:[`.form-compra[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(480px,80vw)}.form-compra__linha[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:12px}.form-compra__linha[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 180px}.form-compra__quantidade[_ngcontent-%COMP%]{flex:0 1 120px!important}.form-compra__opcoes[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:24px;margin:4px 0 12px}.form-compra__parcelas[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-small);margin:8px 0}.form-compra__parcela[_ngcontent-%COMP%]{display:grid;grid-template-columns:3.5rem 1fr 7rem 6rem;align-items:center;gap:8px;padding:2px 0}.form-compra__valor-parcela[_ngcontent-%COMP%]{font:inherit;text-align:right;padding:4px 6px;border:1px solid var(--%NS%mat-sys-outline-variant);border-radius:4px;background:transparent;color:inherit}.form-compra__status[_ngcontent-%COMP%], .form-compra__dica[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-body-small);color:var(--%NS%mat-sys-on-surface-variant)}.form-compra__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.form-compra__acoes[_ngcontent-%COMP%]{display:flex}.form-compra__espaco[_ngcontent-%COMP%]{flex:1}.form-compra__excluir[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};var zn=(a,t)=>t.id;function Rn(a,t){if(a&1&&(ra(0,`p`,9),jC(1),YC(2,`competencia`),md()),a&2){let e=dC();qo(),yd(` Encerrada: a última mensalidade foi em `,QC(2,1,e.ate),`. `)}}function Bn(a,t){a&1&&(ra(0,`p`,10),jC(1,` As mudanças valem a partir do mês escolhido. Os meses anteriores continuam como estão. `),md())}function qn(a,t){if(a&1&&(ra(0,`mat-hint`,12),jC(1),YC(2,`competencia`),md()),a&2){let e=dC();qo(),yd(`Os meses antes de `,QC(2,1,e.primeira_editavel),` já estão fechados.`)}}function Ln(a,t){a&1&&(ra(0,`mat-hint`),jC(1,`Nele paga o 1º da lista.`),md())}function $n(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Informe o mês.`),md())}function Gn(a,t){if(a&1&&(ra(0,`mat-option`,14),jC(1),md()),a&2){let e=t.$implicit;$g(`value`,e.id),qo(),ab(e.nome)}}function Xn(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Informe a família.`),md())}function jn(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Valor inválido (ex.: 66,90).`),md())}function Hn(a,t){if(a&1&&zg(0,`app-membros-da-familia`,18),a&2){let e=dC(2);$g(`form`,e.membros)(`inicio`,e.form.controls.a_partir_de.value)}}function Un(a,t){if(a&1&&jC(0),a&2){let e=t.$implicit,n=t.$index,s=t.$count;cb(` `,e.nome,``,n===s-1?``:` - `,` `)}}function Qn(a,t){if(a&1&&(ra(0,`p`),jC(1),nC(2,Un,1,2,null,null,eC),md()),a&2){let e=dC();qo(),yd(` `,e.membros.length,` membro(s): `),qo(),rC(e.membros)}}function Zn(a,t){if(a&1&&(ei$1(0,Rn,3,3,`p`,9)(1,Bn,2,0,`p`,10),ra(2,`mat-form-field`)(3,`mat-label`),jC(4,`A partir de`),md(),ra(5,`input`,11),jw(),md(),ei$1(6,qn,3,3,`mat-hint`,12)(7,Ln,2,0,`mat-hint`),ei$1(8,$n,2,0,`mat-error`),md(),ra(9,`mat-form-field`)(10,`mat-label`),jC(11,`Fonte`),md(),ra(12,`mat-select`,13),jw(),nC(13,Gn,2,2,`mat-option`,14,zn),md()(),ra(15,`div`,15)(16,`mat-form-field`)(17,`mat-label`),jC(18,`Identificação da família`),md(),ra(19,`input`,16),jw(),md(),ei$1(20,Xn,2,0,`mat-error`),md(),ra(21,`mat-form-field`)(22,`mat-label`),jC(23,`Mensalidade (R$)`),md(),ra(24,`input`,17),jw(),md(),ei$1(25,jn,2,0,`mat-error`),md()(),ei$1(26,Hn,1,2,`app-membros-da-familia`,18)(27,Qn,4,1,`p`)),a&2){let e=t,n=dC();ti(e.ate?0:1),qo(5),$g(`min`,e.primeira_editavel),Vw(),qo(),ti(n.antesDoPermitido()?6:7),qo(2),ti(n.form.controls.a_partir_de.invalid?8:-1),qo(4),Vw(),qo(),rC(n.fontesDisponiveis()),qo(6),Vw(),qo(),ti(n.form.controls.nome.hasError(`required`)?20:-1),qo(4),Vw(),qo(),ti(n.form.controls.valor.invalid?25:-1),qo(),ti(e.ate?27:26)}}function Wn(a,t){a&1&&(ra(0,`p`,3),jC(1),md()),a&2&&(qo(),ab(t))}function Jn(a,t){if(a&1){let e=lC();ra(0,`button`,19),Zg(`click`,function(){kp(e);let s=dC();return Fp(s.encerrar())}),ra(1,`mat-icon`),jC(2,`event_busy`),md(),jC(3,` Encerrar `),md()}if(a&2){let e=dC();$g(`disabled`,e.salvando())}}function Yn(a,t){if(a&1&&(ra(0,`button`,8),jC(1,`Salvar`),md()),a&2){let e=dC();$g(`disabled`,e.salvando())}}function Kn(a){let t=h(a.value??``);return t===null||R$1(t)===0?{valor:!0}:null}var $t=class a{familias=m(je);dialog=m(Ht$1);dialogRef=m(Ze);familiaId=m(jt$1).familiaId;familia=St(null);fontes=St([]);salvando=St(!1);erro=St(null);fontesDisponiveis=tS(()=>this.fontes().filter(t=>t.ativa||t.id===this.familia()?.fonte));form=m(Tr).group({a_partir_de:[``,[Ne.required,j$2]],fonte:[null,Ne.required],nome:[``,[Ne.required,Ne.maxLength(80)]],valor:[``,[Ne.required,Kn]]});membros=Rt([]);constructor(){m(x).listar().subscribe(t=>this.fontes.set(t)),this.familias.obter(this.familiaId).subscribe({next:t=>this.carregar(t),error:t=>this.erro.set(ys(t))}),this.form.controls.a_partir_de.valueChanges.pipe(A$1()).subscribe(()=>{!this.membros.nomes.dirty&&this.familia()&&this.preencherMembros(this.familia())})}antesDoPermitido(){let t=this.familia(),e=this.form.controls.a_partir_de.value;return t&&j$2(this.form.controls.a_partir_de)===null?e<t.primeira_editavel:!1}salvar(){let t=this.familia();if(!t||t.ate||this.salvando())return;if(this.form.invalid||this.membros.nomes.invalid||this.antesDoPermitido()){this.form.markAllAsTouched(),this.membros.nomes.markAllAsTouched();return}let e=this.form.getRawValue();this.executar(this.familias.alterar(t.id,{a_partir_de:e.a_partir_de,fonte:e.fonte,nome:e.nome.trim(),valor:h(e.valor),membros:Bt(this.membros)}))}encerrar(){let t=this.familia(),e=this.form.controls.a_partir_de;if(!t||e.invalid||this.antesDoPermitido()){e.markAsTouched();return}this.dialog.open(Cn$1,{data:{titulo:`Encerrar "${t.nome}"?`,mensagem:`Sem mensalidade nem rendimento a partir de ${D(e.value)}. Os meses anteriores continuam como est\xE3o.`,confirmar:`Encerrar`}}).afterClosed().pipe(st(Boolean)).subscribe(()=>this.executar(this.familias.encerrar(t.id,e.value)))}executar(t){this.salvando.set(!0),this.erro.set(null),t.subscribe({next:()=>this.dialogRef.close(!0),error:e=>{this.salvando.set(!1),this.erro.set(ys(e))}})}carregar(t){this.familia.set(t),this.form.setValue({a_partir_de:t.primeira_editavel,fonte:t.fonte,nome:t.nome,valor:A$2(t.valor)},{emitEvent:!1}),this.preencherMembros(t),t.ate&&(this.form.disable(),this.membros.nomes.disable(),this.membros.administrador.disable())}preencherMembros(t){let e=this.form.controls.a_partir_de.value,n=j$2(this.form.controls.a_partir_de)===null?ja(t.membros,t.inicio,e):t.membros;this.membros.nomes.clear({emitEvent:!1}),n.forEach(d=>this.membros.nomes.push(tt(d.nome)));let s=n.findIndex(d=>d.administrador);this.membros.administrador.setValue(s===-1?null:s),this.membros.nomes.markAsPristine()}static ɵfac=function(e){return new(e||a)};static ɵcmp=et({type:a,selectors:[[`app-form-familia`]],decls:12,vars:7,consts:[[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-familia`],[`role`,`alert`,1,`form-familia__erro`],[1,`form-familia__acoes`],[`mat-button`,``,`type`,`button`,1,`form-familia__encerrar`,3,`disabled`],[1,`form-familia__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`role`,`status`,1,`form-familia__encerrada`],[1,`form-familia__explicacao`],[`matInput`,``,`type`,`month`,`formControlName`,`a_partir_de`,3,`min`],[1,`form-familia__aviso`],[`formControlName`,`fonte`],[3,`value`],[1,`form-familia__linha`],[`matInput`,``,`formControlName`,`nome`],[`matInput`,``,`formControlName`,`valor`,`inputmode`,`decimal`,`placeholder`,`0,00`],[3,`form`,`inicio`],[`mat-button`,``,`type`,`button`,1,`form-familia__encerrar`,3,`click`,`disabled`]],template:function(e,n){if(e&1&&(ra(0,`h2`,0),jC(1),md(),ra(2,`form`,1),Zg(`ngSubmit`,function(){return n.salvar()}),ra(3,`mat-dialog-content`,2),ei$1(4,Zn,28,7),ei$1(5,Wn,2,1,`p`,3),md(),ra(6,`mat-dialog-actions`,4),ei$1(7,Jn,4,1,`button`,5),zg(8,`span`,6),ra(9,`button`,7),jC(10),md(),ei$1(11,Yn,2,1,`button`,8),md()()),e&2){let s,d;qo(),ab(n.familia()?.nome??`Família`),qo(),$g(`formGroup`,n.form),qo(2),ti((s=n.familia())?4:-1,s),qo(),ti((d=n.erro())?5:-1,d),qo(2),ti(n.familia()&&!n.familia().ate?7:-1),qo(3),yd(` `,n.familia()?.ate?`Fechar`:`Cancelar`,` `),qo(),ti(n.familia()&&!n.familia().ate?11:-1)}},dependencies:[He,kr,Or,hn$2,Vr,Ir,Et,Qi$1,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot$1,Xn$1,At$1,Vt$1,tr,Mt,wt,Ga$1,Ha$1,ls,ss,kt,p],styles:[`.form-familia[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(480px,80vw)}.form-familia__linha[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:12px}.form-familia__linha[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%]{flex:1 1 180px}.form-familia__explicacao[_ngcontent-%COMP%], .form-familia__encerrada[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-body-medium);color:var(--%NS%mat-sys-on-surface-variant);margin:0 0 8px}.form-familia__aviso[_ngcontent-%COMP%], .form-familia__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.form-familia__acoes[_ngcontent-%COMP%]{display:flex}.form-familia__espaco[_ngcontent-%COMP%]{flex:1}.form-familia__encerrar[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};var ei=new v(`MAT_PROGRESS_BAR_DEFAULT_OPTIONS`);var Qa=(()=>{class a{_elementRef=m(be);_ngZone=m(j$1);_changeDetectorRef=m(Mb);_renderer=m(zn$1);_cleanupTransitionEnd;constructor(){let e=Cx(),n=m(ei,{optional:!0});this._isNoopAnimation=e===`di-disabled`,e===`reduced-motion`&&this._elementRef.nativeElement.classList.add(`mat-progress-bar-reduced-motion`),n&&(n.color&&(this.color=this._defaultColor=n.color),this.mode=n.mode||this.mode)}_isNoopAnimation;get color(){return this._color||this._defaultColor}set color(e){this._color=e}_color;_defaultColor=`primary`;get value(){return this._value}set value(e){this._value=Ua(e||0),this._changeDetectorRef.markForCheck()}_value=0;get bufferValue(){return this._bufferValue||0}set bufferValue(e){this._bufferValue=Ua(e||0),this._changeDetectorRef.markForCheck()}_bufferValue=0;animationEnd=new Oe;get mode(){return this._mode}set mode(e){this._mode=e,this._changeDetectorRef.markForCheck()}_mode=`determinate`;ngAfterViewInit(){this._ngZone.runOutsideAngular(()=>{this._cleanupTransitionEnd=this._renderer.listen(this._elementRef.nativeElement,`transitionend`,this._transitionendHandler)})}ngOnDestroy(){this._cleanupTransitionEnd?.()}_getPrimaryBarTransform(){return`scaleX(${this._isIndeterminate()?1:this.value/100})`}_getBufferBarFlexBasis(){return`${this.mode===`buffer`?this.bufferValue:100}%`}_isIndeterminate(){return this.mode===`indeterminate`||this.mode===`query`}_transitionendHandler=e=>{this.animationEnd.observers.length===0||!e.target||!e.target.classList.contains(`mdc-linear-progress__primary-bar`)||(this.mode===`determinate`||this.mode===`buffer`)&&this._ngZone.run(()=>this.animationEnd.next({value:this.value}))};static ɵfac=function(n){return new(n||a)};static ɵcmp=(function(){function e(n,s){n&1&&nn$1(0,`div`,2)}return et({type:a,selectors:[[`mat-progress-bar`]],hostAttrs:[`role`,`progressbar`,`aria-valuemin`,`0`,`aria-valuemax`,`100`,`tabindex`,`-1`,1,`mat-mdc-progress-bar`,`mdc-linear-progress`],hostVars:10,hostBindings:function(s,d){s&2&&(Jo(`aria-valuenow`,d._isIndeterminate()?null:d.value)(`mode`,d.mode),bd(`mat-`+d.color),rn$1(`_mat-animation-noopable`,d._isNoopAnimation)(`mdc-linear-progress--animation-ready`,!d._isNoopAnimation)(`mdc-linear-progress--indeterminate`,d._isIndeterminate()))},inputs:{color:`color`,value:[2,`value`,`value`,Sd],bufferValue:[2,`bufferValue`,`bufferValue`,Sd],mode:`mode`},outputs:{animationEnd:`animationEnd`},exportAs:[`matProgressBar`],decls:7,vars:5,consts:[[`aria-hidden`,`true`,1,`mdc-linear-progress__buffer`],[1,`mdc-linear-progress__buffer-bar`],[1,`mdc-linear-progress__buffer-dots`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__primary-bar`],[1,`mdc-linear-progress__bar-inner`],[`aria-hidden`,`true`,1,`mdc-linear-progress__bar`,`mdc-linear-progress__secondary-bar`]],template:function(s,d){s&1&&(en$1(0,`div`,0),nn$1(1,`div`,1),ei$1(2,e,1,0,`div`,2),tn$1(),en$1(3,`div`,3),nn$1(4,`span`,4),tn$1(),en$1(5,`div`,5),nn$1(6,`span`,4),tn$1()),s&2&&(qo(),tb(`flex-basis`,d._getBufferBarFlexBasis()),qo(),ti(d.mode===`buffer`?2:-1),qo(),tb(`transform`,d._getPrimaryBarTransform()))},styles:[`.mat-mdc-progress-bar {
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
`],encapsulation:2})})()}return a})();function Ua(a,t=0,e=100){return Math.max(t,Math.min(e,a))}var Za=(()=>{class a{static ɵfac=function(n){return new(n||a)};static ɵmod=Ie({type:a});static ɵinj=ge({imports:[Ya$1]})}return a})();var Wa={nova:`Nova`,existente:`Já lançada`,suspeita:`Confira`,ignorada:`Ignorada`};var Ja={vincular:`É a mesma`,inserir:`Criar`,ignorar:`Ignorar`};var Ya=`/api/importacoes`;var Gt=class a{http=m(Ay);previa(t,e,n){let s=this.envio(t,e);return n&&s.append(`competencia`,n),this.http.post(`${Ya}/previa/`,s)}importar(t,e,n,s){let d=this.envio(t,e);return d.append(`competencia`,n),d.append(`decisoes`,JSON.stringify(s)),this.http.post(`${Ya}/`,d)}envio(t,e){let n=new FormData;return n.append(`fonte`,String(t)),n.append(`arquivo`,e,e.name),n}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};var ai=(a,t)=>t.indice;var Ka=(a,t)=>t.id;function ni(a,t){a&1&&zg(0,`mat-progress-bar`,3)}function ii(a,t){if(a&1&&(jC(0),YC(1,`currency`)),a&2){let e=dC();yd(` · fatura `,QC(1,1,e.total_da_fatura),` `)}}function ri(a,t){if(a&1&&(ra(0,`li`),jC(1),YC(2,`lowercase`),md()),a&2){let e=t.$implicit,n=dC(2);bd(`importar__selo importar__selo--`+e),qo(),cb(` `,n.contagem().porClasse[e],` `,QC(2,4,n.classificacoes[e]),` `)}}function oi(a,t){if(a&1&&(ra(0,`small`,24),jC(1),YC(2,`currency`),YC(3,`competencia`),md()),a&2){let e=t;qo(),ub(` ↳ `,e.descricao,` `,e.parcela,` · `,QC(2,4,e.valor),` · `,QC(3,6,e.competencia),` `)}}function li(a,t){if(a&1&&(ra(0,`small`,25),jC(1),md()),a&2){let e=dC().$implicit;qo(),ab(e.motivo)}}function si(a,t){if(a&1&&(ra(0,`mat-option`,32),jC(1),md()),a&2){let e=t.$implicit,n=dC(4);$g(`value`,e),qo(),ab(n.rotulosDeDecisao[e])}}function di(a,t){if(a&1){let e=lC();ra(0,`mat-select`,31),Zg(`selectionChange`,function(s){kp(e);let d=dC().$implicit,f=dC(2);return Fp(f.decidir(d,s.value))}),nC(1,si,2,2,`mat-option`,32,tC),md()}if(a&2){let e=dC().$implicit,n=dC(2);$g(`value`,n.decisaoDe(e)),Jo(`aria-label`,`O que fazer com `+e.descricao),qo(),rC(e.decisoes)}}function ci(a,t){if(a&1&&(ra(0,`div`,21)(1,`span`,22),jC(2),YC(3,`date`),md(),ra(4,`span`,23)(5,`span`),jC(6),md(),ei$1(7,oi,4,8,`small`,24),ei$1(8,li,2,1,`small`,25),md(),ra(9,`span`,26),jC(10),md(),ra(11,`span`,27),jC(12),YC(13,`currency`),md(),ra(14,`span`,28)(15,`span`),jC(16),md()(),ra(17,`span`,29),ei$1(18,di,3,2,`mat-select`,30),md()()),a&2){let e,n=t.$implicit,s=dC(2);rn$1(`importar__linha--ignorada`,s.decisaoDe(n)===`ignorar`),qo(2),ab(XC(3,12,n.data,`dd/MM`)),qo(4),ab(n.descricao),qo(),ti((e=n.vinculo)?7:-1,e),qo(),ti(n.motivo&&n.classificacao!==`ignorada`?8:-1),qo(2),ab(n.parcela),qo(2),ab(QC(13,15,n.valor)),qo(3),bd(`importar__selo importar__selo--`+n.classificacao),qo(),yd(` `,s.classificacoes[n.classificacao],` `),qo(2),ti(n.decisoes.length>1?18:-1)}}function mi(a,t){a&1&&(ra(0,`p`,19),jC(1,`Nenhum lançamento na fatura.`),md())}function pi(a,t){if(a&1&&(ra(0,`li`),jC(1),YC(2,`currency`),md()),a&2){let e=t.$implicit;qo(),lb(``,e.descricao,` `,e.parcela,` · `,QC(2,3,e.valor))}}function ui(a,t){if(a&1&&(ra(0,`section`,20)(1,`h3`),jC(2),YC(3,`competencia`),md(),ra(4,`p`),jC(5,`Nada é apagado. Confira se foram antecipados ou cobrados em outro cartão.`),md(),ra(6,`ul`),nC(7,pi,3,5,`li`,null,Ka),md()()),a&2){let e=dC();qo(2),yd(`Previstos em `,QC(3,1,e.competencia),` que não vieram na fatura`),qo(5),rC(e.faltas)}}function _i(a,t){if(a&1){let e=lC();ra(0,`p`,10),jC(1),YC(2,`date`),md(),ra(3,`div`,11)(4,`mat-form-field`,12)(5,`mat-label`),jC(6,`Competência`),md(),ra(7,`input`,13),jw(),Zg(`change`,function(){kp(e);let s=dC();return Fp(s.trocarCompetencia())}),md(),ra(8,`mat-hint`),jC(9),YC(10,`competencia`),md()(),ra(11,`div`,14)(12,`mat-icon`),jC(13),md(),ra(14,`span`),jC(15),YC(16,`currency`),ei$1(17,ii,2,3),md()()(),ra(18,`ul`,15),nC(19,ri,3,6,`li`,16,tC),md(),ra(21,`div`,17),nC(22,ci,19,17,`div`,18,ai,!1,mi,2,0,`p`,19),md(),ei$1(25,ui,9,3,`section`,20)}if(a&2){let e=t,n=dC();qo(),lb(` `,e.banco,` · emitida em `,XC(2,13,e.emitida_em,`dd/MM/yyyy`),` · `,n.nomeDaFonte(),` `),qo(6),$g(`formControl`,n.competencia)(`readonly`,n.carregando()),Vw(),qo(2),yd(`Sugerida: `,QC(10,16,e.competencia_sugerida)),qo(2),rn$1(`importar__total--diverge`,!n.totalConfere()),qo(2),ab(n.totalConfere()?`check_circle`:`warning`),qo(2),yd(` Lido `,QC(16,18,e.total_lido),` `),qo(2),ti(e.total_da_fatura?17:-1),qo(2),rC(n.ordemDasClasses),qo(3),rC(e.linhas),qo(3),ti(e.faltas.length?25:-1)}}function bi(a,t){if(a&1&&(ra(0,`mat-option`,32),jC(1),md()),a&2){let e=t.$implicit;$g(`value`,e.id),qo(),ab(e.nome)}}function fi(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Escolha a fonte da fatura.`),md())}function gi(a,t){if(a&1){let e=lC();ra(0,`p`,33),jC(1,` Por enquanto, o PDF de extrato do app Bradesco Cartões. Nada é gravado antes de você revisar. `),md(),ra(2,`mat-form-field`)(3,`mat-label`),jC(4,`Fonte`),md(),ra(5,`mat-select`,34),jw(),nC(6,bi,2,2,`mat-option`,32,Ka),md(),ei$1(8,fi,2,0,`mat-error`),md(),ra(9,`div`,35)(10,`input`,36,0),Zg(`change`,function(s){kp(e);let d=dC();return Fp(d.escolherArquivo(s))}),md(),ra(12,`button`,37),Zg(`click`,function(){kp(e);let s=bC(11);return Fp(s.click())}),ra(13,`mat-icon`),jC(14,`attach_file`),md(),jC(15,` Escolher PDF `),md(),ra(16,`span`,38),jC(17),md()()}if(a&2){let e=dC();qo(5),$g(`formControl`,e.fonte),Vw(),qo(),rC(e.fontes()),qo(2),ti(e.fonte.hasError(`required`)?8:-1),qo(9),ab(e.arquivo()?.name??`Nenhum arquivo escolhido`)}}function hi(a,t){a&1&&(ra(0,`p`,4),jC(1),md()),a&2&&(qo(),ab(t))}function vi(a,t){if(a&1){let e=lC();ra(0,`button`,39),Zg(`click`,function(){kp(e);let s=dC();return Fp(s.voltar())}),ra(1,`mat-icon`),jC(2,`arrow_back`),md(),jC(3,` Voltar `),md()}if(a&2){let e=dC();$g(`disabled`,e.carregando())}}function yi(a,t){if(a&1){let e=lC();ra(0,`button`,40),Zg(`click`,function(){kp(e);let s=dC();return Fp(s.importar())}),jC(1),md()}if(a&2){let e=dC();$g(`disabled`,e.carregando()||e.competencia.invalid),qo(),cb(` Importar (`,e.contagem().porDecisao.inserir,` novas, `,e.contagem().porDecisao.vincular,` confirmadas) `)}}function Ci(a,t){if(a&1){let e=lC();ra(0,`button`,40),Zg(`click`,function(){kp(e);let s=dC();return Fp(s.lerFatura())}),jC(1,` Ler fatura `),md()}if(a&2){let e=dC();$g(`disabled`,e.carregando())}}var Xt=class a{importacoes=m(Gt);dialogRef=m(Ze);classificacoes=Wa;ordemDasClasses=[`nova`,`existente`,`suspeita`,`ignorada`];rotulosDeDecisao=Ja;fontes=St([]);fonte=new Oe$1(null,Ne.required);arquivo=St(null);competencia=new Oe$1(``,{nonNullable:!0,validators:[Ne.required,j$2]});previa=St(null);decisoes=St({});carregando=St(!1);erro=St(null);contagem=tS(()=>{let t=this.previa(),e={nova:0,existente:0,suspeita:0,ignorada:0},n={vincular:0,inserir:0,ignorar:0};for(let s of t?.linhas??[])e[s.classificacao]++,n[this.decisaoDe(s)]++;return{porClasse:e,porDecisao:n}});totalConfere=tS(()=>{let t=this.previa();return!t?.total_da_fatura||t.total_da_fatura===t.total_lido});constructor(){m(x).listar().subscribe(t=>this.fontes.set(t.filter(e=>e.ativa)))}nomeDaFonte(){return this.fontes().find(t=>t.id===this.fonte.value)?.nome??``}escolherArquivo(t){let e=t.target;this.arquivo.set(e.files?.[0]??null),this.erro.set(null)}lerFatura(){if(this.fonte.invalid||!this.arquivo()){this.fonte.markAsTouched(),this.erro.set(this.arquivo()?null:`Escolha o PDF da fatura.`);return}this.carregarPrevia()}trocarCompetencia(){this.competencia.valid&&this.competencia.value!==this.previa()?.competencia&&this.carregarPrevia(this.competencia.value)}voltar(){this.previa.set(null),this.decisoes.set({}),this.erro.set(null)}decisaoDe(t){return this.decisoes()[t.indice]??t.decisao}decidir(t,e){this.decisoes.update(n=>{let s=R({},n);return e===t.decisao?delete s[t.indice]:s[t.indice]=e,s})}importar(){let t=this.previa();!t||this.carregando()||this.executar(this.importacoes.importar(this.fonte.value,this.arquivo(),t.competencia,this.decisoes()),e=>this.dialogRef.close(e.competencia))}carregarPrevia(t){this.executar(this.importacoes.previa(this.fonte.value,this.arquivo(),t),e=>{this.previa.set(e),this.decisoes.set({}),this.competencia.setValue(e.competencia)})}executar(t,e){this.carregando.set(!0),this.erro.set(null),t.subscribe({next:n=>{this.carregando.set(!1),e(n)},error:n=>{this.carregando.set(!1),this.erro.set(ys(n,`Não foi possível ler a fatura.`))}})}static ɵfac=function(e){return new(e||a)};static ɵcmp=et({type:a,selectors:[[`app-importar-fatura`]],decls:14,vars:5,consts:[[`seletor`,``],[`mat-dialog-title`,``],[1,`importar`],[`mode`,`indeterminate`,1,`importar__progresso`],[`role`,`alert`,1,`importar__erro`],[1,`importar__acoes`],[`mat-button`,``,`type`,`button`,3,`disabled`],[1,`importar__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`button`,3,`disabled`],[1,`importar__origem`],[1,`importar__topo`],[1,`importar__competencia`],[`matInput`,``,`type`,`month`,3,`change`,`formControl`,`readonly`],[1,`importar__total`],[`aria-label`,`Resumo da prévia`,1,`importar__contagem`],[3,`class`],[`role`,`table`,`aria-label`,`Linhas da fatura`,1,`importar__linhas`],[`role`,`row`,1,`importar__linha`,3,`importar__linha--ignorada`],[1,`importar__vazio`],[1,`importar__faltas`],[`role`,`row`,1,`importar__linha`],[`role`,`cell`,1,`importar__data`],[`role`,`cell`,1,`importar__descricao`],[1,`importar__vinculo`],[1,`importar__motivo`],[`role`,`cell`,1,`importar__parcela`],[`role`,`cell`,1,`importar__valor`],[`role`,`cell`],[`role`,`cell`,1,`importar__decisao`],[`panelWidth`,``,3,`value`],[`panelWidth`,``,3,`selectionChange`,`value`],[3,`value`],[1,`importar__explicacao`],[3,`formControl`],[1,`importar__arquivo`],[`type`,`file`,`accept`,`application/pdf,.pdf`,`hidden`,``,3,`change`],[`mat-stroked-button`,``,`type`,`button`,3,`click`],[1,`importar__nome-arquivo`],[`mat-button`,``,`type`,`button`,3,`click`,`disabled`],[`mat-flat-button`,``,`type`,`button`,3,`click`,`disabled`]],template:function(e,n){if(e&1&&(ra(0,`h2`,1),jC(1,`Importar fatura`),md(),ra(2,`mat-dialog-content`,2),ei$1(3,ni,1,0,`mat-progress-bar`,3),ei$1(4,_i,26,20)(5,gi,18,3),ei$1(6,hi,2,1,`p`,4),md(),ra(7,`mat-dialog-actions`,5),ei$1(8,vi,4,1,`button`,6),zg(9,`span`,7),ra(10,`button`,8),jC(11,`Cancelar`),md(),ei$1(12,yi,2,3,`button`,9)(13,Ci,2,1,`button`,9),md()),e&2){let s,d;qo(3),ti(n.carregando()?3:-1),qo(),ti((s=n.previa())?4:5,s),qo(2),ti((d=n.erro())?6:-1,d),qo(2),ti(n.previa()?8:-1),qo(4),ti(n.previa()?12:13)}},dependencies:[kr,hn$2,Vr,Zi$1,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot$1,Xn$1,At$1,Vt$1,tr,Mt,wt,Ga$1,Ha$1,Za,Qa,ls,ss,kt,p,dT,uT,aT],styles:[`.importar[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:12px;min-width:min(400px,80vw)}.importar__progresso[_ngcontent-%COMP%]{position:sticky;top:0}.importar__explicacao[_ngcontent-%COMP%], .importar__origem[_ngcontent-%COMP%], .importar__vazio[_ngcontent-%COMP%], .importar__faltas[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);margin:0}.importar__arquivo[_ngcontent-%COMP%]{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.importar__nome-arquivo[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);overflow-wrap:anywhere}.importar__topo[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;gap:16px}.importar__competencia[_ngcontent-%COMP%]{width:12rem}.importar__total[_ngcontent-%COMP%]{display:flex;align-items:center;gap:6px;color:var(--%NS%mat-sys-on-surface-variant)}.importar__total[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-primary)}.importar__total--diverge[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], .importar__total--diverge[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.importar__contagem[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;list-style:none;margin:0;padding:0}.importar__selo[_ngcontent-%COMP%]{display:inline-block;padding:2px 8px;border-radius:999px;font:var(--%NS%mat-sys-label-medium);white-space:nowrap;background:var(--%NS%mat-sys-surface-container-highest);color:var(--%NS%mat-sys-on-surface)}.importar__selo--nova[_ngcontent-%COMP%]{background:var(--%NS%mat-sys-primary-container);color:var(--%NS%mat-sys-on-primary-container)}.importar__selo--suspeita[_ngcontent-%COMP%]{background:var(--%NS%mat-sys-tertiary-container);color:var(--%NS%mat-sys-on-tertiary-container)}.importar__selo--ignorada[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.importar__linhas[_ngcontent-%COMP%]{display:flex;flex-direction:column}.importar__linha[_ngcontent-%COMP%]{display:grid;grid-template-columns:3rem minmax(0,1fr) 3rem 6.5rem 6.5rem 8rem;gap:8px;align-items:center;padding:6px 0;border-bottom:1px solid var(--%NS%mat-sys-outline-variant)}.importar__linha--ignorada[_ngcontent-%COMP%]{opacity:.55}.importar__data[_ngcontent-%COMP%], .importar__parcela[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);font-variant-numeric:tabular-nums}.importar__descricao[_ngcontent-%COMP%]{display:flex;flex-direction:column;min-width:0}.importar__descricao[_ngcontent-%COMP%] > span[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.importar__vinculo[_ngcontent-%COMP%], .importar__motivo[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.importar__valor[_ngcontent-%COMP%]{text-align:right;font-variant-numeric:tabular-nums}.importar__faltas[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-small);margin:8px 0 4px}.importar__faltas[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{margin:4px 0 0}.importar__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.importar__acoes[_ngcontent-%COMP%]{display:flex}.importar__espaco[_ngcontent-%COMP%]{flex:1}@media(max-width:640px){.importar__linha[_ngcontent-%COMP%]{grid-template-columns:3rem minmax(0,1fr) auto}.importar__descricao[_ngcontent-%COMP%]{grid-column:2/-1}.importar__parcela[_ngcontent-%COMP%]:empty{display:none}}`]})};var aa=`/api/avulsos`;var jt=class a{http=m(Ay);criar(t){return this.http.post(`${aa}/`,t)}atualizar(t,e){return this.http.patch(`${aa}/${t}/`,e)}excluir(t){return this.http.delete(`${aa}/${t}/`)}static ɵfac=function(e){return new(e||a)};static ɵprov=O({token:a,factory:a.ɵfac,providedIn:`root`})};function xi(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Informe a descrição.`),md())}function wi(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Valor inválido (ex.: 1.234,56).`),md())}function ki(a,t){a&1&&(ra(0,`p`,6),jC(1),md()),a&2&&(qo(),ab(t))}function Si(a,t){if(a&1){let e=lC();ra(0,`button`,12),Zg(`click`,function(){kp(e);let s=dC();return Fp(s.excluir())}),ra(1,`mat-icon`),jC(2,`delete`),md(),jC(3,` Excluir `),md()}if(a&2){let e=dC();$g(`disabled`,e.salvando())}}var ot=class a{service=m(jt);dialogRef=m(Ze);dados=m(jt$1);salvando=St(!1);erro=St(null);form=m(Tr).group({descricao:[this.dados.avulso?.descricao??``,[Ne.required,Ne.maxLength(200)]],valor:[this.dados.avulso?A$2(this.dados.avulso.valor):``,[Ne.required,N]]});salvar(){if(this.form.invalid||this.salvando()){this.form.markAllAsTouched();return}let t=this.form.controls.descricao.value.trim(),e=b(this.form.controls.valor.value),{avulso:n,grupo:s,competencia:d}=this.dados;this.executar(n?this.service.atualizar(n.id,{descricao:t,valor:e}):this.service.criar({grupo:s,competencia:d,descricao:t,valor:e}))}excluir(){this.dados.avulso&&this.executar(this.service.excluir(this.dados.avulso.id))}executar(t){this.salvando.set(!0),this.erro.set(null),t.subscribe({next:()=>this.dialogRef.close(!0),error:e=>{this.salvando.set(!1),this.erro.set(ys(e))}})}static ɵfac=function(e){return new(e||a)};static ɵcmp=et({type:a,selectors:[[`app-form-avulso`]],decls:25,vars:12,consts:[[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`form-avulso`],[1,`form-avulso__explicacao`],[`matInput`,``,`formControlName`,`descricao`,3,`placeholder`],[`matInput`,``,`formControlName`,`valor`,`inputmode`,`decimal`,`placeholder`,`0,00`],[`role`,`alert`,1,`form-avulso__erro`],[1,`form-avulso__acoes`],[`mat-button`,``,`type`,`button`,1,`form-avulso__excluir`,3,`disabled`],[1,`form-avulso__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`mat-button`,``,`type`,`button`,1,`form-avulso__excluir`,3,`click`,`disabled`]],template:function(e,n){if(e&1&&(ra(0,`h2`,0),jC(1),YC(2,`competencia`),md(),ra(3,`form`,1),Zg(`ngSubmit`,function(){return n.salvar()}),ra(4,`mat-dialog-content`,2)(5,`p`,3),jC(6,` Só neste mês. Para algo que se repete, cadastre um recorrente. `),md(),ra(7,`mat-form-field`)(8,`mat-label`),jC(9,`Descrição`),md(),ra(10,`input`,4),jw(),md(),ei$1(11,xi,2,0,`mat-error`),md(),ra(12,`mat-form-field`)(13,`mat-label`),jC(14,`Valor (R$)`),md(),ra(15,`input`,5),jw(),md(),ei$1(16,wi,2,0,`mat-error`),md(),ei$1(17,ki,2,1,`p`,6),md(),ra(18,`mat-dialog-actions`,7),ei$1(19,Si,4,1,`button`,8),zg(20,`span`,9),ra(21,`button`,10),jC(22,`Cancelar`),md(),ra(23,`button`,11),jC(24,`Salvar`),md()()()),e&2){let s;qo(),lb(` `,n.dados.avulso?`Editar`:`Novo`,` `,n.dados.grupo===`rendimento`?`rendimento`:`gasto fixo`,` de `,QC(2,10,n.dados.competencia),`
`),qo(2),$g(`formGroup`,n.form),qo(7),$g(`placeholder`,n.dados.grupo===`rendimento`?`Ex.: Icloud (Natalia)`:`Ex.: Docs moto`),Vw(),qo(),ti(n.form.controls.descricao.hasError(`required`)?11:-1),qo(4),Vw(),qo(),ti(n.form.controls.valor.invalid?16:-1),qo(),ti((s=n.erro())?17:-1,s),qo(2),ti(n.dados.avulso?19:-1),qo(4),$g(`disabled`,n.salvando())}},dependencies:[kr,Or,hn$2,Vr,Ir,Et,Qi$1,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot$1,Xn$1,At$1,tr,Mt,wt,Ga$1,Ha$1,p],styles:[`.form-avulso[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(400px,80vw)}.form-avulso__explicacao[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.form-avulso__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.form-avulso__acoes[_ngcontent-%COMP%]{display:flex}.form-avulso__espaco[_ngcontent-%COMP%]{flex:1}.form-avulso__excluir[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};function Mi(a,t){a&1&&jC(0,` Valor estimado pelo último informado. Informe o valor real da conta deste mês. `)}function Ni(a,t){a&1&&jC(0,` Valor real informado para este mês. `)}function Ei(a,t){if(a&1&&ei$1(0,Mi,1,0)(1,Ni,1,0),a&2){let e=dC();ti(e.dados.item.pendente?0:1)}}function Ii(a,t){a&1&&jC(0,` Muda o valor só neste mês. Para mudar daqui em diante, faça um reajuste no recorrente. `)}function Fi(a,t){a&1&&(ra(0,`mat-error`),jC(1,`Valor inválido (ex.: 1.234,56).`),md())}function Di(a,t){a&1&&(ra(0,`p`,5),jC(1),md()),a&2&&(qo(),ab(t))}function Pi(a,t){if(a&1){let e=lC();ra(0,`button`,11),Zg(`click`,function(){kp(e);let s=dC();return Fp(s.desfazer())}),jC(1),md()}if(a&2){let e=dC();$g(`disabled`,e.salvando()),qo(),yd(` `,e.dados.item.variavel?`Voltar à estimativa`:`Voltar ao valor previsto`,` `)}}var Ht=class a{service=m(m$1);dialogRef=m(Ze);dados=m(jt$1);salvando=St(!1);erro=St(null);form=m(Tr).group({valor:[A$2(this.dados.item.valor),[Ne.required,N]]});temValorDoMes=this.dados.item.ajustado||this.dados.item.variavel&&!this.dados.item.pendente;salvar(){if(this.form.invalid){this.form.markAllAsTouched();return}let{item:t,competencia:e}=this.dados;this.executar(this.service.definirNoMes(t.id,e,b(this.form.controls.valor.value)))}desfazer(){let{item:t,competencia:e}=this.dados;this.executar(this.service.limparNoMes(t.id,e))}executar(t){this.salvando.set(!0),this.erro.set(null),t.subscribe({next:()=>this.dialogRef.close(!0),error:e=>{this.salvando.set(!1),this.erro.set(ys(e))}})}static ɵfac=function(e){return new(e||a)};static ɵcmp=et({type:a,selectors:[[`app-valor-do-mes`]],decls:21,vars:11,consts:[[`mat-dialog-title`,``],[3,`ngSubmit`,`formGroup`],[1,`valor-do-mes`],[1,`valor-do-mes__explicacao`],[`matInput`,``,`formControlName`,`valor`,`inputmode`,`decimal`,`cdkFocusInitial`,``],[`role`,`alert`,1,`valor-do-mes__erro`],[1,`valor-do-mes__acoes`],[`mat-button`,``,`type`,`button`,3,`disabled`],[1,`valor-do-mes__espaco`],[`mat-button`,``,`type`,`button`,`mat-dialog-close`,``],[`mat-flat-button`,``,`type`,`submit`,3,`disabled`],[`mat-button`,``,`type`,`button`,3,`click`,`disabled`]],template:function(e,n){if(e&1&&(ra(0,`h2`,0),jC(1),YC(2,`competencia`),md(),ra(3,`form`,1),Zg(`ngSubmit`,function(){return n.salvar()}),ra(4,`mat-dialog-content`,2)(5,`p`,3),ei$1(6,Ei,2,1)(7,Ii,1,0),md(),ra(8,`mat-form-field`)(9,`mat-label`),jC(10),md(),ra(11,`input`,4),jw(),md(),ei$1(12,Fi,2,0,`mat-error`),md(),ei$1(13,Di,2,1,`p`,5),md(),ra(14,`mat-dialog-actions`,6),ei$1(15,Pi,2,2,`button`,7),zg(16,`span`,8),ra(17,`button`,9),jC(18,`Cancelar`),md(),ra(19,`button`,10),jC(20,`Salvar`),md()()()),e&2){let s;qo(),cb(``,n.dados.item.descricao,` · `,QC(2,9,n.dados.competencia)),qo(2),$g(`formGroup`,n.form),qo(3),ti(n.dados.item.variavel?6:7),qo(4),ab(n.dados.item.variavel?`Valor real (R$)`:`Valor neste mês (R$)`),qo(),Vw(),qo(),ti(n.form.controls.valor.invalid?12:-1),qo(),ti((s=n.erro())?13:-1,s),qo(2),ti(n.temValorDoMes?15:-1),qo(4),$g(`disabled`,n.salvando())}},dependencies:[kr,Or,hn$2,Vr,Ir,Et,Qi$1,j3,L3,mn$1,sn$1,cn$1,hn$1,dn$1,Ot$1,Xn$1,At$1,tr,Ga$1,Ha$1,p],styles:[`.valor-do-mes[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;min-width:min(400px,80vw)}.valor-do-mes__explicacao[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.valor-do-mes__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.valor-do-mes__acoes[_ngcontent-%COMP%]{display:flex}.valor-do-mes__espaco[_ngcontent-%COMP%]{flex:1}`]})};var Ai=(a,t)=>t.valor;var Ti=(a,t)=>t.fonte.id;var Oi=(a,t)=>t.tipo+t.id;var Vi=(a,t)=>t.id;function zi(a,t){if(a&1&&(ra(0,`mat-option`,4),jC(1),YC(2,`competencia`),md()),a&2){let e=t.$implicit;$g(`value`,e),qo(),ab(QC(2,2,e))}}function Ri(a,t){a&1&&(ra(0,`p`,9),jC(1),md()),a&2&&(qo(),ab(t))}function Bi(a,t){a&1&&jC(0,` estimado `)}function qi(a,t){a&1&&jC(0,` ajustado `)}function Li(a,t){a&1&&jC(0,` família `)}function $i(a,t){a&1&&jC(0,` só este mês `)}function Gi(a,t){if(a&1){let e=lC();ra(0,`button`,19),Zg(`click`,function(){let s=kp(e).$implicit,d=dC().$implicit,f=dC(2);return Fp(f.abrirItem(s,d.valor))}),ra(1,`span`,20),jC(2),md(),ra(3,`span`,21),ei$1(4,Bi,1,0)(5,qi,1,0)(6,Li,1,0)(7,$i,1,0),md(),ra(8,`span`,22),jC(9),YC(10,`currency`),md()()}if(a&2){let e=t.$implicit;qo(2),ab(e.descricao),qo(2),ti(e.pendente?4:e.ajustado?5:e.familia?6:e.tipo===`avulso`?7:-1),qo(4),rn$1(`mes__valor--estimado`,e.pendente),qo(),ab(QC(10,5,e.valor))}}function Xi(a,t){a&1&&(ra(0,`p`,14),jC(1,` Nada neste mês. `),ra(2,`a`,23),jC(3,`Cadastre os recorrentes`),md(),jC(4,`. `),md())}function ji(a,t){if(a&1){let e=lC();ra(0,`mat-card`,13)(1,`mat-card-header`,15)(2,`mat-card-title`),jC(3),md(),ra(4,`mat-card-subtitle`),jC(5),YC(6,`currency`),md(),ra(7,`button`,16),Zg(`click`,function(){let s=kp(e).$implicit,d=dC(2);return Fp(d.novoAvulso(s.valor))}),ra(8,`mat-icon`),jC(9,`add`),md()()(),ra(10,`mat-card-content`,17),nC(11,Gi,11,7,`button`,18,Oi,!1,Xi,5,0,`p`,14),md()()}if(a&2){let e=t.$implicit;qo(3),ab(e.titulo),qo(2),ab(QC(6,5,e.total)),qo(2),$g(`title`,`Adicionar só neste mês`),Jo(`aria-label`,`Adicionar `+e.titulo.toLowerCase()+` só deste mês`),qo(4),rC(e.itens)}}function Hi(a,t){if(a&1){let e=lC();ra(0,`button`,16),Zg(`click`,function(){kp(e);let s=dC().$implicit,d=dC(2);return Fp(d.novaCompra(s.fonte.id))}),ra(1,`mat-icon`),jC(2,`add`),md()()}if(a&2){let e=dC().$implicit;$g(`title`,`Nova compra em `+e.fonte.nome),Jo(`aria-label`,`Nova compra em `+e.fonte.nome)}}function Ui(a,t){if(a&1){let e=lC();ra(0,`button`,19),Zg(`click`,function(){let s=kp(e).$implicit,d=dC(3);return Fp(d.abrirLancamento(s))}),ra(1,`span`,20),jC(2),md(),ra(3,`span`,21),jC(4),md(),ra(5,`span`,22),jC(6),YC(7,`currency`),md()()}if(a&2){let e=t.$implicit;rn$1(`mes__lancamento--importado`,e.origem===`importacao`),qo(2),ab(e.descricao),qo(2),ab(e.familia?`família`:e.parcela),qo(2),ab(QC(7,5,e.valor))}}function Qi(a,t){a&1&&(ra(0,`p`,14),jC(1,`Nenhum lançamento.`),md())}function Zi(a,t){if(a&1&&(ra(0,`mat-card`,13)(1,`mat-card-header`,15)(2,`mat-card-title`),jC(3),md(),ra(4,`mat-card-subtitle`),jC(5),YC(6,`currency`),md(),ei$1(7,Hi,3,2,`button`,24),md(),ra(8,`mat-card-content`,17),nC(9,Ui,8,7,`button`,25,Vi,!1,Qi,2,0,`p`,14),md()()),a&2){let e=t.$implicit;qo(3),ab(e.fonte.nome),qo(2),ab(QC(6,4,e.total)),qo(2),ti(e.fonte.ativa?7:-1),qo(2),rC(e.lancamentos)}}function Wi(a,t){a&1&&(ra(0,`p`,14),jC(1,` Nenhuma fonte cadastrada. `),ra(2,`a`,26),jC(3,`Cadastre os cartões e o dinheiro`),md(),jC(4,` para lançar compras. `),md())}function Ji(a,t){if(a&1&&(ra(0,`section`,10)(1,`div`)(2,`span`),jC(3,`Rendimentos`),md(),ra(4,`strong`),jC(5),YC(6,`currency`),md()(),ra(7,`div`)(8,`span`),jC(9,`Fixas`),md(),ra(10,`strong`),jC(11),YC(12,`currency`),md()(),ra(13,`div`)(14,`span`),jC(15,`Dinheiro e contas`),md(),ra(16,`strong`),jC(17),YC(18,`currency`),md()(),ra(19,`div`)(20,`span`),jC(21,`Cartões`),md(),ra(22,`strong`),jC(23),YC(24,`currency`),md()(),ra(25,`div`,11)(26,`span`),jC(27,`Saldo`),md(),ra(28,`strong`),jC(29),YC(30,`currency`),md()()(),ra(31,`section`,12),nC(32,ji,14,7,`mat-card`,13,Ai),nC(34,Zi,12,6,`mat-card`,13,Ti),md(),ei$1(36,Wi,5,0,`p`,14)),a&2){let e=t,n=dC();qo(5),ab(QC(6,8,e.resumo.total_rendimentos)),qo(6),ab(QC(12,10,e.resumo.total_fixas)),qo(6),ab(QC(18,12,e.resumo.total_dinheiro_e_contas)),qo(6),ab(QC(24,14,e.resumo.total_cartoes)),qo(2),rn$1(`mes__saldo--negativo`,n.negativo(e.resumo.saldo)),qo(4),ab(QC(30,16,e.resumo.saldo)),qo(3),rC(n.grupos()),qo(2),rC(e.fontes),qo(2),ti(e.fontes.length?-1:36)}}var en=class a{meses=m(Dt);dialog=m(Ht$1);router=m(ue);route=m(G);recarregar$=new fn$1(void 0);competencia=H(this.route.paramMap.pipe(se(t=>t.get(`competencia`)??``)),{requireSync:!0});visao=St(null);horizonte=St([]);erro=St(null);anterior=tS(()=>this.navegavel(-1));seguinte=tS(()=>this.navegavel(1));opcoes=tS(()=>{let t=this.horizonte().map(n=>n.competencia),e=this.competencia();return t.includes(e)||!e?t:[...t,e].sort()});grupos=tS(()=>{let t=this.visao();return t?[{valor:`rendimento`,titulo:`Rendimentos`,itens:t.rendimentos,total:t.resumo.total_rendimentos},{valor:`fixa`,titulo:`Fixas`,itens:t.fixas,total:t.resumo.total_fixas}]:[]});constructor(){this.recarregar$.pipe(lc(()=>this.meses.horizonte().pipe(cc(()=>Kr([])))),A$1()).subscribe(t=>this.horizonte.set(t)),ac([this.route.paramMap,this.recarregar$]).pipe(se(([t])=>t.get(`competencia`)??``),zi$1(()=>this.erro.set(null)),lc(t=>this.meses.visao(t).pipe(cc(e=>(this.erro.set(ys(e,`Não foi possível carregar o mês.`)),Kr(null))))),A$1()).subscribe(t=>this.visao.set(t))}irPara(t){this.router.navigate([`/meses`,t])}novaCompra(t=null){this.abrirCompra(null,t)}importarFatura(){this.dialog.open(Xt,{width:`min(960px, 95vw)`,maxWidth:`95vw`,autoFocus:`first-tabbable`}).afterClosed().pipe(st(Boolean)).subscribe(t=>{this.irPara(t),this.recarregar$.next()})}abrirLancamento(t){t.compra!==null?this.abrirCompra(t.compra):t.familia!==null&&this.abrirFamilia(t.familia)}novoAvulso(t){this.aoFechar(this.dialog.open(ot,{data:{grupo:t,competencia:this.competencia(),avulso:null}}))}abrirItem(t,e){if(t.familia){this.abrirFamilia(t.familia);return}let n=this.competencia();this.aoFechar(t.tipo===`recorrente`?this.dialog.open(Ht,{data:{item:t,competencia:n}}):this.dialog.open(ot,{data:{grupo:e,competencia:n,avulso:t}}))}negativo(t){return t.startsWith(`-`)}abrirCompra(t,e=null){this.aoFechar(this.dialog.open(qt,{data:{compraId:t,fonteId:e},autoFocus:e===null?`first-tabbable`:`.form-compra__descricao`}))}abrirFamilia(t){this.aoFechar(this.dialog.open($t,{data:{familiaId:t}}))}aoFechar(t){t.afterClosed().pipe(st(Boolean)).subscribe(()=>this.recarregar$.next())}navegavel(t){try{return u(this.competencia(),t)}catch{return null}}static ɵfac=function(e){return new(e||a)};static ɵcmp=et({type:a,selectors:[[`app-visao-mensal`]],decls:22,vars:5,consts:[[1,`mes__cabecalho`],[1,`mes__navegacao`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Mês anterior`,3,`click`,`disabled`],[`aria-label`,`Escolher mês`,1,`mes__seletor`,3,`selectionChange`,`value`],[3,`value`],[`mat-icon-button`,``,`type`,`button`,`aria-label`,`Mês seguinte`,3,`click`,`disabled`],[1,`mes__acoes`],[`mat-stroked-button`,``,`type`,`button`,1,`mes__importar`,3,`click`],[`mat-flat-button`,``,`type`,`button`,1,`mes__nova-compra`,3,`click`],[`role`,`alert`,1,`mes__erro`],[`aria-label`,`Resumo do mês`,1,`mes__resumo`],[1,`mes__saldo`],[1,`mes__blocos`],[`appearance`,`outlined`,1,`mes__bloco`],[1,`mes__vazio`],[1,`mes__bloco-cabecalho`],[`mat-icon-button`,``,`type`,`button`,1,`mes__adicionar`,3,`click`,`title`],[1,`mes__bloco-conteudo`],[`type`,`button`,1,`mes__lancamento`],[`type`,`button`,1,`mes__lancamento`,3,`click`],[1,`mes__descricao`],[1,`mes__parcela`],[1,`mes__valor`],[`routerLink`,`/recorrentes`],[`mat-icon-button`,``,`type`,`button`,1,`mes__adicionar`,3,`title`],[`type`,`button`,1,`mes__lancamento`,3,`mes__lancamento--importado`],[`routerLink`,`/fontes`]],template:function(e,n){if(e&1&&(ra(0,`header`,0)(1,`div`,1)(2,`button`,2),Zg(`click`,function(){return n.irPara(n.anterior())}),ra(3,`mat-icon`),jC(4,`chevron_left`),md()(),ra(5,`mat-select`,3),Zg(`selectionChange`,function(d){return n.irPara(d.value)}),nC(6,zi,3,4,`mat-option`,4,tC),md(),ra(8,`button`,5),Zg(`click`,function(){return n.irPara(n.seguinte())}),ra(9,`mat-icon`),jC(10,`chevron_right`),md()()(),ra(11,`div`,6)(12,`button`,7),Zg(`click`,function(){return n.importarFatura()}),ra(13,`mat-icon`),jC(14,`upload_file`),md(),jC(15,` Importar fatura `),md(),ra(16,`button`,8),Zg(`click`,function(){return n.novaCompra()}),ra(17,`mat-icon`),jC(18,`add`),md(),jC(19,` Nova compra `),md()()(),ei$1(20,Ri,2,1,`p`,9),ei$1(21,Ji,37,18)),e&2){let s,d;qo(2),$g(`disabled`,!n.anterior()),qo(3),$g(`value`,n.competencia()),qo(),rC(n.opcoes()),qo(2),$g(`disabled`,!n.seguinte()),qo(12),ti((s=n.erro())?20:-1,s),qo(),ti((d=n.visao())?21:-1,d)}},dependencies:[Nt,j3,L3,Rx,j,_,k,T,z,A,Mt,wt,ls,ss,kt,dT,p],styles:[`[_nghost-%COMP%]{display:flex;flex-direction:column;height:100%}.mes__cabecalho[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}.mes__acoes[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px}.mes__navegacao[_ngcontent-%COMP%]{display:flex;align-items:center;gap:4px}.mes__seletor[_ngcontent-%COMP%]{width:14rem;font:var(--%NS%mat-sys-title-large)}.mes__resumo[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:24px;padding:12px 16px;margin-bottom:16px;border-radius:12px;background:var(--%NS%mat-sys-surface-container)}.mes__resumo[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{display:flex;flex-direction:column}.mes__resumo[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-label-medium);color:var(--%NS%mat-sys-on-surface-variant)}.mes__resumo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font:var(--%NS%mat-sys-title-medium)}.mes__saldo--negativo[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}.mes__blocos[_ngcontent-%COMP%]{flex:1;min-height:20rem;display:flex;gap:16px;align-items:stretch;overflow-x:auto;overflow-y:hidden;padding-bottom:8px;scroll-snap-type:x proximity}.mes__bloco[_ngcontent-%COMP%]{flex:0 0 min(320px,85vw);max-height:100%;display:flex;flex-direction:column;scroll-snap-align:start}.mes__bloco-conteudo[_ngcontent-%COMP%]{flex:1;min-height:0;overflow-y:auto}.mes__lancamento[_ngcontent-%COMP%]{all:unset;box-sizing:border-box;width:100%;display:grid;grid-template-columns:1fr auto auto;gap:8px;padding:6px 4px;border-bottom:1px solid var(--%NS%mat-sys-outline-variant);cursor:pointer}.mes__lancamento[_ngcontent-%COMP%]:hover{background:var(--%NS%mat-sys-surface-container-high)}.mes__lancamento[_ngcontent-%COMP%]:focus-visible{outline:2px solid var(--%NS%mat-sys-primary)}.mes__lancamento--importado[_ngcontent-%COMP%]   .mes__descricao[_ngcontent-%COMP%]{background:var(--%NS%mat-sys-tertiary-container);border-radius:4px;padding:0 4px}.mes__descricao[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.mes__parcela[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant);font:var(--%NS%mat-sys-body-small);align-self:center}.mes__valor[_ngcontent-%COMP%]{text-align:right;font-variant-numeric:tabular-nums}.mes__bloco-cabecalho[_ngcontent-%COMP%]{position:relative}.mes__adicionar[_ngcontent-%COMP%]{position:absolute;top:4px;right:4px}.mes__valor--estimado[_ngcontent-%COMP%]{font-style:italic;color:var(--%NS%mat-sys-on-surface-variant)}.mes__vazio[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-on-surface-variant)}.mes__erro[_ngcontent-%COMP%]{color:var(--%NS%mat-sys-error)}`]})};export{en as VisaoMensalComponent};