import{_ as t,D as v}from"./VerticalNavLink.vue_vue_type_style_index_0_lang-DogX2ikr.js";import{d as s,e as g,c as d,o as c,n as p,u as m,f as n,a as e,V as u,t as _,g as b,w as o,F as f,b as x,r as k}from"./index-Ydo8RThe.js";import"./VImg-RtgU9bIw.js";import"./forwardRefs-DL3rrKuP.js";import"./VMenu-D2J_GcGU.js";import"./VDivider-DQBMRc3u.js";import"./logo-D3Ia18PY.js";import"./VSpacer-B6QmnisZ.js";/* empty css              */const C={class:"nav-item-title"},V={class:"nav-group-children-wrapper"},w={class:"nav-group-children"},h=s({__name:"VerticalNavGroup",props:{item:{}},setup(l){const i=g(!1);return(a,r)=>(c(),d("li",{class:p(["nav-group",m(i)&&"open"])},[n("div",{class:"nav-group-label",onClick:r[0]||(r[0]=N=>i.value=!m(i))},[e(u,{icon:a.item.icon||"bxs-circle",class:"nav-item-icon"},null,8,["icon"]),n("span",C,_(a.item.title),1),n("span",{class:p(["nav-item-badge",a.item.badgeClass])},_(a.item.badgeContent),3),e(u,{icon:"bx-chevron-right",class:"nav-group-arrow"})]),n("div",V,[n("ul",w,[b(a.$slots,"default")])])],2))}}),y=s({__name:"NavItems",setup(l){return(i,a)=>(c(),d(f,null,[e(h,{item:{title:"Nhà cung cấp"}},{default:o(()=>[e(t,{item:{title:"Danh sách",icon:"bx-package",to:"/carrier/supplier"}}),e(t,{item:{title:"Chờ duyệt",icon:"bx-package",to:"/carrier/supplier"}})]),_:1}),e(t,{item:{title:"Kho hàng",icon:"bx-home",to:"/carrier/supplier"}}),e(t,{item:{title:"Đội xe",icon:"bx-bus",to:"/carrier/truck"}}),e(h,{item:{title:"Đơn vận chuyển",icon:"bx-receipt"}},{default:o(()=>[e(t,{item:{title:"Danh sách",icon:"bx-package"}}),e(t,{item:{title:"Chờ duyệt",icon:"bx-package"}})]),_:1}),e(t,{item:{title:"Kế hoạch vận chuyển",icon:"bx-receipt",to:"/carrier/plan"}}),e(t,{item:{title:"Thống kê",icon:"bx-bar-chart-alt",to:"/carrier/statistic"}})],64))}}),E=s({__name:"default",setup(l){return(i,a)=>{const r=k("RouterView");return c(),x(v,null,{nav:o(()=>[e(y)]),main:o(()=>[e(r)]),_:1})}}});export{E as default};
