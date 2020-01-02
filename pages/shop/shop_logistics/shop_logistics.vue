<template>
	<view class="content">
		<view class="top_content">
			<image :src=courierInfo.cartInfo[0].productInfo.image mode=""></image>
			<view class="shop_info">
				<text class="font-32 block">运输中</text>
				<text class="font-24 block">{{courierInfo.delivery_name}}：{{courierInfo.delivery_id}}</text>
				<text class="font-24 block">官方电话：{{result.expPhone}}</text>
			</view>
		</view>
		<view class="address">
			<image src="/static/address.png" mode=""></image>
			<text class="font-28">{{courierInfo.user_address}}</text>
		</view>
		<view class="logistics">
			<view class="logistics_list">
				<view><ali :state="result.deliverystatus" :datas="result.list" :ways="result.expName"></ali></view>
			</view>
		</view>
	</view>
</template>

<script>
// 物流消息
import ali from '@/components/WuLiu-step.vue';
export default {
	components: {
		ali
	},
	onLoad(e) {
		this.logistics(e.order_id);
	},
	data() {
		return {
			courierInfo:{
				delivery_name:"快递",
				delivery_id:"正在加载...",
				user_address:"正在加载..."
			},
			result:{
				deliverystatus:0,
				expPhone:"",
				list:[],
				expName: '',
			},
		};
	},
	methods: {
		logistics(order_id) {
			let that = this;
			that.baseGet(
				that.U({
					c: 'user_api',
					a: 'express',
					q: {
						uni: order_id
					}
				}),
				function(res) {
					that.courierInfo=res.data.order;
					that.result=res.data.express.result;
					console.log(that.result);
				},
				function(res) {
					console.log(res);
				},
				true
			);
		}
	}
};
</script>
<style lang="scss">
page {
	background-color: #f2f2f2;
}
.content {
	text-align: center;
	height: 100%;
}
.top_content {
	width: 700upx;
	height: 170upx;
	background-color: #ffffff;
	margin: 25upx auto;
	border-radius: 10upx;
	display: flex;
	align-items: center;
}

.top_content image {
	width: 115upx;
	height: 115upx;
	margin-left: 25upx;
}

.top_content .shop_info {
	width: 510upx;
	height: 115upx;
	margin: 0upx 25upx;
}

.top_content .block {
	display: block;
	text-align: left;
}
.address {
	width: 700upx;
	height: 90upx;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 10upx;
	display: flex;
	align-items: center;
}
.address image {
	width: 40upx;
	height: 40upx;
	margin: 0upx 15upx 0upx 25upx;
}
.logistics {
	width: 700upx;
	margin: 25upx auto;
	background-color: #ffffff;
	border-radius: 10upx;
}
</style>
