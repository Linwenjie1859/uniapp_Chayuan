<template>
	<view class="flex flex-direction padding-sm">
		<view class="flex flex-direction radius bg-white padding">
			<view class="flex align-center justify-between solid-bottom padding-bottom-sm ">
				<text>订单编号</text>
				<text>{{orderInfo.order_id}}</text>
			</view>
			<view class="flex align-center justify-between margin-top-sm">
				<text>总共金额</text>
				<text class="text-price text-orange">{{orderInfo.total_price}}</text>
			</view>
		</view>
		
		<view class="flex align-center margin-tb">
			<text>支付方式</text>
		</view>
		
		<view class="flex flex-direction radius bg-white padding">
			<view class="flex align-center justify-between solid-bottom padding-bottom-sm" @tap="mode">
				<view class="flex align-center">
					<image src="/static/weixin.png" class="img-has-size" mode="scaleToFill" ></image>
					<text class="margin-left-xs">微信支付</text>
				</view>
				<text class="cuIcon-right text-grey"></text>
			</view>
			<view class="flex align-center justify-between margin-top-sm" @tap="mode">
				<view class="flex align-center">
					<image src="/static/zhifubao.png" class="img-has-size" mode="scaleToFill" ></image>
					<text class="margin-left-xs">支付宝支付</text>
				</view>
				<text class="cuIcon-right text-grey"></text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderInfo:{
					order_id:'',
					total_price:0
				},
			}
		},
		onLoad(e) {
			this.orderInfo=JSON.parse(e.orderInfo);
			console.log(this.orderInfo);
		},
		methods: {
			
			// 结算方式
			mode(e){
				uni.navigateTo({
					url:"/pages/user/confirmation_transaction/confirmation_transaction"
				})
			},
		}
	}
</script>

<style scoped>
.img-has-size{
	height: 50rpx;
	width: 50rpx;
}
	
</style>
