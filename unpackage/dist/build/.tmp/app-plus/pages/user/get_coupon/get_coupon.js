(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/get_coupon/get_coupon"],{"0414":function(o,t,n){},"38f3":function(o,t,n){"use strict";(function(o){n("7a84"),n("921b");e(n("66fd"));var t=e(n("9cef"));function e(o){return o&&o.__esModule?o:{default:o}}o(t.default)}).call(this,n("6e42")["createPage"])},7140:function(o,t,n){"use strict";(function(o,n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{loadingMoreFlag:!0,loadingMore:"loading",noDataFlag:!1,articleId:"",pageSize:6,currentPage:1,list:[]}},onReachBottom:function(){var o=this;"loading"!==this.loadingMore&&(this.loadingMoreFlag=!0,this.loadingMore="loading",setTimeout(function(){o.getCouponList()},600))},onPullDownRefresh:function(){this.list=[],this.noDataFlag=!1,this.currentPage=1,this.getCouponList()},onLoad:function(o){var t=this;setTimeout(function(){t.getCouponList()},600)},methods:{getCoupon:function(t){var n=this;n.baseGet(n.U({c:"coupons_api",a:"user_get_coupon",q:{couponId:t}}),function(o){n.Tips({title:"优惠券领取成功!快去使用吧~"})},function(t){o("log",t," at pages\\user\\get_coupon\\get_coupon.vue:81")})},getCouponList:function(){var t=this;t.baseGet(t.U({c:"coupons_api",a:"get_issue_coupon_list",q:{limit:t.pageSize,page:t.currentPage}}),function(o){if(0==o.data.length)return t.loadingMore="noMore",void t.closeLoadingMoreFlag();for(var n=0;n<o.data.length;n++)t.getCouponDetail(o.data[n])},function(t){o("log",t," at pages\\user\\get_coupon\\get_coupon.vue:108")})},closeLoadingMoreFlag:function(){var o=this;setTimeout(function(){o.loadingMoreFlag=!1,o.noDataFlag=!0},800)},getCouponDetail:function(t){var e=this;e.baseGet(e.U({c:"coupons_api",a:"get_coupon_info",q:{cid:t.cid}}),function(o){if(n.stopPullDownRefresh(),0==o.data.length)return e.loadingMore="noMore",void e.closeLoadingMoreFlag();e.currentPage++,e.loadingMore="more";var a={data:t,res:o.data};e.list.push(a)},function(t){o("log",t," at pages\\user\\get_coupon\\get_coupon.vue:146")},!0)}}};t.default=e}).call(this,n("0de9")["default"],n("6e42")["default"])},"88cf":function(o,t,n){"use strict";var e=n("0414"),a=n.n(e);a.a},"9cef":function(o,t,n){"use strict";n.r(t);var e=n("b4b2"),a=n("adc3");for(var u in a)"default"!==u&&function(o){n.d(t,o,function(){return a[o]})}(u);n("88cf");var i,c=n("f0c5"),r=Object(c["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],i);t["default"]=r.exports},adc3:function(o,t,n){"use strict";n.r(t);var e=n("7140"),a=n.n(e);for(var u in e)"default"!==u&&function(o){n.d(t,o,function(){return e[o]})}(u);t["default"]=a.a},b4b2:function(o,t,n){"use strict";var e={"uni-load-more":()=>n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"512e"))},a=function(){var o=this,t=o.$createElement;o._self._c},u=[];n.d(t,"b",function(){return a}),n.d(t,"c",function(){return u}),n.d(t,"a",function(){return e})}},[["38f3","common/runtime","common/vendor"]]]);