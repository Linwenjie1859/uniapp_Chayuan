(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/shop_commodity/shop_commodity"],{"2ace":function(t,e,n){"use strict";(function(t){n("7a84"),n("921b");o(n("66fd"));var e=o(n("cc83"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"459d":function(t,e,n){"use strict";(function(t,n){function o(t){return s(t)||a(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function s(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{keyWord:"",currentLoadFlag:!0,newsList:[],storeId:"85",storeInfo:{merInfo:{views:0}},tabIndex:0,scrollInto:"",isKeep:!1,tabBars:[{title:"全部宝贝",id:"baobei"},{title:"热卖商品",id:"remai"},{title:"新品上架",id:"xingping"},{title:"活动促销",id:"huodong"}]}},onLoad:function(t){this.storeId=t.storeId,this.getStoreInfo(),this.initInfo(),this.getGoodList(0)},onPullDownRefresh:function(){this.newsList=[],this.getStoreInfo(),this.initInfo(),this.getGoodList(0)},computed:{scrollerHeight:function(){return this.WindowHeight-160+"px"}},methods:{initInfo:function(){var t=this;this.tabBars.forEach(function(e){t.newsList.push({data:[],loadingStatus:"loading",currentPage:1,pageSize:6,loadingFlag:!0})})},onReachBottom_more:function(){var t=this;"loading"!==this.newsList[this.tabIndex].loadingStatus&&(this.newsList[this.tabIndex].loadingFlag=!0,this.newsList[this.tabIndex].loadingStatus="loading",setTimeout(function(){t.getGoodList(t.tabIndex)},600))},ontabtap:function(t){var e=t.target.dataset.current||t.currentTarget.dataset.current;this.tabIndex=e},ontabchange:function(t){var e=t.target.current||t.detail.current;this.tabIndex=e,this.scrollInto=this.tabBars[e].id,0===this.newsList[e].data.length&&this.getGoodList(e)},closeLoadingMoreFlag:function(){var t=this;setTimeout(function(){t.newsList[t.tabIndex].loadingFlag=!1},800)},getGoodList:function(e){var i=this;i.baseGet(i.U({c:"store_api",a:"get_product_list",q:{mid:i.storeId,hot:1==e?1:"",news:2==e?1:"",benefit:3==e?1:"",page:i.newsList[e].currentPage,limit:i.newsList[e].pageSize}}),function(n){if(t.stopPullDownRefresh(),0==n.data.length)return i.newsList[e].loadingStatus="noMore",void i.closeLoadingMoreFlag();i.newsList[e].data=[].concat(o(i.newsList[e].data),o(n.data)),i.newsList[e].currentPage++,i.newsList[e].loadingStatus="more"},function(t){n("log",t," at pages\\shop\\shop_commodity\\shop_commodity.vue:194")},!0)},getStoreInfo:function(){var t=this;t.baseGet(t.U({c:"merchant_api",a:"merchant_info",q:{id:t.storeId}}),function(e){t.storeInfo=e.data,t.isKeep=e.data.merInfo.is_collect},function(t){n("log",t," at pages\\shop\\shop_commodity\\shop_commodity.vue:215")},!0)},keep:function(){var t=this;this.isLogin()&&(null!=this.isKeep?t.basePost(t.U({c:"merchant_api",a:"uncollect_merchant"}),{merId:t.storeId},function(e){200==e.code&&(t.isKeep=null)},function(t){n("log",t," at pages\\shop\\shop_commodity\\shop_commodity.vue:238")}):t.basePost(t.U({c:"merchant_api",a:"collect_merchant"}),{merId:t.storeId},function(e){200==e.code&&(t.isKeep="1")},function(t){n("log",t," at pages\\shop\\shop_commodity\\shop_commodity.vue:254")}))},detail:function(e){2==e.type?t.navigateTo({url:"/pages/list/line_details/line_details?id="+e.id}):t.navigateTo({url:"/pages/list/goode_details/goode_details?id="+e.id})}}};e.default=r}).call(this,n("6e42")["default"],n("0de9")["default"])},a70d:function(t,e,n){"use strict";n.r(e);var o=n("459d"),i=n.n(o);for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);e["default"]=i.a},cc83:function(t,e,n){"use strict";n.r(e);var o=n("fede"),i=n("a70d");for(var a in i)"default"!==a&&function(t){n.d(e,t,function(){return i[t]})}(a);n("e9c2");var s,r=n("f0c5"),c=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"62e64578",null,!1,o["a"],s);e["default"]=c.exports},d9a3:function(t,e,n){},e9c2:function(t,e,n){"use strict";var o=n("d9a3"),i=n.n(o);i.a},fede:function(t,e,n){"use strict";var o={"uni-load-more":()=>n.e("components/uni-load-more/uni-load-more").then(n.bind(null,"512e"))},i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return o})}},[["2ace","common/runtime","common/vendor"]]]);