(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/my_coupon/my_coupon"],{"0087":function(t,n,o){"use strict";o.r(n);var e=o("1d11"),u=o("ba1e");for(var s in u)"default"!==s&&function(t){o.d(n,t,function(){return u[t]})}(s);o("760f");var i=o("2877"),a=Object(i["a"])(u["default"],e["a"],e["b"],!1,null,null,null);n["default"]=a.exports},"1d11":function(t,n,o){"use strict";var e=function(){var t=this,n=t.$createElement;t._self._c},u=[];o.d(n,"a",function(){return e}),o.d(n,"b",function(){return u})},4738:function(t,n,o){},"760f":function(t,n,o){"use strict";var e=o("4738"),u=o.n(e);u.a},8246:function(t,n,o){"use strict";(function(t,e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=function(){return o.e("components/uni-load-more/uni-load-more").then(o.bind(null,"9f4b"))},s={components:{uniLoadMore:u},data:function(){return{couponValidList:[],headerTop:0,typeClass:"valid",subState:"",theIndex:null,oldIndex:null,isStop:!1,refreshFlag:!0,loadingStatus:"loading",noDataFlag:!1}},onLoad:function(){this.getUserCoupon()},onPullDownRefresh:function(){this.couponValidList=[],this.getUserCoupon()},methods:{detail:function(n){console.log(t(n," at pages\\user\\my_coupon\\my_coupon.vue:70")),e.navigateTo({url:"/pages/shop/shop_collection_coupon/shop_collection_coupon?couponId="+n})},dealData:function(n){for(var o=0;o<n.length;o++)n[o]["coupon_price"]=n[o]["coupon_price"].substring(0,n[o]["coupon_price"].indexOf(".")),console.log(t(n[o]," at pages\\user\\my_coupon\\my_coupon.vue:78"));return n},getUserCoupon:function(){var n=this;n.basePost(n.U({c:"coupons_api",a:"get_use_coupon"}),{},function(t){e.stopPullDownRefresh(),0==t.data.length&&(n.noDataFlag=!0),n.refreshFlag=!1,n.couponValidList=n.dealData(t.data)},function(n){console.log(t(n," at pages\\user\\my_coupon\\my_coupon.vue:97"))})},switchType:function(t){var n=this;this.typeClass!=t&&(e.pageScrollTo({scrollTop:0,duration:0}),this.typeClass=t,this.subState=""==this.typeClass?"":"show"+t,setTimeout(function(){n.oldIndex=null,n.theIndex=null,n.subState="valid"==n.typeClass?"":n.subState},200))},touchStart:function(t,n){n.touches.length>1?this.isStop=!0:(this.oldIndex=this.theIndex,this.theIndex=null,this.initXY=[n.touches[0].pageX,n.touches[0].pageY])},touchMove:function(t,n){var o=this;if(n.touches.length>1)this.isStop=!0;else{var e=n.touches[0].pageX-this.initXY[0],u=n.touches[0].pageY-this.initXY[1];this.isStop||Math.abs(e)<5||(Math.abs(u)>Math.abs(e)?this.isStop=!0:e<0?(this.theIndex=t,this.isStop=!0):e>0&&null!=this.theIndex&&this.oldIndex==this.theIndex&&(this.oldIndex=t,this.theIndex=null,this.isStop=!0,setTimeout(function(){o.oldIndex=null},150)))}},touchEnd:function(t,n){this.isStop=!1},deleteCoupon:function(t,n){for(var o=n.length,e=0;e<o;e++)if(t==n[e].id){n.splice(e,1);break}this.oldIndex=null,this.theIndex=null},discard:function(){}}};n.default=s}).call(this,o("0de9")["default"],o("6e42")["default"])},"9f66":function(t,n,o){"use strict";(function(t){o("ae5d"),o("921b");e(o("66fd"));var n=e(o("0087"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("6e42")["createPage"])},ba1e:function(t,n,o){"use strict";o.r(n);var e=o("8246"),u=o.n(e);for(var s in e)"default"!==s&&function(t){o.d(n,t,function(){return e[t]})}(s);n["default"]=u.a}},[["9f66","common/runtime","common/vendor"]]]);