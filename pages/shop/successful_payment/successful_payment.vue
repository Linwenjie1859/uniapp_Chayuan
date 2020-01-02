<template>
	<view class="content">
		<view class="successful">
			<image src="/static/successful_payment.png" mode=""></image>
			<text class="font-32 gray">支付成功</text>
			<view class="btn">
				<button class="btn_black_green" @tap="black">返回首页</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			black(){
				uni.navigateTo({
					url:"/pages/tabber/home/home"
				})
			},
		}
	}
</script>

<style>
	.successful{
		width: 700upx;
		margin: 0 auto;
		text-align: center;
		margin-top: 200upx;
		position: relative;
	}
	.successful image{
		width: 200upx;
		height: 200upx;
		margin: 0 auto;
	}
	.successful text{
		display: block;
		width: 700upx;
		margin: 100upx auto;
		text-align: center;
	}
	.successful .btn{
		width: 200upx;
		position: absolute;
		top: 800upx;
		left: 50%;
		margin-left: -150upx;
	}
</style>
