(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabber/shopping_cart/shopping_cart"],{1269:function(t,s,i){"use strict";i.r(s);var e=i("d78d"),o=i.n(e);for(var n in e)"default"!==n&&function(t){i.d(s,t,function(){return e[t]})}(n);s["default"]=o.a},"76e4":function(t,s,i){},"7f02":function(t,s,i){"use strict";(function(t){i("7a84"),i("921b");e(i("66fd"));var s=e(i("c7bd"));function e(t){return t&&t.__esModule?t:{default:t}}t(s.default)}).call(this,i("543d")["createPage"])},c430:function(t,s,i){"use strict";var e,o=function(){var t=this,s=t.$createElement,i=(t._self._c,t.__map(t.goodsList,function(s,i){var e=t.checkedList.indexOf(i);return{$orig:t.__get_orig(s),g0:e}}));t.$mp.data=Object.assign({},{$root:{l0:i}})},n=[];i.d(s,"b",function(){return o}),i.d(s,"c",function(){return n}),i.d(s,"a",function(){return e})},c7bd:function(t,s,i){"use strict";i.r(s);var e=i("c430"),o=i("1269");for(var n in o)"default"!==n&&function(t){i.d(s,t,function(){return o[t]})}(n);i("ffb1");var c,d=i("f0c5"),l=Object(d["a"])(o["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],c);s["default"]=l.exports},d78d:function(t,s,e){"use strict";(function(t){Object.defineProperty(s,"__esModule",{value:!0}),s.default=void 0;var o=function(){return e.e("components/uni-load-more/uni-load-more").then(e.bind(null,"512e"))},n={components:{uniLoadMore:o},data:function(){return{refreshFlag:!0,loadingStatus:"loading",listId:[],noDateFlag:!1,checkedNum:0,checkedAllFlag:!1,checkedList:[],checkAll:!0,goodsList:[],differentStore:!1,headerPosition:"fixed",headerTop:null,statusTop:null,showHeader:!0,selectedList:[],isAllselected:!1,theIndex:"",oldIndex:"",isStop:!1}},onPullDownRefresh:function(){this.goodsList=[],this.getGoodsList()},onLoad:function(){this.isLogin()},onShow:function(){this.getGoodsList()},computed:{sumAllPrice:function(){var t=this,s=0,i=0;t.listId=[];var e=-1;t.differentStore=!1;for(var o=0;o<t.goodsList.length;o++)for(var n=0;n<t.goodsList[o].list.length;n++)t.goodsList[o].list[n].checked&&(t.goodsList[o].id!=e&&-1!=e&&(t.differentStore=!0),e=t.goodsList[o].id,i++,t.listId.push(t.goodsList[o].list[n].id),s+=t.goodsList[o].list[n].cart_num*t.goodsList[o].list[n].productInfo.price);return t.checkedNum=i,s.toFixed(2)}},methods:{changeNum:function(){console.log("改变")},deleteGood:function(s,i,e){var o=this;t.showModal({title:"提示",content:"确定删除这个宝贝？",success:function(t){t.confirm&&o.basePost(o.U({c:"auth_api",a:"remove_cart"}),{ids:s},function(t){o.goodsList[i].list.splice(e,1),o.theIndex="",0==o.goodsList[i].list.length&&o.goodsList.splice(i,1),0==o.goodsList.length&&(o.noDateFlag=!0)},function(t){console.log(t)})}})},getGoodsList:function(){var s=this;s.basePost(s.U({c:"auth_api",a:"get_cart_list"}),{},function(i){s.refreshFlag=!1;var e=i.data.valid;s.goodsList=e,s.noDateFlag=0==e.length;for(var o=0;o<s.goodsList.length;o++)for(var n=s.goodsList[o],c=0;c<n.list.length;c++)s.$set(n.list[c],"checked",!1),n.list[c]["cart_num"]=parseInt(n.list[c].cart_num),n.list[c].productInfo["price"]=parseInt(n.list[c].productInfo.price);s.checkedList=[],s.checkedAllFlag=!1,t.stopPullDownRefresh()},function(t){s.refreshFlag=!1,console.log(t)})},ifAllChecked:function(){this.checkedAllFlag=this.checkedList.length==this.goodsList.length},setCheckedFlag:function(){for(var t=0;t<this.goodsList.length;t++){for(var s=0;s<this.goodsList[t].list.length;s++)this.goodsList[t].list[s]["checked"]=!this.checkedAllFlag;this.checkedAllFlag?this.checkedList=[]:this.checkedList.push(t)}this.checkedAllFlag=!this.checkedAllFlag},setCheckedItem:function(t,s){var i=this;i.goodsList[t].list[s].checked=!i.goodsList[t].list[s].checked;for(var e=!0,o=i.goodsList[t].list,n=0;n<o.length;n++)o[n].checked||(e=!1);e?this.checkedList.push(t):-1!=this.checkedList.indexOf(t)&&this.checkedList.splice(this.checkedList.indexOf(t),1),this.ifAllChecked()},setCheckedList:function(t){var s=this.checkedList;if(-1!=s.indexOf(t)){s.splice(s.indexOf(t),1);for(var i=0;i<this.goodsList[t].list.length;i++)this.goodsList[t].list[i]["checked"]=!1}else{s.push(t);for(var e=0;e<this.goodsList[t].list.length;e++)this.goodsList[t].list[e]["checked"]=!0}this.ifAllChecked()},addSubNum:function(s,i,e){e<0&&this.goodsList[s].list[i].cart_num<=1?t.showToast({title:"该宝贝不能减少了哟~",position:"bottom",icon:"none"}):this.goodsList[s].list[i].cart_num=this.goodsList[s].list[i].cart_num+e;var o=this;o.basePost(o.U({c:"auth_api",a:"change_cart_num"}),{cartId:o.goodsList[s].list[i].id,cartNum:o.goodsList[s].list[i].cart_num},function(t){console.log(t)},function(t){console.log(t)})},purchase:function(s){this.listId.length>0&&t.navigateTo({url:"/pages/user/confirm_order/confirm_order?listId="+this.listId})},joinGoods:function(t){for(var s=this.goodsList.length,e=!1,o=0;o<s;o++){var n=this.goodsList[o];if(n.id==t.id){this.goodsList[o].number++,e=!0;break}}e||this.goodsList[i].unshift(t)},touchStart:function(t,s){s.touches.length>1?this.isStop=!0:(this.oldIndex=this.theIndex,this.theIndex="",this.initXY=[s.touches[0].pageX,s.touches[0].pageY])},touchMove:function(t,s){var i=this;if(s.touches.length>1)this.isStop=!0;else{var e=s.touches[0].pageX-this.initXY[0],o=s.touches[0].pageY-this.initXY[1];this.isStop||Math.abs(e)<5||(Math.abs(o)>Math.abs(e)?this.isStop=!0:e<0?(this.theIndex=t,this.isStop=!0):e>0&&null!=this.theIndex&&this.oldIndex==this.theIndex&&(this.oldIndex=t,this.theIndex=null,this.isStop=!0,setTimeout(function(){i.oldIndex=null},150)))}},touchEnd:function(t,s){this.isStop=!1},goodDetail:function(s){t.navigateTo({url:"/pages/list/goode_details/goode_details?id="+s})},getCupon:function(){t.navigateTo({url:"/pages/user/get_coupon/get_coupon"})}}};s.default=n}).call(this,e("543d")["default"])},ffb1:function(t,s,i){"use strict";var e=i("76e4"),o=i.n(e);o.a}},[["7f02","common/runtime","common/vendor"]]]);