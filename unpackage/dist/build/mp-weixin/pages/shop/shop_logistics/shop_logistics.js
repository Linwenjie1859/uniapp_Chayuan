(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/shop_logistics/shop_logistics"],{6444:function(e,n,t){},"7ef1":function(e,n,t){"use strict";(function(e){t("7a84"),t("921b");u(t("66fd"));var n=u(t("ed9d"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},b257:function(e,n,t){"use strict";var u=t("6444"),o=t.n(u);o.a},b7b3:function(e,n,t){"use strict";var u,o=function(){var e=this,n=e.$createElement;e._self._c},r=[];t.d(n,"b",function(){return o}),t.d(n,"c",function(){return r}),t.d(n,"a",function(){return u})},bb5a:function(e,n,t){"use strict";t.r(n);var u=t("c4e8"),o=t.n(u);for(var r in u)"default"!==r&&function(e){t.d(n,e,function(){return u[e]})}(r);n["default"]=o.a},c4e8:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=function(){return t.e("components/WuLiu-step").then(t.bind(null,"4018"))},o={components:{ali:u},onLoad:function(e){this.logistics(e.order_id)},data:function(){return{courierInfo:{delivery_name:"快递",delivery_id:"正在加载...",user_address:"正在加载..."},result:{deliverystatus:0,expPhone:"",list:[],expName:""}}},methods:{logistics:function(e){var n=this;n.baseGet(n.U({c:"user_api",a:"express",q:{uni:e}}),function(e){n.courierInfo=e.data.order,n.result=e.data.express.result,console.log(n.result)},function(e){console.log(e)},!0)}}};n.default=o},ed9d:function(e,n,t){"use strict";t.r(n);var u=t("b7b3"),o=t("bb5a");for(var r in o)"default"!==r&&function(e){t.d(n,e,function(){return o[e]})}(r);t("b257");var i,s=t("f0c5"),c=Object(s["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],i);n["default"]=c.exports}},[["7ef1","common/runtime","common/vendor"]]]);