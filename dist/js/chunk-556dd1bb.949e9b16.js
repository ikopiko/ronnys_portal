(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-556dd1bb"],{"0afc":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("Layout",[a("PageHeader",{attrs:{title:t.title,items:t.items}}),a("div",{staticClass:"col-xl-8"},[a("div",{staticClass:"row"},t._l(t.branchInfo,(function(t){return a("div",{key:t.name,staticClass:"col-md-4"},[a("Stat",{attrs:{icon:t.icon,name:t.name,orders:t.orders,sum:t.sum}})],1)})),0)])],1)},s=[],n=(a("a4d3"),a("e01a"),a("159b"),a("a9e3"),a("a15b"),a("bc3a")),i=a.n(n),o=a("444f"),c=a("c2a4"),d=a("2579"),l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"card mini-stats-wid"},[a("div",{staticClass:"card-body"},[a("div",{staticClass:"media"},[a("div",{staticClass:"media-body"},[a("p",{staticClass:"text-muted fw-medium mb-2"},[t._v(t._s(t.name))]),a("h4",{staticClass:"mb-0"},[t._v(t._s(t.orders)+" Orders")]),a("h4",{staticClass:"mb-0"},[t._v(t._s(t.sum.toFixed(2))+" GEL")])]),a("div",{staticClass:"avatar-sm align-self-center mini-stat-icon rounded-circle bg-primary"},[a("span",{staticClass:"avatar-title"},[a("i",{class:t.icon+" font-size-24"})])])])])])},u=[],h={props:{name:{type:String,default:""},orders:{type:Number,default:0},sum:{type:Number,default:0},icon:{type:String,default:""}}},f=h,b=a("2877"),m=Object(b["a"])(f,l,u,!1,null,null,null),p=m.exports,v={page:{title:"Dashboard",meta:[{name:"description",content:c.description}]},components:{Layout:o["a"],PageHeader:d["a"],Stat:p},data:function(){return{title:"Dashboard",items:[{text:"Dashboards",href:"/"},{text:"Default",active:!0}],statData:[{icon:"bx bx-bar-chart-alt-2",title:"Saburtalo",orders:"1,235",sum:"10000 GEL"}],loggedUser:{},date:String(new Date),status:"1,2,3,4,5,6,7,8,9,10",ordersList:[],branchInfo:[]}},mounted:function(){var t=this;this.loggedUser=this.$store.state.authfack.user,this.date=this.formatDate(this.date);var e=this.loggedUser.token,a=this.date+" to "+this.date,r=new FormData;r.set("day",a),r.set("status_key",this.status),i.a.request({method:"post",url:"http://178.134.12.106:8082/ronny/rest/web/index.php?r=v1/orders/list",headers:{Authorization:"Bearer "+e},data:r}).then((function(e){t.ordersList=e.data.data;var a=0,r=0;t.ordersList.forEach((function(t){a++,r+=Number(t.order_data.totalPrice)}));var s={name:"Saburtalo",orders:a,sum:r,icon:"bx bx-bar-chart-alt-2"};t.branchInfo.push(s)})),i.a.request({method:"post",url:"http://94.43.92.102:8082/ronny/rest/web/index.php?r=v1/orders/list",headers:{Authorization:"Bearer "+e},data:r}).then((function(e){t.ordersList=e.data.data;var a=0,r=0;t.ordersList.forEach((function(t){a++,r+=Number(t.order_data.totalPrice)}));var s={name:"Vake",orders:a,sum:r,icon:"bx bx-bar-chart-alt-2"};t.branchInfo.push(s)})),i.a.request({method:"post",url:"http://188.169.16.186:8082/ronny/rest/web/index.php?r=v1/orders/list",headers:{Authorization:"Bearer "+e},data:r}).then((function(e){t.ordersList=e.data.data;var a=0,r=0;t.ordersList.forEach((function(t){a++,r+=Number(t.order_data.totalPrice)}));var s={name:"Digomi",orders:a,sum:r,icon:"bx bx-bar-chart-alt-2"};t.branchInfo.push(s)})),i.a.request({method:"post",url:"http://178.134.47.222:8082/ronny/rest/web/index.php?r=v1/orders/list",headers:{Authorization:"Bearer "+e},data:r}).then((function(e){t.ordersList=e.data.data;var a=0,r=0;t.ordersList.forEach((function(t){a++,r+=Number(t.order_data.totalPrice)}));var s={name:"Gldani",orders:a,sum:r,icon:"bx bx-bar-chart-alt-2"};t.branchInfo.push(s)}))},methods:{formatDate:function(t){var e=new Date(t),a=""+(e.getMonth()+1),r=""+e.getDate(),s=e.getFullYear();return a.length<2&&(a="0"+a),r.length<2&&(r="0"+r),[s,a,r].join("-")}}},g=v,_=Object(b["a"])(g,r,s,!1,null,null,null);e["default"]=_.exports},2579:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"row"},[a("div",{staticClass:"col-12"},[a("div",{staticClass:"page-title-box d-flex align-items-center justify-content-between"},[a("h4",{staticClass:"mb-0 font-size-18"},[t._v(t._s(t.title))]),a("div",{staticClass:"page-title-right"},[a("b-breadcrumb",{staticClass:"m-0",attrs:{items:t.items}})],1)])])])},s=[],n={components:{},props:{title:{type:String,default:""},items:{type:Array,default:function(){return[]}}}},i=n,o=a("2877"),c=Object(o["a"])(i,r,s,!1,null,null,null);e["a"]=c.exports},a15b:function(t,e,a){"use strict";var r=a("23e7"),s=a("44ad"),n=a("fc6a"),i=a("a640"),o=[].join,c=s!=Object,d=i("join",",");r({target:"Array",proto:!0,forced:c||!d},{join:function(t){return o.call(n(this),void 0===t?",":t)}})},a9e3:function(t,e,a){"use strict";var r=a("83ab"),s=a("da84"),n=a("94ca"),i=a("6eeb"),o=a("5135"),c=a("c6b6"),d=a("7156"),l=a("c04e"),u=a("d039"),h=a("7c73"),f=a("241c").f,b=a("06cf").f,m=a("9bf2").f,p=a("58a8").trim,v="Number",g=s[v],_=g.prototype,x=c(h(_))==v,I=function(t){var e,a,r,s,n,i,o,c,d=l(t,!1);if("string"==typeof d&&d.length>2)if(d=p(d),e=d.charCodeAt(0),43===e||45===e){if(a=d.charCodeAt(2),88===a||120===a)return NaN}else if(48===e){switch(d.charCodeAt(1)){case 66:case 98:r=2,s=49;break;case 79:case 111:r=8,s=55;break;default:return+d}for(n=d.slice(2),i=n.length,o=0;o<i;o++)if(c=n.charCodeAt(o),c<48||c>s)return NaN;return parseInt(n,r)}return+d};if(n(v,!g(" 0o1")||!g("0b1")||g("+0x1"))){for(var N,y=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof y&&(x?u((function(){_.valueOf.call(a)})):c(a)!=v)?d(new g(I(e)),a,y):I(e)},C=r?f(g):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger,fromString,range".split(","),E=0;C.length>E;E++)o(g,N=C[E])&&!o(y,N)&&m(y,N,b(g,N));y.prototype=_,_.constructor=y,i(s,v,y)}}}]);
//# sourceMappingURL=chunk-556dd1bb.949e9b16.js.map