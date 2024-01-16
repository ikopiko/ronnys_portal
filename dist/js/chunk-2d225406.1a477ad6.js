(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d225406"],{e434:function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t._self._c;return e("div",{attrs:{"data-app":""}},[e("Layout",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-4"},[e("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[e("v-toolbar",{attrs:{color:"deep-purple accent-4",dark:""}},[e("v-toolbar-title",[t._v("Supplies")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(e){t.requestSuppliesActive=!0}}},[e("v-icon",[t._v("mdi-plus")])],1)],1),e("v-list",{attrs:{subheader:""}},t._l(t.supplies,(function(s,i){return e("v-list-item",{key:i,on:{click:function(e){s.selected=!s.selected,t.changeSelect=t.changeSelect+1}}},[e("v-list-item-title",[t._v(" "+t._s(s.product_name)+" - "+t._s(s.quantity)+" "+t._s(s.unit)+" ")]),e("v-list-item-action",[e("v-checkbox",{attrs:{value:s.selected}})],1),e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(s.product_name)}})],1)],1)})),1),t._v(" "+t._s(t.selected)+" ")],1)],1),e("div",{staticClass:"col-8"},[t.requestSuppliesActive?e("v-card",{attrs:{height:"100%"}},[e("v-card-title",[t._v(" Request Supplies ")]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-4"},[e("v-list",{attrs:{subheader:""}},t._l(t.products,(function(s,i){return e("v-list-item",{key:i,on:{click:function(e){s.selected=!s.selected,t.changeSelect=t.changeSelect+1}}},[e("v-list-item-title",[t._v(" "+t._s(s.name)+" ")]),e("v-list-item-action",[e("v-checkbox",{attrs:{value:s.selected}})],1),e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(s.name)}})],1)],1)})),1)],1),e("div",{staticClass:"col-6"},t._l(t.selectedProducts,(function(s,i){return e("div",{key:i,staticClass:"row"},[e("div",{staticClass:"col-1"},[t._v(" ")]),e("div",{staticClass:"col-6"},[e("v-text-field",{attrs:{label:s.name,suffix:s.unit,required:""},model:{value:s.newQty,callback:function(e){t.$set(s,"newQty",e)},expression:"product.newQty"}})],1)])})),0)]),e("v-card-actions",[e("v-btn",{staticClass:"mr-4",on:{click:t.addSupply}},[t._v(" Create Request ")]),e("v-btn",{on:{click:function(e){t.requestSuppliesActive=!1}}},[t._v(" Close ")])],1)],1):t._e()],1)])])],1)},a=[],c=s("bc3a"),r=s.n(c),l=s("444f"),o={page:{title:"Products"},components:{Layout:l["a"]},computed:{selected(){return this.changeSelect,this.supplies.filter(t=>t.selected)},selectedProducts(){return this.changeSelect,this.products.filter(t=>t.selected)}},watch:{changeSelect(){this.requestData=this.products.filter(t=>t.selected)}},data(){return{requestSuppliesActive:!1,newProduct:{name:"",unit:""},request:{supplies:[],warehouse_id:null},responseData:null,products:[],requestData:[],supplies:[],units:[],changeSelect:0,warehouse_id:2}},mounted(){this.loggedUser=this.$store.state.authfack.user;const t=this.loggedUser.token;var e=new FormData;e.set("warehouse_id",this.warehouse_id),r.a.request({method:"post",url:this.$hostname+"warehouses/supplies-list",headers:{Authorization:"Bearer "+t},data:e}).then(t=>{this.supplies=t.data,this.supplies.forEach(t=>{t.selected=!1})}),r.a.request({method:"post",url:this.$hostname+"warehouses/products-list",headers:{Authorization:"Bearer "+t}}).then(t=>{this.products=t.data,this.products.forEach(t=>{t.selected=!1})})},methods:{addSupply(){this.requestData.forEach(t=>{var e={product_id:t.id,quantity:t.newQty};this.request.supplies.push(e)}),this.request.warehouse_id=this.warehouse_id;const t=this.loggedUser.token;this.request.supplies.forEach(e=>{var s=new FormData;s.set("product_id",e.product_id),s.set("warehouse_id",this.warehouse_id),s.set("quantity",e.quantity),r.a.request({method:"post",url:this.$hostname+"warehouses/add-supplie",headers:{Authorization:"Bearer "+t},data:s}).then(t=>{this.responseData=t})})}}},u=o,n=s("0c7c"),d=Object(n["a"])(u,i,a,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-2d225406.1a477ad6.js.map