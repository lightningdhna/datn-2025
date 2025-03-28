import{d as z,e as r,c as A,a as e,f as d,w as l,i as _,g as n,m as f,u as G,o as Q,V as i,t as T,k as s,r as B,j as N,_ as J}from"./index-BCXkcNoo.js";import{r as g}from"./validator-CVhvxwIX.js";import{V as k}from"./VCard-CJ3t3ZEl.js";import{V as w}from"./VDialog-yf5pyQHo.js";import{V as S,c as v,a as b,b as m}from"./VCardText-BEYfI6V1.js";import{V as O}from"./VDataTable-D_4U8cp9.js";import{V as q}from"./VTextField-Dkx9KPwU.js";import{V as W}from"./VAutocomplete-BOVCP2Fw.js";import"./VImg-XuFL4q6t.js";import"./VOverlay-uA0yxJrw.js";import"./forwardRefs-BpjxVdNq.js";import"./VGrid-Dcmurj4t.js";import"./VMenu-CEjcWp_V.js";import"./VDivider-CoLL375C.js";import"./VCheckboxBtn-Bhd-wnJi.js";const Y={class:"text-button"},Z={class:"text-button"},ee={class:"self-align-end d-flex gap-4 justify-end"},te={class:"self-align-end d-flex gap-4 justify-end"},le={class:"d-flex justify-center gap-4"},ne={class:"dock-div"},ae=z({__name:"warehouse-info",props:{id:{type:String,required:!0}},setup(U){const M=U,E=r("Kho hàng 1 - Tên kho hàng"),V=r([{id:"P001",name:"Táo",quantity:50},{id:"P002",name:"Cam",quantity:30},{id:"P003",name:"Chuối",quantity:20},{id:"P004",name:"Xoài",quantity:15},{id:"P005",name:"Dưa hấu",quantity:25},{id:"P006",name:"Ổi",quantity:10},{id:"P007",name:"Mận",quantity:40},{id:"P008",name:"Dứa",quantity:35},{id:"P009",name:"Nho",quantity:18},{id:"P010",name:"Bưởi",quantity:22},{id:"P011",name:"Chanh",quantity:28},{id:"P012",name:"Quýt",quantity:32},{id:"P013",name:"Dâu tây",quantity:12},{id:"P014",name:"Kiwi",quantity:45},{id:"P015",name:"Lựu",quantity:50},{id:"P016",name:"Đào",quantity:20},{id:"P017",name:"Mít",quantity:38},{id:"P018",name:"Na",quantity:25},{id:"P019",name:"Sầu riêng",quantity:30},{id:"P020",name:"Me",quantity:15},{id:"P021",name:"Chôm chôm",quantity:18},{id:"P022",name:"Vải",quantity:22}]),j=[{title:"Tên mặt hàng",key:"name"},{title:"Giá",key:"cost"},{title:"Mã sản phẩm",key:"id"},{title:"Số lượng còn",key:"quantity"},{title:"Chi tiết",key:"action"}],$=G(),y=r(!1),c=r(!1),x=r(!1),o=r(),C=r(""),p=r(),h=u=>{o.value={...u},y.value=!0,console.log(o.value)},F=u=>{C.value=u,c.value=!0},L=()=>{console.log("...."),p.value={id:"",name:"",quantity:0,cost:0},x.value=!0},R=()=>{p.value.id=Math.random().toString(36).substr(2,9),V.value.unshift(p.value),x.value=!1},H=()=>{y.value=!1},K=()=>{const u=V.value.findIndex(t=>t.id===o.value.id);console.log(o.value),u!==-1&&(V.value[u]={...o.value}),y.value=!1},X=()=>{const u=V.value.findIndex(t=>t.id===C.value);u!==-1&&V.value.splice(u,1),C.value="",c.value=!1};return(u,t)=>{const P=B("IconBtn"),D=B("VFrom");return Q(),A("div",null,[e(k,null,{default:l(()=>[e(S,{class:"d-flex align-center"},{default:l(()=>[e(i,{icon:"bx-building-house",size:"2rem",class:"me-2"}),t[13]||(t[13]=d("span",null,"Thông tin kho hàng",-1))]),_:1}),e(v,{class:"mt-6"},{default:l(()=>[e(b,null,{default:l(()=>[e(m,{cols:"12",sm:"3"},{default:l(()=>t[14]||(t[14]=[d("div",{class:"text-button"},"Tên sản phẩm :",-1)])),_:1}),e(m,{cols:"12",sm:"4"},{default:l(()=>[d("div",Y,T(n(E)),1)]),_:1})]),_:1}),e(b,null,{default:l(()=>[e(m,{cols:"12",sm:"3"},{default:l(()=>t[15]||(t[15]=[d("div",{class:"text-button"},"Mã kho hàng :",-1)])),_:1}),e(m,{cols:"12",sm:"4"},{default:l(()=>[d("div",Z,T(M.id),1)]),_:1})]),_:1}),e(k,{class:"mt-6"},{default:l(()=>[e(S,{class:"text-h6 font-weight-medium d-flex align-center gap-2"},{default:l(()=>[e(i,{icon:"bx-package"}),t[16]||(t[16]=s(" Danh sách hàng trong kho "))]),_:1}),e(v,{class:"mt-3"},{default:l(()=>[e(O,{headers:j,items:n(V),"items-per-page":20},{"item.cost":l(({item:a})=>t[17]||(t[17]=[s(" 500,000 VND ")])),"item.action":l(({item:a})=>[e(P,{onClick:I=>n($).push(`../product-info/${a.id}`)},{default:l(()=>[e(i,{icon:"bx-info-circle"})]),_:2},1032,["onClick"]),e(P,{onClick:I=>h(a)},{default:l(()=>[e(i,{icon:"bx-edit",color:"success"})]),_:2},1032,["onClick"]),e(P,{onClick:I=>F(a.id)},{default:l(()=>[e(i,{color:"error",icon:"bx-trash"})]),_:2},1032,["onClick"])]),_:1},8,["items"])]),_:1})]),_:1})]),_:1})]),_:1}),e(w,{modelValue:n(y),"onUpdate:modelValue":t[4]||(t[4]=a=>_(y)?y.value=a:null),"max-width":"600px"},{default:l(()=>[e(k,{title:"Edit Item"},{default:l(()=>[e(v,null,{default:l(()=>[e(D,{onSubmit:t[3]||(t[3]=N(()=>{},["prevent"]))},{default:l(()=>[e(b,null,{default:l(()=>[e(m,{cols:"12",sm:"6"},{default:l(()=>[e(q,{modelValue:n(o).name,"onUpdate:modelValue":t[0]||(t[0]=a=>n(o).name=a),label:"Tên",rules:[n(g)],readonly:""},null,8,["modelValue","rules"])]),_:1}),e(m,{cols:"12",sm:"6"},{default:l(()=>[e(q,{modelValue:n(o).id,"onUpdate:modelValue":t[1]||(t[1]=a=>n(o).id=a),label:"Mã sản phẩm",rules:[n(g)],readonly:""},null,8,["modelValue","rules"])]),_:1}),e(m,{cols:"12",sm:"6"},{default:l(()=>[e(q,{modelValue:n(o).quantity,"onUpdate:modelValue":t[2]||(t[2]=a=>n(o).quantity=a),label:"Số lượng",rules:[n(g)]},null,8,["modelValue","rules"])]),_:1})]),_:1})]),_:1})]),_:1}),e(v,null,{default:l(()=>[d("div",ee,[e(f,{color:"gray",variant:"outlined",onClick:H},{default:l(()=>[e(i,{icon:"bx-x"}),t[18]||(t[18]=s(" | Hủy bỏ "))]),_:1}),e(f,{color:"success",variant:"elevated",onClick:K},{default:l(()=>[e(i,{icon:"bx-save"}),t[19]||(t[19]=s("| Lưu lại "))]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(w,{modelValue:n(x),"onUpdate:modelValue":t[9]||(t[9]=a=>_(x)?x.value=a:null),"max-width":"600px"},{default:l(()=>[e(k,{title:"Edit Item"},{default:l(()=>[e(v,null,{default:l(()=>[e(D,{onSubmit:t[7]||(t[7]=N(()=>{},["prevent"]))},{default:l(()=>[e(b,null,{default:l(()=>[e(m,{cols:"12",sm:"6"},{default:l(()=>[e(W,{modelValue:n(p).name,"onUpdate:modelValue":t[5]||(t[5]=a=>n(p).name=a),label:"Tên",rules:[n(g)],items:["cam","bưởi","táo","lê","mit"]},null,8,["modelValue","rules"])]),_:1}),e(m,{cols:"12",sm:"6"},{default:l(()=>[e(q,{modelValue:n(p).quantity,"onUpdate:modelValue":t[6]||(t[6]=a=>n(p).quantity=a),label:"Số lượng",rules:[n(g)]},null,8,["modelValue","rules"])]),_:1})]),_:1})]),_:1})]),_:1}),e(v,null,{default:l(()=>[d("div",te,[e(f,{color:"gray",variant:"outlined",onClick:t[8]||(t[8]=()=>x.value=!1)},{default:l(()=>[e(i,{icon:"bx-x"}),t[20]||(t[20]=s(" | Hủy bỏ "))]),_:1}),e(f,{color:"success",variant:"elevated",onClick:R},{default:l(()=>[e(i,{icon:"bx-save"}),t[21]||(t[21]=s("| Thêm mới "))]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),e(w,{modelValue:n(c),"onUpdate:modelValue":t[11]||(t[11]=a=>_(c)?c.value=a:null),"max-width":"500px"},{default:l(()=>[e(k,{title:"Bạn có muốn xóa thông tin xe này không?"},{default:l(()=>[e(v,null,{default:l(()=>[d("div",le,[e(f,{variant:"outlined",color:"secondary",onClick:t[10]||(t[10]=()=>c.value=!1)},{default:l(()=>t[22]||(t[22]=[s(" Bỏ qua ")])),_:1}),e(f,{color:"error",variant:"outlined",onClick:X},{default:l(()=>t[23]||(t[23]=[s(" Xác nhận xóa ")])),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),d("div",ne,[e(f,{class:"dock-button",color:"success",onClick:t[12]||(t[12]=()=>{})},{default:l(()=>[e(i,{icon:"bx-upload",class:"me-2"}),t[24]||(t[24]=s(" | Upload file csv "))]),_:1}),e(f,{onClick:L,class:"dock-button ms-2"},{default:l(()=>[e(i,{icon:"bxs-file-plus",class:"me-2"}),t[25]||(t[25]=s(" | Thêm sản phẩm vào kho "))]),_:1})])])}}}),ke=J(ae,[["__scopeId","data-v-d6345da4"]]);export{ke as default};
