<template>
	<view class="content">
		<text class="text font-32">2018寿宁县风阳乡锌葡萄袋装500g</text>
		<text class="text font-80 orange">￥45.0</text>
		<view class="default font-28">
			<text>收款方</text>
			<text>葡萄庄园</text>
		</view>
		<button class="btn_green" @tap="successful">立即支付</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			successful(e){
				uni.navigateTo({
					url:"/pages/shop/successful_payment/successful_payment"
				})
			},
			
		}
	}
</script>

<style>
	page{
		background-color: #F2F2F2;
	}
	.text{
		display: block;
		width: 650upx;
		margin: 30upx auto;
		text-align: center;
	}
	.default{
		width: 650upx;
		height: 100upx;
		border-radius: 10upx;
		margin: 0 auto;
		background-color: #FFFFFF;
		padding: 0upx  25upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 100upx;
	}
</style>
