import{d as H,e as s,c as R,a as t,f as L,w as l,i as g,g as n,m,F as G,u as K,o as X,k as u,V as d,r as I,j as w,_ as Q}from"./index-CLGN3N2e.js";import{V as P}from"./VCard-BuOT5A29.js";import{V as C}from"./VDialog-CcnegwQp.js";import{V as z,a as _,b as v,c as q}from"./VCardText-BiO770vU.js";import{V as c}from"./VTextField-DMpSt2IJ.js";import{V as A}from"./VDataTable-BuhQZ_NT.js";import"./VImg-Byj51mWs.js";import"./VOverlay-D7GsUQ9h.js";import"./forwardRefs-DLrdi3PU.js";/* empty css              */import"./VAvatar-BS1z1ykc.js";import"./VMenu-BocsGej7.js";import"./VDivider-BvyIEGsn.js";import"./VCheckboxBtn-CgF2Iqt2.js";const J={class:"self-align-end d-flex gap-4 justify-end"},O={class:"self-align-end d-flex gap-4 justify-end"},W={class:"d-flex justify-center gap-4"},Y={class:"dock-button"},Z=H({__name:"product",setup(tt){const B=K(),r=s([{id:"SP001",name:"Táo",quantityLeft:50,quantitySold:20},{id:"SP002",name:"Cam",quantityLeft:30,quantitySold:15},{id:"SP003",name:"Chuối",quantityLeft:20,quantitySold:10},{id:"SP004",name:"Xoài",quantityLeft:15,quantitySold:5},{id:"SP005",name:"Dưa hấu",quantityLeft:25,quantitySold:12},{id:"SP006",name:"Lê",quantityLeft:10,quantitySold:8},{id:"SP007",name:"Ổi",quantityLeft:40,quantitySold:18},{id:"SP008",name:"Mận",quantityLeft:35,quantitySold:22},{id:"SP009",name:"Dứa",quantityLeft:18,quantitySold:9},{id:"SP010",name:"Nho",quantityLeft:22,quantitySold:11},{id:"SP011",name:"Bưởi",quantityLeft:60,quantitySold:30},{id:"SP012",name:"Chanh",quantityLeft:45,quantitySold:25},{id:"SP013",name:"Quýt",quantityLeft:12,quantitySold:6},{id:"SP014",name:"Dâu tây",quantityLeft:28,quantitySold:14},{id:"SP015",name:"Kiwi",quantityLeft:33,quantitySold:17},{id:"SP016",name:"Lựu",quantityLeft:50,quantitySold:20},{id:"SP017",name:"Đào",quantityLeft:30,quantitySold:15},{id:"SP018",name:"Mít",quantityLeft:20,quantitySold:10},{id:"SP019",name:"Na",quantityLeft:15,quantitySold:5},{id:"SP020",name:"Sầu riêng",quantityLeft:25,quantitySold:12},{id:"SP021",name:"Me",quantityLeft:10,quantitySold:8},{id:"SP022",name:"Chôm chôm",quantityLeft:40,quantitySold:18},{id:"SP023",name:"Vải",quantityLeft:35,quantitySold:22},{id:"SP024",name:"Măng cụt",quantityLeft:18,quantitySold:9},{id:"SP025",name:"Thanh long",quantityLeft:22,quantitySold:11},{id:"SP026",name:"Dừa",quantityLeft:60,quantitySold:30},{id:"SP027",name:"Táo tàu",quantityLeft:45,quantitySold:25},{id:"SP028",name:"Hồng xiêm",quantityLeft:12,quantitySold:6},{id:"SP029",name:"Cóc",quantityLeft:28,quantitySold:14},{id:"SP030",name:"Khế",quantityLeft:33,quantitySold:17}]),N=[{title:"Tên sản phẩm",key:"name"},{title:"Mã sản phẩm",key:"id"},{title:"Giá",key:"cost"},{title:"Số lượng còn",key:"quantityLeft"},{title:"Số lượng đã bán",key:"quantitySold"},{title:"",key:"action"}],V=i=>!!i||"Trường này là bắt buộc",x=s(""),f=s(!1),y=s(!1),S=s(!1),o=s(),b=s(""),p=s(),M=i=>{o.value={...i},f.value=!0,console.log(o.value)},U=i=>{b.value=i,y.value=!0},E=()=>{p.value={id:"",name:"",quantityLeft:0,quantitySold:0},S.value=!0},F=()=>{p.value.id=Math.random().toString(36).substr(2,9),r.value.unshift(p.value),S.value=!1},h=()=>{f.value=!1},j=()=>{const i=r.value.findIndex(e=>e.id===o.value.id);console.log(o.value),i!==-1&&(r.value[i]={...o.value}),f.value=!1},$=()=>{const i=r.value.findIndex(e=>e.id===b.value);i!==-1&&r.value.splice(i,1),b.value="",y.value=!1};return(i,e)=>{const k=I("IconBtn"),D=I("VFrom");return X(),R(G,null,[t(P,null,{default:l(()=>[t(z,{class:"text-primary"},{default:l(()=>[t(d,{icon:"bx-package"}),e[11]||(e[11]=u(" Danh sách sản phẩm ")),t(_,{style:{direction:"ltr"},class:"mt-6"},{default:l(()=>[t(v,{cols:"12","offset-md":"0",md:"4"},{default:l(()=>[t(c,{modelValue:n(x),"onUpdate:modelValue":e[0]||(e[0]=a=>g(x)?x.value=a:null),placeholder:"Search ...","append-inner-icon":"bx-search","single-line":"","hide-details":"",dense:"",outlined:""},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),t(q,null,{default:l(()=>[t(A,{class:"mt-1",headers:N,items:n(r),"items-per-page":20,search:n(x)},{"item.cost":l(({item:a})=>e[12]||(e[12]=[u(" 500,000 VND ")])),"item.action":l(({item:a})=>[t(k,{onClick:T=>n(B).push(`/supplier/product-info/${a.id}`)},{default:l(()=>[t(d,{icon:"bx-info-circle"})]),_:2},1032,["onClick"]),t(k,{onClick:T=>M(a)},{default:l(()=>[t(d,{color:"success",icon:"bx-edit"})]),_:2},1032,["onClick"]),t(k,{onClick:T=>U(a.id)},{default:l(()=>[t(d,{color:"error",icon:"bx-trash"})]),_:2},1032,["onClick"])]),_:1},8,["items","search"])]),_:1})]),_:1}),t(C,{modelValue:n(f),"onUpdate:modelValue":e[4]||(e[4]=a=>g(f)?f.value=a:null),"max-width":"600px"},{default:l(()=>[t(P,{title:"Edit Item"},{default:l(()=>[t(q,null,{default:l(()=>[t(D,{onSubmit:e[3]||(e[3]=w(()=>{},["prevent"]))},{default:l(()=>[t(_,null,{default:l(()=>[t(v,{cols:"12",sm:"6"},{default:l(()=>[t(c,{modelValue:n(o).name,"onUpdate:modelValue":e[1]||(e[1]=a=>n(o).name=a),label:"Tên",rules:[V]},null,8,["modelValue","rules"])]),_:1}),t(v,{cols:"12",sm:"6"},{default:l(()=>[t(c,{modelValue:n(o).id,"onUpdate:modelValue":e[2]||(e[2]=a=>n(o).id=a),label:"Mã",rules:[V],readonly:""},null,8,["modelValue","rules"])]),_:1})]),_:1})]),_:1})]),_:1}),t(q,null,{default:l(()=>[L("div",J,[t(m,{color:"gray",variant:"outlined",onClick:h},{default:l(()=>[t(d,{icon:"bx-x"}),e[13]||(e[13]=u(" | Hủy bỏ "))]),_:1}),t(m,{color:"success",variant:"elevated",onClick:j},{default:l(()=>[t(d,{icon:"bx-save"}),e[14]||(e[14]=u("| Lưu lại "))]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(C,{modelValue:n(S),"onUpdate:modelValue":e[8]||(e[8]=a=>g(S)?S.value=a:null),"max-width":"600px"},{default:l(()=>[t(P,{title:"Edit Item"},{default:l(()=>[t(q,null,{default:l(()=>[t(D,{onSubmit:e[6]||(e[6]=w(()=>{},["prevent"]))},{default:l(()=>[t(_,null,{default:l(()=>[t(v,{cols:"12",sm:"6"},{default:l(()=>[t(c,{modelValue:n(p).name,"onUpdate:modelValue":e[5]||(e[5]=a=>n(p).name=a),label:"Tên",rules:[V]},null,8,["modelValue","rules"])]),_:1}),t(v,{cols:"12",sm:"6"},{default:l(()=>[t(c,{label:"Giá",suffix:",000 VNĐ",rules:[V]},null,8,["rules"])]),_:1})]),_:1})]),_:1})]),_:1}),t(q,null,{default:l(()=>[L("div",O,[t(m,{color:"gray",variant:"outlined",onClick:e[7]||(e[7]=()=>S.value=!1)},{default:l(()=>[t(d,{icon:"bx-x"}),e[15]||(e[15]=u(" | Hủy bỏ "))]),_:1}),t(m,{color:"success",variant:"elevated",onClick:F},{default:l(()=>[t(d,{icon:"bx-save"}),e[16]||(e[16]=u("| Thêm mới "))]),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),t(C,{modelValue:n(y),"onUpdate:modelValue":e[10]||(e[10]=a=>g(y)?y.value=a:null),"max-width":"500px"},{default:l(()=>[t(P,{title:"Bạn có muốn xóa thông tin sản phẩm này không?"},{default:l(()=>[t(q,null,{default:l(()=>[L("div",W,[t(m,{variant:"outlined",color:"secondary",onClick:e[9]||(e[9]=()=>y.value=!1)},{default:l(()=>e[17]||(e[17]=[u(" Bỏ qua ")])),_:1}),t(m,{color:"error",variant:"outlined",onClick:$},{default:l(()=>e[18]||(e[18]=[u(" Xác nhận xóa ")])),_:1})])]),_:1})]),_:1})]),_:1},8,["modelValue"]),L("div",Y,[t(m,{onClick:E},{default:l(()=>[t(d,{icon:"bxs-file-plus",class:"ms-0 me-1"}),e[19]||(e[19]=u(" | Thêm "))]),_:1})])],64)}}}),qt=Q(Z,[["__scopeId","data-v-5f081dc0"]]);export{qt as default};
