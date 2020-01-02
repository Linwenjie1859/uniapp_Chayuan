<script>
import Vue from 'vue'
import util from 'common/util.js';
import { mapState, mapMutations } from 'vuex';

export default {
	computed: {
		...mapState(['navHeight']),
		navHeight: {
			get() {
				return this.$store.state.navHeight;
			},
			set(val) {
				this.$store.state.navHeight = val;
			}
		}
	},
	onLaunch: function(option) {
		let data = uni.getStorageSync('data');
		let that = this;
		if (data != '') {
			that.basePost(
				that.U({ c: 'login', a: 'login_by_mobile_pwd' }),
				{
					phone: data.phone,
					pwd: data.pwd
				},
				function(res) {
					console.log(res);
					that.loginStore(res.data);
				},
				function(res) {}
			);
		}

		// 展示本地存储能力
		var logs = uni.getStorageSync('logs') || [];
		logs.unshift(Date.now());
		// 获取导航高度；
		uni.getSystemInfo({
			success: e => {
				//导航高度
				this.navHeight = e.statusBarHeight * (750 / e.windowWidth) + 97;
				that.setNavHeight({
					navHeight: this.navHeight
				});
				
				Vue.prototype.ScreentHeight = e.screenHeight;	//四个总和的高度
				Vue.prototype.StatusBarHeight = e.statusBarHeight;	//时间状态高度
				Vue.prototype.NavigationBar = 44;	//导航栏高度
				Vue.prototype.StatusAddNav = 44+e.statusBarHeight;	//导航栏高度+时间状态高度
				
				Vue.prototype.WindowHeight = e.windowHeight;	//中心部分高度
				Vue.prototype.TabBar = 50;	//底部选项卡高度
				
				if(e.screenHeight>800){	
					Vue.prototype.WindowHeight_one_five = (e.windowHeight-44-e.statusBarHeight)/5;	//1/5中心部分高度
				}else{
					Vue.prototype.WindowHeight_one_five = (e.windowHeight-44-e.statusBarHeight)/4;	//1/4中心部分高度
				}
			
				console.log(e.screenHeight);
				console.log(e.windowHeight);
				console.log((e.windowHeight-(44+e.statusBarHeight))/4);
				Vue.prototype.RemainingPosition=e.windowHeight-(44+e.statusBarHeight);	//自定义导航栏的情况下减去自定义高度剩余的高
				
			},
			fail(err) {
				console.log(err);
			}
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	methods: {
		...mapMutations(['setNavHeight', 'loginStore'])
	}
};
</script>

<style>
/*每个页面公共css */
@import url("common/colorui/main.css");
@import url("common/colorui/icon.css");


/*每个页面公共css */
/* 	.content{
		color: #6d6d6d;
	} */
.font-80 {
	font-size: 80upx;
}

.font-60 {
	font-size: 60upx;
}

.font-36 {
	font-size: 36upx;
}

.font-32 {
	font-size: 32upx;
}

.font-28 {
	font-size: 28upx;
}

.font-24 {
	font-size: 24upx;
}

.font-weight {
	font-weight: bold;
}

.text_right {
	text-align: right !important;
}

.text_center {
	text-align: center !important;
}

.text_limit_two {
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.text_limit {
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
}

.no_border {
	border-bottom: none !important;
}

.bg_green {
	background-color: #51c77d;
}

.bg_orange {
	background-color: #f66d3c;
}

.green {
	color: #51c77d;
}

.gray {
	color: #999999;
}

.white {
	color: #ffffff;
}

.orange {
	color: #f66d3c;
}

.btn_green {
	width: 600upx;
	height: 80upx;
	font-size: 36upx;
	background-color: #51c77d;
	color: #fff;
	border-radius: 50upx;
	padding: 0;
	margin: 0;
	text-align: center;
	line-height: 80upx;
	margin: 0 auto;
}

.btn_obtain_green {
	width: 170upx;
	height: 50upx;
	font-size: 24upx;
	background-color: #51c77d;
	color: #fff;
	border-radius: 50upx;
	padding: 0;
	margin: 0;
	text-align: center;
	line-height: 50upx;
	margin: 0 auto;
}

.btn_edit_green {
	width: 100upx;
	height: 50upx;
	font-size: 24upx;
	background-color: #51c77d;
	color: #fff;
	border-radius: 50upx;
	padding: 0;
	margin: 0;
	text-align: center;
	line-height: 50upx;
}

.btn_collection_green {
	width: 120upx;
	height: 50upx;
	font-size: 24upx;
	background-color: #ffffff;
	color: #51c77d;
	border-radius: 10upx;
	border: 2upx solid #51c77d;
	padding: 0;
	margin: 0;
	text-align: center;
	line-height: 44upx;
}

.btn_black_green {
	width: 300upx;
	height: 70upx;
	font-size: 28upx;
	background-color: #ffffff;
	color: #51c77d;
	border-radius: 10upx;
	border: 2upx solid #51c77d;
	padding: 0;
	margin: 0;
	text-align: center;
	line-height: 64upx;
}

.btn_purchase_green {
	width: 150upx;
	height: 50upx;
	font-size: 24upx;
	background-color: #51c77d;
	color: #ffffff;
	border-radius: 10upx;
	padding: 0;
	margin: 0;
	text-align: center;
	line-height: 48upx;
}

.btn_pur_green {
	width: 170upx;
	height: 70upx;
	font-size: 28upx;
	background-color: #51c77d;
	color: #ffffff;
	border-radius: 10upx;
	padding: 0;
	margin: 0;
	text-align: center;
	line-height: 68upx;
}

.btn_purchase_orange {
	width: 150upx;
	height: 50upx;
	font-size: 24upx;
	background-color: #f66d3c;
	color: #ffffff;
	border-radius: 10upx;
	padding: 0;
	margin: 0;
	text-align: center;
	line-height: 48upx;
}

.right_icon {
	width: 35upx !important;
	height: 35upx !important;
}

</style>
