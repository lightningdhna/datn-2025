import{m as c,p as u,N as h,ad as m,O as g,i as y,J as s,q as f,a as r,W as _,a1 as C}from"./index-bcFtjXeZ.js";const b=u({color:String,inset:Boolean,length:[Number,String],opacity:[Number,String],thickness:[Number,String],vertical:Boolean,...C(),..._()},"VDivider"),S=c()({name:"VDivider",props:b(),setup(e,l){let{attrs:i,slots:a}=l;const{themeClasses:n}=h(e),{textColorClasses:o,textColorStyles:d}=m(g(e,"color")),v=y(()=>{const t={};return e.length&&(t[e.vertical?"height":"width"]=s(e.length)),e.thickness&&(t[e.vertical?"borderRightWidth":"borderTopWidth"]=s(e.thickness)),t});return f(()=>{const t=r("hr",{class:[{"v-divider":!0,"v-divider--inset":e.inset,"v-divider--vertical":e.vertical},n.value,o.value,e.class],style:[v.value,d.value,{"--v-border-opacity":e.opacity},e.style],"aria-orientation":!i.role||i.role==="separator"?e.vertical?"vertical":"horizontal":void 0,role:`${i.role||"separator"}`},null);return a.default?r("div",{class:["v-divider__wrapper",{"v-divider__wrapper--vertical":e.vertical,"v-divider__wrapper--inset":e.inset}]},[t,r("div",{class:"v-divider__content"},[a.default()]),t]):t}),{}}});export{S as V};
