import{d as w,V as g,c as H,a as N,b as D}from"./VCardText-BEYfI6V1.js";import{d as b,e as v,c as u,a as s,w as t,F as p,h as f,g as K,o as n,k as T,V as _,t as i,r as $,b as h,f as r,l as M,n as I}from"./index-BCXkcNoo.js";import{V as B}from"./VContainer-azt5U9Fd.js";import{V as L}from"./VCard-CJ3t3ZEl.js";import"./VGrid-Dcmurj4t.js";import"./VImg-XuFL4q6t.js";const F={class:"d-flex align-center"},X={class:"ma-4 elevation-10 text-wrap",style:{width:"auto",height:"auto","border-radius":"8px 8px 8px 8px"}},A={class:"pa-2 ma-2 ms-4"},G=b({__name:"plan",setup(Y){const l=new Date,x=`0${l.getDate()}`.slice(-2),R=`0${l.getMonth()+1}`.slice(-2),k=l.getFullYear(),C=`${x}/${R}/${k}`,e=(c,a)=>{const d=new Date(l);return d.setHours(c,a,0,0),d},V=v([{truckName:"Xe tải A",truckId:"TRK001",destinations:[{locationName:"Kho 1 - Ncc 1",address:"Hà Nội",estimatedTime:e(8,0),orderId:"ORD001",status:"complete"},{locationName:"Dropshipper 1",address:"Hải Phòng",estimatedTime:e(10,0),orderId:"ORD002",status:"complete"},{locationName:"Kho 2 - Ncc 2",address:"Đà Nẵng",estimatedTime:e(14,0),orderId:"ORD003",status:"ongoing"},{locationName:"Dropshipper 2",address:"Hồ Chí Minh",estimatedTime:e(16,0),orderId:"ORD004",status:"ongoing"},{locationName:"Dropshipper 2",address:"Hồ Chí Minh",estimatedTime:e(20,0),orderId:"ORD004",status:"ongoing"},{locationName:"Dropshipper 2",address:"Hồ Chí Minh",estimatedTime:e(22,0),orderId:"ORD004",status:"ongoing"},{locationName:"Dropshipper 2",address:"Hồ Chí Minh",estimatedTime:e(24,0),orderId:"ORD004",status:"ongoing"}]},{truckName:"Xe tải B",truckId:"TRK002",destinations:[{locationName:"Kho 3 - Ncc 3",address:"Cần Thơ",estimatedTime:e(7,0),orderId:"ORD005",status:"complete"},{locationName:"Dropshipper 3",address:"Bình Dương",estimatedTime:e(9,30),orderId:"ORD006",status:"complete"},{locationName:"Kho 4 - Ncc 4",address:"Nghệ An",estimatedTime:e(13,0),orderId:"ORD007",status:"ongoing"},{locationName:"Dropshipper 4",address:"Quảng Ninh",estimatedTime:e(20,30),orderId:"ORD008",status:"ongoing"}]},{truckName:"Xe tải C",truckId:"TRK003",destinations:[{locationName:"Kho 5 - Ncc 5",address:"Hà Nội",estimatedTime:e(6,30),orderId:"ORD009",status:"complete"},{locationName:"Dropshipper 5",address:"Hải Dương",estimatedTime:e(7,45),orderId:"ORD010",status:"complete"},{locationName:"Kho 6 - Ncc 6",address:"Thanh Hóa",estimatedTime:e(17,0),orderId:"ORD011",status:"ongoing"},{locationName:"Dropshipper 6",address:"Huế",estimatedTime:e(23,0),orderId:"ORD012",status:"ongoing"}]}]),O=c=>{if(!c)return"Không có dữ liệu";const a=new Date(c);if(isNaN(a.getTime()))return"Ngày không hợp lệ";const d=a.getHours(),m=`0${a.getMinutes()}`.slice(-2);return a.getDate(),a.getMonth()+1,a.getFullYear(),`${d}h${m}`};return(c,a)=>{const d=$("RouterLink");return n(),u(p,null,[s(w,{class:"pb-3"},{default:t(()=>[s(g,{class:"text-primary"},{default:t(()=>[s(_,{icon:"bxs-truck"}),T(" Lịch trình cho các xe : Ngày "+i(C))]),_:1})]),_:1}),(n(!0),u(p,null,f(K(V),(m,j)=>(n(),h(L,{key:m.truckId,class:"mt-3"},{default:t(()=>[s(g,{class:"mt-1 ms-1"},{default:t(()=>[r("div",null,"Lịch trình cho : "+i(m.truckName),1),s(H,null,{default:t(()=>[s(B,null,{default:t(()=>[s(N,null,{default:t(()=>[s(D,null,{default:t(()=>[s(N,null,{default:t(()=>[(n(!0),u(p,null,f(m.destinations,(o,y)=>(n(),h(D,{key:y,sm:"2.5",md:"3"},{default:t(()=>[r("div",F,[o.estimatedTime>=new Date?(n(),h(_,{key:0,class:I([o.estimatedTime<new Date?"bg-success":""]),icon:"bx-chevrons-right"},null,8,["class"])):M("",!0),r("div",X,[s(d,{to:`/carrier/order-info/${o.orderId}`,class:I(["text-button pa-4 d-flex justify-center align-center",o.estimatedTime<new Date?"bg-success":"bg-warning"]),style:{"border-radius":"8px 8px 0px 0px"}},{default:t(()=>[T(" Đơn : "+i(o.orderId),1)]),_:2},1032,["to","class"]),r("div",A,[r("div",null,"Đến : "+i(o.locationName),1),r("div",null,"Địa chỉ : "+i(o.address),1),r("div",null," Ước lượng : "+i(O(o.estimatedTime)),1)])])])]),_:2},1024))),128))]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024)]),_:2},1024))),128))],64)}}});export{G as default};
