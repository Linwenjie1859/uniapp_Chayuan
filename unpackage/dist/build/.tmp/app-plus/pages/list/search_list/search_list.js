(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/search_list/search_list"],{"0e90":function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement;t._self._c},a=[];o.d(e,"a",function(){return s}),o.d(e,"b",function(){return a})},1225:function(t,e,o){"use strict";var s=o("5dea"),a=o.n(s);a.a},"5dea":function(t,e,o){},"6b0d":function(t,e,o){"use strict";(function(t){o("ae5d"),o("921b");s(o("66fd"));var e=s(o("fb68"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,o("6e42")["createPage"])},c88a:function(t,e,o){"use strict";(function(t,o){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{showBack:!0,keyWord:"",storeId:"",goodsList:[],historyList:[],noData:!1,pageSize:6,currentPage:1,loadMoreText:"加载更多...",loadMoreFlag:!1}},onReachBottom:function(){var t=this;this.loadMoreFlag=!0,setTimeout(function(){t.getSearchGoods()},500)},onLoad:function(e){console.log(t(e," at pages\\list\\search_list\\search_list.vue:59")),this.keyWord=e.keyWord,this.storeId=e.storeId,this.getSearchGoods(),this.getHistorySearch()},methods:{getHistorySearch:function(){var t=this;o.getStorage({key:"keyWord",success:function(e){t.historyList=e.data.reverse()}})},setSearchHistory:function(){var e=this;""!=e.keyWord?(-1==e.historyList.indexOf(e.keyWord)&&(e.historyList.reverse(),e.historyList.push(e.keyWord),o.setStorage({key:"keyWord",data:e.historyList}),e.historyList.reverse()),e.goodsList=[],e.currentPage=1,console.log(t(e.keyWord," at pages\\list\\search_list\\search_list.vue:95")),e.getSearchGoods()):e.Tips({title:"请输入关键字"})},getSearchGoods:function(){var e=this;console.log(t("搜索"," at pages\\list\\search_list\\search_list.vue:101")),e.baseGet(e.U({c:"store_api",a:"get_product_list",q:{cid:"",mid:e.storeId,keyword:e.keyWord,priceOrder:"",salesOrder:"",news:"",page:e.currentPage,limit:e.pageSize}}),function(o){e.goodsList=e.goodsList.concat(o.data),console.log(t(e.goodsList," at pages\\list\\search_list\\search_list.vue:119")),e.currentPage++,0==o.data.length&&(e.loadMoreText="没有更多数据了！"),0==e.goodsList.length?e.noData=!0:e.noData=!1,setTimeout(function(){e.loadMoreFlag=!1},1e3)},function(e){console.log(t(e," at pages\\list\\search_list\\search_list.vue:134"))},!0)},back:function(){o.navigateBack()},detail:function(t){o.navigateTo({url:"/pages/list/goode_details/goode_details?id="+t})}}};e.default=s}).call(this,o("0de9")["default"],o("6e42")["default"])},faf3:function(t,e,o){"use strict";o.r(e);var s=o("c88a"),a=o.n(s);for(var r in s)"default"!==r&&function(t){o.d(e,t,function(){return s[t]})}(r);e["default"]=a.a},fb68:function(t,e,o){"use strict";o.r(e);var s=o("0e90"),a=o("faf3");for(var r in a)"default"!==r&&function(t){o.d(e,t,function(){return a[t]})}(r);o("1225");var i=o("2877"),n=Object(i["a"])(a["default"],s["a"],s["b"],!1,null,"0f8d7437",null);e["default"]=n.exports}},[["6b0d","common/runtime","common/vendor"]]]);