<template>
	<view class="flex flex-direction bg-white" style="height: 100vh;">
		<view class="flex justify-center align-center padding-tb-xl flex-sub">
			<view class="cu-avatar round xl" style="background-image: url(../../../static/woodpecker.png);">
			</view> 
		</view>
		<view class="flex flex-direction align-start padding-lr-xl margin-lr-xl flex-treble">
			<view class="margin-top-xl solid-bottom">
				<input type="text" placeholder="请输入账号名称" v-model="phone" style="width: 550rpx;"/>
			</view>
			<view class="margin-top-xl solid-bottom">
				<input type="password" value="" placeholder="请输入账号密码" v-model="pwd" style="width: 550rpx;"/>
			</view>
			<view class="flex justify-end self-end align-center text-df text-grey margin-top">
				<text class="margin-right-sm" @tap="register">注册账号</text>
				<text @tap="redToResetPwd">忘记密码?</text>
			</view>
			<view class="flex margin-top-xl" style="width: 550rpx;">
				<button type="primary" class="round bg-gradual-green" style="width: 550rpx;" @tap="login">登录</button>
			</view>
		</view>
		<view class="flex padding-lr-xl margin-lr-xl flex-twice">
			<view class="flex flex-direction " style="width: 550rpx;">
				<view class="flex justify-center solid-bottom padding-bottom-sm margin-bottom">
					<text class="text-grey">第三方账号登录</text>
				</view>
				<view class="flex justify-around text-sm text-green align-center">
					<button class="flex flex-direction align-center bg-white" @tap="getUserInfo()">
						<image src="/static/weixin_icon.png" mode="" class="height-width-sl"></image>
						<text class="text-sm">微信</text>
					</button>
					<button class="flex flex-direction align-center bg-white">
						<image src="/static/qq_icon.png" mode="" class="height-width-sl"></image>
						<text class="text-sm">QQ</text>
					</button>
					<button class="flex flex-direction align-center bg-white">
						<image src="/static/weibo_icon.png" mode="" class="height-width-sl"></image>
						<text class="text-sm">微博</text>
					</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
	data() {
		return {
			StatusBarHeight:this.StatusBarHeight,
			StatusAddNav:this.StatusAddNav,
			type: 1,
			showBack: true,
			phone: '',
			pwd: ''
		};
	},
	onLoad() {

	},
	methods: {
		getUserInfo(){
			uni.login({
				provider: 'weixin',
				success: (res) => {
					uni.getUserInfo({
						success: (info) => {
							console.log(info);
							that.basePost(
								that.U({ c: 'login', a: 'login_by_app' }),
								{
									nickName: info.userInfo.nickName,
									gender: info.userInfo.gender,
									language:"zh_CN",
									city:info.userInfo.city,
									province:info.userInfo.province,
									country:info.userInfo.country,
									avatarUrl:info.userInfo.avatarUrl,
									unionId:info.userInfo.unionId,
								},
								function(res) {
									console.log(res);
								},
								function(res) {
									console.log(res);
								}
							);
							
						},
						fail: () => {
							uni.showToast({
								title:"微信登录授权是失败",
								icon:"none",
							})
						}
					})
				},
				fail: () => {
					uni.showToast({
						title:"微信登录授权是失败",
						icon:"none",
					})
				}
			})
		},
		
		
		// 跳转
		code_login(e) {
			this.type = 2;
		},
		pwd_login(e) {
			this.type = 1;
		},
		redToResetPwd() {
			uni.redirectTo({
				url: '/pages/login/safety_monitoring/safety_monitoring'
			})
		},
		register(e) {
			uni.navigateTo({
				url: '/pages/login/register/register'
			});
		},
		login() {
			let that = this;
			if (!that.checkMobile(that.phone)) {
				that.Tips({ title: '请输入正确的手机号' });
				return;
			}
			if (that.pwd == '') {
				that.Tips({ title: '请输入密码' });
				return;
			}
			that.basePost(
				that.U({ c: 'login', a: 'login_by_mobile_pwd' }),
				{
					phone: that.phone,
					pwd: that.pwd
				},
				function(res) {
					let data=res.data;
					that.loginStore(data);
					that.Tips({ title: '登录成功！' }, { tab: 3, url: 2 });
					uni.setStorage({
						key:'data',
						data:data
					});
				},
				function(res) {
					that.Tips({ title: '账号或密码不正确。' });
				}
			);
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		...mapMutations(['loginStore'])
	}
};
</script>

<style scoped>
	button::after{
		border: 1rpx solid #FFFFFF !important;
	}
	.height-width-sl{
		height: 60rpx;
		width: 60rpx;
	}
.position-relative{
	position: relative;
}
.position-absolute{
	position: absolute;
}
</style>
