<template>
	<view class="content">
		<view class="header">
			<image src="/static/left_white.png" mode="" @tap="back" v-if="showBack"></image>
			<view class="input">
				<text class="font-36 white">登录注册</text>
			</view>
			<text class="pwd_login font-32 white" v-if="type == 1" @tap="code_login">验证码登录</text>
			<text class="pwd_login font-32 white" v-else @tap="pwd_login">密码登录</text>
			
		</view>
		<view class="down_content">
			<image class="logo" src="/static/logo.png"></image>
			<view class="input_view">
				<input class="font-28" type="text" value="" placeholder="请输入手机号" />
			</view>
			<view class="input_view supplement" v-if="type == 1">
				<input class="font-28" type="text" value="" placeholder="请输入密码" />
			</view>
			<view class="input_view supplement" v-else>
				<input class="font-28" type="text" value="" placeholder="请输入验证码" />
				<!-- <text class="font-24 green">获取验证码</text> -->
				<text class="font-24 green">重新获取(58s)</text>
			</view>
			<button class="btn_green font-36 btn" @tap="login_btn">登录</button>
			<view class="tip font-24">
				<text>注册即表示接受</text>
				<text class="green"  @tap="register">《快速注册》</text>
				<text>和</text>
				<text class="green">《隐私协议》</text>
			</view>
			<view class="login_mode">
				<view class="mode_tip">
					<view class="line_left"></view>
					<text class="font-24 gray">第三方账号登录</text>
					<view class="line_right"></view>
				</view>
				<view class="login_tip">
					<view class="mode_view">
						<image src="/static/weixin_icon.png" mode=""></image>
						<text class="font-24 green">微信</text>
					</view>
					<view class="mode_view">
						<image src="/static/qq_icon.png" mode=""></image>
						<text class="font-24 green">QQ</text>
					</view>
					<view class="mode_view">
						<image src="/static/weibo_icon.png" mode=""></image>
						<text class="font-24 green">微博</text>
					</view>
				</view>
			</view>
				
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 1,
				showBack: true,
			}
		},
		methods: {
			// 跳转
			code_login(e) {
				this.type = 2;
			},
			pwd_login(e) {
				this.type = 1;
			},
			login_btn(e) {
				uni.navigateTo({
					url: "/pages/tabber/home/home"
				})
			},
			register(e) {
				uni.navigateTo({
					url: '/pages/login/register/register',
				});
			},
			//返回上一页
			back() {
				uni.navigateBack();
			},
		}
	}
</script>


<style>
	.content {
		text-align: center;
	}

	/* 头部 */
	.header {
		background-color: #51C77D;
		width: 100%;
		height: 170upx;
		position: fixed;
		top: 0;
		z-index: 10000;
	}

	.header image {
		width: 35upx;
		height: 35upx;
		position: absolute;
		left: 25upx;
		bottom: 45upx;
	}
	.header .pwd_login{
		position: absolute;
		right: 25upx;
		bottom: 38upx;
	}
	.header .input {
		width: 580upx;
		height: 70upx;
		border-radius: 10upx;
		position: absolute;
		left: 50%;
		margin-left: -290upx;
		bottom: 25upx;
	}

	.header .input text {
		display: block;
		width: 580upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
	}
	.down_content{
		margin-top: 100upx;
	}
	.logo {
		height: 150upx;
		width: 150upx;
		border-radius: 50%;
		margin-top: 150upx;
	}

	.input_view {
		width: 550upx;
		height: 80upx;
		line-height: 80upx;
		display: flex;
		justify-content: space-between;
		margin: 0upx auto;
		margin-top: 30upx;
		margin-bottom: 50upx;
		display: flex;
		align-items: center;
	}

	.input_view input {
		/* width: 400upx; */
		text-align: left;
	}

	.supplement {
		margin-bottom: 90upx;
	}

	/* .switch{
		width: 550upx;
		margin: 0 auto;
		display: block;
		text-align: left;
		margin-top: -30upx;
		margin-bottom: 40upx;
		display: flex;
		align-items: center;
	}
	.switch .switch_img{
		width: 35upx;
		height: 35upx;
	} */
	.tip {
		margin-top: 50upx;
	}

	.mode_tip {
		width: 500upx;
		height: 30upx;
		display: flex;
		align-items: center;
		margin: 0 auto;
		position: relative;
		margin-top: 200upx;
	}

	.mode_tip text {
		display: block;
		width: 500upx;
		text-align: center;
	}

	.mode_tip .line_left {
		width: 150upx;
		height: 1upx;
		background-color: #E5E5E5;
		position: absolute;
		top: 14;
		left: 0;
	}

	.mode_tip .line_right {
		width: 150upx;
		height: 1upx;
		background-color: #E5E5E5;
		position: absolute;
		top: 14;
		left: 350upx;
	}

	.login_tip {
		width: 500upx;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		margin-top: 30upx;
	}

	.login_tip .mode_view {
		width: 70upx;
		text-align: center;
	}

	.login_tip .mode_view image {
		width: 50upx;
		height: 50upx;
	}

	.login_tip .mode_view text {
		display: block;
	}
</style>
