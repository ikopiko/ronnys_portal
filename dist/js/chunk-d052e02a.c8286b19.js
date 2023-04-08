(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d052e02a"],{1148:function(t,a,e){"use strict";var o=e("a691"),r=e("1d80");t.exports=function(t){var a=String(r(this)),e="",s=o(t);if(s<0||s==1/0)throw RangeError("Wrong number of repetitions");for(;s>0;(s>>>=1)&&(a+=a))1&s&&(e+=a);return e}},"3cd5":function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("Layout",[e("v-card",[e("v-form",{ref:"searchForm",attrs:{"lazy-validation":""}},[e("v-row",[e("v-col",{staticClass:"ml-2",attrs:{cols:"4"}},[e("date-picker",{attrs:{type:"date","value-type":"YYYY-MM-DD",format:"YYYY-MM-DD",range:"",placeholder:"Select date",rules:t.nameRules},model:{value:t.date,callback:function(a){t.date=a},expression:"date"}})],1),e("v-col",{attrs:{cols:"4"}},[e("v-autocomplete",{attrs:{clearable:"",items:t.branchOptions,dense:"",label:"Select branch"},on:{change:function(a){return t.updateRegion(a,t.index)}},model:{value:t.branch,callback:function(a){t.branch=a},expression:"branch"}})],1),e("v-col",{attrs:{cols:"2"}},[e("v-btn",{attrs:{color:"primary",elevation:"0"},on:{click:function(a){return t.getReport()}}},[e("v-icon",{attrs:{small:""}},[t._v(" mdi-magnify ")]),t._v(" Search ")],1)],1)],1)],1),e("v-card-text",[e("v-card-title",{staticClass:"pl-0"},[e("v-text-field",{staticClass:"col-4 pl-0",attrs:{clearable:"",dense:"","append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.suppliesSearch,callback:function(a){t.suppliesSearch=a},expression:"suppliesSearch"}}),e("v-spacer"),t.json_data.length>0?e("export-excel",{staticClass:"btn btn-success",attrs:{data:t.json_data,fields:t.json_fields,worksheet:"Worksheet",name:t.exportName}},[e("i",{staticClass:"mdi mdi-download"},[t._v(" Export ")])]):t._e()],1),e("v-data-table",{attrs:{dense:"",loading:t.loader,"loading-text":"Loading... Please wait",headers:t.supplyHeaders,items:t.supplyList,"items-per-page":10,search:t.suppliesSearch},scopedSlots:t._u([{key:"item.status",fn:function(a){var o=a.item;return[e("span",{staticClass:"badge badge-pill  badge-soft-success",class:{"badge-soft-warning ":""+o.status!=7}},[t._v(t._s(o.statusName))])]}},{key:"item.actions",fn:function(a){var o=a.item;return[e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function(a){var r=a.on,s=a.attrs;return[e("span",t._g(t._b({},"span",s,!1),r),[e("v-btn",{attrs:{icon:"",color:"primary"}},[e("v-icon",{attrs:{small:""},on:{click:function(a){return t.showDetail(o)}}},[t._v(" mdi-eye ")])],1)],1)]}}],null,!0)},[e("span",[t._v("View Details")])])]}}],null,!0)})],1)],1),e("v-snackbar",{attrs:{color:t.color,elevation:"5"},scopedSlots:t._u([{key:"action",fn:function(a){var o=a.attrs;return[e("v-btn",t._b({attrs:{text:""},on:{click:function(a){t.snackbar=!1}}},"v-btn",o,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar,callback:function(a){t.snackbar=a},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")]),e("v-dialog",{attrs:{"max-width":"600"},model:{value:t.detailModal,callback:function(a){t.detailModal=a},expression:"detailModal"}},[e("v-card",[e("v-toolbar",{attrs:{color:"white",elevation:"0"}},[e("span",{staticClass:"text-h6"},[t._v(" Order Detail")]),e("v-spacer"),e("v-card-actions",{staticClass:"justify-end"},[e("v-btn",{attrs:{icon:"",small:"",color:"gray"},on:{click:function(a){t.detailModal=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1)],1),e("hr"),e("v-card-text",[e("v-form",{ref:"supplyForm",attrs:{"lazy-validation":""}},[e("v-row",[e("div",[t._v("Order id: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalProductId))])]),e("div",[t._v("Discount Type: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalDiscType))])]),e("div",[t._v("Discount: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalDisc))])]),e("div",[t._v("Customer Name: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalCustomer))])]),e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table table-centered table-nowrap"},[e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("Product Name")]),e("th",{attrs:{scope:"col"}},[t._v("Product QTY")]),e("th",{attrs:{scope:"col"}},[t._v("Price")])])]),e("tbody",[t._l(t.order_data,(function(a,o){return e("tr",{key:o},[e("td",[e("div",[e("div",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(" "+t._s(a.size)+" "+t._s(a.name)+" ")]),e("span",{staticClass:"text-muted font-size-14 mb-0"},[t._v("GEL "+t._s(a.price)+" x "+t._s(a.qty))])])]),e("td",[t._v(" X "+t._s(a.qty)+" ")]),e("td",[t._v(t._s(a.price*a.qty))])])})),e("tr",[e("td",{attrs:{colspan:"2"}},[e("h6",{staticClass:"m-0 text-end"},[t._v("Sub Total:")])]),e("td",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalTotalPrice))])]),e("tr",[e("td",{attrs:{colspan:"2"}},[e("h6",{staticClass:"m-0 text-end"},[t._v("Discount:")])]),e("td",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalDiscount))])]),e("tr",[e("td",{attrs:{colspan:"2"}},[e("h6",{staticClass:"m-0 text-end"},[t._v("Total Due:")])]),e("td",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalTotalDue))])])],2)])])])],1)],1),e("hr"),e("v-card-actions",[e("v-spacer")],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticClass:"white--text text-capitalize",attrs:{elevation:"0",color:"red",small:""},on:{click:function(a){t.detailModal=!1}}},[e("i",{staticClass:"bx bx-x-circle"}),t._v(" Close ")])],1)],1)],1)],1)},r=[],s=(e("b0c0"),e("b680"),e("159b"),e("bc3a")),i=e.n(s),d=e("444f"),n=e("ec45"),l=e("bf15"),c=e("2b0e"),u=e("c1df"),m=e.n(u);c["default"].use(l["a"]);var h={page:{title:"Sales Report"},components:{Layout:d["a"],DatePicker:n["a"]},computed:{},data:function(){return{modalTotalPrice:null,modalDiscount:null,modalTotalDue:null,order_data:[],modalProductId:null,modalDiscType:null,modalDisc:null,modalCustomer:null,orderStatuses:[],status:"1,2,3,4,5,6,7,8,9,10",detailModal:!1,date:[m()(new Date).format("YYYY-MM-DD"),m()(new Date).format("YYYY-MM-DD")],branch:null,validSearch:!0,loader:!1,exportName:"All - "+m()(new Date).format("YYYY-MM-DD"),json_data:[],snackbar:!1,color:"default",snackbarText:null,TOKEN:null,selectedBranch:null,branchOptions:[{value:"Saburtalo",text:"Saburtalo"},{value:"Vake",text:"Vake"},{value:"Digomi",text:"Digomi"},{value:"Gldani",text:"Gldani"}],warehouseId:null,supplyList:[],suppliesSearch:"",branchURL:null,json_fields:{"Order ID":"id",delivery:"order_data.deliveryMethod","Customer Name":"order_data.customer.name","Total price":"order_data.totalPrice",Type:"order_data.discountName",Amount:"order_data.newdiscount","Split cash":"order_data.splitCash","Split card":"order_data.splitCard","Total due":"order_data.discounted",Comment:"order_data.managerComment",Method:"order_data.paymentType","Wolt Code":"order_data.customer.code",Branch:"branch",status:"statusName",Date:"finish_date"},supplyHeaders:[{value:"id",text:"Order ID",sortable:!0},{value:"order_data.deliveryMethod",text:"Order Type",sortable:!0},{value:"order_data.customer.code",text:"Wolt Code",sortable:!0},{value:"order_data.customer.name",text:"Customer Name",sortable:!0},{value:"status",text:"Status",sortable:!0},{value:"order_data.totalPrice",text:"Total Price",sortable:!0},{value:"order_data.totalDue",text:"Total Due",sortable:!0},{value:"finish_date",text:"Finish Date",sortable:!0},{value:"branch",text:"Branch",sortable:!0},{value:"actions",text:"Details",sortable:!0}],nameRules:[function(t){return!!t||" required"}]}},mounted:function(){var t=this;this.loggedUser=this.$store.state.authfack.user,this.warehouseId=this.loggedUser.warehouseId,this.TOKEN=this.loggedUser.token,i.a.request({method:"post",url:this.$hostname+"poses/order-statuses",headers:{Authorization:"Bearer "+this.TOKEN}}).then((function(a){t.orderStatuses=a.data.data})),this.getReport()},methods:{showDetail:function(t){this.modalProductId=t.id,this.modalDiscType=t.order_data.discountName,this.modalDisc=t.order_data.discount+this.discount(t,"discname"),this.modalCustomer=t.order_data.customer.name,console.log(t.order_data.items),this.order_data=t.order_data.items,this.modalTotalPrice=t.order_data.totalPrice,this.modalDiscount=this.discount(t,"discounted"),this.modalTotalDue=this.discount(t,"totalDue"),this.detailModal=!0},discount:function(t,a){return"discname"==a?"Diplomat"==t.order_data.discountName?"%":"Manager"==t.order_data.discountName&&1==t.order_data.discountAmount?"GEL":"%":"discounted"==a?"Diplomat"==t.order_data.discountName?(t.order_data.totalPrice-t.order_data.totalPrice/1.18).toFixed(2):"Manager"==t.order_data.discountName&&1==t.order_data.discountAmount?t.order_data.discount:(t.order_data.totalPrice/100*t.order_data.discount).toFixed(2):"totalDue"==a?"Diplomat"==t.order_data.discountName?(t.order_data.totalPrice-(t.order_data.totalPrice-t.order_data.totalPrice/1.18)).toFixed(2):"Manager"==t.order_data.discountName&&1==t.order_data.discountAmount?(t.order_data.totalPrice-t.order_data.discount).toFixed(2):(t.order_data.totalPrice-t.order_data.totalPrice/100*t.order_data.discount).toFixed(2):void 0},getReport:function(){var t=this;this.$refs.searchForm.validate()&&(this.loader=!0,this.json_data=[],this.supplyList=[],i.a.request({method:"post",url:this.$hostname+"reporting/list-reporting",headers:{Authorization:"Bearer "+this.TOKEN},data:{day:this.date,status_key:this.status,branch:this.branch}}).then((function(a){t.loader=!1,t.supplyList=t.json_data=a.data.data,t.supplyList.forEach((function(a){a.order_data.paymentType=a.order_data.paymentType+"  "+(null!=a.opay_status?a.opay_status:""),a.order_data.newdiscount=a.order_data.discount+t.discount(a,"discname"),a.order_data.discounted=t.discount(a,"discounted"),a.order_data.totalDue=t.discount(a,"totalDue"),a.statusName=t.orderStatuses[a.status-1].status_name}))})))},updateRegion:function(t){this.exportName=t+" - "+this.date}}},p=h,v=(e("8a79d"),e("2877")),_=Object(v["a"])(p,o,r,!1,null,null,null);a["default"]=_.exports},"408a":function(t,a,e){var o=e("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=o(t))throw TypeError("Incorrect invocation");return+t}},"8a79d":function(t,a,e){"use strict";e("ca5e")},b680:function(t,a,e){"use strict";var o=e("23e7"),r=e("a691"),s=e("408a"),i=e("1148"),d=e("d039"),n=1..toFixed,l=Math.floor,c=function(t,a,e){return 0===a?e:a%2===1?c(t,a-1,e*t):c(t*t,a/2,e)},u=function(t){var a=0,e=t;while(e>=4096)a+=12,e/=4096;while(e>=2)a+=1,e/=2;return a},m=function(t,a,e){var o=-1,r=e;while(++o<6)r+=a*t[o],t[o]=r%1e7,r=l(r/1e7)},h=function(t,a){var e=6,o=0;while(--e>=0)o+=t[e],t[e]=l(o/a),o=o%a*1e7},p=function(t){var a=6,e="";while(--a>=0)if(""!==e||0===a||0!==t[a]){var o=String(t[a]);e=""===e?o:e+i.call("0",7-o.length)+o}return e},v=n&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!d((function(){n.call({})}));o({target:"Number",proto:!0,forced:v},{toFixed:function(t){var a,e,o,d,n=s(this),l=r(t),v=[0,0,0,0,0,0],_="",f="0";if(l<0||l>20)throw RangeError("Incorrect fraction digits");if(n!=n)return"NaN";if(n<=-1e21||n>=1e21)return String(n);if(n<0&&(_="-",n=-n),n>1e-21)if(a=u(n*c(2,69,1))-69,e=a<0?n*c(2,-a,1):n/c(2,a,1),e*=4503599627370496,a=52-a,a>0){m(v,0,e),o=l;while(o>=7)m(v,1e7,0),o-=7;m(v,c(10,o,1),0),o=a-1;while(o>=23)h(v,1<<23),o-=23;h(v,1<<o),m(v,1,1),h(v,2),f=p(v)}else m(v,0,e),m(v,1<<-a,0),f=p(v)+i.call("0",l);return l>0?(d=f.length,f=_+(d<=l?"0."+i.call("0",l-d)+f:f.slice(0,d-l)+"."+f.slice(d-l))):f=_+f,f}})},ca5e:function(t,a,e){}}]);
//# sourceMappingURL=chunk-d052e02a.c8286b19.js.map