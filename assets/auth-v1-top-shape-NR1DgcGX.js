import{V as v,m as _}from"./VCheckboxBtn-CgF2Iqt2.js";import{b as A,c as h,d as B,e as R,f as S}from"./VTextField-DMpSt2IJ.js";import{p as k,q as x,x as w,ap as U,y as q,C as P,bA as E,a as i,D as V,E as N,e as T,a3 as W,d as j,aj as L,c as M,o as $,F as z,h as G,m as H,g as J}from"./index-CLGN3N2e.js";import{f as K}from"./forwardRefs-DLrdi3PU.js";const O=x({...B(),...N(_(),["inline"])},"VCheckbox"),oe=k()({name:"VCheckbox",inheritAttrs:!1,props:O(),emits:{"update:modelValue":e=>!0,"update:focused":e=>!0},setup(e,l){let{attrs:n,slots:c}=l;const o=w(e,"modelValue"),{isFocused:t,focus:d,blur:m}=A(e),s=U(),r=q(()=>e.id||`checkbox-${s}`);return P(()=>{const[a,f]=E(n),b=h.filterProps(e),u=v.filterProps(e);return i(h,V({class:["v-checkbox",e.class]},a,b,{modelValue:o.value,"onUpdate:modelValue":p=>o.value=p,id:r.value,focused:t.value,style:e.style}),{...c,default:p=>{let{id:y,messagesId:g,isDisabled:F,isReadonly:C,isValid:D}=p;return i(v,V(u,{id:y.value,"aria-describedby":g.value,disabled:F.value,readonly:C.value},f,{error:D.value===!1,modelValue:o.value,"onUpdate:modelValue":I=>o.value=I,onFocus:d,onBlur:m}),c)}})}),{}}}),Q=x({...W(),...S()},"VForm"),te=k()({name:"VForm",props:Q(),emits:{"update:modelValue":e=>!0,submit:e=>!0},setup(e,l){let{slots:n,emit:c}=l;const o=R(e),t=T();function d(s){s.preventDefault(),o.reset()}function m(s){const r=s,a=o.validate();r.then=a.then.bind(a),r.catch=a.catch.bind(a),r.finally=a.finally.bind(a),c("submit",r),r.defaultPrevented||a.then(f=>{var u;let{valid:b}=f;b&&((u=t.value)==null||u.submit())}),r.preventDefault()}return P(()=>{var s;return i("form",{ref:t,class:["v-form",e.class],style:e.style,novalidate:!0,onReset:d,onSubmit:m},[(s=n.default)==null?void 0:s.call(n,o)])}),K(o,t)}}),ae=j({__name:"AuthProvider",setup(e){const{global:l}=L(),n=[{icon:"bxl-facebook",color:"#4267b2",colorInDark:"#4267b2"},{icon:"bxl-twitter",color:"#1da1f2",colorInDark:"#1da1f2"},{icon:"bxl-github",color:"#272727",colorInDark:"#fff"},{icon:"bxl-google",color:"#db4437",colorInDark:"#db4437"}];return(c,o)=>($(),M(z,null,G(n,t=>i(H,{key:t.icon,icon:t.icon,variant:"text",color:J(l).name.value==="dark"?t.colorInDark:t.color},null,8,["icon","color"])),64))}}),se="/datn-2025/assets/auth-v1-bottom-shape-crxWNCWd.svg",re="/datn-2025/assets/auth-v1-top-shape-eAwqa87i.svg";export{te as V,ae as _,re as a,se as b,oe as c};
