(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/shop_logistics/shop_logistics"],{"23a7":function(e,t,n){"use strict";n.r(t);var o=n("5219"),s=n("b173");for(var u in s)"default"!==u&&function(e){n.d(t,e,function(){return s[e]})}(u);n("f8af");var i=n("2877"),a=Object(i["a"])(s["default"],o["a"],o["b"],!1,null,null,null);t["default"]=a.exports},5219:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement;e._self._c},s=[];n.d(t,"a",function(){return o}),n.d(t,"b",function(){return s})},"8eb7":function(e,t,n){"use strict";(function(e){n("ae5d"),n("921b");o(n("66fd"));var t=o(n("23a7"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("6e42")["createPage"])},aca6:function(e,t,n){},b173:function(e,t,n){"use strict";n.r(t);var o=n("c3e7"),s=n.n(o);for(var u in o)"default"!==u&&function(e){n.d(t,e,function(){return o[e]})}(u);t["default"]=s.a},c3e7:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=function(){return n.e("components/WuLiu-step").then(n.bind(null,"26d9"))},s={components:{ali:o},onLoad:function(e){this.logistics(e.order_id)},data:function(){return{courierInfo:{delivery_name:"快递",delivery_id:"正在加载...",user_address:"正在加载..."},result:{deliverystatus:0,expPhone:"",list:[],expName:""}}},methods:{logistics:function(t){var n=this;n.baseGet(n.U({c:"user_api",a:"express",q:{uni:t}}),function(t){n.courierInfo=t.data.order,n.result=t.data.express.result,console.log(e(n.result," at pages\\shop\\shop_logistics\\shop_logistics.vue:62"))},function(t){console.log(e(t," at pages\\shop\\shop_logistics\\shop_logistics.vue:65"))},!0)}}};t.default=s}).call(this,n("0de9")["default"])},f8af:function(e,t,n){"use strict";var o=n("aca6"),s=n.n(o);s.a}},[["8eb7","common/runtime","common/vendor"]]]);