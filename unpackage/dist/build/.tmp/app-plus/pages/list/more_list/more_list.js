(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/list/more_list/more_list"],{"423a":function(t,e,n){"use strict";(function(t,n){function i(t){return o(t)||r(t)||a()}function a(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function r(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function o(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var l={data:function(){return{loadingMoreFlag:!0,loadingMore:"loading",articleId:"",pageSize:6,currentPage:1,list:[]}},onReachBottom:function(){var t=this;"loading"!==this.loadingMore&&(this.loadingMoreFlag=!0,this.loadingMore="loading",setTimeout(function(){t.getArticleList(t.articleId)},600))},onPullDownRefresh:function(){this.list=[],this.currentPage=1,this.getArticleList(this.articleId)},onLoad:function(t){var e=this;this.articleId=t.id,setTimeout(function(){e.getArticleList(e.articleId)},600)},methods:{detail:function(e){var n=e.currentTarget.dataset.id;t.navigateTo({url:"/pages/list/list_detail/list_detail?id="+n})},closeLoadingMoreFlag:function(){var t=this;setTimeout(function(){t.loadingMoreFlag=!1},800)},getArticleList:function(e){var a=this;a.baseGet(a.U({c:"article_api",a:"get_cid_article",q:{cid:e,first:a.currentPage,limit:a.pageSize}}),function(e){if(t.stopPullDownRefresh(),0==e.data.length)return a.loadingMore="noMore",void a.closeLoadingMoreFlag();a.currentPage++,a.list=[].concat(i(a.list),i(e.data)),a.loadingMore="more"},function(t){console.log(n(t," at pages\\list\\more_list\\more_list.vue:103"))},!0)}}};e.default=l}).call(this,n("6e42")["default"],n("0de9")["default"])},"4b48":function(t,e,n){"use strict";var i=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"a",function(){return i}),n.d(e,"b",function(){return a})},"50ba":function(t,e,n){"use strict";(function(t){n("ae5d"),n("921b");i(n("66fd"));var e=i(n("5d09"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("6e42")["createPage"])},"5d09":function(t,e,n){"use strict";n.r(e);var i=n("4b48"),a=n("9203");for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);n("a2da");var o=n("2877"),l=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,null,null);e["default"]=l.exports},9203:function(t,e,n){"use strict";n.r(e);var i=n("423a"),a=n.n(i);for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);e["default"]=a.a},a2c8:function(t,e,n){},a2da:function(t,e,n){"use strict";var i=n("a2c8"),a=n.n(i);a.a}},[["50ba","common/runtime","common/vendor"]]]);