(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/login/register/register"],{"409e":function(e,t,n){},5908:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{},o=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(o=o.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),o.forEach(function(t){c(e,t,n[t])})}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var r={data:function(){return{time:60,timer:null,is_code:!1,phone:"",code:"",pwd:"",confirmPwd:""}},methods:i({code_login:function(e){this.type=2},pwd_login:function(e){this.type=1},get_code:function(){var e=this;console.log(e.phone),console.log(e.checkMobile(e.phone)),e.checkMobile(e.phone)?null==e.timer&&e.basePost(e.U({c:"login",a:"get_register_code"}),{phone:e.phone},function(t){e.is_code=!0,e.timer=setInterval(e.countDown,1e3)},function(e){console.log(e)}):e.Tips({title:"请输入正确的手机号"})},countDown:function(){var e=this;e.time>0?e.time--:(clearInterval(e.timer),e.timer=null,e.time=60,e.is_code=!1)},register:function(e){var t=this;t.checkMobile(t.phone)?""!=t.code?""!=t.pwd?""!=t.confirmPwd?t.pwd==t.confirmPwd?t.basePost(t.U({c:"login",a:"register_by_mobile"}),{phone:t.phone,code:t.code,pwd:t.pwd},function(e){t.loginStore(e.data),t.Tips({title:"注册成功！"},{tab:3,url:2})},function(e){console.log(e)}):t.Tips({title:"两次输入的密码不一致"}):t.Tips({title:"请输入确认密码"}):t.Tips({title:"请输入密码"}):t.Tips({title:"请输入验证码"}):t.Tips({title:"请输入正确的手机号"})},back:function(){e.navigateBack()},setPhone:function(e){this.phone=e.detail.value},setCode:function(e){this.code=e.detail.value},setPwd:function(e){this.pwd=e.detail.value},setConfirmPwd:function(e){this.confirmPwd=e.detail.value}},(0,o.mapMutations)(["loginStore"]))};t.default=r}).call(this,n("543d")["default"])},7947:function(e,t,n){"use strict";n.r(t);var o=n("5908"),i=n.n(o);for(var c in o)"default"!==c&&function(e){n.d(t,e,function(){return o[e]})}(c);t["default"]=i.a},"944e":function(e,t,n){"use strict";(function(e){n("7a84"),n("921b");o(n("66fd"));var t=o(n("e133"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},a241:function(e,t,n){"use strict";var o=n("409e"),i=n.n(o);i.a},e133:function(e,t,n){"use strict";n.r(t);var o=n("fbc5"),i=n("7947");for(var c in i)"default"!==c&&function(e){n.d(t,e,function(){return i[e]})}(c);n("a241");var r,u=n("f0c5"),l=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],r);t["default"]=l.exports},fbc5:function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},c=[];n.d(t,"b",function(){return i}),n.d(t,"c",function(){return c}),n.d(t,"a",function(){return o})}},[["944e","common/runtime","common/vendor"]]]);