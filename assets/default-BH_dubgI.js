import{_ as t,D as v}from"./VerticalNavLink.vue_vue_type_style_index_0_lang-BoNgISoj.js";import{d as s,e as g,c as d,o as c,n as p,u as m,f as r,a as e,V as u,t as _,g as b,w as o,F as f,b as x,r as k}from"./index-bcFtjXeZ.js";import"./VImg-BeA97slK.js";import"./forwardRefs-Cbr8fRSZ.js";import"./VMenu-kyNQ37VA.js";import"./VDivider-DQaI0Veg.js";import"./logo-D3Ia18PY.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./VSpacer-Dt3QwkgE.js";/* empty css              */const C={class:"nav-item-title"},V={class:"nav-group-children-wrapper"},w={class:"nav-group-children"},h=s({__name:"VerticalNavGroup",props:{item:{}},setup(l){const i=g(!1);return(a,n)=>(c(),d("li",{class:p(["nav-group",m(i)&&"open"])},[r("div",{class:"nav-group-label",onClick:n[0]||(n[0]=N=>i.value=!m(i))},[e(u,{icon:a.item.icon||"bxs-circle",class:"nav-item-icon"},null,8,["icon"]),r("span",C,_(a.item.title),1),r("span",{class:p(["nav-item-badge",a.item.badgeClass])},_(a.item.badgeContent),3),e(u,{icon:"bx-chevron-right",class:"nav-group-arrow"})]),r("div",V,[r("ul",w,[b(a.$slots,"default")])])],2))}}),y=s({__name:"NavItems",setup(l){return(i,a)=>(c(),d(f,null,[e(h,{item:{title:"Nhà cung cấp"}},{default:o(()=>[e(t,{item:{title:"Danh sách",icon:"bx-package",to:"/carrier/supplier"}}),e(t,{item:{title:"Chờ duyệt",icon:"bx-package",to:"/carrier/supplier"}})]),_:1}),e(t,{item:{title:"Kho hàng",icon:"bx-home",to:"/carrier/supplier"}}),e(t,{item:{title:"Đội xe",icon:"bx-bus",to:"/carrier/truck"}}),e(h,{item:{title:"Đơn vận chuyển",icon:"bx-receipt"}},{default:o(()=>[e(t,{item:{title:"Danh sách",icon:"bx-package"}}),e(t,{item:{title:"Chờ duyệt",icon:"bx-package"}})]),_:1}),e(t,{item:{title:"Kế hoạch vận chuyển",icon:"bx-receipt",to:"/carrier/plan"}}),e(t,{item:{title:"Thống kê",icon:"bx-bar-chart-alt",to:"/carrier/statistic"}})],64))}}),G=s({__name:"default",setup(l){return(i,a)=>{const n=k("RouterView");return c(),x(v,null,{nav:o(()=>[e(y)]),main:o(()=>[e(n)]),_:1})}}});export{G as default};
