import{ar as U,W as D,as as $,at as we,au as A,s as M,e as O,X as W,p as y,a0 as ie,am as nt,D as C,Y as ke,$ as lt,S as it,q as F,y as R,a as f,ai as J,av as st,Q as Ce,R as rt,z as H,B as z,P as T,aw as ut,ax as ot,U as Ae,a8 as Ie,a9 as Ve,aa as ct,ab as Pe,x as Le,ay as Oe,E as Be,az as dt,ap as vt,L as G,ad as Ee,M as Me,aA as ft,N as xe,aB as Te,A as De,af as Fe,ag as je,aC as N,ah as mt,F as ve,V as fe,H as yt,aD as gt,aE as E,Z as se,C as St,aF as bt,aG as X,v as ht,aH as pt,ao as wt,aI as me,aJ as kt,aK as ye,aL as Ct}from"./index-BCXkcNoo.js";import{V as At,f as It}from"./forwardRefs-BpjxVdNq.js";import{M as Vt}from"./VImg-XuFL4q6t.js";import{c as Pt,V as ge}from"./VGrid-Dcmurj4t.js";import{V as Lt}from"./VDivider-CoLL375C.js";import{u as Ot,a as Se,V as be,m as Bt,b as Et}from"./VOverlay-uA0yxJrw.js";const ne=Symbol.for("vuetify:list");function Re(){const e=U(ne,{hasPrepend:D(!1),updateHasPrepend:()=>null}),l={hasPrepend:D(!1),updateHasPrepend:a=>{a&&(l.hasPrepend.value=a)}};return $(ne,l),e}function _e(){return U(ne,null)}const re=e=>{const l={activate:a=>{let{id:t,value:i,activated:n}=a;return t=A(t),e&&!i&&n.size===1&&n.has(t)||(i?n.add(t):n.delete(t)),n},in:(a,t,i)=>{let n=new Set;if(a!=null)for(const s of we(a))n=l.activate({id:s,value:!0,activated:new Set(n),children:t,parents:i});return n},out:a=>Array.from(a)};return l},Ne=e=>{const l=re(e);return{activate:t=>{let{activated:i,id:n,...s}=t;n=A(n);const u=i.has(n)?new Set([n]):new Set;return l.activate({...s,id:n,activated:u})},in:(t,i,n)=>{let s=new Set;if(t!=null){const u=we(t);u.length&&(s=l.in(u.slice(0,1),i,n))}return s},out:(t,i,n)=>l.out(t,i,n)}},Mt=e=>{const l=re(e);return{activate:t=>{let{id:i,activated:n,children:s,...u}=t;return i=A(i),s.has(i)?n:l.activate({id:i,activated:n,children:s,...u})},in:l.in,out:l.out}},xt=e=>{const l=Ne(e);return{activate:t=>{let{id:i,activated:n,children:s,...u}=t;return i=A(i),s.has(i)?n:l.activate({id:i,activated:n,children:s,...u})},in:l.in,out:l.out}},Tt={open:e=>{let{id:l,value:a,opened:t,parents:i}=e;if(a){const n=new Set;n.add(l);let s=i.get(l);for(;s!=null;)n.add(s),s=i.get(s);return n}else return t.delete(l),t},select:()=>null},Ge={open:e=>{let{id:l,value:a,opened:t,parents:i}=e;if(a){let n=i.get(l);for(t.add(l);n!=null&&n!==l;)t.add(n),n=i.get(n);return t}else t.delete(l);return t},select:()=>null},Dt={open:Ge.open,select:e=>{let{id:l,value:a,opened:t,parents:i}=e;if(!a)return t;const n=[];let s=i.get(l);for(;s!=null;)n.push(s),s=i.get(s);return new Set(n)}},ue=e=>{const l={select:a=>{let{id:t,value:i,selected:n}=a;if(t=A(t),e&&!i){const s=Array.from(n.entries()).reduce((u,m)=>{let[d,S]=m;return S==="on"&&u.push(d),u},[]);if(s.length===1&&s[0]===t)return n}return n.set(t,i?"on":"off"),n},in:(a,t,i)=>{let n=new Map;for(const s of a||[])n=l.select({id:s,value:!0,selected:new Map(n),children:t,parents:i});return n},out:a=>{const t=[];for(const[i,n]of a.entries())n==="on"&&t.push(i);return t}};return l},Ke=e=>{const l=ue(e);return{select:t=>{let{selected:i,id:n,...s}=t;n=A(n);const u=i.has(n)?new Map([[n,i.get(n)]]):new Map;return l.select({...s,id:n,selected:u})},in:(t,i,n)=>{let s=new Map;return t!=null&&t.length&&(s=l.in(t.slice(0,1),i,n)),s},out:(t,i,n)=>l.out(t,i,n)}},Ft=e=>{const l=ue(e);return{select:t=>{let{id:i,selected:n,children:s,...u}=t;return i=A(i),s.has(i)?n:l.select({id:i,selected:n,children:s,...u})},in:l.in,out:l.out}},jt=e=>{const l=Ke(e);return{select:t=>{let{id:i,selected:n,children:s,...u}=t;return i=A(i),s.has(i)?n:l.select({id:i,selected:n,children:s,...u})},in:l.in,out:l.out}},Rt=e=>{const l={select:a=>{let{id:t,value:i,selected:n,children:s,parents:u}=a;t=A(t);const m=new Map(n),d=[t];for(;d.length;){const g=d.shift();n.set(A(g),i?"on":"off"),s.has(g)&&d.push(...s.get(g))}let S=A(u.get(t));for(;S;){const g=s.get(S),k=g.every(r=>n.get(A(r))==="on"),h=g.every(r=>!n.has(A(r))||n.get(A(r))==="off");n.set(S,k?"on":h?"off":"indeterminate"),S=A(u.get(S))}return e&&!i&&Array.from(n.entries()).reduce((k,h)=>{let[r,c]=h;return c==="on"&&k.push(r),k},[]).length===0?m:n},in:(a,t,i)=>{let n=new Map;for(const s of a||[])n=l.select({id:s,value:!0,selected:new Map(n),children:t,parents:i});return n},out:(a,t)=>{const i=[];for(const[n,s]of a.entries())s==="on"&&!t.has(n)&&i.push(n);return i}};return l},K=Symbol.for("vuetify:nested"),Ue={id:D(),root:{register:()=>null,unregister:()=>null,parents:O(new Map),children:O(new Map),open:()=>null,openOnSelect:()=>null,activate:()=>null,select:()=>null,activatable:O(!1),selectable:O(!1),opened:O(new Set),activated:O(new Set),selected:O(new Map),selectedValues:O([]),getPath:()=>[]}},_t=M({activatable:Boolean,selectable:Boolean,activeStrategy:[String,Function,Object],selectStrategy:[String,Function,Object],openStrategy:[String,Object],opened:null,activated:null,selected:null,mandatory:Boolean},"nested"),Nt=e=>{let l=!1;const a=O(new Map),t=O(new Map),i=W(e,"opened",e.opened,r=>new Set(r),r=>[...r.values()]),n=y(()=>{if(typeof e.activeStrategy=="object")return e.activeStrategy;if(typeof e.activeStrategy=="function")return e.activeStrategy(e.mandatory);switch(e.activeStrategy){case"leaf":return Mt(e.mandatory);case"single-leaf":return xt(e.mandatory);case"independent":return re(e.mandatory);case"single-independent":default:return Ne(e.mandatory)}}),s=y(()=>{if(typeof e.selectStrategy=="object")return e.selectStrategy;if(typeof e.selectStrategy=="function")return e.selectStrategy(e.mandatory);switch(e.selectStrategy){case"single-leaf":return jt(e.mandatory);case"leaf":return Ft(e.mandatory);case"independent":return ue(e.mandatory);case"single-independent":return Ke(e.mandatory);case"classic":default:return Rt(e.mandatory)}}),u=y(()=>{if(typeof e.openStrategy=="object")return e.openStrategy;switch(e.openStrategy){case"list":return Dt;case"single":return Tt;case"multiple":default:return Ge}}),m=W(e,"activated",e.activated,r=>n.value.in(r,a.value,t.value),r=>n.value.out(r,a.value,t.value)),d=W(e,"selected",e.selected,r=>s.value.in(r,a.value,t.value),r=>s.value.out(r,a.value,t.value));ie(()=>{l=!0});function S(r){const c=[];let o=r;for(;o!=null;)c.unshift(o),o=t.value.get(o);return c}const g=nt("nested"),k=new Set,h={id:D(),root:{opened:i,activatable:C(e,"activatable"),selectable:C(e,"selectable"),activated:m,selected:d,selectedValues:y(()=>{const r=[];for(const[c,o]of d.value.entries())o==="on"&&r.push(c);return r}),register:(r,c,o)=>{if(k.has(r)){S(r).map(String).join(" -> "),S(c).concat(r).map(String).join(" -> ");return}else k.add(r);c&&r!==c&&t.value.set(r,c),o&&a.value.set(r,[]),c!=null&&a.value.set(c,[...a.value.get(c)||[],r])},unregister:r=>{if(l)return;k.delete(r),a.value.delete(r);const c=t.value.get(r);if(c){const o=a.value.get(c)??[];a.value.set(c,o.filter(v=>v!==r))}t.value.delete(r)},open:(r,c,o)=>{g.emit("click:open",{id:r,value:c,path:S(r),event:o});const v=u.value.open({id:r,value:c,opened:new Set(i.value),children:a.value,parents:t.value,event:o});v&&(i.value=v)},openOnSelect:(r,c,o)=>{const v=u.value.select({id:r,value:c,selected:new Map(d.value),opened:new Set(i.value),children:a.value,parents:t.value,event:o});v&&(i.value=v)},select:(r,c,o)=>{g.emit("click:select",{id:r,value:c,path:S(r),event:o});const v=s.value.select({id:r,value:c,selected:new Map(d.value),children:a.value,parents:t.value,event:o});v&&(d.value=v),h.root.openOnSelect(r,c,o)},activate:(r,c,o)=>{if(!e.activatable)return h.root.select(r,!0,o);g.emit("click:activate",{id:r,value:c,path:S(r),event:o});const v=n.value.activate({id:r,value:c,activated:new Set(m.value),children:a.value,parents:t.value,event:o});v&&(m.value=v)},children:a,parents:t,getPath:S}};return $(K,h),h.root},$e=(e,l)=>{const a=U(K,Ue),t=Symbol(ke()),i=y(()=>e.value!==void 0?e.value:t),n={...a,id:i,open:(s,u)=>a.root.open(i.value,s,u),openOnSelect:(s,u)=>a.root.openOnSelect(i.value,s,u),isOpen:y(()=>a.root.opened.value.has(i.value)),parent:y(()=>a.root.parents.value.get(i.value)),activate:(s,u)=>a.root.activate(i.value,s,u),isActivated:y(()=>a.root.activated.value.has(A(i.value))),select:(s,u)=>a.root.select(i.value,s,u),isSelected:y(()=>a.root.selected.value.get(A(i.value))==="on"),isIndeterminate:y(()=>a.root.selected.value.get(i.value)==="indeterminate"),isLeaf:y(()=>!a.root.children.value.get(i.value)),isGroupActivator:a.isGroupActivator};return!a.isGroupActivator&&a.root.register(i.value,a.id.value,l),ie(()=>{!a.isGroupActivator&&a.root.unregister(i.value)}),l&&$(K,n),n},Gt=()=>{const e=U(K,Ue);$(K,{...e,isGroupActivator:!0})};function Kt(){const e=D(!1);return lt(()=>{window.requestAnimationFrame(()=>{e.value=!0})}),{ssrBootStyles:y(()=>e.value?void 0:{transition:"none !important"}),isBooted:it(e)}}const Ut=st({name:"VListGroupActivator",setup(e,l){let{slots:a}=l;return Gt(),()=>{var t;return(t=a.default)==null?void 0:t.call(a)}}}),$t=M({activeColor:String,baseColor:String,color:String,collapseIcon:{type:T,default:"$collapse"},expandIcon:{type:T,default:"$expand"},prependIcon:T,appendIcon:T,fluid:Boolean,subgroup:Boolean,title:String,value:null,...z(),...H()},"VListGroup"),he=F()({name:"VListGroup",props:$t(),setup(e,l){let{slots:a}=l;const{isOpen:t,open:i,id:n}=$e(C(e,"value"),!0),s=y(()=>`v-list-group--id-${String(n.value)}`),u=_e(),{isBooted:m}=Kt();function d(h){h.stopPropagation(),i(!t.value,h)}const S=y(()=>({onClick:d,class:"v-list-group__header",id:s.value})),g=y(()=>t.value?e.collapseIcon:e.expandIcon),k=y(()=>({VListItem:{active:t.value,activeColor:e.activeColor,baseColor:e.baseColor,color:e.color,prependIcon:e.prependIcon||e.subgroup&&g.value,appendIcon:e.appendIcon||!e.subgroup&&g.value,title:e.title,value:e.value}}));return R(()=>f(e.tag,{class:["v-list-group",{"v-list-group--prepend":u==null?void 0:u.hasPrepend.value,"v-list-group--fluid":e.fluid,"v-list-group--subgroup":e.subgroup,"v-list-group--open":t.value},e.class],style:e.style},{default:()=>[a.activator&&f(J,{defaults:k.value},{default:()=>[f(Ut,null,{default:()=>[a.activator({props:S.value,isOpen:t.value})]})]}),f(Vt,{transition:{component:At},disabled:!m.value},{default:()=>{var h;return[Ce(f("div",{class:"v-list-group__items",role:"group","aria-labelledby":s.value},[(h=a.default)==null?void 0:h.call(a)]),[[rt,t.value]])]}})]})),{isOpen:t}}}),Ht=M({opacity:[Number,String],...z(),...H()},"VListItemSubtitle"),zt=F()({name:"VListItemSubtitle",props:Ht(),setup(e,l){let{slots:a}=l;return R(()=>f(e.tag,{class:["v-list-item-subtitle",e.class],style:[{"--v-list-item-subtitle-opacity":e.opacity},e.style]},a)),{}}}),qt=Pt("v-list-item-title"),Wt=M({active:{type:Boolean,default:void 0},activeClass:String,activeColor:String,appendAvatar:String,appendIcon:T,baseColor:String,disabled:Boolean,lines:[Boolean,String],link:{type:Boolean,default:void 0},nav:Boolean,prependAvatar:String,prependIcon:T,ripple:{type:[Boolean,Object],default:!0},slim:Boolean,subtitle:[String,Number],title:[String,Number],value:null,onClick:N(),onClickOnce:N(),...je(),...z(),...Fe(),...De(),...Te(),...xe(),...ft(),...H(),...Me(),...Ee({variant:"text"})},"VListItem"),pe=F()({name:"VListItem",directives:{Ripple:ut},props:Wt(),emits:{click:e=>!0},setup(e,l){let{attrs:a,slots:t,emit:i}=l;const n=ot(e,a),s=y(()=>e.value===void 0?n.href.value:e.value),{activate:u,isActivated:m,select:d,isOpen:S,isSelected:g,isIndeterminate:k,isGroupActivator:h,root:r,parent:c,openOnSelect:o,id:v}=$e(s,!1),b=_e(),w=y(()=>{var p;return e.active!==!1&&(e.active||((p=n.isActive)==null?void 0:p.value)||(r.activatable.value?m.value:g.value))}),V=y(()=>e.link!==!1&&n.isLink.value),P=y(()=>!!b&&(r.selectable.value||r.activatable.value||e.value!=null)),L=y(()=>!e.disabled&&e.link!==!1&&(e.link||n.isClickable.value||P.value)),_=y(()=>e.rounded||e.nav),Q=y(()=>e.color??e.activeColor),Y=y(()=>({color:w.value?Q.value??e.baseColor:e.baseColor,variant:e.variant}));Ae(()=>{var p;return(p=n.isActive)==null?void 0:p.value},p=>{p&&c.value!=null&&r.open(c.value,!0),p&&o(p)},{immediate:!0});const{themeClasses:Z}=Ie(e),{borderClasses:ee}=Ve(e),{colorClasses:x,colorStyles:I,variantClasses:j}=ct(Y),{densityClasses:We}=Pe(e),{dimensionStyles:Xe}=Le(e),{elevationClasses:Je}=Oe(e),{roundedClasses:Qe}=Be(_),Ye=y(()=>e.lines?`v-list-item--${e.lines}-line`:void 0),te=y(()=>({isActive:w.value,select:d,isOpen:S.value,isSelected:g.value,isIndeterminate:k.value}));function Ze(p){var q;i("click",p),L.value&&((q=n.navigate)==null||q.call(n,p),!h&&(r.activatable.value?u(!m.value,p):(r.selectable.value||e.value!=null)&&d(!g.value,p)))}function et(p){(p.key==="Enter"||p.key===" ")&&(p.preventDefault(),p.target.dispatchEvent(new MouseEvent("click",p)))}return R(()=>{const p=V.value?"a":e.tag,q=t.title||e.title!=null,tt=t.subtitle||e.subtitle!=null,oe=!!(e.appendAvatar||e.appendIcon),at=!!(oe||t.append),ce=!!(e.prependAvatar||e.prependIcon),ae=!!(ce||t.prepend);return b==null||b.updateHasPrepend(ae),e.activeColor&&dt("active-color",["color","base-color"]),Ce(f(p,G({class:["v-list-item",{"v-list-item--active":w.value,"v-list-item--disabled":e.disabled,"v-list-item--link":L.value,"v-list-item--nav":e.nav,"v-list-item--prepend":!ae&&(b==null?void 0:b.hasPrepend.value),"v-list-item--slim":e.slim,[`${e.activeClass}`]:e.activeClass&&w.value},Z.value,ee.value,x.value,We.value,Je.value,Ye.value,Qe.value,j.value,e.class],style:[I.value,Xe.value,e.style],tabindex:L.value?b?-2:0:void 0,"aria-selected":P.value?r.activatable.value?m.value:r.selectable.value?g.value:w.value:void 0,onClick:Ze,onKeydown:L.value&&!V.value&&et},n.linkProps),{default:()=>{var de;return[mt(L.value||w.value,"v-list-item"),ae&&f("div",{key:"prepend",class:"v-list-item__prepend"},[t.prepend?f(J,{key:"prepend-defaults",disabled:!ce,defaults:{VAvatar:{density:e.density,image:e.prependAvatar},VIcon:{density:e.density,icon:e.prependIcon},VListItemAction:{start:!0}}},{default:()=>{var B;return[(B=t.prepend)==null?void 0:B.call(t,te.value)]}}):f(ve,null,[e.prependAvatar&&f(ge,{key:"prepend-avatar",density:e.density,image:e.prependAvatar},null),e.prependIcon&&f(fe,{key:"prepend-icon",density:e.density,icon:e.prependIcon},null)]),f("div",{class:"v-list-item__spacer"},null)]),f("div",{class:"v-list-item__content","data-no-activator":""},[q&&f(qt,{key:"title"},{default:()=>{var B;return[((B=t.title)==null?void 0:B.call(t,{title:e.title}))??e.title]}}),tt&&f(zt,{key:"subtitle"},{default:()=>{var B;return[((B=t.subtitle)==null?void 0:B.call(t,{subtitle:e.subtitle}))??e.subtitle]}}),(de=t.default)==null?void 0:de.call(t,te.value)]),at&&f("div",{key:"append",class:"v-list-item__append"},[t.append?f(J,{key:"append-defaults",disabled:!oe,defaults:{VAvatar:{density:e.density,image:e.appendAvatar},VIcon:{density:e.density,icon:e.appendIcon},VListItemAction:{end:!0}}},{default:()=>{var B;return[(B=t.append)==null?void 0:B.call(t,te.value)]}}):f(ve,null,[e.appendIcon&&f(fe,{key:"append-icon",density:e.density,icon:e.appendIcon},null),e.appendAvatar&&f(ge,{key:"append-avatar",density:e.density,image:e.appendAvatar},null)]),f("div",{class:"v-list-item__spacer"},null)])]}}),[[vt("ripple"),L.value&&e.ripple]])}),{activate:u,isActivated:m,isGroupActivator:h,isSelected:g,list:b,select:d,root:r,id:v}}}),Xt=M({color:String,inset:Boolean,sticky:Boolean,title:String,...z(),...H()},"VListSubheader"),Jt=F()({name:"VListSubheader",props:Xt(),setup(e,l){let{slots:a}=l;const{textColorClasses:t,textColorStyles:i}=yt(C(e,"color"));return R(()=>{const n=!!(a.default||e.title);return f(e.tag,{class:["v-list-subheader",{"v-list-subheader--inset":e.inset,"v-list-subheader--sticky":e.sticky},t.value,e.class],style:[{textColorStyles:i},e.style]},{default:()=>{var s;return[n&&f("div",{class:"v-list-subheader__text"},[((s=a.default)==null?void 0:s.call(a))??e.title])]}})}),{}}}),Qt=M({items:Array,returnObject:Boolean},"VListChildren"),He=F()({name:"VListChildren",props:Qt(),setup(e,l){let{slots:a}=l;return Re(),()=>{var t,i;return((t=a.default)==null?void 0:t.call(a))??((i=e.items)==null?void 0:i.map(n=>{var k,h;let{children:s,props:u,type:m,raw:d}=n;if(m==="divider")return((k=a.divider)==null?void 0:k.call(a,{props:u}))??f(Lt,u,null);if(m==="subheader")return((h=a.subheader)==null?void 0:h.call(a,{props:u}))??f(Jt,u,null);const S={subtitle:a.subtitle?r=>{var c;return(c=a.subtitle)==null?void 0:c.call(a,{...r,item:d})}:void 0,prepend:a.prepend?r=>{var c;return(c=a.prepend)==null?void 0:c.call(a,{...r,item:d})}:void 0,append:a.append?r=>{var c;return(c=a.append)==null?void 0:c.call(a,{...r,item:d})}:void 0,title:a.title?r=>{var c;return(c=a.title)==null?void 0:c.call(a,{...r,item:d})}:void 0},g=he.filterProps(u);return s?f(he,G({value:u==null?void 0:u.value},g),{activator:r=>{let{props:c}=r;const o={...u,...c,value:e.returnObject?d:u.value};return a.header?a.header({props:o}):f(pe,o,S)},default:()=>f(He,{items:s,returnObject:e.returnObject},a)}):a.item?a.item({props:u}):f(pe,G(u,{value:e.returnObject?d:u.value}),S)}))}}}),Yt=M({items:{type:Array,default:()=>[]},itemTitle:{type:[String,Array,Function],default:"title"},itemValue:{type:[String,Array,Function],default:"value"},itemChildren:{type:[Boolean,String,Array,Function],default:"children"},itemProps:{type:[Boolean,String,Array,Function],default:"props"},returnObject:Boolean,valueComparator:{type:Function,default:gt}},"list-items");function le(e,l){const a=E(l,e.itemTitle,l),t=E(l,e.itemValue,a),i=E(l,e.itemChildren),n=e.itemProps===!0?typeof l=="object"&&l!=null&&!Array.isArray(l)?"children"in l?se(l,["children"]):l:void 0:E(l,e.itemProps),s={title:a,value:t,...n};return{title:String(s.title??""),value:s.value,props:s,children:Array.isArray(i)?ze(e,i):void 0,raw:l}}function ze(e,l){const a=[];for(const t of l)a.push(le(e,t));return a}function ca(e){const l=y(()=>ze(e,e.items)),a=y(()=>l.value.some(n=>n.value===null));function t(n){return a.value||(n=n.filter(s=>s!==null)),n.map(s=>e.returnObject&&typeof s=="string"?le(e,s):l.value.find(u=>e.valueComparator(s,u.value))||le(e,s))}function i(n){return e.returnObject?n.map(s=>{let{raw:u}=s;return u}):n.map(s=>{let{value:u}=s;return u})}return{items:l,transformIn:t,transformOut:i}}function Zt(e){return typeof e=="string"||typeof e=="number"||typeof e=="boolean"}function ea(e,l){const a=E(l,e.itemType,"item"),t=Zt(l)?l:E(l,e.itemTitle),i=E(l,e.itemValue,void 0),n=E(l,e.itemChildren),s=e.itemProps===!0?se(l,["children"]):E(l,e.itemProps),u={title:t,value:i,...s};return{type:a,title:u.title,value:u.value,props:u,children:a==="item"&&n?qe(e,n):void 0,raw:l}}function qe(e,l){const a=[];for(const t of l)a.push(ea(e,t));return a}function ta(e){return{items:y(()=>qe(e,e.items))}}const aa=M({baseColor:String,activeColor:String,activeClass:String,bgColor:String,disabled:Boolean,expandIcon:T,collapseIcon:T,lines:{type:[Boolean,String],default:"one"},slim:Boolean,nav:Boolean,"onClick:open":N(),"onClick:select":N(),"onUpdate:opened":N(),..._t({selectStrategy:"single-leaf",openStrategy:"list"}),...je(),...z(),...Fe(),...De(),...Te(),itemType:{type:String,default:"type"},...Yt(),...xe(),...H(),...Me(),...Ee({variant:"text"})},"VList"),da=F()({name:"VList",props:aa(),emits:{"update:selected":e=>!0,"update:activated":e=>!0,"update:opened":e=>!0,"click:open":e=>!0,"click:activate":e=>!0,"click:select":e=>!0},setup(e,l){let{slots:a}=l;const{items:t}=ta(e),{themeClasses:i}=Ie(e),{backgroundColorClasses:n,backgroundColorStyles:s}=St(C(e,"bgColor")),{borderClasses:u}=Ve(e),{densityClasses:m}=Pe(e),{dimensionStyles:d}=Le(e),{elevationClasses:S}=Oe(e),{roundedClasses:g}=Be(e),{children:k,open:h,parents:r,select:c,getPath:o}=Nt(e),v=y(()=>e.lines?`v-list--${e.lines}-line`:void 0),b=C(e,"activeColor"),w=C(e,"baseColor"),V=C(e,"color");Re(),bt({VListGroup:{activeColor:b,baseColor:w,color:V,expandIcon:C(e,"expandIcon"),collapseIcon:C(e,"collapseIcon")},VListItem:{activeClass:C(e,"activeClass"),activeColor:b,baseColor:w,color:V,density:C(e,"density"),disabled:C(e,"disabled"),lines:C(e,"lines"),nav:C(e,"nav"),slim:C(e,"slim"),variant:C(e,"variant")}});const P=D(!1),L=O();function _(I){P.value=!0}function Q(I){P.value=!1}function Y(I){var j;!P.value&&!(I.relatedTarget&&((j=L.value)!=null&&j.contains(I.relatedTarget)))&&x()}function Z(I){const j=I.target;if(!(!L.value||["INPUT","TEXTAREA"].includes(j.tagName))){if(I.key==="ArrowDown")x("next");else if(I.key==="ArrowUp")x("prev");else if(I.key==="Home")x("first");else if(I.key==="End")x("last");else return;I.preventDefault()}}function ee(I){P.value=!0}function x(I){if(L.value)return X(L.value,I)}return R(()=>f(e.tag,{ref:L,class:["v-list",{"v-list--disabled":e.disabled,"v-list--nav":e.nav,"v-list--slim":e.slim},i.value,n.value,u.value,m.value,S.value,v.value,g.value,e.class],style:[s.value,d.value,e.style],tabindex:e.disabled||P.value?-1:0,role:"listbox","aria-activedescendant":void 0,onFocusin:_,onFocusout:Q,onFocus:Y,onKeydown:Z,onMousedown:ee},{default:()=>[f(He,{items:t.value,returnObject:e.returnObject},a)]})),{open:h,select:c,focus:x,children:k,parents:r,getPath:o}}}),na=M({id:String,submenu:Boolean,...se(Bt({closeDelay:250,closeOnContentClick:!0,locationStrategy:"connected",location:void 0,openDelay:300,scrim:!1,scrollStrategy:"reposition",transition:{component:Et}}),["absolute"])},"VMenu"),va=F()({name:"VMenu",props:na(),emits:{"update:modelValue":e=>!0},setup(e,l){let{slots:a}=l;const t=W(e,"modelValue"),{scopeId:i}=Ot(),{isRtl:n}=ht(),s=ke(),u=y(()=>e.id||`v-menu-${s}`),m=O(),d=U(Se,null),S=D(new Set);$(Se,{register(){S.value.add(s)},unregister(){S.value.delete(s)},closeParents(o){setTimeout(()=>{var v;!S.value.size&&!e.persistent&&(o==null||(v=m.value)!=null&&v.contentEl&&!Ct(o,m.value.contentEl))&&(t.value=!1,d==null||d.closeParents())},40)}}),ie(()=>{d==null||d.unregister(),document.removeEventListener("focusin",g)}),pt(()=>t.value=!1);async function g(o){var w,V,P;const v=o.relatedTarget,b=o.target;await wt(),t.value&&v!==b&&((w=m.value)!=null&&w.contentEl)&&((V=m.value)!=null&&V.globalTop)&&![document,m.value.contentEl].includes(b)&&!m.value.contentEl.contains(b)&&((P=me(m.value.contentEl)[0])==null||P.focus())}Ae(t,o=>{o?(d==null||d.register(),ye&&document.addEventListener("focusin",g,{once:!0})):(d==null||d.unregister(),ye&&document.removeEventListener("focusin",g))},{immediate:!0});function k(o){d==null||d.closeParents(o)}function h(o){var v,b,w,V,P;if(!e.disabled)if(o.key==="Tab"||o.key==="Enter"&&!e.closeOnContentClick){if(o.key==="Enter"&&(o.target instanceof HTMLTextAreaElement||o.target instanceof HTMLInputElement&&o.target.closest("form")))return;o.key==="Enter"&&o.preventDefault(),kt(me((v=m.value)==null?void 0:v.contentEl,!1),o.shiftKey?"prev":"next",_=>_.tabIndex>=0)||(t.value=!1,(w=(b=m.value)==null?void 0:b.activatorEl)==null||w.focus())}else e.submenu&&o.key===(n.value?"ArrowRight":"ArrowLeft")&&(t.value=!1,(P=(V=m.value)==null?void 0:V.activatorEl)==null||P.focus())}function r(o){var b;if(e.disabled)return;const v=(b=m.value)==null?void 0:b.contentEl;v&&t.value?o.key==="ArrowDown"?(o.preventDefault(),o.stopImmediatePropagation(),X(v,"next")):o.key==="ArrowUp"?(o.preventDefault(),o.stopImmediatePropagation(),X(v,"prev")):e.submenu&&(o.key===(n.value?"ArrowRight":"ArrowLeft")?t.value=!1:o.key===(n.value?"ArrowLeft":"ArrowRight")&&(o.preventDefault(),X(v,"first"))):(e.submenu?o.key===(n.value?"ArrowLeft":"ArrowRight"):["ArrowDown","ArrowUp"].includes(o.key))&&(t.value=!0,o.preventDefault(),setTimeout(()=>setTimeout(()=>r(o))))}const c=y(()=>G({"aria-haspopup":"menu","aria-expanded":String(t.value),"aria-owns":u.value,onKeydown:r},e.activatorProps));return R(()=>{const o=be.filterProps(e);return f(be,G({ref:m,id:u.value,class:["v-menu",e.class],style:e.style},o,{modelValue:t.value,"onUpdate:modelValue":v=>t.value=v,absolute:!0,activatorProps:c.value,location:e.location??(e.submenu?"end":"bottom"),"onClick:outside":k,onKeydown:h},i),{activator:a.activator,default:function(){for(var v=arguments.length,b=new Array(v),w=0;w<v;w++)b[w]=arguments[w];return f(J,{root:"VMenu"},{default:()=>{var V;return[(V=a.default)==null?void 0:V.call(a,...b)]}})}})}),It({id:u,ΨopenChildren:S},m)}});export{va as V,da as a,pe as b,qt as c,zt as d,ca as e,Yt as m,Kt as u};
