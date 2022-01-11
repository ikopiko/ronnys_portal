(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0be709"],{"2fed":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Layout",[a("PageHeader",{attrs:{title:t.title}}),a("div",{staticClass:"row",attrs:{"data-app":""}},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("b-alert",{attrs:{dismissible:"",variant:"danger"},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}},[t._v(t._s(t.alertText))])],1),a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"search-box me-2 mb-2 d-inline-block"},[a("div",{staticClass:"position-relative"},[a("b-form-input",{attrs:{type:"search",placeholder:"Search..."},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("i",{staticClass:"bx bx-search-alt search-icon"})],1)])]),a("div",{staticClass:"col-sm-2"},[a("b-form-select",{staticClass:"form-control",attrs:{options:t.branchOptions},model:{value:t.selectedBranch,callback:function(e){t.selectedBranch=e},expression:"selectedBranch"}})],1)]),a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm-4"},[a("div",[a("label",{attrs:{for:"example-input"}},[t._v("From")]),a("b-input-group",{staticClass:"mb-3"},[a("b-form-input",{attrs:{id:"example-input",type:"text",placeholder:"YYYY-MM-DD",autocomplete:"off"},model:{value:t.fromDate,callback:function(e){t.fromDate=e},expression:"fromDate"}}),a("b-input-group-append",[a("b-form-datepicker",{attrs:{"button-only":"",right:"",locale:"en-US","aria-controls":"example-input"},model:{value:t.fromDate,callback:function(e){t.fromDate=e},expression:"fromDate"}})],1)],1)],1)]),a("div",{staticClass:"col-sm-4"},[a("div",[a("label",{attrs:{for:"example-input"}},[t._v("To")]),a("b-input-group",{staticClass:"mb-3"},[a("b-form-input",{attrs:{id:"example-input",type:"text",placeholder:"YYYY-MM-DD",autocomplete:"off"},model:{value:t.toDate,callback:function(e){t.toDate=e},expression:"toDate"}}),a("b-input-group-append",[a("b-form-datepicker",{attrs:{"button-only":"",right:"",locale:"en-US","aria-controls":"example-input"},model:{value:t.toDate,callback:function(e){t.toDate=e},expression:"toDate"}})],1)],1)],1)]),a("div",{staticClass:"col-sm-4 mt-4"},[a("b-button",{attrs:{variant:"success"},on:{click:function(e){return t.updateList()}}},[a("i",{staticClass:"bx bx-check-double font-size-16 align-middle me-2"}),t._v(" Search ")]),0!=t.exportData.length?a("b-button",{staticClass:"mx-2",attrs:{variant:"primary"}},[a("export-excel",{attrs:{data:t.exportData,name:"closed.xls"}},[t._v(" Export data to Excel "),a("i",{staticClass:"bx bx-download"})])],1):t._e()],1)])]),a("div",{staticClass:"table-responsive mb-0",staticStyle:{"min-height":"300px"}},[a("b-table",{staticClass:"datatables",attrs:{items:t.ordersList,fields:t.fields,responsive:"sm","per-page":t.perPage,"current-page":t.currentPage,"sort-by":t.sortBy,"sort-desc":t.sortDesc,filter:t.filter,"filter-included-fields":t.filterOn},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(actions)",fn:function(e){return[a("b-button",{staticClass:"mr-1",attrs:{size:"sm"},on:{click:function(a){return t.info(e.item,e.index,a.target)}}},[t._v(" Info modal ")])]}}])})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"dataTables_paginate paging_simple_numbers float-end"},[a("ul",{staticClass:"pagination pagination-rounded mb-0"},[a("label",{staticClass:"d-inline-flex align-items-center"},[t._v(" Show  "),a("b-form-select",{staticClass:"form-select form-select-sm",attrs:{size:"sm",options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}}),t._v(" entries ")],1),a("b-pagination",{attrs:{"total-rows":t.rows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])])])])])],1)],1)},o=[],r=(a("a4d3"),a("e01a"),a("b0c0"),a("a15b"),a("159b"),a("bc3a")),i=a.n(r),n=a("bf15"),l=a("444f"),c=a("2579"),d=a("c2a4"),u=a("2b0e");u["default"].use(n["a"]);var p={page:{title:"Orders",meta:[{name:"description",content:d.description}]},components:{Layout:l["a"],PageHeader:c["a"]},computed:{rows:function(){return this.ordersList.length}},data:function(){return{fromDate:String(new Date),currentPage:1,perPage:10,pageOptions:[10,25,50,100],totalRows:1,filter:null,filterOn:[],sortBy:"id",sortDesc:!1,fields:[{key:"id",label:"ID",sortable:!0},{key:"pos_name",label:"POS",sortable:!0},{key:"username",label:"Driver",sortable:!0},{key:"difference",label:"Difference",sortable:!0},{key:"comment",label:"Comment",sortable:!0},{key:"created_at",label:"Date",sortable:!0}],items:[{text:"Tables",href:"/"},{text:"Advanced",active:!0}],toDate:null,selectedBranch:null,branchURL:null,modalItem:{},modalShow:!1,showAlert:!1,alertText:"",orderStatuses:[],exportData:[],branchOptions:[{value:null,text:"Select Branch"},{value:"saburtalo",text:"Saburtalo"},{value:"vake",text:"Vake"},{value:"digomi",text:"Digomi"},{value:"gldani",text:"Gldani"}],loggedUser:{},ordersList:[],ordersListOld:[],title:"Closed Details",status:"1,2,3,4,5,6,7,8,9,10",infoModal:{id:"info-modal",order_id:"",discount:"",discountName:"",discountType:"",customer:"",items:[],totalPrice:"",discPrice:"",totalDue:""}}},watch:{selectedBranch:function(t){this.changeBranch(t)}},mounted:function(){var t=this;this.fromDate=this.formatDate(this.fromDate),this.loggedUser=this.$store.state.authfack.user;var e=this.loggedUser.token;i.a.request({method:"post",url:this.$hostname+"poses/order-statuses",headers:{Authorization:"Bearer "+e}}).then((function(e){t.orderStatuses=e.data.data}))},methods:{info:function(t,e,a){this.infoModal.title="Row index: ".concat(e),this.infoModal.order_id=t.id,this.infoModal.discountName=t.order_data.discountName,this.infoModal.discount=t.order_data.discount,this.infoModal.customer=t.order_data.customer.name,this.infoModal.items=t.order_data.items,this.infoModal.totalPrice=t.order_data.totalPrice,this.infoModal.discPrice=t.order_data.discPrice,this.infoModal.totalDue=t.order_data.totalDue,this.infoModal.content=JSON.stringify(t,null,2),this.$root.$emit("bv::show::modal",this.infoModal.id,a)},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1},formatDate:function(t){var e=new Date(t),a=""+(e.getMonth()+1),s=""+e.getDate(),o=e.getFullYear();return a.length<2&&(a="0"+a),s.length<2&&(s="0"+s),[o,a,s].join("-")},changeBranch:function(t){"saburtalo"==t?this.branchURL="http://178.134.12.106:8082/ronny/rest/web/index.php?r=v1/":"vake"==t?this.branchURL="http://94.43.92.102:8082/ronny/rest/web/index.php?r=v1/":"digomi"==t?this.branchURL="http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/":"gldani"==t&&(this.branchURL="http://178.134.47.222:8082/ronny/rest/web/index.php?r=v1/")},updateList:function(){var t,e=this;if(t=null==this.toDate?this.fromDate+" to "+this.fromDate:this.fromDate+" to "+this.toDate,null==this.selectedBranch)this.showAlert=!0,this.alertText="Select Branch to continue...";else{var a=this.loggedUser.token,s=new FormData;s.set("day",t),i.a.request({method:"post",url:this.branchURL+"manager/get-close-day",headers:{Authorization:"Bearer "+a},data:s}).then((function(t){e.ordersList=t.data.data,e.ordersList.forEach((function(t){var a={};a.id=t.id,a.name=t.username,a.posName=t.pos_name,a.diff_cash=t.diff_cash,a.diff_card=t.diff_card,a.driver=t.driver_id,a.created_at=t.created_at,e.exportData.push(a)}))}))}}}},f=p,m=a("2877"),h=Object(m["a"])(f,s,o,!1,null,null,null);e["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d0be709.24c896b9.js.map