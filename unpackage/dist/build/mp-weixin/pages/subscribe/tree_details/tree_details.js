(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/subscribe/tree_details/tree_details"],{1427:function(t,o,n){},"2bca":function(t,o,n){"use strict";n.r(o);var e=n("bbac"),r=n.n(e);for(var a in e)"default"!==a&&function(t){n.d(o,t,function(){return e[t]})}(a);o["default"]=r.a},"31fc":function(t,o,n){"use strict";n.r(o);var e=n("516b"),r=n("2bca");for(var a in r)"default"!==a&&function(t){n.d(o,t,function(){return r[t]})}(a);n("9b95");var i,c=n("f0c5"),u=Object(c["a"])(r["default"],e["b"],e["c"],!1,null,"09d84005",null,!1,e["a"],i);o["default"]=u.exports},"516b":function(t,o,n){"use strict";var e,r=function(){var t=this,o=t.$createElement,n=(t._self._c,t._f("subStringToCity")(t.goodsInfo.storeInfo.open_address));t.$mp.data=Object.assign({},{$root:{f0:n}})},a=[];n.d(o,"b",function(){return r}),n.d(o,"c",function(){return a}),n.d(o,"a",function(){return e})},"9b95":function(t,o,n){"use strict";var e=n("1427"),r=n.n(e);r.a},bbac:function(t,o,n){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var e=r(n("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function a(t,o,n,e,r,a,i){try{var c=t[a](i),u=c.value}catch(d){return void n(d)}c.done?o(u):Promise.resolve(u).then(e,r)}function i(t){return function(){var o=this,n=arguments;return new Promise(function(e,r){var i=t.apply(o,n);function c(t){a(i,e,r,c,u,"next",t)}function u(t){a(i,e,r,c,u,"throw",t)}c(void 0)})}}var c={data:function(){return{StatusAddNav:this.StatusAddNav,StatusAddHalfNav:this.StatusAddHalfNav,opacityNum:0,currentGoodsId:0,goodsInfo:{},cartInfo:{},orderKey:"",defaultAddress:{},providerList:[],orderId:"",id:""}},onPageScroll:function(t){console.log(t),this.opacityNum=t.scrollTop>50?1:0},onLoad:function(t){this.currentGoodsId=t.id,this.getTreeInfo()},methods:{updatePayStatus:function(){var t=this;t.baseGet(t.U({c:"store_api",a:"update_pay_status",q:{order_id:t.orderId,product_id:t.currentGoodsId,id:t.id}}),function(t){console.log(t)},function(t){console.log(t)},!0)},requestPayment:function(){var o=i(e.default.mark(function o(){var n,r=this;return e.default.wrap(function(o){while(1)switch(o.prev=o.next){case 0:return console.log("uni-支付宝"),this.providerList[0].loading=!0,o.next=4,this.getOrderInfo_uniapp(this.providerList[0].id);case 4:if(n=o.sent,console.log("得到订单信息",n),200===n.statusCode){o.next=10;break}return console.log("获得订单信息失败",n),t.showModal({content:"获得订单信息失败",showCancel:!1}),o.abrupt("return");case 10:t.requestPayment({provider:this.providerList[0].id,orderInfo:n.data,success:function(o){console.log("success",o),t.showToast({title:"感谢您的赞助!"})},fail:function(o){console.log("fail",o),t.showModal({content:"支付失败,原因为: "+o.errMsg,showCancel:!1}),that.updatePayStatus()},complete:function(){r.providerList[0].loading=!1}});case 11:case"end":return o.stop()}},o,this)}));function n(){return o.apply(this,arguments)}return n}(),getOrderInfo_uniapp:function(o){var n="",e="https://demo.dcloud.net.cn/payment/?payid="+o+"&appid="+n+"&total=0.1";return console.log(e),new Promise(function(o){t.request({url:e,success:function(t){o(t)},fail:function(t){o(t)}})})},SortData:function(t){for(var o={},n=[],e=0;e<t.length;e++){var r=t[e];if(o[r.mer_id])for(var a=0;a<n.length;a++){var i=n[a];if(i.mer_id==r.mer_id){i.count_price+=r.productInfo.price*r.cart_num,i.count_num+=r.cart_num,i.data.push(r);break}}else n.push({count_price:r.productInfo.price*r.cart_num,count_num:r.cart_num,mer_id:r.mer_id,data:[r]}),o[r.mer_id]="Occupies a position"}return n},settlement:function(){var t=this;t.basePost(t.U({c:"auth_api",a:"create_order"}),{mer_id:t.cartInfo[0].mer_id,key:t.orderKey,couponId:"",userIntegral:"",mark:"",type:2,product_id:t.cartInfo[0].data[0].productInfo.id},function(o){t.orderId=o.data.result.orderId,t.id=o.data.result.id;o.data.result.orderId,t.sumPrice;t.updatePayStatus()},function(t){console.log(t)})},getOrderInfo:function(t){var o=this;o.basePost(o.U({c:"auth_api",a:"confirm_order"}),{cartId:t},function(t){console.log(t),o.cartInfo=o.SortData(t.data.cartInfo),o.orderKey=t.data.orderKey,o.settlement()},function(t){console.log(t)})},purchase:function(){var t=this;t.isLogin(),t.baseGet(t.U({c:"auth_api",a:"now_buy",q:{productId:t.goodsInfo.storeInfo.id,merId:t.goodsInfo.merInfo.id,cartNum:1}}),function(o){t.getOrderInfo(o.data.cartId)},function(o){-1!=o.msg.indexOf("该产品库存不足")&&t.Tips({title:o.msg})},!0)},getTreeInfo:function(){var t=this;t.baseGet(t.U({c:"store_api",a:"details",q:{id:t.currentGoodsId}}),function(o){t.goodsInfo=o.data,console.log(t.goodsInfo)},function(t){console.log(t)},!0)},navToBack:function(){t.navigateBack({delta:1})}}};o.default=c}).call(this,n("543d")["default"])},cbd8:function(t,o,n){"use strict";(function(t){n("7a84"),n("921b");e(n("66fd"));var o=e(n("31fc"));function e(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,n("543d")["createPage"])}},[["cbd8","common/runtime","common/vendor"]]]);