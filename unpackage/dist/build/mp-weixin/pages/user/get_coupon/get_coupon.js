(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/get_coupon/get_coupon"],{"0414":function(o,n,t){},"389d":function(o,n,t){"use strict";var e,a=function(){var o=this,n=o.$createElement;o._self._c},i=[];t.d(n,"b",function(){return a}),t.d(n,"c",function(){return i}),t.d(n,"a",function(){return e})},"38f3":function(o,n,t){"use strict";(function(o){t("7a84"),t("921b");e(t("66fd"));var n=e(t("9cef"));function e(o){return o&&o.__esModule?o:{default:o}}o(n.default)}).call(this,t("543d")["createPage"])},7140:function(o,n,t){"use strict";(function(o){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{loadingMoreFlag:!0,loadingMore:"loading",noDataFlag:!1,articleId:"",pageSize:6,currentPage:1,list:[]}},onReachBottom:function(){var o=this;"loading"!==this.loadingMore&&(this.loadingMoreFlag=!0,this.loadingMore="loading",setTimeout(function(){o.getCouponList()},600))},onPullDownRefresh:function(){this.list=[],this.noDataFlag=!1,this.currentPage=1,this.getCouponList()},onLoad:function(o){var n=this;setTimeout(function(){n.getCouponList()},600)},methods:{getCoupon:function(o){var n=this;n.baseGet(n.U({c:"coupons_api",a:"user_get_coupon",q:{couponId:o}}),function(o){n.Tips({title:"优惠券领取成功!快去使用吧~"})},function(o){console.log(o)})},getCouponList:function(){var o=this;o.baseGet(o.U({c:"coupons_api",a:"get_issue_coupon_list",q:{limit:o.pageSize,page:o.currentPage}}),function(n){if(0==n.data.length)return o.loadingMore="noMore",void o.closeLoadingMoreFlag();for(var t=0;t<n.data.length;t++)o.getCouponDetail(n.data[t])},function(o){console.log(o)})},closeLoadingMoreFlag:function(){var o=this;setTimeout(function(){o.loadingMoreFlag=!1,o.noDataFlag=!0},800)},getCouponDetail:function(n){var t=this;t.baseGet(t.U({c:"coupons_api",a:"get_coupon_info",q:{cid:n.cid}}),function(e){if(o.stopPullDownRefresh(),0==e.data.length)return t.loadingMore="noMore",void t.closeLoadingMoreFlag();t.currentPage++,t.loadingMore="more";var a={data:n,res:e.data};t.list.push(a)},function(o){console.log(o)},!0)}}};n.default=t}).call(this,t("543d")["default"])},"88cf":function(o,n,t){"use strict";var e=t("0414"),a=t.n(e);a.a},"9cef":function(o,n,t){"use strict";t.r(n);var e=t("389d"),a=t("adc3");for(var i in a)"default"!==i&&function(o){t.d(n,o,function(){return a[o]})}(i);t("88cf");var u,c=t("f0c5"),r=Object(c["a"])(a["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],u);n["default"]=r.exports},adc3:function(o,n,t){"use strict";t.r(n);var e=t("7140"),a=t.n(e);for(var i in e)"default"!==i&&function(o){t.d(n,o,function(){return e[o]})}(i);n["default"]=a.a}},[["38f3","common/runtime","common/vendor"]]]);