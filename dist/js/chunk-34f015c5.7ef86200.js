(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-34f015c5"],{1148:function(t,e,a){"use strict";var s=a("a691"),r=a("1d80");t.exports=function(t){var e=String(r(this)),a="",o=s(t);if(o<0||o==1/0)throw RangeError("Wrong number of repetitions");for(;o>0;(o>>>=1)&&(e+=e))1&o&&(a+=e);return a}},2579:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"page-title-box d-flex align-items-center justify-content-between"},[a("h4",{staticClass:"mb-0 font-size-18"},[t._v(t._s(t.title))]),a("div",{staticClass:"page-title-right"},[a("b-breadcrumb",{staticClass:"m-0",attrs:{items:t.items}})],1)])])])},r=[],o={components:{},props:{title:{type:String,default:""},items:{type:Array,default:function(){return[]}}}},i=o,n=a("2877"),l=Object(n["a"])(i,s,r,!1,null,null,null);e["a"]=l.exports},"3cd5":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Layout",[a("PageHeader",{attrs:{title:t.title}}),a("div",{staticClass:"row",attrs:{"data-app":""}},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("b-alert",{attrs:{dismissible:"",variant:"danger"},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}},[t._v(t._s(t.alertText))])],1),a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"search-box me-2 mb-2 d-inline-block"},[a("div",{staticClass:"position-relative"},[a("b-form-input",{attrs:{type:"search",placeholder:"Search..."},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("i",{staticClass:"bx bx-search-alt search-icon"})],1)])]),a("div",{staticClass:"col-sm-2"},[a("b-form-select",{staticClass:"form-control",attrs:{options:t.branchOptions},model:{value:t.selectedBranch,callback:function(e){t.selectedBranch=e},expression:"selectedBranch"}})],1)]),a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm-4"},[a("div",[a("label",{attrs:{for:"example-input"}},[t._v("From")]),a("b-input-group",{staticClass:"mb-3"},[a("b-form-input",{attrs:{id:"example-input",type:"text",placeholder:"YYYY-MM-DD",autocomplete:"off"},model:{value:t.fromDate,callback:function(e){t.fromDate=e},expression:"fromDate"}}),a("b-input-group-append",[a("b-form-datepicker",{attrs:{"button-only":"",right:"",locale:"en-US","aria-controls":"example-input"},model:{value:t.fromDate,callback:function(e){t.fromDate=e},expression:"fromDate"}})],1)],1)],1)]),a("div",{staticClass:"col-sm-4"},[a("div",[a("label",{attrs:{for:"example-input"}},[t._v("To")]),a("b-input-group",{staticClass:"mb-3"},[a("b-form-input",{attrs:{id:"example-input",type:"text",placeholder:"YYYY-MM-DD",autocomplete:"off"},model:{value:t.toDate,callback:function(e){t.toDate=e},expression:"toDate"}}),a("b-input-group-append",[a("b-form-datepicker",{attrs:{"button-only":"",right:"",locale:"en-US","aria-controls":"example-input"},model:{value:t.toDate,callback:function(e){t.toDate=e},expression:"toDate"}})],1)],1)],1)]),a("div",{staticClass:"col-sm-4 mt-4"},[a("b-button",{attrs:{variant:"success"},on:{click:function(e){return t.updateList()}}},[a("i",{staticClass:"bx bx-check-double font-size-16 align-middle me-2"}),t._v(" Search ")]),0!=t.exportData.length?a("b-button",{staticClass:"mx-2",attrs:{variant:"primary"}},[a("export-excel",{attrs:{data:t.exportData,name:"orders.xls"}},[t._v(" Export data to Excel "),a("i",{staticClass:"bx bx-download"})])],1):t._e()],1)])]),a("div",{staticClass:"table-responsive mb-0",staticStyle:{"min-height":"300px"}},[a("b-table",{staticClass:"datatables",attrs:{items:t.ordersList,fields:t.fields,responsive:"sm","per-page":t.perPage,"current-page":t.currentPage,"sort-by":t.sortBy,"sort-desc":t.sortDesc,filter:t.filter,"filter-included-fields":t.filterOn},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(actions)",fn:function(e){return[a("b-button",{staticClass:"mr-1",attrs:{size:"sm"},on:{click:function(a){return t.info(e.item,e.index,a.target)}}},[t._v(" Info modal ")])]}}])})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"dataTables_paginate paging_simple_numbers float-end"},[a("ul",{staticClass:"pagination pagination-rounded mb-0"},[a("label",{staticClass:"d-inline-flex align-items-center"},[t._v(" Show  "),a("b-form-select",{staticClass:"form-select form-select-sm",attrs:{size:"sm",options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}}),t._v(" entries ")],1),a("b-pagination",{attrs:{"total-rows":t.rows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])])])])]),a("b-modal",{attrs:{id:t.infoModal.id,title:t.infoModal.order_id,"ok-only":""},on:{hide:t.resetInfoModal}},[a("p",{staticClass:"mb-2"},[t._v(" Product id: "),a("span",{staticClass:"text-primary"},[t._v(t._s(t.infoModal.order_id))])]),a("p",{staticClass:"mb-2"},[t._v(" Discount Type: "),a("span",{staticClass:"text-primary"},[t._v(t._s(t.infoModal.discountName))])]),a("p",{staticClass:"mb-2"},[t._v(" Discount: "),a("span",{staticClass:"text-primary"},[t._v("- "+t._s(t.infoModal.discount)+" "+t._s(t.infoModal.discType))])]),a("p",{staticClass:"mb-4"},[t._v(" Customer Name: "),a("span",{staticClass:"text-primary"},[t._v(t._s(t.infoModal.customer))])]),a("div",{staticClass:"table-responsive"},[a("table",{staticClass:"table table-centered table-nowrap"},[a("thead",[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("Product Name")]),a("th",{attrs:{scope:"col"}},[t._v("Product QTY")]),a("th",{attrs:{scope:"col"}},[t._v("Price")])])]),a("tbody",[t._l(t.infoModal.items,(function(e,s){return a("tr",{key:s},[a("td",[a("div",[a("h5",{staticClass:"text-truncate font-size-14"},[t._v(" "+t._s(e.size)+" "+t._s(e.name)+" ")]),a("p",{staticClass:"text-muted mb-0"},[t._v("GEL "+t._s(e.price)+" x "+t._s(e.qty))])])]),a("td",[t._v(" X "+t._s(e.qty)+" ")]),a("td",[t._v(t._s(e.price*e.qty))])])})),a("tr",[a("td",{attrs:{colspan:"2"}},[a("h6",{staticClass:"m-0 text-end"},[t._v("Sub Total:")])]),a("td",[t._v(t._s(t.infoModal.totalPrice))])]),a("tr",[a("td",{attrs:{colspan:"2"}},[a("h6",{staticClass:"m-0 text-end"},[t._v("Discount:")])]),a("td",[t._v(t._s(t.infoModal.discPrice))])]),a("tr",[a("td",{attrs:{colspan:"2"}},[a("h6",{staticClass:"m-0 text-end"},[t._v("Total Due:")])]),a("td",[t._v(t._s(t.infoModal.totalDue))])])],2)])])])],1)],1)},r=[],o=(a("a4d3"),a("e01a"),a("b0c0"),a("a15b"),a("159b"),a("b680"),a("bc3a")),i=a.n(o),n=a("bf15"),l=a("444f"),d=a("2579"),c=a("c2a4"),u=a("2b0e");u["default"].use(n["a"]);var p={page:{title:"Orders",meta:[{name:"description",content:c.description}]},components:{Layout:l["a"],PageHeader:d["a"]},computed:{rows:function(){return this.ordersList.length}},data:function(){return{fromDate:String(new Date),currentPage:1,perPage:10,pageOptions:[10,25,50,100],totalRows:1,filter:null,filterOn:[],sortBy:"id",sortDesc:!1,fields:[{key:"id",label:"ID",sortable:!0},{key:"order_data.deliveryMethod",label:"Order Type",sortable:!0},{key:"order_data.customer.code",label:"Wolt Code",sortable:!0},{key:"order_data.customer.name",label:"Customer Name",sortable:!0},{key:"statusName",label:"Status",sortable:!0},{key:"order_data.totalPrice",label:"Total Price",sortable:!0},{key:"order_data.totalDue",label:"Total Due",sortable:!0},{key:"finish_date",labelr:"Date",sortable:!0},{key:"actions",label:"Actions"}],items:[{text:"Tables",href:"/"},{text:"Advanced",active:!0}],toDate:null,selectedBranch:null,branchURL:null,modalItem:{},modalShow:!1,showAlert:!1,alertText:"",orderStatuses:[],exportData:[],branchOptions:[{value:null,text:"Select Branch"},{value:"saburtalo",text:"Saburtalo"},{value:"vake",text:"Vake"},{value:"digomi",text:"Digomi"},{value:"gldani",text:"Gldani"}],loggedUser:{},ordersList:[],ordersListOld:[],title:"Order List",status:"1,2,3,4,5,6,7,8,9,10",infoModal:{id:"info-modal",order_id:"",discount:"",discountName:"",discountType:"",customer:"",items:[],totalPrice:"",discPrice:"",totalDue:""}}},watch:{selectedBranch:function(t){this.changeBranch(t)}},mounted:function(){var t=this;this.fromDate=this.formatDate(this.fromDate),this.loggedUser=this.$store.state.authfack.user;var e=this.loggedUser.token;i.a.request({method:"post",url:this.$hostname+"poses/order-statuses",headers:{Authorization:"Bearer "+e}}).then((function(e){t.orderStatuses=e.data.data}))},methods:{info:function(t,e,a){this.infoModal.title="Row index: ".concat(e),this.infoModal.order_id=t.id,this.infoModal.discountName=t.order_data.discountName,this.infoModal.discount=t.order_data.discount,this.infoModal.customer=t.order_data.customer.name,this.infoModal.items=t.order_data.items,this.infoModal.totalPrice=t.order_data.totalPrice,this.infoModal.discPrice=t.order_data.discPrice,this.infoModal.totalDue=t.order_data.totalDue,this.infoModal.content=JSON.stringify(t,null,2),this.$root.$emit("bv::show::modal",this.infoModal.id,a)},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1},formatDate:function(t){var e=new Date(t),a=""+(e.getMonth()+1),s=""+e.getDate(),r=e.getFullYear();return a.length<2&&(a="0"+a),s.length<2&&(s="0"+s),[r,a,s].join("-")},changeBranch:function(t){"saburtalo"==t?this.branchURL="http://178.134.12.106:8082/ronny/rest/web/index.php?r=v1/":"vake"==t?this.branchURL="http://94.43.92.102:8082/ronny/rest/web/index.php?r=v1/":"digomi"==t?this.branchURL="http://109.172.176.98:8082/ronny/rest/web/index.php?r=v1/":"gldani"==t&&(this.branchURL="http://178.134.47.222:8082/ronny/rest/web/index.php?r=v1/")},updateList:function(){var t,e=this;if(t=null==this.toDate?this.fromDate+" to "+this.fromDate:this.fromDate+" to "+this.toDate,null==this.selectedBranch)this.showAlert=!0,this.alertText="Select Branch to continue...";else{var a=this.loggedUser.token,s=new FormData;s.set("day",t),s.set("status_key",this.status),i.a.request({method:"post",url:this.branchURL+"orders/list-new",headers:{Authorization:"Bearer "+a},data:s}).then((function(t){e.ordersList=t.data.data,e.ordersListOld=t.data.data,e.exportData=[],e.ordersList.forEach((function(t){t.id=String(t.id);var a=t.status-1;t.statusName=e.orderStatuses[a].status_name,"Diplomat"==t.order_data.discountName?(t.order_data.discPrice=t.order_data.totalPrice-t.order_data.totalPrice/1.18,t.order_data.discType="%"):"Manager"==t.order_data.discountName&&1==t.order_data.discountAmount?(t.order_data.discPrice=t.order_data.discount,t.order_data.discType="GEL"):(t.order_data.discPrice=(t.order_data.totalPrice/100*t.order_data.discount).toFixed(2),t.order_data.discType="%"),t.order_data.totalDue=(t.order_data.totalPrice-t.order_data.discPrice).toFixed(2);var s={};s.id=t.id,s.deliveryMethod=t.order_data.deliveryType,s.name=t.order_data.customer.name,s.totalPrice=t.order_data.totalPrice,s.discountType=t.order_data.discountName,s.discount=t.order_data.discount+" "+t.order_data.discType,s.amount=t.order_data.discPrice,s.totalDue=t.order_data.totalDue,s.comment=t.order_data.managerComment,s.payment=t.order_data.paymentType,s.woltCode=t.order_data.customer.code,s.status=t.statusName,s.date=t.finish_date,e.exportData.push(s)}))}))}}}},m=p,f=a("2877"),h=Object(f["a"])(m,s,r,!1,null,null,null);e["default"]=h.exports},"408a":function(t,e,a){var s=a("c6b6");t.exports=function(t){if("number"!=typeof t&&"Number"!=s(t))throw TypeError("Incorrect invocation");return+t}},b680:function(t,e,a){"use strict";var s=a("23e7"),r=a("a691"),o=a("408a"),i=a("1148"),n=a("d039"),l=1..toFixed,d=Math.floor,c=function(t,e,a){return 0===e?a:e%2===1?c(t,e-1,a*t):c(t*t,e/2,a)},u=function(t){var e=0,a=t;while(a>=4096)e+=12,a/=4096;while(a>=2)e+=1,a/=2;return e},p=function(t,e,a){var s=-1,r=a;while(++s<6)r+=e*t[s],t[s]=r%1e7,r=d(r/1e7)},m=function(t,e){var a=6,s=0;while(--a>=0)s+=t[a],t[a]=d(s/e),s=s%e*1e7},f=function(t){var e=6,a="";while(--e>=0)if(""!==a||0===e||0!==t[e]){var s=String(t[e]);a=""===a?s:a+i.call("0",7-s.length)+s}return a},h=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!n((function(){l.call({})}));s({target:"Number",proto:!0,forced:h},{toFixed:function(t){var e,a,s,n,l=o(this),d=r(t),h=[0,0,0,0,0,0],b="",v="0";if(d<0||d>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(b="-",l=-l),l>1e-21)if(e=u(l*c(2,69,1))-69,a=e<0?l*c(2,-e,1):l/c(2,e,1),a*=4503599627370496,e=52-e,e>0){p(h,0,a),s=d;while(s>=7)p(h,1e7,0),s-=7;p(h,c(10,s,1),0),s=e-1;while(s>=23)m(h,1<<23),s-=23;m(h,1<<s),p(h,1,1),m(h,2),v=f(h)}else p(h,0,a),p(h,1<<-e,0),v=f(h)+i.call("0",d);return d>0?(n=v.length,v=b+(n<=d?"0."+i.call("0",d-n)+v:v.slice(0,n-d)+"."+v.slice(n-d))):v=b+v,v}})}}]);
//# sourceMappingURL=chunk-34f015c5.7ef86200.js.map