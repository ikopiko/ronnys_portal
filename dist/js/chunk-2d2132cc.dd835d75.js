(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2132cc"],{ac0d:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{attrs:{"data-app":""}},[e("Layout",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-4"},[e("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[e("v-toolbar",{attrs:{color:"deep-purple accent-4",dark:""}},[e("v-toolbar-title",[t._v("Products")]),e("v-spacer"),e("v-btn",{attrs:{icon:""},on:{click:function(e){t.addProductsActive=!0}}},[e("v-icon",[t._v("mdi-plus")])],1)],1),e("v-list",{attrs:{subheader:""}},t._l(t.products,(function(s,a){return e("v-list-item",{key:a,on:{click:function(e){s.selected=!s.selected,t.changeSelect=t.changeSelect+1}}},[e("v-list-item-title",[t._v(" "+t._s(s.name)+" ")]),e("v-list-item-action",[e("v-checkbox",{attrs:{value:s.selected}})],1),e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(s.name)}})],1)],1)})),1),t._v(" "+t._s(t.selected)+" ")],1)],1),e("div",{staticClass:"col-8"},[t.addProductsActive?e("v-card",{attrs:{height:"100%"}},[e("v-card-title",[t._v(" ADD NEW PRODUCT ")]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-1"},[e("v-text-field",{attrs:{label:"ROUND",required:""},model:{value:t.roundNum,callback:function(e){t.roundNum=e},expression:"roundNum"}})],1),e("div",{staticClass:"col-4"},[e("v-text-field",{attrs:{label:"Product Name",required:""},model:{value:t.newProduct.name,callback:function(e){t.$set(t.newProduct,"name",e)},expression:"newProduct.name"}})],1),e("div",{staticClass:"col-4"},[e("v-select",{attrs:{items:t.units,label:"Units","item-text":"name",dense:""},model:{value:t.newProduct.unit,callback:function(e){t.$set(t.newProduct,"unit",e)},expression:"newProduct.unit"}})],1)]),t._v(" "+t._s(t.roundNumReturn)+" "),e("v-card-actions",[e("v-btn",{staticClass:"mr-4",on:{click:function(e){return t.roundNumber()}}},[t._v(" Round Number ")]),e("v-btn",{staticClass:"mr-4",on:{click:t.addProduct}},[t._v(" Create Product ")]),e("v-btn",{on:{click:function(e){t.addProductsActive=!1}}},[t._v(" Close ")])],1)],1):t._e()],1)])])],1)},r=[],i=s("bc3a"),c=s.n(i),n=s("444f"),o={page:{title:"Products"},components:{Layout:n["a"]},computed:{selected(){return this.changeSelect,this.products.filter(t=>t.selected)}},data(){return{roundNum:0,splitdata:[],addProductsActive:!1,newProduct:{name:"",unit:""},responseData:null,products:[],units:[],changeSelect:0}},watch:{},mounted(){this.loggedUser=this.$store.state.authfack.user;const t=this.loggedUser.token;c.a.request({method:"post",url:this.$hostname+"warehouses/products-list",headers:{Authorization:"Bearer "+t}}).then(t=>{this.products=t.data,this.products.forEach(t=>{t.selected=!1})}),c.a.request({method:"post",url:this.$hostname+"warehouses/warehouse-unit",headers:{Authorization:"Bearer "+t}}).then(t=>{this.units=t.data})},methods:{roundNumber(){var t=this.roundNum,e=Number(this.roundNum),s=[],a=0,r=0;return t.includes(".")?(s=t.split("."),this.splitdata=s,t=s[1],a=t.toString().split(""),r=a.map(Number)):(a=t.toString().split(""),r=a.map(Number)),0<=r[1]&&r[1]<=4?(e=this.splitdata[0]+"."+Number(r[0]+"0"),alert(e)):5==r[1]?(e=this.splitdata[0]+"."+Number(r[0]+"5"),alert(e)):6<=r[1]&&r[1]<=9&&(e=9==r[0]?Number(this.splitdata[0])+1+".00":this.splitdata[0]+"."+(Number(r[0])+1)+"0",alert(e)),e},addProduct(){const t=this.loggedUser.token;if(""!=this.newProduct.name&&""!=this.newProduct.unit){var e=new FormData;e.set("name",this.newProduct.name),e.set("unit",this.newProduct.unit),c.a.request({method:"post",url:this.$hostname+"warehouses/product-create",headers:{Authorization:"Bearer "+t},data:e}).then(t=>{alert(t.data.data),this.addProductsActive=!1,this.newProduct.name="",this.newProduct.unit=""}).catch(t=>{alert(t)})}}}},u=o,d=s("0c7c"),l=Object(d["a"])(u,a,r,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d2132cc.dd835d75.js.map