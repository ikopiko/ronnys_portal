(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8b697038"],{"9b60":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Layout",[a("PageHeader",{attrs:{title:t.title}}),a("div",{staticClass:"row",attrs:{"data-app":""}},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"card"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"row"},[a("b-alert",{attrs:{dismissible:"",variant:"danger"},model:{value:t.showAlert,callback:function(e){t.showAlert=e},expression:"showAlert"}},[t._v(t._s(t.alertText))])],1),a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm-2"},[a("div",{staticClass:"search-box me-2 mb-2 d-inline-block"},[a("div",{staticClass:"position-relative"},[a("b-form-input",{attrs:{type:"search",placeholder:"Search..."},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),a("i",{staticClass:"bx bx-search-alt search-icon"})],1)])]),a("div",{staticClass:"col-sm-2"},[a("b-form-select",{staticClass:"form-control",attrs:{options:t.branchOptions},model:{value:t.selectedBranch,callback:function(e){t.selectedBranch=e},expression:"selectedBranch"}})],1)]),a("div",{staticClass:"row mb-2"},[a("div",{staticClass:"col-sm-4"},[a("div",[a("label",{attrs:{for:"example-input"}},[t._v("From")]),a("b-input-group",{staticClass:"mb-3"},[a("b-form-input",{attrs:{id:"example-input",type:"text",placeholder:"YYYY-MM-DD",autocomplete:"off"},model:{value:t.fromDate,callback:function(e){t.fromDate=e},expression:"fromDate"}}),a("b-input-group-append",[a("b-form-datepicker",{attrs:{"button-only":"",right:"",locale:"en-US","aria-controls":"example-input"},model:{value:t.fromDate,callback:function(e){t.fromDate=e},expression:"fromDate"}})],1)],1)],1)]),a("div",{staticClass:"col-sm-4"},[a("div",[a("label",{attrs:{for:"example-input"}},[t._v("To")]),a("b-input-group",{staticClass:"mb-3"},[a("b-form-input",{attrs:{id:"example-input",type:"text",placeholder:"YYYY-MM-DD",autocomplete:"off"},model:{value:t.toDate,callback:function(e){t.toDate=e},expression:"toDate"}}),a("b-input-group-append",[a("b-form-datepicker",{attrs:{"button-only":"",right:"",locale:"en-US","aria-controls":"example-input"},model:{value:t.toDate,callback:function(e){t.toDate=e},expression:"toDate"}})],1)],1)],1)]),a("div",{staticClass:"col-sm-4 mt-4"},[a("b-button",{attrs:{variant:"success"},on:{click:function(e){t.updateList(),t.btnClick()}}},[a("i",{staticClass:"bx bx-check-double font-size-16 align-middle me-2"}),t._v(" Search ")]),0!=t.exportData.length?a("b-button",{staticClass:"mx-2",attrs:{variant:"primary"}},[a("div",{attrs:{id:"app"}},[a("ejs-button",{attrs:{iconCss:"e-icons e-play-icon",cssClass:"e-flat",isPrimary:!0,isToggle:!0},on:{click:t.toolbarClick}},[t._v("Excel Export")]),a("ejs-grid",{ref:"Grid",attrs:{id:"Grid",dataSource:t.exportData,toolbar:t.toolbarOptions,height:"270px",allowPaging:!0,allowExcelExport:!0,toolbarClick:t.toolbarClick}},[a("e-columns",[a("e-column",{attrs:{field:"id",headerText:"ID"}}),a("e-column",{attrs:{field:"name",headerText:"User Name"}}),a("e-column",{attrs:{field:"posName",headerText:"POS"}}),a("e-column",{attrs:{field:"driver",headerText:"Driver"}}),a("e-column",{attrs:{field:"pos_id",headerText:"POS ID"}}),a("e-column",{attrs:{field:"action",headerText:"Action"}}),a("e-column",{attrs:{field:"comment",headerText:"Comment"}}),a("e-column",{attrs:{field:"created_at",headerText:"Date"}})],1)],1)],1)]):t._e(),0==t.exportData.length?a("b-button",{staticClass:"mx-2 hidden disablegrid",attrs:{variant:"primary"}},[a("div",{attrs:{id:"app"}},[a("ejs-button",{attrs:{iconCss:"e-icons e-play-icon",cssClass:"e-flat",isPrimary:!0,isToggle:!0},on:{click:t.toolbarClick}},[t._v("Excel Export")]),a("ejs-grid",{ref:"Grid",attrs:{id:"Grid",dataSource:t.exportData,toolbar:t.toolbarOptions,height:"270px",allowPaging:!0,allowExcelExport:!0,toolbarClick:t.toolbarClick}},[a("e-columns",[a("e-column",{attrs:{field:"id",headerText:"Order ID"}}),a("e-column",{attrs:{field:"name",headerText:"Customer Name"}}),a("e-column",{attrs:{field:"posName",headerText:"POS"}}),a("e-column",{attrs:{field:"driver",headerText:"Driver"}}),a("e-column",{attrs:{field:"pos_id",headerText:"POS ID"}}),a("e-column",{attrs:{field:"action",headerText:"Action"}}),a("e-column",{attrs:{field:"comment",headerText:"Comment"}}),a("e-column",{attrs:{field:"created_at",headerText:"Date"}})],1)],1)],1)]):t._e()],1)])]),a("div",{staticClass:"table-responsive mb-0",staticStyle:{"min-height":"300px"}},[a("b-table",{staticClass:"datatables",attrs:{items:t.ordersList,fields:t.fields,responsive:"sm","per-page":t.perPage,"current-page":t.currentPage,"sort-by":t.sortBy,"sort-desc":t.sortDesc,filter:t.filter,"filter-included-fields":t.filterOn},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"cell(actions)",fn:function(e){return[a("b-button",{staticClass:"mr-1",attrs:{size:"sm"},on:{click:function(a){return t.info(e.item,e.index,a.target)}}},[t._v(" Info modal ")])]}}])})],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col"},[a("div",{staticClass:"dataTables_paginate paging_simple_numbers float-end"},[a("ul",{staticClass:"pagination pagination-rounded mb-0"},[a("label",{staticClass:"d-inline-flex align-items-center"},[t._v(" Show  "),a("b-form-select",{staticClass:"form-select form-select-sm",attrs:{size:"sm",options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}}),t._v(" entries ")],1),a("b-pagination",{attrs:{"total-rows":t.rows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)])])])])])],1)],1)},s=[],i=(a("a4d3"),a("e01a"),a("b0c0"),a("a15b"),a("159b"),a("bc3a")),r=a.n(i),l=a("444f"),n=a("2579"),c=a("c041"),d=a("e09d"),u=a("6e1f"),m=a("c2a4"),h=a("2b0e");h["default"].use(c["a"]);var f={page:{title:"Safe",meta:[{name:"description",content:m.description}]},components:{Layout:l["a"],PageHeader:n["a"]},computed:{rows:function(){return this.ordersList.length}},data:function(){return{excelTitle:"Ronny's",toolbarOptions:["ExcelExport"],fromDate:String(new Date),currentPage:1,perPage:10,pageOptions:[10,25,50,100],totalRows:1,filter:null,filterOn:[],sortBy:"id",sortDesc:!1,fields:[{key:"id",label:"ID",sortable:!0},{key:"payment",label:"Action",sortable:!0},{key:"pos_name",label:"POS",sortable:!0},{key:"driver_name",label:"Driver",sortable:!0},{key:"user_name",label:"Manager",sortable:!0},{key:"created_at",label:"Date",sortable:!0}],items:[{text:"Tables",href:"/"},{text:"Advanced",active:!0}],toDate:null,selectedBranch:null,branchURL:null,modalItem:{},modalShow:!1,showAlert:!1,alertText:"",orderStatuses:[],exportData:[],branchOptions:[{value:null,text:"Select Branch"},{value:"2",text:"Saburtalo"},{value:"3",text:"Vake"},{value:"1",text:"Digomi"},{value:"4",text:"Gldani"}],loggedUser:{},ordersList:[],ordersListOld:[],title:"Safe Details",status:"1,2,3,4,5,6,7,8,9,10",infoModal:{id:"info-modal",order_id:"",discount:"",discountName:"",discountType:"",customer:"",items:[],totalPrice:"",discPrice:"",totalDue:""}}},watch:{selectedBranch:function(t){this.changeBranch(t)}},mounted:function(){var t=this;this.fromDate=this.formatDate(this.fromDate),this.loggedUser=this.$store.state.authfack.user;var e=this.loggedUser.token;r.a.request({method:"post",url:this.$hostname+"poses/order-statuses",headers:{Authorization:"Bearer "+e}}).then((function(e){t.orderStatuses=e.data.data}))},provide:{grid:[d["a"],u["a"]]},methods:{btnClick:function(){this.$refs.Grid.$el.classList.contains("disablegrid")||(this.$refs.Grid.$el.classList.add("disablegrid"),document.getElementById("GridParent").classList.add("wrapper"))},toolbarClick:function(){var t={header:{headerRows:7,rows:[{cells:[{colSpan:4,value:this.excelTitle,style:{fontColor:"#000000",fontSize:32,hAlign:"Center",bold:!0}}]},{cells:[{colSpan:4,value:"Branch: "+this.selectedBranch,style:{fontColor:"#000000",fontSize:15,hAlign:"Center",bold:!0}}]},{cells:[{colSpan:4,value:"Safe",style:{fontColor:"#000000",fontSize:15,hAlign:"Center",bold:!0}}]},{cells:[{colSpan:4,value:"Date: "+this.fromDate+" - "+this.toDate,style:{fontColor:"#000000",fontSize:15,hAlign:"Center",bold:!0}}]}]},footer:{footerRows:4,rows:[{cells:[{colSpan:4,value:"Ronny's",style:{hAlign:"Center",bold:!0}}]}]}};this.$refs.Grid.excelExport(t)},info:function(t,e,a){this.infoModal.title="Row index: ".concat(e),this.infoModal.order_id=t.id,this.infoModal.discountName=t.order_data.discountName,this.infoModal.discount=t.order_data.discount,this.infoModal.customer=t.order_data.customer.name,this.infoModal.items=t.order_data.items,this.infoModal.totalPrice=t.order_data.totalPrice,this.infoModal.discPrice=t.order_data.discPrice,this.infoModal.totalDue=t.order_data.totalDue,this.infoModal.content=JSON.stringify(t,null,2),this.$root.$emit("bv::show::modal",this.infoModal.id,a)},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1},formatDate:function(t){var e=new Date(t),a=""+(e.getMonth()+1),o=""+e.getDate(),s=e.getFullYear();return a.length<2&&(a="0"+a),o.length<2&&(o="0"+o),[s,a,o].join("-")},changeBranch:function(t){"saburtalo"==t?this.branchURL=this.$hostSaburtalo:"vake"==t?this.branchURL=this.$hostVake:"digomi"==t?this.branchURL=this.$hostDigomi:"gldani"==t&&(this.branchURL=this.$hostGldani)},updateList:function(){var t,e=this;if(t=null==this.toDate?this.fromDate+" to "+this.fromDate:this.fromDate+" to "+this.toDate,null==this.selectedBranch)this.showAlert=!0,this.alertText="Select Branch to continue...";else{var a=this.loggedUser.token,o=new FormData;o.set("day",t),o.set("branch_id",this.selectedBranch),r.a.request({method:"post",url:"http://new.ronnys.info/?r=v1/reporting/safe-detail",headers:{Authorization:"Bearer "+a},data:o}).then((function(t){e.ordersList=t.data.data,e.ordersList.forEach((function(t){var a={};a.id=t.id,a.name=t.user_name,a.posName=t.pos_name,a.driver=t.driver_name,a.amount=t.amount,a.pos_id=t.pos_id,a.action=t.payment,a.comment=t.comment,a.created_at=t.created_at,e.exportData.push(a)}))}))}}}},p=f,b=(a("e716"),a("2877")),g=Object(b["a"])(p,o,s,!1,null,null,null);e["default"]=g.exports},e716:function(t,e,a){"use strict";a("e7be")},e7be:function(t,e,a){}}]);
//# sourceMappingURL=chunk-8b697038.a61466ad.js.map