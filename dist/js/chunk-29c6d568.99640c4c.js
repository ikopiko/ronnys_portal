(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29c6d568"],{2532:function(t,e,a){"use strict";var r=a("23e7"),n=a("5a34"),s=a("1d80"),i=a("ab13");r({target:"String",proto:!0,forced:!i("includes")},{includes:function(t){return!!~String(s(this)).indexOf(n(t),arguments.length>1?arguments[1]:void 0)}})},a9e3:function(t,e,a){"use strict";var r=a("83ab"),n=a("da84"),s=a("94ca"),i=a("6eeb"),c=a("5135"),o=a("c6b6"),u=a("7156"),d=a("c04e"),l=a("d039"),h=a("7c73"),m=a("241c").f,v=a("06cf").f,f=a("9bf2").f,p=a("58a8").trim,b="Number",N=n[b],w=N.prototype,g=o(h(w))==b,P=function(t){var e,a,r,n,s,i,c,o,u=d(t,!1);if("string"==typeof u&&u.length>2)if(u=p(u),e=u.charCodeAt(0),43===e||45===e){if(a=u.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(u.charCodeAt(1)){case 66:case 98:r=2,n=49;break;case 79:case 111:r=8,n=55;break;default:return+u}for(s=u.slice(2),i=s.length,c=0;c<i;c++)if(o=s.charCodeAt(c),o<48||o>n)return NaN;return parseInt(s,r)}return+u};if(s(b,!N(" 0o1")||!N("0b1")||N("+0x1"))){for(var _,A=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof A&&(g?l((function(){w.valueOf.call(a)})):o(a)!=b)?u(new N(P(e)),a,A):P(e)},k=r?m(N):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),I=0;k.length>I;I++)c(N,_=k[I])&&!c(A,_)&&f(A,_,v(N,_));A.prototype=w,w.constructor=A,i(n,b,A)}},ac0d:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{"data-app":""}},[a("Layout",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-4"},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[a("v-toolbar",{attrs:{color:"deep-purple accent-4",dark:""}},[a("v-toolbar-title",[t._v("Products")]),a("v-spacer"),a("v-btn",{attrs:{icon:""},on:{click:function(e){t.addProductsActive=!0}}},[a("v-icon",[t._v("mdi-plus")])],1)],1),a("v-list",{attrs:{subheader:""}},t._l(t.products,(function(e,r){return a("v-list-item",{key:r,on:{click:function(a){e.selected=!e.selected,t.changeSelect=t.changeSelect+1}}},[a("v-list-item-title",[t._v(" "+t._s(e.name)+" ")]),a("v-list-item-action",[a("v-checkbox",{attrs:{value:e.selected}})],1),a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.name)}})],1)],1)})),1),t._v(" "+t._s(t.selected)+" ")],1)],1),a("div",{staticClass:"col-8"},[t.addProductsActive?a("v-card",{attrs:{height:"100%"}},[a("v-card-title",[t._v(" ADD NEW PRODUCT ")]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-1"},[a("v-text-field",{attrs:{label:"ROUND",required:""},model:{value:t.roundNum,callback:function(e){t.roundNum=e},expression:"roundNum"}})],1),a("div",{staticClass:"col-4"},[a("v-text-field",{attrs:{label:"Product Name",required:""},model:{value:t.newProduct.name,callback:function(e){t.$set(t.newProduct,"name",e)},expression:"newProduct.name"}})],1),a("div",{staticClass:"col-4"},[a("v-select",{attrs:{items:t.units,label:"Units","item-text":"name",dense:""},model:{value:t.newProduct.unit,callback:function(e){t.$set(t.newProduct,"unit",e)},expression:"newProduct.unit"}})],1)]),t._v(" "+t._s(t.roundNumReturn)+" "),a("v-card-actions",[a("v-btn",{staticClass:"mr-4",on:{click:function(e){return t.roundNumber()}}},[t._v(" Round Number ")]),a("v-btn",{staticClass:"mr-4",on:{click:t.addProduct}},[t._v(" Create Product ")]),a("v-btn",{on:{click:function(e){t.addProductsActive=!1}}},[t._v(" Close ")])],1)],1):t._e()],1)])])],1)},n=[],s=(a("4de4"),a("159b"),a("a9e3"),a("caad"),a("2532"),a("ac1f"),a("1276"),a("d3b7"),a("25f0"),a("d81d"),a("b0c0"),a("bc3a")),i=a.n(s),c=a("444f"),o={page:{title:"Products"},components:{Layout:c["a"]},computed:{selected:function(){return this.changeSelect,this.products.filter((function(t){return t.selected}))}},data:function(){return{roundNum:0,splitdata:[],addProductsActive:!1,newProduct:{name:"",unit:""},responseData:null,products:[],units:[],changeSelect:0}},watch:{},mounted:function(){var t=this;this.loggedUser=this.$store.state.authfack.user;var e=this.loggedUser.token;i.a.request({method:"post",url:this.$hostname+"warehouses/products-list",headers:{Authorization:"Bearer "+e}}).then((function(e){t.products=e.data,t.products.forEach((function(t){t.selected=!1}))})),i.a.request({method:"post",url:this.$hostname+"warehouses/warehouse-unit",headers:{Authorization:"Bearer "+e}}).then((function(e){t.units=e.data}))},methods:{roundNumber:function(){var t=this.roundNum,e=Number(this.roundNum),a=[],r=0,n=0;return t.includes(".")?(a=t.split("."),this.splitdata=a,t=a[1],r=t.toString().split(""),n=r.map(Number)):(r=t.toString().split(""),n=r.map(Number)),0<=n[1]&&n[1]<=4?(e=this.splitdata[0]+"."+Number(n[0]+"0"),alert(e)):5==n[1]?(e=this.splitdata[0]+"."+Number(n[0]+"5"),alert(e)):6<=n[1]&&n[1]<=9&&(e=9==n[0]?Number(this.splitdata[0])+1+".00":this.splitdata[0]+"."+(Number(n[0])+1)+"0",alert(e)),e},addProduct:function(){var t=this,e=this.loggedUser.token;if(""!=this.newProduct.name&&""!=this.newProduct.unit){var a=new FormData;a.set("name",this.newProduct.name),a.set("unit",this.newProduct.unit),i.a.request({method:"post",url:this.$hostname+"warehouses/product-create",headers:{Authorization:"Bearer "+e},data:a}).then((function(e){alert(e.data.data),t.addProductsActive=!1,t.newProduct.name="",t.newProduct.unit=""})).catch((function(t){alert(t)}))}}}},u=o,d=a("2877"),l=Object(d["a"])(u,r,n,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-29c6d568.99640c4c.js.map