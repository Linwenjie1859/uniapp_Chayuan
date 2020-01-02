<template>
	<view class="content">
		<view class="text">
			<text class="font-28">为了保证是您本人操作，请完成以下验证我们已发送验证码到您的手机：12345678909</text>
		</view>
		<view class="input_view supplement">
			<input class="font-28" type="text" value="" placeholder="请输入验证码" />
			<!-- <text class="font-24 green">获取验证码</text> -->
			<text class="font-24 green">重新获取(58s)</text>
		</view>
		<button class="btn_green font-36 btn" @tap="reset_password">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			// 跳转
			reset_password(e) {
				uni.navigateTo({
					url: "/pages/login/reset_password/reset_password"
				})
			},
		},
	}
</script>

<style>
	.content {
		text-align: center;
	}

	.text {
		display: block;
		width: 550upx;
		margin: 80upx auto;
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
		align-items: center;
	}

	.input_view input {
		/* width: 400upx; */
		text-align: left;
	}

	.supplement {
		margin-bottom: 90upx;
	}
</style>
