import{aM as Re,aN as Ne,q as _e,s as j,a as V,L as $,ak as ue,e as W,aK as q,aO as me,aP as Ke,aQ as xe,aR as re,aS as ie,aT as Se,p as A,U as F,aU as H,ao as ye,aV as pe,aq as D,aW as Oe,aX as ge,aY as Ve,aZ as Qe,am as oe,ar as De,a_ as ke,a$ as Ze,W as U,a3 as Je,$ as et,b0 as He,S as tt,au as nt,as as ot,X as at,a8 as rt,v as it,C as st,D as lt,x as ct,a0 as ut,b1 as ft,y as vt,b2 as dt,Q as mt,R as yt,ap as gt,F as ht,M as wt,A as bt,B as Et,b3 as xt}from"./index-BCXkcNoo.js";import{a as Q,b as St,s as fe,d as pt,g as Ie,n as $e,B as se,c as Pe}from"./forwardRefs-BpjxVdNq.js";import{M as Ot,m as kt}from"./VImg-XuFL4q6t.js";const J=new WeakMap;function Pt(e,n){Object.keys(n).forEach(t=>{if(Re(t)){const o=Ne(t),a=J.get(e);if(n[t]==null)a==null||a.forEach(i=>{const[l,r]=i;l===o&&(e.removeEventListener(o,r),a.delete(i))});else if(!a||![...a].some(i=>i[0]===o&&i[1]===n[t])){e.addEventListener(o,n[t]);const i=a||new Set;i.add([o,n[t]]),J.has(e)||J.set(e,i)}}else n[t]==null?e.removeAttribute(t):e.setAttribute(t,n[t])})}function At(e,n){Object.keys(n).forEach(t=>{if(Re(t)){const o=Ne(t),a=J.get(e);a==null||a.forEach(i=>{const[l,r]=i;l===o&&(e.removeEventListener(o,r),a.delete(i))})}else e.removeAttribute(t)})}function We(e){if(typeof e.getRootNode!="function"){for(;e.parentNode;)e=e.parentNode;return e!==document?null:document}const n=e.getRootNode();return n!==document&&n.getRootNode({composed:!0})!==document?null:n}function Ct(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;for(;e;){if(n?Tt(e):he(e))return e;e=e.parentElement}return document.scrollingElement}function te(e,n){const t=[];if(n&&e&&!n.contains(e))return t;for(;e&&(he(e)&&t.push(e),e!==n);)e=e.parentElement;return t}function he(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return n.overflowY==="scroll"||n.overflowY==="auto"&&e.scrollHeight>e.clientHeight}function Tt(e){if(!e||e.nodeType!==Node.ELEMENT_NODE)return!1;const n=window.getComputedStyle(e);return["scroll","auto"].includes(n.overflowY)}function Lt(e){for(;e;){if(window.getComputedStyle(e).position==="fixed")return!0;e=e.offsetParent}return!1}const Bt=j({target:[Object,Array]},"v-dialog-transition"),fn=_e()({name:"VDialogTransition",props:Bt(),setup(e,n){let{slots:t}=n;const o={onBeforeEnter(a){a.style.pointerEvents="none",a.style.visibility="hidden"},async onEnter(a,i){var w;await new Promise(m=>requestAnimationFrame(m)),await new Promise(m=>requestAnimationFrame(m)),a.style.visibility="";const{x:l,y:r,sx:u,sy:v,speed:s}=Ce(e.target,a),h=Q(a,[{transform:`translate(${l}px, ${r}px) scale(${u}, ${v})`,opacity:0},{}],{duration:225*s,easing:pt});(w=Ae(a))==null||w.forEach(m=>{Q(m,[{opacity:0},{opacity:0,offset:.33},{}],{duration:225*2*s,easing:fe})}),h.finished.then(()=>i())},onAfterEnter(a){a.style.removeProperty("pointer-events")},onBeforeLeave(a){a.style.pointerEvents="none"},async onLeave(a,i){var w;await new Promise(m=>requestAnimationFrame(m));const{x:l,y:r,sx:u,sy:v,speed:s}=Ce(e.target,a);Q(a,[{},{transform:`translate(${l}px, ${r}px) scale(${u}, ${v})`,opacity:0}],{duration:125*s,easing:St}).finished.then(()=>i()),(w=Ae(a))==null||w.forEach(m=>{Q(m,[{},{opacity:0,offset:.2},{opacity:0}],{duration:125*2*s,easing:fe})})},onAfterLeave(a){a.style.removeProperty("pointer-events")}};return()=>e.target?V(ue,$({name:"dialog-transition"},o,{css:!1}),t):V(ue,{name:"dialog-transition"},t)}});function Ae(e){var t;const n=(t=e.querySelector(":scope > .v-card, :scope > .v-sheet, :scope > .v-list"))==null?void 0:t.children;return n&&[...n]}function Ce(e,n){const t=Ie(e),o=$e(n),[a,i]=getComputedStyle(n).transformOrigin.split(" ").map(k=>parseFloat(k)),[l,r]=getComputedStyle(n).getPropertyValue("--v-overlay-anchor-origin").split(" ");let u=t.left+t.width/2;l==="left"||r==="left"?u-=t.width/2:(l==="right"||r==="right")&&(u+=t.width/2);let v=t.top+t.height/2;l==="top"||r==="top"?v-=t.height/2:(l==="bottom"||r==="bottom")&&(v+=t.height/2);const s=t.width/o.width,h=t.height/o.height,w=Math.max(1,s,h),m=s/w||0,d=h/w||0,f=o.width*o.height/(window.innerWidth*window.innerHeight),O=f>.12?Math.min(1.5,(f-.12)*10+1):1;return{x:u-(a+o.left),y:v-(i+o.top),sx:m,sy:d,speed:O}}function le(e,n){return{x:e.x+n.x,y:e.y+n.y}}function Mt(e,n){return{x:e.x-n.x,y:e.y-n.y}}function Te(e,n){if(e.side==="top"||e.side==="bottom"){const{side:t,align:o}=e,a=o==="left"?0:o==="center"?n.width/2:o==="right"?n.width:o,i=t==="top"?0:t==="bottom"?n.height:t;return le({x:a,y:i},n)}else if(e.side==="left"||e.side==="right"){const{side:t,align:o}=e,a=t==="left"?0:t==="right"?n.width:t,i=o==="top"?0:o==="center"?n.height/2:o==="bottom"?n.height:o;return le({x:a,y:i},n)}return le({x:n.width/2,y:n.height/2},n)}const qe={static:Nt,connected:Vt},Ft=j({locationStrategy:{type:[String,Function],default:"static",validator:e=>typeof e=="function"||e in qe},location:{type:String,default:"bottom"},origin:{type:String,default:"auto"},offset:[Number,String,Array]},"VOverlay-location-strategies");function Rt(e,n){const t=W({}),o=W();q&&me(()=>!!(n.isActive.value&&e.locationStrategy),i=>{var l,r;F(()=>e.locationStrategy,i),H(()=>{window.removeEventListener("resize",a),o.value=void 0}),window.addEventListener("resize",a,{passive:!0}),typeof e.locationStrategy=="function"?o.value=(l=e.locationStrategy(n,e,t))==null?void 0:l.updateLocation:o.value=(r=qe[e.locationStrategy](n,e,t))==null?void 0:r.updateLocation});function a(i){var l;(l=o.value)==null||l.call(o,i)}return{contentStyles:t,updateLocation:o}}function Nt(){}function _t(e,n){const t=$e(e);return n?t.x+=parseFloat(e.style.right||0):t.x-=parseFloat(e.style.left||0),t.y-=parseFloat(e.style.top||0),t}function Vt(e,n,t){(Array.isArray(e.target.value)||Lt(e.target.value))&&Object.assign(t.value,{position:"fixed",top:0,[e.isRtl.value?"right":"left"]:0});const{preferredAnchor:a,preferredOrigin:i}=Ke(()=>{const d=xe(n.location,e.isRtl.value),f=n.origin==="overlap"?d:n.origin==="auto"?re(d):xe(n.origin,e.isRtl.value);return d.side===f.side&&d.align===ie(f).align?{preferredAnchor:Se(d),preferredOrigin:Se(f)}:{preferredAnchor:d,preferredOrigin:f}}),[l,r,u,v]=["minWidth","minHeight","maxWidth","maxHeight"].map(d=>A(()=>{const f=parseFloat(n[d]);return isNaN(f)?1/0:f})),s=A(()=>{if(Array.isArray(n.offset))return n.offset;if(typeof n.offset=="string"){const d=n.offset.split(" ").map(parseFloat);return d.length<2&&d.push(0),d}return typeof n.offset=="number"?[n.offset,0]:[0,0]});let h=!1;const w=new ResizeObserver(()=>{h&&m()});F([e.target,e.contentEl],(d,f)=>{let[O,k]=d,[S,x]=f;S&&!Array.isArray(S)&&w.unobserve(S),O&&!Array.isArray(O)&&w.observe(O),x&&w.unobserve(x),k&&w.observe(k)},{immediate:!0}),H(()=>{w.disconnect()});function m(){if(h=!1,requestAnimationFrame(()=>h=!0),!e.target.value||!e.contentEl.value)return;const d=Ie(e.target.value),f=_t(e.contentEl.value,e.isRtl.value),O=te(e.contentEl.value),k=12;O.length||(O.push(document.documentElement),e.contentEl.value.style.top&&e.contentEl.value.style.left||(f.x-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-x")||0),f.y-=parseFloat(document.documentElement.style.getPropertyValue("--v-body-scroll-y")||0)));const S=O.reduce((p,E)=>{const y=E.getBoundingClientRect(),b=new se({x:E===document.documentElement?0:y.x,y:E===document.documentElement?0:y.y,width:E.clientWidth,height:E.clientHeight});return p?new se({x:Math.max(p.left,b.left),y:Math.max(p.top,b.top),width:Math.min(p.right,b.right)-Math.max(p.left,b.left),height:Math.min(p.bottom,b.bottom)-Math.max(p.top,b.top)}):b},void 0);S.x+=k,S.y+=k,S.width-=k*2,S.height-=k*2;let x={anchor:a.value,origin:i.value};function T(p){const E=new se(f),y=Te(p.anchor,d),b=Te(p.origin,E);let{x:N,y:_}=Mt(y,b);switch(p.anchor.side){case"top":_-=s.value[0];break;case"bottom":_+=s.value[0];break;case"left":N-=s.value[0];break;case"right":N+=s.value[0];break}switch(p.anchor.align){case"top":_-=s.value[1];break;case"bottom":_+=s.value[1];break;case"left":N-=s.value[1];break;case"right":N+=s.value[1];break}return E.x+=N,E.y+=_,E.width=Math.min(E.width,u.value),E.height=Math.min(E.height,v.value),{overflows:Pe(E,S),x:N,y:_}}let B=0,R=0;const P={x:0,y:0},c={x:!1,y:!1};let L=-1;for(;!(L++>10);){const{x:p,y:E,overflows:y}=T(x);B+=p,R+=E,f.x+=p,f.y+=E;{const b=pe(x.anchor),N=y.x.before||y.x.after,_=y.y.before||y.y.after;let z=!1;if(["x","y"].forEach(C=>{if(C==="x"&&N&&!c.x||C==="y"&&_&&!c.y){const I={anchor:{...x.anchor},origin:{...x.origin}},Y=C==="x"?b==="y"?ie:re:b==="y"?re:ie;I.anchor=Y(I.anchor),I.origin=Y(I.origin);const{overflows:X}=T(I);(X[C].before<=y[C].before&&X[C].after<=y[C].after||X[C].before+X[C].after<(y[C].before+y[C].after)/2)&&(x=I,z=c[C]=!0)}}),z)continue}y.x.before&&(B+=y.x.before,f.x+=y.x.before),y.x.after&&(B-=y.x.after,f.x-=y.x.after),y.y.before&&(R+=y.y.before,f.y+=y.y.before),y.y.after&&(R-=y.y.after,f.y-=y.y.after);{const b=Pe(f,S);P.x=S.width-b.x.before-b.x.after,P.y=S.height-b.y.before-b.y.after,B+=b.x.before,f.x+=b.x.before,R+=b.y.before,f.y+=b.y.before}break}const ae=pe(x.anchor);return Object.assign(t.value,{"--v-overlay-anchor-origin":`${x.anchor.side} ${x.anchor.align}`,transformOrigin:`${x.origin.side} ${x.origin.align}`,top:D(ce(R)),left:e.isRtl.value?void 0:D(ce(B)),right:e.isRtl.value?D(ce(-B)):void 0,minWidth:D(ae==="y"?Math.min(l.value,d.width):l.value),maxWidth:D(Le(Oe(P.x,l.value===1/0?0:l.value,u.value))),maxHeight:D(Le(Oe(P.y,r.value===1/0?0:r.value,v.value)))}),{available:P,contentBox:f}}return F(()=>[a.value,i.value,n.offset,n.minWidth,n.minHeight,n.maxWidth,n.maxHeight],()=>m()),ye(()=>{const d=m();if(!d)return;const{available:f,contentBox:O}=d;O.height>f.y&&requestAnimationFrame(()=>{m(),requestAnimationFrame(()=>{m()})})}),{updateLocation:m}}function ce(e){return Math.round(e*devicePixelRatio)/devicePixelRatio}function Le(e){return Math.ceil(e*devicePixelRatio)/devicePixelRatio}let ve=!0;const ne=[];function Dt(e){!ve||ne.length?(ne.push(e),de()):(ve=!1,e(),de())}let Be=-1;function de(){cancelAnimationFrame(Be),Be=requestAnimationFrame(()=>{const e=ne.shift();e&&e(),ne.length?de():ve=!0})}const ee={none:null,close:$t,block:Wt,reposition:qt},Ht=j({scrollStrategy:{type:[String,Function],default:"block",validator:e=>typeof e=="function"||e in ee}},"VOverlay-scroll-strategies");function It(e,n){if(!q)return;let t;ge(async()=>{t==null||t.stop(),n.isActive.value&&e.scrollStrategy&&(t=Ve(),await new Promise(o=>setTimeout(o)),t.active&&t.run(()=>{var o;typeof e.scrollStrategy=="function"?e.scrollStrategy(n,e,t):(o=ee[e.scrollStrategy])==null||o.call(ee,n,e,t)}))}),H(()=>{t==null||t.stop()})}function $t(e){function n(t){e.isActive.value=!1}je(e.targetEl.value??e.contentEl.value,n)}function Wt(e,n){var l;const t=(l=e.root.value)==null?void 0:l.offsetParent,o=[...new Set([...te(e.targetEl.value,n.contained?t:void 0),...te(e.contentEl.value,n.contained?t:void 0)])].filter(r=>!r.classList.contains("v-overlay-scroll-blocked")),a=window.innerWidth-document.documentElement.offsetWidth,i=(r=>he(r)&&r)(t||document.documentElement);i&&e.root.value.classList.add("v-overlay--scroll-blocked"),o.forEach((r,u)=>{r.style.setProperty("--v-body-scroll-x",D(-r.scrollLeft)),r.style.setProperty("--v-body-scroll-y",D(-r.scrollTop)),r!==document.documentElement&&r.style.setProperty("--v-scrollbar-offset",D(a)),r.classList.add("v-overlay-scroll-blocked")}),H(()=>{o.forEach((r,u)=>{const v=parseFloat(r.style.getPropertyValue("--v-body-scroll-x")),s=parseFloat(r.style.getPropertyValue("--v-body-scroll-y")),h=r.style.scrollBehavior;r.style.scrollBehavior="auto",r.style.removeProperty("--v-body-scroll-x"),r.style.removeProperty("--v-body-scroll-y"),r.style.removeProperty("--v-scrollbar-offset"),r.classList.remove("v-overlay-scroll-blocked"),r.scrollLeft=-v,r.scrollTop=-s,r.style.scrollBehavior=h}),i&&e.root.value.classList.remove("v-overlay--scroll-blocked")})}function qt(e,n,t){let o=!1,a=-1,i=-1;function l(r){Dt(()=>{var s,h;const u=performance.now();(h=(s=e.updateLocation).value)==null||h.call(s,r),o=(performance.now()-u)/(1e3/60)>2})}i=(typeof requestIdleCallback>"u"?r=>r():requestIdleCallback)(()=>{t.run(()=>{je(e.targetEl.value??e.contentEl.value,r=>{o?(cancelAnimationFrame(a),a=requestAnimationFrame(()=>{a=requestAnimationFrame(()=>{l(r)})})):l(r)})})}),H(()=>{typeof cancelIdleCallback<"u"&&cancelIdleCallback(i),cancelAnimationFrame(a)})}function je(e,n){const t=[document,...te(e)];t.forEach(o=>{o.addEventListener("scroll",n,{passive:!0})}),H(()=>{t.forEach(o=>{o.removeEventListener("scroll",n)})})}const jt=Symbol.for("vuetify:v-menu"),zt=j({closeDelay:[Number,String],openDelay:[Number,String]},"delay");function Yt(e,n){let t=()=>{};function o(l){t==null||t();const r=Number(l?e.openDelay:e.closeDelay);return new Promise(u=>{t=Qe(r,()=>{n==null||n(l),u(l)})})}function a(){return o(!0)}function i(){return o(!1)}return{clearDelay:t,runOpenDelay:a,runCloseDelay:i}}const Xt=j({target:[String,Object],activator:[String,Object],activatorProps:{type:Object,default:()=>({})},openOnClick:{type:Boolean,default:void 0},openOnHover:Boolean,openOnFocus:{type:Boolean,default:void 0},closeOnContentClick:Boolean,...zt()},"VOverlay-activator");function Ut(e,n){let{isActive:t,isTop:o,contentEl:a}=n;const i=oe("useActivator"),l=W();let r=!1,u=!1,v=!0;const s=A(()=>e.openOnFocus||e.openOnFocus==null&&e.openOnHover),h=A(()=>e.openOnClick||e.openOnClick==null&&!e.openOnHover&&!s.value),{runOpenDelay:w,runCloseDelay:m}=Yt(e,c=>{c===(e.openOnHover&&r||s.value&&u)&&!(e.openOnHover&&t.value&&!o.value)&&(t.value!==c&&(v=!0),t.value=c)}),d=W(),f={onClick:c=>{c.stopPropagation(),l.value=c.currentTarget||c.target,t.value||(d.value=[c.clientX,c.clientY]),t.value=!t.value},onMouseenter:c=>{var L;(L=c.sourceCapabilities)!=null&&L.firesTouchEvents||(r=!0,l.value=c.currentTarget||c.target,w())},onMouseleave:c=>{r=!1,m()},onFocus:c=>{Ze(c.target,":focus-visible")!==!1&&(u=!0,c.stopPropagation(),l.value=c.currentTarget||c.target,w())},onBlur:c=>{u=!1,c.stopPropagation(),m()}},O=A(()=>{const c={};return h.value&&(c.onClick=f.onClick),e.openOnHover&&(c.onMouseenter=f.onMouseenter,c.onMouseleave=f.onMouseleave),s.value&&(c.onFocus=f.onFocus,c.onBlur=f.onBlur),c}),k=A(()=>{const c={};if(e.openOnHover&&(c.onMouseenter=()=>{r=!0,w()},c.onMouseleave=()=>{r=!1,m()}),s.value&&(c.onFocusin=()=>{u=!0,w()},c.onFocusout=()=>{u=!1,m()}),e.closeOnContentClick){const L=De(jt,null);c.onClick=()=>{t.value=!1,L==null||L.closeParents()}}return c}),S=A(()=>{const c={};return e.openOnHover&&(c.onMouseenter=()=>{v&&(r=!0,v=!1,w())},c.onMouseleave=()=>{r=!1,m()}),c});F(o,c=>{var L;c&&(e.openOnHover&&!r&&(!s.value||!u)||s.value&&!u&&(!e.openOnHover||!r))&&!((L=a.value)!=null&&L.contains(document.activeElement))&&(t.value=!1)}),F(t,c=>{c||setTimeout(()=>{d.value=void 0})},{flush:"post"});const x=ke();ge(()=>{x.value&&ye(()=>{l.value=x.el})});const T=ke(),B=A(()=>e.target==="cursor"&&d.value?d.value:T.value?T.el:ze(e.target,i)||l.value),R=A(()=>Array.isArray(B.value)?void 0:B.value);let P;return F(()=>!!e.activator,c=>{c&&q?(P=Ve(),P.run(()=>{Gt(e,i,{activatorEl:l,activatorEvents:O})})):P&&P.stop()},{flush:"post",immediate:!0}),H(()=>{P==null||P.stop()}),{activatorEl:l,activatorRef:x,target:B,targetEl:R,targetRef:T,activatorEvents:O,contentEvents:k,scrimEvents:S}}function Gt(e,n,t){let{activatorEl:o,activatorEvents:a}=t;F(()=>e.activator,(u,v)=>{if(v&&u!==v){const s=r(v);s&&l(s)}u&&ye(()=>i())},{immediate:!0}),F(()=>e.activatorProps,()=>{i()}),H(()=>{l()});function i(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:r(),v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;u&&Pt(u,$(a.value,v))}function l(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:r(),v=arguments.length>1&&arguments[1]!==void 0?arguments[1]:e.activatorProps;u&&At(u,$(a.value,v))}function r(){let u=arguments.length>0&&arguments[0]!==void 0?arguments[0]:e.activator;const v=ze(u,n);return o.value=(v==null?void 0:v.nodeType)===Node.ELEMENT_NODE?v:void 0,o.value}}function ze(e,n){var o,a;if(!e)return;let t;if(e==="parent"){let i=(a=(o=n==null?void 0:n.proxy)==null?void 0:o.$el)==null?void 0:a.parentNode;for(;i!=null&&i.hasAttribute("data-no-activator");)i=i.parentNode;t=i}else typeof e=="string"?t=document.querySelector(e):"$el"in e?t=e.$el:t=e;return t}function Kt(){if(!q)return U(!1);const{ssr:e}=Je();if(e){const n=U(!1);return et(()=>{n.value=!0}),n}else return U(!0)}const Qt=j({eager:Boolean},"lazy");function Zt(e,n){const t=U(!1),o=A(()=>t.value||e.eager||n.value);F(n,()=>t.value=!0);function a(){e.eager||(t.value=!1)}return{isBooted:t,hasContent:o,onAfterLeave:a}}function Jt(){const n=oe("useScopeId").vnode.scopeId;return{scopeId:n?{[n]:""}:void 0}}const Me=Symbol.for("vuetify:stack"),K=He([]);function en(e,n,t){const o=oe("useStack"),a=!t,i=De(Me,void 0),l=He({activeChildren:new Set});ot(Me,l);const r=U(+n.value);me(e,()=>{var h;const s=(h=K.at(-1))==null?void 0:h[1];r.value=s?s+10:+n.value,a&&K.push([o.uid,r.value]),i==null||i.activeChildren.add(o.uid),H(()=>{if(a){const w=nt(K).findIndex(m=>m[0]===o.uid);K.splice(w,1)}i==null||i.activeChildren.delete(o.uid)})});const u=U(!0);a&&ge(()=>{var h;const s=((h=K.at(-1))==null?void 0:h[0])===o.uid;setTimeout(()=>u.value=s)});const v=A(()=>!l.activeChildren.size);return{globalTop:tt(u),localTop:v,stackStyles:A(()=>({zIndex:r.value}))}}function tn(e){return{teleportTarget:A(()=>{const t=e();if(t===!0||!q)return;const o=t===!1?document.body:typeof t=="string"?document.querySelector(t):t;if(o==null)return;let a=[...o.children].find(i=>i.matches(".v-overlay-container"));return a||(a=document.createElement("div"),a.className="v-overlay-container",o.appendChild(a)),a})}}function nn(){return!0}function Ye(e,n,t){if(!e||Xe(e,t)===!1)return!1;const o=We(n);if(typeof ShadowRoot<"u"&&o instanceof ShadowRoot&&o.host===e.target)return!1;const a=(typeof t.value=="object"&&t.value.include||(()=>[]))();return a.push(n),!a.some(i=>i==null?void 0:i.contains(e.target))}function Xe(e,n){return(typeof n.value=="object"&&n.value.closeConditional||nn)(e)}function on(e,n,t){const o=typeof t.value=="function"?t.value:t.value.handler;e.shadowTarget=e.target,n._clickOutside.lastMousedownWasOutside&&Ye(e,n,t)&&setTimeout(()=>{Xe(e,t)&&o&&o(e)},0)}function Fe(e,n){const t=We(e);n(document),typeof ShadowRoot<"u"&&t instanceof ShadowRoot&&n(t)}const an={mounted(e,n){const t=a=>on(a,e,n),o=a=>{e._clickOutside.lastMousedownWasOutside=Ye(a,e,n)};Fe(e,a=>{a.addEventListener("click",t,!0),a.addEventListener("mousedown",o,!0)}),e._clickOutside||(e._clickOutside={lastMousedownWasOutside:!1}),e._clickOutside[n.instance.$.uid]={onClick:t,onMousedown:o}},beforeUnmount(e,n){e._clickOutside&&(Fe(e,t=>{var i;if(!t||!((i=e._clickOutside)!=null&&i[n.instance.$.uid]))return;const{onClick:o,onMousedown:a}=e._clickOutside[n.instance.$.uid];t.removeEventListener("click",o,!0),t.removeEventListener("mousedown",a,!0)}),delete e._clickOutside[n.instance.$.uid])}};function rn(e){const{modelValue:n,color:t,...o}=e;return V(ue,{name:"fade-transition",appear:!0},{default:()=>[e.modelValue&&V("div",$({class:["v-overlay__scrim",e.color.backgroundColorClasses.value],style:e.color.backgroundColorStyles.value},o),null)]})}const sn=j({absolute:Boolean,attach:[Boolean,String,Object],closeOnBack:{type:Boolean,default:!0},contained:Boolean,contentClass:null,contentProps:null,disabled:Boolean,opacity:[Number,String],noClickAnimation:Boolean,modelValue:Boolean,persistent:Boolean,scrim:{type:[Boolean,String],default:!0},zIndex:{type:[Number,String],default:2e3},...Xt(),...Et(),...bt(),...Qt(),...Ft(),...Ht(),...wt(),...kt()},"VOverlay"),vn=_e()({name:"VOverlay",directives:{ClickOutside:an},inheritAttrs:!1,props:{_disableGlobalStack:Boolean,...sn()},emits:{"click:outside":e=>!0,"update:modelValue":e=>!0,afterEnter:()=>!0,afterLeave:()=>!0},setup(e,n){let{slots:t,attrs:o,emit:a}=n;const i=oe("VOverlay"),l=W(),r=W(),u=W(),v=at(e,"modelValue"),s=A({get:()=>v.value,set:g=>{g&&e.disabled||(v.value=g)}}),{themeClasses:h}=rt(e),{rtlClasses:w,isRtl:m}=it(),{hasContent:d,onAfterLeave:f}=Zt(e,s),O=st(A(()=>typeof e.scrim=="string"?e.scrim:null)),{globalTop:k,localTop:S,stackStyles:x}=en(s,lt(e,"zIndex"),e._disableGlobalStack),{activatorEl:T,activatorRef:B,target:R,targetEl:P,targetRef:c,activatorEvents:L,contentEvents:ae,scrimEvents:p}=Ut(e,{isActive:s,isTop:S,contentEl:u}),{teleportTarget:E}=tn(()=>{var G,be,Ee;const g=e.attach||e.contained;if(g)return g;const M=((G=T==null?void 0:T.value)==null?void 0:G.getRootNode())||((Ee=(be=i.proxy)==null?void 0:be.$el)==null?void 0:Ee.getRootNode());return M instanceof ShadowRoot?M:!1}),{dimensionStyles:y}=ct(e),b=Kt(),{scopeId:N}=Jt();F(()=>e.disabled,g=>{g&&(s.value=!1)});const{contentStyles:_,updateLocation:z}=Rt(e,{isRtl:m,contentEl:u,target:R,isActive:s});It(e,{root:l,contentEl:u,targetEl:P,isActive:s,updateLocation:z});function C(g){a("click:outside",g),e.persistent?Z():s.value=!1}function I(g){return s.value&&k.value&&(!e.scrim||g.target===r.value||g instanceof MouseEvent&&g.shadowTarget===r.value)}q&&F(s,g=>{g?window.addEventListener("keydown",Y):window.removeEventListener("keydown",Y)},{immediate:!0}),ut(()=>{q&&window.removeEventListener("keydown",Y)});function Y(g){var M,G;g.key==="Escape"&&k.value&&(e.persistent?Z():(s.value=!1,(M=u.value)!=null&&M.contains(document.activeElement)&&((G=T.value)==null||G.focus())))}const X=ft();me(()=>e.closeOnBack,()=>{xt(X,g=>{k.value&&s.value?(g(!1),e.persistent?Z():s.value=!1):g()})});const we=W();F(()=>s.value&&(e.absolute||e.contained)&&E.value==null,g=>{if(g){const M=Ct(l.value);M&&M!==document.scrollingElement&&(we.value=M.scrollTop)}});function Z(){e.noClickAnimation||u.value&&Q(u.value,[{transformOrigin:"center"},{transform:"scale(1.03)"},{transformOrigin:"center"}],{duration:150,easing:fe})}function Ue(){a("afterEnter")}function Ge(){f(),a("afterLeave")}return vt(()=>{var g;return V(ht,null,[(g=t.activator)==null?void 0:g.call(t,{isActive:s.value,targetRef:c,props:$({ref:B},L.value,e.activatorProps)}),b.value&&d.value&&V(dt,{disabled:!E.value,to:E.value},{default:()=>[V("div",$({class:["v-overlay",{"v-overlay--absolute":e.absolute||e.contained,"v-overlay--active":s.value,"v-overlay--contained":e.contained},h.value,w.value,e.class],style:[x.value,{"--v-overlay-opacity":e.opacity,top:D(we.value)},e.style],ref:l},N,o),[V(rn,$({color:O,modelValue:s.value&&!!e.scrim,ref:r},p.value),null),V(Ot,{appear:!0,persisted:!0,transition:e.transition,target:R.value,onAfterEnter:Ue,onAfterLeave:Ge},{default:()=>{var M;return[mt(V("div",$({ref:u,class:["v-overlay__content",e.contentClass],style:[y.value,_.value]},ae.value,e.contentProps),[(M=t.default)==null?void 0:M.call(t,{isActive:s})]),[[yt,s.value],[gt("click-outside"),{handler:C,closeConditional:I,include:()=>[T.value]}]])]}})])]})])}),{activatorEl:T,scrimEl:r,target:R,animateClick:Z,contentEl:u,globalTop:k,localTop:S,updateLocation:z}}});export{vn as V,jt as a,fn as b,Zt as c,Qt as d,Ct as g,sn as m,Jt as u};
