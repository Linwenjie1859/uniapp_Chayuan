(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/my_info/my_info"],{"18c4":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{userInfo:{phone:"",nickname:""}}},onShow:function(){this.getUserInfo()},methods:{getUserInfo:function(){var n=this;n.basePost(n.U({c:"user_api",a:"my"}),{},function(t){n.userInfo=t.data},function(n){console.log(n)})},edit:function(t){n.navigateTo({url:"/pages/user/info_edit/info_edit"})},address:function(t){n.navigateTo({url:"/pages/user/admin_address/admin_address"})}}};t.default=e}).call(this,e("543d")["default"])},"2abd":function(n,t,e){"use strict";var u,a=function(){var n=this,t=n.$createElement;n._self._c},o=[];e.d(t,"b",function(){return a}),e.d(t,"c",function(){return o}),e.d(t,"a",function(){return u})},"2cf3":function(n,t,e){"use strict";(function(n){e("7a84"),e("921b");u(e("66fd"));var t=u(e("9bbf"));function u(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},6154:function(n,t,e){"use strict";var u=e("b14b"),a=e.n(u);a.a},6967:function(n,t,e){"use strict";e.r(t);var u=e("18c4"),a=e.n(u);for(var o in u)"default"!==o&&function(n){e.d(t,n,function(){return u[n]})}(o);t["default"]=a.a},"9bbf":function(n,t,e){"use strict";e.r(t);var u=e("2abd"),a=e("6967");for(var o in a)"default"!==o&&function(n){e.d(t,n,function(){return a[n]})}(o);e("6154");var r,i=e("f0c5"),f=Object(i["a"])(a["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],r);t["default"]=f.exports},b14b:function(n,t,e){}},[["2cf3","common/runtime","common/vendor"]]]);