import{d as g,e as r,c as l,a as n,f as a,w as t,g as d,F as w,u as D,o as c,k as f,V as C,i as _,r as V,t as K,h as N,j as k}from"./index-BCXkcNoo.js";import{d as S,c as x,V as j,a as y,b}from"./VCardText-BEYfI6V1.js";import{V as v}from"./VDataTable-D_4U8cp9.js";import{V as U}from"./VTextField-Dkx9KPwU.js";import"./VGrid-Dcmurj4t.js";import"./VImg-XuFL4q6t.js";import"./forwardRefs-BpjxVdNq.js";import"./VMenu-CEjcWp_V.js";import"./VDivider-CoLL375C.js";import"./VOverlay-uA0yxJrw.js";import"./VCheckboxBtn-Bhd-wnJi.js";const P={class:"v-data-table__tr"},A=["colspan"],B={class:"ms-10"},T={class:"d-flex space-between gap-2"},F=["onClick"],$={class:"mi-1"},z=g({__name:"supplier-list",setup(I){const m=D(),i=r("");r(!1),r(null),r(null);const H=[{id:"SUP001",name:"Nhà cung cấp 1",joinDate:new Date("2023-01-15"),warehouseCount:3,productCount:50,warehouses:[{id:"WH001",name:"Kho A"},{id:"WH002",name:"Kho B"},{id:"WH003",name:"Kho C"}]},{id:"SUP002",name:"Nhà cung cấp 2",joinDate:new Date("2023-02-10"),warehouseCount:2,productCount:30,warehouses:[{id:"WH004",name:"Kho D"},{id:"WH005",name:"Kho E"}]},{id:"SUP003",name:"Nhà cung cấp 3",joinDate:new Date("2023-03-05"),warehouseCount:4,productCount:70,warehouses:[{id:"WH006",name:"Kho F"},{id:"WH007",name:"Kho G"},{id:"WH008",name:"Kho H"},{id:"WH009",name:"Kho I"}]},{id:"SUP004",name:"Nhà cung cấp 4",joinDate:new Date("2023-04-20"),warehouseCount:5,productCount:100,warehouses:[{id:"WH010",name:"Kho J"},{id:"WH011",name:"Kho K"},{id:"WH012",name:"Kho L"},{id:"WH013",name:"Kho M"},{id:"WH014",name:"Kho N"}]},{id:"SUP005",name:"Nhà cung cấp 5",joinDate:new Date("2023-05-15"),warehouseCount:3,productCount:40,warehouses:[{id:"WH015",name:"Kho O"},{id:"WH016",name:"Kho P"},{id:"WH017",name:"Kho Q"}]},{id:"SUP006",name:"Nhà cung cấp 6",joinDate:new Date("2023-06-10"),warehouseCount:2,productCount:25,warehouses:[{id:"WH018",name:"Kho R"},{id:"WH019",name:"Kho S"}]},{id:"SUP007",name:"Nhà cung cấp 7",joinDate:new Date("2023-07-05"),warehouseCount:4,productCount:60,warehouses:[{id:"WH020",name:"Kho T"},{id:"WH021",name:"Kho U"},{id:"WH022",name:"Kho V"},{id:"WH023",name:"Kho W"}]},{id:"SUP008",name:"Nhà cung cấp 8",joinDate:new Date("2023-08-01"),warehouseCount:3,productCount:35,warehouses:[{id:"WH024",name:"Kho X"},{id:"WH025",name:"Kho Y"},{id:"WH026",name:"Kho Z"}]},{id:"SUP009",name:"Nhà cung cấp 9",joinDate:new Date("2023-09-15"),warehouseCount:2,productCount:20,warehouses:[{id:"WH027",name:"Kho AA"},{id:"WH028",name:"Kho AB"}]},{id:"SUP010",name:"Nhà cung cấp 10",joinDate:new Date("2023-10-10"),warehouseCount:5,productCount:80,warehouses:[{id:"WH029",name:"Kho AC"},{id:"WH030",name:"Kho AD"},{id:"WH031",name:"Kho AE"},{id:"WH032",name:"Kho AF"},{id:"WH033",name:"Kho AG"}]}],p=[{title:"",key:"data-table-expand",sortable:!1},{title:"Sản phẩm",key:"name"},{title:"Số lượng mặt hàng",key:"productCount"},{title:"Số lượng kho hàng",key:"warehouseCount"},{title:"ngày gia nhập",key:"joinDate"},{title:"Chi tiết",key:"action",sortable:!1}],W=u=>{if(!u)return"Không có dữ liệu";const e=new Date(u);if(isNaN(e.getTime()))return"Ngày không hợp lệ";const h=e.toLocaleString("vi-VN",{month:"long"}),o=e.getFullYear();return` ${h}/${o}`};return(u,e)=>{const h=V("IconBtn");return c(),l(w,null,[n(S,{class:"pb-3"},{default:t(()=>[n(j,{class:"text-primary"},{default:t(()=>[n(C,{icon:"bx-buildings"}),e[1]||(e[1]=f(" Danh sách Nhà cung cấp "))]),_:1})]),_:1}),a("div",null,[n(x,{class:"pt-0"},{default:t(()=>[n(y,{style:{direction:"ltr"}},{default:t(()=>[n(b,{cols:"12","offset-md":"0",md:"4"},{default:t(()=>[n(U,{modelValue:d(i),"onUpdate:modelValue":e[0]||(e[0]=o=>_(i)?i.value=o:null),placeholder:"Search ...","append-inner-icon":"bx-search","single-line":"","hide-details":"",dense:"",outlined:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),n(v,{headers:p,items:H||[],search:d(i),"items-per-page":10,class:"text-no-wrap"},{"expanded-row":t(o=>[a("tr",P,[a("td",{colspan:p.length},[a("div",B,[e[2]||(e[2]=a("div",null,"Danh sách kho",-1)),a("div",T,[(c(!0),l(w,null,N(o.item.warehouses,s=>(c(),l("div",{key:s.id,class:"mb-1"},[a("a",{href:"#",onClick:k(L=>d(m).push(`warehouse-info/${s.id}`),["prevent"]),class:"text-decoration-none text-primary"},K(s.name),9,F)]))),128))])])],8,A)])]),"item.joinDate":t(({item:o})=>[a("p",$,K(W(o.joinDate)),1)]),"item.action":t(({item:o})=>[n(h,{onClick:s=>d(m).push(`supplier-info/${o.id}`)},{default:t(()=>[n(C,{icon:"bx-info-circle"})]),_:2},1032,["onClick"])]),_:1},8,["items","search"])])],64)}}});export{z as default};
