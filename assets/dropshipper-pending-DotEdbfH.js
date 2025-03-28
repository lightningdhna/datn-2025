import{d as T,e as s,c as R,a as t,w as o,i as V,g as u,u as F,o as S,f as x,V as y,r as _,k as l,t as D,m as f}from"./index-CLGN3N2e.js";import{V as h}from"./VCard-BuOT5A29.js";import{V as C}from"./VDialog-CcnegwQp.js";import{V as q,a as L,b as U,c as g}from"./VCardText-BiO770vU.js";import{V as j}from"./VTextField-DMpSt2IJ.js";import{V as A}from"./VDataTable-BuhQZ_NT.js";import"./VImg-Byj51mWs.js";import"./VOverlay-D7GsUQ9h.js";import"./forwardRefs-DLrdi3PU.js";/* empty css              */import"./VAvatar-BS1z1ykc.js";import"./VMenu-BocsGej7.js";import"./VDivider-BvyIEGsn.js";import"./VCheckboxBtn-CgF2Iqt2.js";const O={class:"d-flex justify-center gap-4"},P={class:"d-flex justify-center gap-4"},ne=T({__name:"dropshipper-pending",setup(X){F();const d=s(Array.from({length:5},(n,e)=>({dropshipperName:`Dropshipper ${e+1}`,id:`DSH-${Math.floor(1e3+Math.random()*9e3)}`,productName:`Sản phẩm ${e+1}`,productId:`PRD-${Math.floor(1e3+Math.random()*9e3)}`,commissionFee:`${(Math.random()*10+1).toFixed(2)}%`,registrationDate:new Date(Date.now()-Math.random()*1e10),completedOrders:Math.floor(Math.random()*500),pendingOrders:Math.floor(Math.random()*100),quantitySold:Math.floor(Math.random()*1e3)}))),M=[{key:"dropshipperName",align:" d-none"},{title:"Cửa hàng",key:"dropshipper"},{key:"productName",align:" d-none"},{title:"Tên sản phẩm",key:"product"},{title:"Mã sản phẩm",key:"id"},{title:"Phí hoa hồng dự kiến",key:"commissionFee",maxWidth:"100px"},{title:"Ngày đăng ký",key:"registrationDate"},{key:"action"}],N=n=>{if(!n)return"Không có dữ liệu";const e=new Date(n);if(isNaN(e.getTime()))return"Ngày không hợp lệ";const m=e.getDate(),c=e.getMonth()+1,a=e.getFullYear();return`ngày ${m}/${c}/${a}`},p=s(""),r=s(!1),k=s(""),$=n=>{k.value=n,r.value=!0},B=()=>{const n=d.value.findIndex(e=>e.id===k.value);n!==-1&&d.value.splice(n,1),k.value="",r.value=!1},i=s(!1),v=s(""),I=n=>{v.value=n,i.value=!0},w=()=>{const n=d.value.findIndex(e=>e.id===v.value);n!==-1&&d.value.splice(n,1),v.value="",i.value=!1};return(n,e)=>{const m=_("RouterLink"),c=_("IconBtn");return S(),R("div",null,[t(h,null,{default:o(()=>[t(q,{class:""},{default:o(()=>[t(y,{icon:"bx-package",size:"2rem",class:"me-2"}),e[5]||(e[5]=x("span",null,"Danh sách dropshipper",-1)),t(L,{class:"mt-2 mb-4"},{default:o(()=>[t(U,{cols:"12","offset-md":"0",md:"4"},{default:o(()=>[t(j,{modelValue:u(p),"onUpdate:modelValue":e[0]||(e[0]=a=>V(p)?p.value=a:null),placeholder:"Search ...","append-inner-icon":"bx-search","single-line":"","hide-details":"",dense:"",outlined:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),t(g,null,{default:o(()=>[t(h,null,{default:o(()=>[t(g,null,{default:o(()=>[t(A,{items:u(d),headers:M,"items-per-page":20,search:u(p)},{"item.product":o(({item:a})=>[t(m,{to:`/supplier/product-info/${a.id}`},{default:o(()=>[l(D(a.productName),1)]),_:2},1032,["to"])]),"item.dropshipper":o(({item:a})=>[t(m,{to:`/supplier/dropshipper-info/${a.id}`},{default:o(()=>[l(D(a.dropshipperName),1)]),_:2},1032,["to"])]),"item.registrationDate":o(({item:a})=>[l(D(N(a.registrationDate)),1)]),"item.action":o(({item:a})=>[t(c,{onClick:b=>$(a.id)},{default:o(()=>[t(y,{icon:"bx-trash",color:"error"})]),_:2},1032,["onClick"]),t(c,{onClick:b=>I(a.id)},{default:o(()=>[t(y,{icon:"bx-check",color:"success"})]),_:2},1032,["onClick"])]),_:1},8,["items","search"])]),_:1})]),_:1})]),_:1})]),_:1}),t(C,{modelValue:u(i),"onUpdate:modelValue":e[2]||(e[2]=a=>V(i)?i.value=a:null),"max-width":"500px"},{default:o(()=>[t(h,{title:"Bạn có muốn duyệt đăng ký này không?"},{default:o(()=>[t(g,null,{default:o(()=>[x("div",O,[t(f,{variant:"outlined",color:"secondary",onClick:e[1]||(e[1]=()=>i.value=!1)},{default:o(()=>e[6]||(e[6]=[l(" Bỏ qua ")])),_:1}),t(f,{color:"success",variant:"outlined",onClick:w},{default:o(()=>e[7]||(e[7]=[l(" Xác nhận duyệt ")])),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(C,{modelValue:u(r),"onUpdate:modelValue":e[4]||(e[4]=a=>V(r)?r.value=a:null),"max-width":"500px"},{default:o(()=>[t(h,{title:"Bạn có muốn xóa đăng ký này không?"},{default:o(()=>[t(g,null,{default:o(()=>[x("div",P,[t(f,{variant:"outlined",color:"secondary",onClick:e[3]||(e[3]=()=>r.value=!1)},{default:o(()=>e[8]||(e[8]=[l(" Bỏ qua ")])),_:1}),t(f,{color:"error",variant:"outlined",onClick:B},{default:o(()=>e[9]||(e[9]=[l(" Xác nhận xóa ")])),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}});export{ne as default};
