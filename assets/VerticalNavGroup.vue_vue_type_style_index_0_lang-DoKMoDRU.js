import{d as c,e as p,c as d,o as m,n as o,g as t,f as s,a as i,V as r,t as l,ai as u}from"./index-CLGN3N2e.js";const v={class:"nav-item-title"},g={class:"nav-group-children-wrapper"},f={class:"nav-group-children"},C=c({__name:"VerticalNavGroup",props:{item:{}},setup(_){const a=p(!1);return(e,n)=>(m(),d("li",{class:o(["nav-group",t(a)&&"open"])},[s("div",{class:"nav-group-label",onClick:n[0]||(n[0]=b=>a.value=!t(a))},[i(r,{icon:e.item.icon||"bxs-circle",class:"nav-item-icon"},null,8,["icon"]),s("span",v,l(e.item.title),1),s("span",{class:o(["nav-item-badge",e.item.badgeClass])},l(e.item.badgeContent),3),i(r,{icon:"bx-chevron-right",class:"nav-group-arrow"})]),s("div",g,[s("ul",f,[u(e.$slots,"default")])])],2))}});export{C as _};
