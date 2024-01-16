(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-370c95ce"],{"90ff":function(t,e,a){},"948f":function(t,e,a){"use strict";a.r(e);var o=function(){var t=this,e=t._self._c;return e("Layout",[e("v-card",[e("v-form",{ref:"searchForm",attrs:{"lazy-validation":""}},[e("v-row",[e("v-col",{staticClass:"ml-2",attrs:{cols:"4"}},[e("date-picker",{attrs:{type:"date","value-type":"YYYY-MM-DD",format:"YYYY-MM-DD",range:"",placeholder:"Select date",rules:t.nameRules},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}})],1),e("v-col",{attrs:{cols:"4"}},[e("v-autocomplete",{attrs:{clearable:"",items:t.branchOptions,dense:"",label:"Select branch"},on:{change:e=>t.updateRegion(e,t.index)},model:{value:t.branch,callback:function(e){t.branch=e},expression:"branch"}})],1),e("v-col",{attrs:{cols:"2"}},[e("v-btn",{attrs:{color:"primary",elevation:"0"},on:{click:function(e){return t.getReport()}}},[e("v-icon",{attrs:{small:""}},[t._v(" mdi-magnify ")]),t._v(" Search ")],1)],1)],1)],1),e("v-card-text",[e("v-card-title",{staticClass:"pl-0"},[e("v-text-field",{staticClass:"col-4 pl-0",attrs:{clearable:"",dense:"","append-icon":"mdi-magnify",label:"Search","single-line":"","hide-details":""},model:{value:t.suppliesSearch,callback:function(e){t.suppliesSearch=e},expression:"suppliesSearch"}}),e("v-spacer"),t.json_data.length>0?e("export-excel",{staticClass:"btn btn-success",attrs:{data:t.json_data,fields:t.json_fields,worksheet:"Worksheet",name:t.exportName}},[e("i",{staticClass:"mdi mdi-download"},[t._v(" Export ")])]):t._e()],1),e("v-data-table",{attrs:{dense:"",loading:t.loader,"loading-text":"Loading... Please wait",headers:t.supplyHeaders,items:t.supplyList,"items-per-page":10,search:t.suppliesSearch},scopedSlots:t._u([{key:"item.status",fn:function({item:a}){return[e("span",{staticClass:"badge badge-pill badge-soft-success",class:{"badge-soft-warning ":""+a.status!=7}},[t._v(t._s(a.statusName))])]}},{key:"item.actions",fn:function({item:a}){return[e("v-tooltip",{attrs:{top:""},scopedSlots:t._u([{key:"activator",fn:function({on:o,attrs:s}){return[e("span",t._g(t._b({},"span",s,!1),o),[e("v-btn",{attrs:{icon:"",color:"primary"}},[e("v-icon",{attrs:{small:""},on:{click:function(e){return t.showDetail(a)}}},[t._v(" mdi-eye ")])],1)],1)]}}],null,!0)},[e("span",[t._v("View Details")])])]}}],null,!0)})],1)],1),e("v-snackbar",{attrs:{color:t.color,elevation:"5"},scopedSlots:t._u([{key:"action",fn:function({attrs:a}){return[e("v-btn",t._b({attrs:{text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",a,!1),[t._v(" Close ")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.snackbarText)+" ")]),e("v-dialog",{attrs:{"max-width":"600"},model:{value:t.detailModal,callback:function(e){t.detailModal=e},expression:"detailModal"}},[e("v-card",[e("v-toolbar",{attrs:{color:"white",elevation:"0"}},[e("span",{staticClass:"text-h6"},[t._v(" Order Details - "+t._s(t.modalProductId))]),e("v-spacer"),e("v-card-actions",{staticClass:"justify-end"},[e("v-btn",{attrs:{icon:"",small:"",color:"gray"},on:{click:function(e){t.detailModal=!1}}},[e("v-icon",[t._v("mdi-close")])],1)],1)],1),e("hr"),e("v-card-text",[e("v-form",{ref:"supplyForm",attrs:{"lazy-validation":""}},[e("v-row",[e("div",{staticClass:"mb-1"},[t._v("LTD: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(Object.keys(t.fullOrder).length>0?t.fullOrder.order_data.invoice.ltd:""))])]),e("div",{staticClass:"mb-1"},[t._v("Address: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(Object.keys(t.fullOrder).length>0?t.fullOrder.order_data.invoice.address:""))])]),e("div",{staticClass:"mb-1"},[t._v("ID #: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(Object.keys(t.fullOrder).length>0?t.fullOrder.order_data.invoice.id:""))])]),e("div",{staticClass:"mb-1"},[t._v("Customer Name: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(Object.keys(t.fullOrder).length>0?t.fullOrder.order_data.invoice.name:""))])]),e("div",[t._v("Customer Phone: "),e("span",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(Object.keys(t.fullOrder).length>0?t.fullOrder.order_data.invoice.phone:""))])]),e("hr"),e("div",{staticClass:"table-responsive"},[e("table",{staticClass:"table table-centered table-nowrap"},[e("thead",[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("Product Name")]),e("th",{attrs:{scope:"col"}},[t._v("Product QTY")]),e("th",{attrs:{scope:"col"}},[t._v("Price")])])]),e("tbody",[t._l(t.order_data,(function(a,o){return e("tr",{key:o},[e("td",[e("div",[e("div",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(" "+t._s(a.size)+" "+t._s(a.name)+" ")]),e("span",{staticClass:"text-muted font-size-14 mb-0"},[t._v("GEL "+t._s(a.price)+" x "+t._s(a.qty))])])]),e("td",[t._v(" X "+t._s(a.qty)+" ")]),e("td",[t._v(t._s(a.price*a.qty))])])})),e("tr",[e("td",{attrs:{colspan:"2"}},[e("h6",{staticClass:"m-0 text-end"},[t._v("Sub Total:")])]),e("td",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalTotalPrice))])]),e("tr",[e("td",{attrs:{colspan:"2"}},[e("h6",{staticClass:"m-0 text-end"},[t._v("Discount:")])]),e("td",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalDiscount))])]),e("tr",[e("td",{attrs:{colspan:"2"}},[e("h6",{staticClass:"m-0 text-end"},[t._v("Total Due:")])]),e("td",{staticClass:"font-size-15 font-weight-bold text-muted"},[t._v(t._s(t.modalTotalDue))])])],2)])])])],1)],1),e("hr"),e("v-card-actions",[e("v-spacer")],1),e("v-card-actions",[e("v-spacer"),e("v-btn",{staticClass:"white--text text-capitalize",attrs:{elevation:"0",color:"red",small:""},on:{click:function(e){t.detailModal=!1}}},[e("i",{staticClass:"bx bx-x-circle"}),t._v(" Close ")])],1)],1)],1)],1)},s=[],r=a("bc3a"),n=a.n(r),i=a("444f"),l=a("ec45"),d=a("bf15"),c=a("2b0e"),u=a("c1df"),h=a.n(u);c["default"].use(d["a"]);var p={page:{title:"Sales Report"},components:{Layout:i["a"],DatePicker:l["a"]},computed:{},data(){return{modalTotalPrice:null,modalDiscount:null,modalTotalDue:null,order_data:[],fullOrder:[],modalProductId:null,modalDiscType:null,modalDisc:null,modalCustomer:null,orderStatuses:[],detailModal:!1,date:[h()(new Date).format("YYYY-MM-DD"),h()(new Date).format("YYYY-MM-DD")],branch:null,validSearch:!0,loader:!1,exportName:"All - "+h()(new Date).format("YYYY-MM-DD"),json_data:[],snackbar:!1,color:"default",snackbarText:null,TOKEN:null,selectedBranch:null,branchOptions:[{value:"Saburtalo",text:"Saburtalo"},{value:"Vake",text:"Vake"},{value:"Digomi",text:"Digomi"},{value:"Gldani",text:"Gldani"}],warehouseId:null,supplyList:[],suppliesSearch:"",branchURL:null,json_fields:{"Order ID":"id","Delivery Method":"order_data.deliveryMethod","Billing Name":"order_data.customer.name","Total price":"order_data.totalPrice",Type:"order_data.discountName",Amount:"order_data.newdiscount","Total due":"order_data.discounted",Comment:"order_data.managerComment",Method:"order_data.paymentType",Branch:"branch",status:"statusName",Date:"finish_date"},supplyHeaders:[{value:"id",text:"Order ID",sortable:!0},{value:"order_data.deliveryMethod",text:"Order Type",sortable:!0},{value:"order_data.customer.name",text:"Customer Name",sortable:!0},{value:"status",text:"Status",sortable:!0},{value:"order_data.totalPrice",text:"Total",sortable:!0},{value:"order_data.totalDue",text:"Total Due",sortable:!0},{value:"finish_date",text:"Finish date",sortable:!0},{value:"branch",text:"Branch",sortable:!0},{value:"actions",text:"Details",sortable:!0}],nameRules:[t=>!!t||" required"]}},mounted(){this.loggedUser=this.$store.state.authfack.user,this.warehouseId=this.loggedUser.warehouseId,this.TOKEN=this.loggedUser.token,n.a.request({method:"post",url:this.$hostname+"poses/order-statuses",headers:{Authorization:"Bearer "+this.TOKEN}}).then(t=>{this.orderStatuses=t.data.data}),this.getReport()},methods:{showDetail(t){this.modalProductId=t.id,this.modalDiscType=t.order_data.discountName,this.modalDisc=t.order_data.discount+this.discount(t,"discname"),this.modalCustomer=t.order_data.customer.name,this.fullOrder=t,this.order_data=t.order_data.items,this.modalTotalPrice=t.order_data.totalPrice,this.modalDiscount=this.discount(t,"discounted"),this.modalTotalDue=this.discount(t,"totalDue"),this.detailModal=!0},discount(t,e){return"discname"==e?"Diplomat"==t.order_data.discountName?"%":"Manager"==t.order_data.discountName&&1==t.order_data.discountAmount?"GEL":"%":"discounted"==e?"Diplomat"==t.order_data.discountName?(t.order_data.totalPrice-t.order_data.totalPrice/1.18).toFixed(2):"Manager"==t.order_data.discountName&&1==t.order_data.discountAmount?t.order_data.discount:(t.order_data.totalPrice/100*t.order_data.discount).toFixed(2):"totalDue"==e?"Diplomat"==t.order_data.discountName?(t.order_data.totalPrice-(t.order_data.totalPrice-t.order_data.totalPrice/1.18)).toFixed(2):"Manager"==t.order_data.discountName&&1==t.order_data.discountAmount?(t.order_data.totalPrice-t.order_data.discount).toFixed(2):(t.order_data.totalPrice-t.order_data.totalPrice/100*t.order_data.discount).toFixed(2):void 0},getReport(){this.$refs.searchForm.validate()&&(this.loader=!0,this.json_data=[],this.supplyList=[],this.branchURL="http://posapi.ronnyspizza.grena.ge/rest/web/index.php?r=v1/reporting/invoice-orders",n.a.request({method:"post",url:this.$hostname+"reporting/invoice-orders",headers:{Authorization:"Bearer "+this.TOKEN},data:{day:this.date,branch:this.branch}}).then(t=>{this.loader=!1,this.supplyList=this.json_data=t.data.data,this.supplyList.forEach(t=>{t.order_data.newdiscount=t.order_data.discount+this.discount(t,"discname"),t.order_data.discounted=this.discount(t,"discounted"),t.order_data.totalDue=this.discount(t,"totalDue"),t.statusName=this.orderStatuses[t.status-1].status_name}),console.log(this.supplyList)}))},updateRegion(t){this.exportName=t+" - "+this.date}}},m=p,f=(a("a548"),a("0c7c")),v=Object(f["a"])(m,o,s,!1,null,null,null);e["default"]=v.exports},a548:function(t,e,a){"use strict";a("90ff")},aefd:function(t,e,a){var o,s,r;(function(a,n){s=[],o=n,r="function"===typeof o?o.apply(e,s):o,void 0===r||(t.exports=r)})(0,(function(){return function t(e,a,o){var s,r,n=window,i="application/octet-stream",l=o||i,d=e,c=!a&&!o&&d,u=document.createElement("a"),h=function(t){return String(t)},p=n.Blob||n.MozBlob||n.WebKitBlob||h,m=a||"download";if(p=p.call?p.bind(n):Blob,"true"===String(this)&&(d=[d,l],l=d[0],d=d[1]),c&&c.length<2048&&(m=c.split("/").pop().split("?")[0],u.href=c,-1!==u.href.indexOf(c))){var f=new XMLHttpRequest;return f.open("GET",c,!0),f.responseType="blob",f.onload=function(e){t(e.target.response,m,i)},setTimeout((function(){f.send()}),0),f}if(/^data:([\w+-]+\/[\w+.-]+)?[,;]/.test(d)){if(!(d.length>2096103.424&&p!==h))return navigator.msSaveBlob?navigator.msSaveBlob(x(d),m):y(d);d=x(d),l=d.type||i}else if(/([\x80-\xff])/.test(d)){var v=0,b=new Uint8Array(d.length),_=b.length;for(v;v<_;++v)b[v]=d.charCodeAt(v);d=new p([b],{type:l})}function x(t){var e=t.split(/[:;,]/),a=e[1],o=t.indexOf("charset")>0?3:2,s="base64"==e[o]?atob:decodeURIComponent,r=s(e.pop()),n=r.length,i=0,l=new Uint8Array(n);for(i;i<n;++i)l[i]=r.charCodeAt(i);return new p([l],{type:a})}function y(t,e){if("download"in u)return u.href=t,u.setAttribute("download",m),u.className="download-js-link",u.innerHTML="downloading...",u.style.display="none",u.addEventListener("click",(function(t){t.stopPropagation(),this.removeEventListener("click",arguments.callee)})),document.body.appendChild(u),setTimeout((function(){u.click(),document.body.removeChild(u),!0===e&&setTimeout((function(){n.URL.revokeObjectURL(u.href)}),250)}),66),!0;if(/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent))return/^data:/.test(t)&&(t="data:"+t.replace(/^data:([\w\/\-\+]+)/,i)),window.open(t)||confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")&&(location.href=t),!0;var a=document.createElement("iframe");document.body.appendChild(a),!e&&/^data:/.test(t)&&(t="data:"+t.replace(/^data:([\w\/\-\+]+)/,i)),a.src=t,setTimeout((function(){document.body.removeChild(a)}),333)}if(s=d instanceof p?d:new p([d],{type:l}),navigator.msSaveBlob)return navigator.msSaveBlob(s,m);if(n.URL)y(n.URL.createObjectURL(s),!0);else{if("string"===typeof s||s.constructor===h)try{return y("data:"+l+";base64,"+n.btoa(s))}catch(g){return y("data:"+l+","+encodeURIComponent(s))}r=new FileReader,r.onload=function(t){y(this.result)},r.readAsDataURL(s)}return!0}}))},bf15:function(t,e,a){"use strict";var o=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:t.idName},on:{click:t.generate}},[t._t("default",(function(){return[t._v(" Download "+t._s(t.name)+" ")]}))],2)},s=[],r=a("aefd"),n=a.n(r),i={name:"export-excel",props:{type:{type:String,default:"xls"},data:{type:Array,required:!1,default:null},fields:{type:Object,required:!1},exportFields:{type:Object,required:!1},defaultValue:{type:String,required:!1,default:""},title:{default:null},footer:{default:null},name:{type:String,default:"data.xls"},fetch:{type:Function},meta:{type:Array,default:()=>[]},worksheet:{type:String,default:"Sheet1"},beforeGenerate:{type:Function},beforeFinish:{type:Function}},computed:{idName(){var t=(new Date).getTime();return"export_"+t},downloadFields(){return void 0!==this.fields?this.fields:void 0!==this.exportFields?this.exportFields:void 0}},methods:{async generate(){"function"===typeof this.beforeGenerate&&await this.beforeGenerate();let t=this.data;if("function"!==typeof this.fetch&&t||(t=await this.fetch()),!t||!t.length)return;let e=this.getProcessedJson(t,this.downloadFields);return"html"===this.type?this.export(this.jsonToXLS(e),this.name.replace(".xls",".html"),"text/html"):"csv"===this.type?this.export(this.jsonToCSV(e),this.name.replace(".xls",".csv"),"application/csv"):this.export(this.jsonToXLS(e),this.name,"application/vnd.ms-excel")},export:async function(t,e,a){let o=this.base64ToBlob(t,a);"function"===typeof this.beforeFinish&&await this.beforeFinish(),n()(o,e,a)},jsonToXLS(t){let e='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>br {mso-data-placement: same-cell;}</style></head><body><table>${table}</table></body></html>',a="<thead>";const o=Object.keys(t[0]).length;let s=this;null!=this.title&&(a+=this.parseExtraData(this.title,'<tr><th colspan="'+o+'">${data}</th></tr>')),a+="<tr>";for(let r in t[0])a+="<th>"+r+"</th>";return a+="</tr>",a+="</thead>",a+="<tbody>",t.map((function(t,e){a+="<tr>";for(let o in t)a+="<td>"+s.valueReformattedForMultilines(t[o])+"</td>";a+="</tr>"})),a+="</tbody>",null!=this.footer&&(a+="<tfoot>",a+=this.parseExtraData(this.footer,'<tr><td colspan="'+o+'">${data}</td></tr>'),a+="</tfoot>"),e.replace("${table}",a).replace("${worksheet}",this.worksheet)},jsonToCSV(t){var e=[];null!=this.title&&e.push(this.parseExtraData(this.title,"${data}\r\n"));for(let a in t[0])e.push(a),e.push(",");return e.pop(),e.push("\r\n"),t.map((function(t){for(let a in t){let o='="'+t[a]+'"';o.match(/[,"\n]/)&&(o='"'+o.replace(/\"/g,'""')+'"'),e.push(o),e.push(",")}e.pop(),e.push("\r\n")})),null!=this.footer&&e.push(this.parseExtraData(this.footer,"${data}\r\n")),e.join("")},getProcessedJson(t,e){let a=this.getKeys(t,e),o=[],s=this;return t.map((function(t,e){let r={};for(let o in a){let e=a[o];r[o]=s.getValue(e,t)}o.push(r)})),o},getKeys(t,e){if(e)return e;let a={};for(let o in t[0])a[o]=o;return a},parseExtraData(t,e){let a="";if(Array.isArray(t))for(var o=0;o<t.length;o++)a+=e.replace("${data}",t[o]);else a+=e.replace("${data}",t);return a},getValue(t,e){const a="object"!==typeof t?t:t.field;let o="string"!==typeof a?[]:a.split("."),s=this.defaultValue;return s=a?o.length>1?this.getValueFromNestedItem(e,o):this.parseValue(e[a]):e,t.hasOwnProperty("callback")&&(s=this.getValueFromCallback(s,t.callback)),s},valueReformattedForMultilines(t){return"string"==typeof t?t.replace(/\n/gi,"<br/>"):t},getValueFromNestedItem(t,e){let a=t;for(let o of e)a&&(a=a[o]);return this.parseValue(a)},getValueFromCallback(t,e){if("function"!==typeof e)return this.defaultValue;const a=e(t);return this.parseValue(a)},parseValue(t){return t||0===t||"boolean"===typeof t?t:this.defaultValue},base64ToBlob(t,e){let a=window.btoa(window.unescape(encodeURIComponent(t))),o=atob(a),s=o.length,r=new Uint8ClampedArray(s);while(s--)r[s]=o.charCodeAt(s);return new Blob([r],{type:e})}}},l=i,d=a("0c7c"),c=Object(d["a"])(l,o,s,!1,null,null,null),u=c.exports;const h={install:function(t){t.component(u.name,u)}};"undefined"!==typeof window&&window.Vue&&window.Vue.use(h);e["a"]=h}}]);
//# sourceMappingURL=chunk-370c95ce.97e83b70.js.map