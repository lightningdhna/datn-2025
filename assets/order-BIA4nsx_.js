import{d as O,e as D,y as V,b as T,w as t,u as U,o as $,a as r,k as i,V as N,g as s,i as w,f as u,r as x,t as o}from"./index-CLGN3N2e.js";import{V as B}from"./VCard-BuOT5A29.js";import{a as H,b as L,V as M,c as Q}from"./VCardText-BiO770vU.js";import{V as A}from"./VTextField-DMpSt2IJ.js";import{a as I,V as F,b as G,c as R}from"./VTabs-D10IdIeQ.js";import{V as P,d as K}from"./VDataTable-BuhQZ_NT.js";import"./VImg-Byj51mWs.js";/* empty css              */import"./VAvatar-BS1z1ykc.js";import"./forwardRefs-DLrdi3PU.js";import"./VOverlay-D7GsUQ9h.js";import"./VMenu-BocsGej7.js";import"./VDivider-BvyIEGsn.js";import"./VCheckboxBtn-CgF2Iqt2.js";const W={class:"text-button"},z={class:"text-button"},X={class:"text-button"},Y={class:"text-button"},pe=O({__name:"order",setup(j){const f=U(),l=D("1"),p=D("");D(!1),D(null),D(null);const v=a=>{if(a==="confirmed")return"info";if(a==="completed")return"success";if(a==="declined")return"error";if(a==="pending")return"warning"},S=a=>{if(a==="confirmed")return"Đang giao";if(a==="completed")return"Đã hoàn thành";if(a==="declined")return"Đã hủy";if(a==="pending")return"Đợi duyệt"},h=[{id:"ORD001",productName:"Táo",productId:"PRD001",supplierName:"Nhà cung cấp 1",supplierId:"SUP001",orderDate:new Date("2023-01-15"),address:"Hà Nội",status:"pending"},{id:"ORD002",productName:"Cam",productId:"PRD002",supplierName:"Nhà cung cấp 2",supplierId:"SUP002",orderDate:new Date("2023-02-10"),address:"Hồ Chí Minh",status:"completed"},{id:"ORD003",productName:"Chuối",productId:"PRD003",supplierName:"Nhà cung cấp 3",supplierId:"SUP003",orderDate:new Date("2023-03-05"),address:"Đà Nẵng",status:"confirmed"},{id:"ORD004",productName:"Xoài",productId:"PRD004",supplierName:"Nhà cung cấp 4",supplierId:"SUP004",orderDate:new Date("2023-04-20"),address:"Hải Phòng",status:"declined"},{id:"ORD005",productName:"Dưa hấu",productId:"PRD005",supplierName:"Nhà cung cấp 5",supplierId:"SUP005",orderDate:new Date("2023-05-15"),address:"Cần Thơ",status:"pending"},{id:"ORD006",productName:"Ổi",productId:"PRD006",supplierName:"Nhà cung cấp 6",supplierId:"SUP006",orderDate:new Date("2023-06-10"),address:"Nha Trang",status:"completed"},{id:"ORD007",productName:"Mận",productId:"PRD007",supplierName:"Nhà cung cấp 7",supplierId:"SUP007",orderDate:new Date("2023-07-05"),address:"Vũng Tàu",status:"confirmed"},{id:"ORD008",productName:"Dứa",productId:"PRD008",supplierName:"Nhà cung cấp 8",supplierId:"SUP008",orderDate:new Date("2023-08-01"),address:"Quảng Ninh",status:"pending"},{id:"ORD009",productName:"Nho",productId:"PRD009",supplierName:"Nhà cung cấp 9",supplierId:"SUP009",orderDate:new Date("2023-09-15"),address:"Huế",status:"completed"},{id:"ORD010",productName:"Bưởi",productId:"PRD010",supplierName:"Nhà cung cấp 10",supplierId:"SUP010",orderDate:new Date("2023-10-10"),address:"Bình Dương",status:"declined"},{id:"ORD011",productName:"Chanh",productId:"PRD011",supplierName:"Nhà cung cấp 1",supplierId:"SUP001",orderDate:new Date("2023-11-01"),address:"Thanh Hóa",status:"pending"},{id:"ORD012",productName:"Quýt",productId:"PRD012",supplierName:"Nhà cung cấp 2",supplierId:"SUP002",orderDate:new Date("2023-12-05"),address:"Nghệ An",status:"completed"},{id:"ORD013",productName:"Dâu tây",productId:"PRD013",supplierName:"Nhà cung cấp 3",supplierId:"SUP003",orderDate:new Date("2024-01-10"),address:"Thái Nguyên",status:"confirmed"},{id:"ORD014",productName:"Kiwi",productId:"PRD014",supplierName:"Nhà cung cấp 4",supplierId:"SUP004",orderDate:new Date("2024-02-15"),address:"Hậu Giang",status:"pending"},{id:"ORD015",productName:"Lựu",productId:"PRD015",supplierName:"Nhà cung cấp 5",supplierId:"SUP005",orderDate:new Date("2024-03-20"),address:"Đồng Nai",status:"completed"},{id:"ORD016",productName:"Đào",productId:"PRD016",supplierName:"Nhà cung cấp 6",supplierId:"SUP006",orderDate:new Date("2024-04-25"),address:"Long An",status:"confirmed"},{id:"ORD017",productName:"Mít",productId:"PRD017",supplierName:"Nhà cung cấp 7",supplierId:"SUP007",orderDate:new Date("2024-05-30"),address:"Tiền Giang",status:"declined"},{id:"ORD018",productName:"Na",productId:"PRD018",supplierName:"Nhà cung cấp 8",supplierId:"SUP008",orderDate:new Date("2024-06-05"),address:"Bến Tre",status:"pending"},{id:"ORD019",productName:"Sầu riêng",productId:"PRD019",supplierName:"Nhà cung cấp 9",supplierId:"SUP009",orderDate:new Date("2024-07-10"),address:"Phú Thọ",status:"completed"},{id:"ORD020",productName:"Me",productId:"PRD020",supplierName:"Nhà cung cấp 10",supplierId:"SUP010",orderDate:new Date("2024-08-15"),address:"Quảng Nam",status:"confirmed"}],y=[{title:"Sản phẩm",key:"productName"},{title:"Nhà cung cấp",key:"supplierName"},{title:"Ngày đặt",key:"orderDate"},{title:"Địa chỉ",key:"address"},{title:"Trạng thái",key:"status"},{title:"Chi tiết",key:"action",sortable:!1}],_=[{title:"Sản phẩm",key:"productName"},{title:"Nhà cung cấp",key:"supplierName"},{title:"Ngày đặt",key:"orderDate"},{title:"Địa chỉ",key:"address"},{title:"Chi tiết",key:"action",sortable:!1}],g=a=>{if(!a)return"Không có dữ liệu";const d=new Date(a);if(isNaN(d.getTime()))return"Ngày không hợp lệ";const n=d.getHours(),c=d.getDate(),e=d.getMonth()+1,m=d.getFullYear();return`${n}h ngày ${c}/${e}/${m}`},b=V(()=>h.filter(a=>a.status==="pending")),k=V(()=>h.filter(a=>a.status==="confirmed")),C=V(()=>h.filter(a=>a.status==="completed"));return(a,d)=>{const n=x("RouterLink"),c=x("IconBtn");return $(),T(B,null,{default:t(()=>[r(M,{class:"text-primary"},{default:t(()=>[r(N,{icon:"bx-receipt"}),d[3]||(d[3]=i(" Danh sách đơn hàng ")),r(H,{style:{direction:"ltr"},class:"mt-6"},{default:t(()=>[r(L,{cols:"12","offset-md":"0",md:"4"},{default:t(()=>[r(A,{modelValue:s(p),"onUpdate:modelValue":d[0]||(d[0]=e=>w(p)?p.value=e:null),placeholder:"Search ...","append-inner-icon":"bx-search","single-line":"","hide-details":"",dense:"",outlined:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),r(F,{modelValue:s(l),"onUpdate:modelValue":d[1]||(d[1]=e=>w(l)?l.value=e:null),class:"mt-6"},{default:t(()=>[r(I,{value:"1"},{default:t(()=>d[4]||(d[4]=[u("div",{class:"d-flex align-center"},[u("span",null,"Tất cả")],-1)])),_:1}),r(I,{value:"2"},{default:t(()=>d[5]||(d[5]=[u("div",{class:"d-flex align-center text-success"},[u("span",null,"Đã hoàn thành")],-1)])),_:1}),r(I,{value:"3"},{default:t(()=>d[6]||(d[6]=[u("div",{class:"d-flex align-center text-info"},[u("span",null,"Đang giao")],-1)])),_:1}),r(I,{value:"4"},{default:t(()=>d[7]||(d[7]=[u("div",{class:"d-flex align-center text-warning"},[u("span",null,"Đợi duyệt")],-1)])),_:1})]),_:1},8,["modelValue"]),r(Q,null,{default:t(()=>[r(G,{modelValue:s(l),"onUpdate:modelValue":d[2]||(d[2]=e=>w(l)?l.value=e:null)},{default:t(()=>[r(R,{value:"1"},{default:t(()=>[r(P,{items:h,headers:y,class:"text-button","items-per-page":20,search:s(p)},{"item.productName":t(({item:e})=>[r(n,{to:`product-info/${e.productId}`},{default:t(()=>[i(o(e.productName),1)]),_:2},1032,["to"])]),"item.supplierName":t(({item:e})=>[r(n,{to:`product-info/${e.supplierId}`},{default:t(()=>[i(o(e.supplierName),1)]),_:2},1032,["to"])]),"item.orderDate":t(({item:e})=>[u("div",W,o(g(e.orderDate)),1)]),"item.status":t(({item:e})=>[r(K,{color:v(e.status),size:"small",class:"font-weight-medium"},{default:t(()=>[i(o(S(e.status)),1)]),_:2},1032,["color"])]),"item.action":t(({item:e})=>[r(c,null,{default:t(()=>[r(N,{icon:"bx-info-circle",onClick:m=>s(f).push(`order-info/${e.id}`)},null,8,["onClick"])]),_:2},1024)]),_:1},8,["search"])]),_:1}),r(R,{value:"2"},{default:t(()=>[r(P,{items:s(C),headers:_,class:"text-button","items-per-page":20,search:s(p)},{"item.productName":t(({item:e})=>[r(n,{to:`product-info/${e.productId}`},{default:t(()=>[i(o(e.productName),1)]),_:2},1032,["to"])]),"item.supplierName":t(({item:e})=>[r(n,{to:`product-info/${e.supplierId}`},{default:t(()=>[i(o(e.supplierName),1)]),_:2},1032,["to"])]),"item.orderDate":t(({item:e})=>[u("div",z,o(g(e.orderDate)),1)]),"item.action":t(({item:e})=>[r(c,null,{default:t(()=>[r(N,{icon:"bx-info-circle",onClick:m=>s(f).push(`order-info/${e.id}`)},null,8,["onClick"])]),_:2},1024)]),_:1},8,["items","search"])]),_:1}),r(R,{value:"3"},{default:t(()=>[r(P,{items:s(k),headers:_,class:"text-button","items-per-page":20,search:s(p)},{"item.productName":t(({item:e})=>[r(n,{to:`product-info/${e.productId}`},{default:t(()=>[i(o(e.productName),1)]),_:2},1032,["to"])]),"item.supplierName":t(({item:e})=>[r(n,{to:`product-info/${e.supplierId}`},{default:t(()=>[i(o(e.supplierName),1)]),_:2},1032,["to"])]),"item.orderDate":t(({item:e})=>[u("div",X,o(g(e.orderDate)),1)]),"item.action":t(({item:e})=>[r(c,null,{default:t(()=>[r(N,{icon:"bx-info-circle",onClick:m=>s(f).push(`order-info/${e.id}`)},null,8,["onClick"])]),_:2},1024)]),_:1},8,["items","search"])]),_:1}),r(R,{value:"4"},{default:t(()=>[r(P,{items:s(b),headers:_,class:"text-button","items-per-page":20,search:s(p)},{"item.productName":t(({item:e})=>[r(n,{to:`product-info/${e.productId}`},{default:t(()=>[i(o(e.productName),1)]),_:2},1032,["to"])]),"item.supplierName":t(({item:e})=>[r(n,{to:`product-info/${e.supplierId}`},{default:t(()=>[i(o(e.supplierName),1)]),_:2},1032,["to"])]),"item.orderDate":t(({item:e})=>[u("div",Y,o(g(e.orderDate)),1)]),"item.action":t(({item:e})=>[r(c,null,{default:t(()=>[r(N,{icon:"bx-info-circle",onClick:m=>s(f).push(`order-info/${e.id}`)},null,8,["onClick"])]),_:2},1024)]),_:1},8,["items","search"])]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1})}}});export{pe as default};
