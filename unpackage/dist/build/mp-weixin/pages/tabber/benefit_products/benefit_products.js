(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabber/benefit_products/benefit_products"],{"8f3a":function(e,t,n){"use strict";var a=n("90b1"),o=n.n(a);o.a},"90b1":function(e,t,n){},a68d:function(e,t,n){"use strict";n.r(t);var a=n("db4f"),o=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,function(){return a[e]})}(r);t["default"]=o.a},bb3d:function(e,t,n){"use strict";n.r(t);var a=n("cbc3"),o=n("a68d");for(var r in o)"default"!==r&&function(e){n.d(t,e,function(){return o[e]})}(r);n("8f3a");var c,i=n("f0c5"),u=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);t["default"]=u.exports},cbc3:function(e,t,n){"use strict";var a,o=function(){var e=this,t=e.$createElement;e._self._c},r=[];n.d(t,"b",function(){return o}),n.d(t,"c",function(){return r}),n.d(t,"a",function(){return a})},db4f:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{indicatorDots:!0,autoplay:!0,interval:2e3,duration:1e3,isKeep:!1,beforeHeaderzIndex:11,afterHeaderzIndex:10,beforeHeaderOpacity:1,afterHeaderOpacity:0,farmProduceList:{}}},onPageScroll:function(e){var t=375;e.scrollTop=e.scrollTop>t?375:e.scrollTop,this.afterHeaderOpacity=e.scrollTop*(1/t),this.beforeHeaderOpacity=1-this.afterHeaderOpacity,this.beforeHeaderzIndex=e.scrollTop>0?10:11,this.afterHeaderzIndex=e.scrollTop>0?11:10},onLoad:function(){this.farmProduceInfo()},methods:{navToMap:function(t){e.navigateTo({url:"/pages/map/map?mapInfo="+JSON.stringify(t)})},farmProduceInfo:function(){var e=this;e.goodsList=[],e.baseGet(e.U({c:"store_api",a:"get_merchant_index"}),function(t){e.farmProduceList=t.data,console.log(t)},function(e){console.log(e)},!0)},keep:function(){this.isKeep=!this.isKeep},search:function(t){e.navigateTo({url:"/pages/list/search/search"})},detail:function(t){e.navigateTo({url:"/pages/shop/shop_commodity/shop_commodity?storeId="+t})}}};t.default=n}).call(this,n("543d")["default"])},f61b:function(e,t,n){"use strict";(function(e){n("7a84"),n("921b");a(n("66fd"));var t=a(n("bb3d"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])}},[["f61b","common/runtime","common/vendor"]]]);