(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/admin_address/admin_address"],{"20b9":function(e,a,s){"use strict";var t=function(){var e=this,a=e.$createElement,s=(e._self._c,e.__map(e.addressList,function(a,s){var t=e._f("subString")(a.real_name);return{$orig:e.__get_orig(a),f0:t}}));e.$mp.data=Object.assign({},{$root:{l0:s}})},d=[];s.d(a,"a",function(){return t}),s.d(a,"b",function(){return d})},"22c1":function(e,a,s){"use strict";s.r(a);var t=s("955d"),d=s.n(t);for(var n in t)"default"!==n&&function(e){s.d(a,e,function(){return t[e]})}(n);a["default"]=d.a},"955d":function(e,a,s){"use strict";(function(e,s){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var t={data:function(){return{currentDefault:0,addressList:[],clickFlag:0}},onShow:function(){this.getAddressList()},onLoad:function(e){this.clickFlag=e.clickFlag},methods:{chooseAdd:function(a){var s=this;if(s.clickFlag){s.Tips({title:"修改收获地址成功"});var t=getCurrentPages(),d=(t[t.length-1],t[t.length-2]);d.$vm.defaultAddress=a,e.navigateBack({delta:1})}},changeDefault:function(e,a){if(!this.clickFlag){console.log(s("修改"," at pages\\user\\admin_address\\admin_address.vue:63"));var t=this;t.currentDefault=e,t.basePost(t.U({c:"user_api",a:"set_user_default_address"}),{addressId:a},function(e){console.log(s(e," at pages\\user\\admin_address\\admin_address.vue:70"))},function(e){console.log(s(e," at pages\\user\\admin_address\\admin_address.vue:73"))})}},addAddress:function(){e.navigateTo({url:"/pages/user/add_address/add_address"})},getAddressList:function(){var e=this;e.basePost(e.U({c:"user_api",a:"user_address_list"}),{},function(a){e.addressList=a.data;for(var t=0;t<e.addressList.length;t++)if(1==e.addressList[t].is_default){e.currentDefault=t;break}console.log(s(e.currentDefault," at pages\\user\\admin_address\\admin_address.vue:98"))},function(e){console.log(s(e," at pages\\user\\admin_address\\admin_address.vue:101"))})},editAddress:function(a){e.navigateTo({url:"/pages/user/add_address/add_address?id="+a})}}};a.default=t}).call(this,s("6e42")["default"],s("0de9")["default"])},"9d3e":function(e,a,s){"use strict";s.r(a);var t=s("20b9"),d=s("22c1");for(var n in d)"default"!==n&&function(e){s.d(a,e,function(){return d[e]})}(n);var r=s("2877"),u=Object(r["a"])(d["default"],t["a"],t["b"],!1,null,"35779b93",null);a["default"]=u.exports},fcb6:function(e,a,s){"use strict";(function(e){s("ae5d"),s("921b");t(s("66fd"));var a=t(s("9d3e"));function t(e){return e&&e.__esModule?e:{default:e}}e(a.default)}).call(this,s("6e42")["createPage"])}},[["fcb6","common/runtime","common/vendor"]]]);