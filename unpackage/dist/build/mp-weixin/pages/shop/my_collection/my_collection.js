(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shop/my_collection/my_collection"],{"02a8":function(t,e,n){"use strict";(function(t){function n(t){return l(t)||i(t)||o()}function o(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function i(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function l(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{loadingMoreFlag:!0,loadingMore:"loading",currentPage:1,collectList:[],pageSize:7,noDateFlag:!1,headerTop:0,typeClass:"valid",subState:"",theIndex:null,oldIndex:null,isStop:!1}},onReachBottom:function(){var t=this;"loading"!==this.loadingMore&&(this.loadingMoreFlag=!0,this.loadingMore="loading",setTimeout(function(){t.getCollectList()},600))},onPullDownRefresh:function(){this.collectList=[],this.currentPage=1,this.getCollectList()},onLoad:function(t){var e=this;setTimeout(function(){e.getCollectList()},600)},methods:{collectDelete:function(e){var n=this;t.showModal({title:"提示",content:"确定删除收藏的宝贝？",success:function(t){t.confirm&&n.basePost(n.U({c:"store_api",a:"uncollect_product"}),{productId:n.collectList[e].pid},function(t){n.collectList.splice(e,1),n.theIndex=null},function(t){console.log(t)})}})},dealCollectList:function(t){for(var e=0;e<t.length;e++)t[e].image=t[e].image.replace(/\\/g,"/");return t},closeLoadingMoreFlag:function(){var t=this;setTimeout(function(){t.loadingMoreFlag=!1},800)},getCollectList:function(){var e=this;e.baseGet(e.U({c:"store_api",a:"get_user_collect_product",q:{page:e.currentPage,limit:e.pageSize}}),function(o){if(t.stopPullDownRefresh(),0==o.data.length)return 0==e.collectList.length&&(e.noDateFlag=!0),e.loadingMore="noMore",void e.closeLoadingMoreFlag();e.currentPage++,e.collectList=[].concat(n(e.collectList),n(e.dealCollectList(o.data))),e.loadingMore="more"},function(t){console.log(t)},!0),t.stopPullDownRefresh()},purchase:function(e,n){t.navigateTo({url:(2==n?"/pages/list/line_details/line_details?id=":"/pages/list/goode_details/goode_details?id=")+e})},switchType:function(e){var n=this;this.typeClass!=e&&(t.pageScrollTo({scrollTop:0,duration:0}),this.typeClass=e,this.subState=""==this.typeClass?"":"show"+e,setTimeout(function(){n.oldIndex=null,n.theIndex=null,n.subState="valid"==n.typeClass?"":n.subState},200))},touchStart:function(t,e){e.touches.length>1?this.isStop=!0:(this.oldIndex=this.theIndex,this.theIndex=null,this.initXY=[e.touches[0].pageX,e.touches[0].pageY])},touchMove:function(t,e){var n=this;if(e.touches.length>1)this.isStop=!0;else{var o=e.touches[0].pageX-this.initXY[0],i=e.touches[0].pageY-this.initXY[1];this.isStop||Math.abs(o)<5||(Math.abs(i)>Math.abs(o)?this.isStop=!0:o<0?(this.theIndex=t,this.isStop=!0):o>0&&null!=this.theIndex&&this.oldIndex==this.theIndex&&(this.oldIndex=t,this.theIndex=null,this.isStop=!0,setTimeout(function(){n.oldIndex=null},150)))}},touchEnd:function(t,e){this.isStop=!1},deleteCoupon:function(t,e){for(var n=e.length,o=0;o<n;o++)if(t==e[o].id){e.splice(o,1);break}this.oldIndex=null,this.theIndex=null},discard:function(){}}};e.default=a}).call(this,n("543d")["default"])},"1a1c":function(t,e,n){"use strict";n.r(e);var o=n("02a8"),i=n.n(o);for(var l in o)"default"!==l&&function(t){n.d(e,t,function(){return o[t]})}(l);e["default"]=i.a},"22a5":function(t,e,n){"use strict";n.r(e);var o=n("cc9e"),i=n("1a1c");for(var l in i)"default"!==l&&function(t){n.d(e,t,function(){return i[t]})}(l);n("bd0f");var a,s=n("f0c5"),c=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],a);e["default"]=c.exports},bd0f:function(t,e,n){"use strict";var o=n("dfeb"),i=n.n(o);i.a},cc9e:function(t,e,n){"use strict";var o,i=function(){var t=this,e=t.$createElement;t._self._c},l=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return l}),n.d(e,"a",function(){return o})},dfeb:function(t,e,n){},e782:function(t,e,n){"use strict";(function(t){n("7a84"),n("921b");o(n("66fd"));var e=o(n("22a5"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["e782","common/runtime","common/vendor"]]]);