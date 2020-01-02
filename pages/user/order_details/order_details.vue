<template>
	<view class="content">
		<view class="address_info">
			<image src="/static/address.png" mode=""></image>
			<view class="info">
				<view class="info_top">
					<text class="font-28 info_text">{{orderInfo.real_name}}</text>
					<text class="font-28 info_text">{{orderInfo.user_phone}}</text>
				</view>
				<text class="info_top font-28 text_limit_two">{{orderInfo.user_address}}</text>
			</view>
		</view>
		<view class="order_list">
			<view class="list_top">
				<text class="font-32">{{orderInfo.store_name}}</text>
				<text class="font-28 orange">{{orderStatus}}</text>
			</view> 
			<view class="list_info" v-for="(item,index) in orderInfo.cartInfo" :key="index">
				<image :src="item.productInfo.image" mode=""></image>
				<view class="info_view">
					<text class="font-28 text_info">{{item.productInfo.store_info}}</text>
					<text class="gray  font-24">规格：500g</text>
					<text class="gray text_right  font-24">￥{{item.productInfo.price}}</text>
				</view>
			</view>
			<view class="consumption_info font-24 gray">
				<text>运费（快递）</text>
				<text class="text_right">￥{{orderInfo.total_postage}}</text>
				<text>店铺优惠</text>
				<text class="text_right">￥{{orderInfo.coupon_price}}</text>
				<text>实付款</text>
				<text class="text_right">￥{{orderInfo.total_price}}</text>
			</view>
			<view class="btn">
				<button class="btn_purchase_green">联系卖家</button>
			</view>
		</view>
		<view class="order_info font-28">
			<view class="info_view">
				<text>订单编号：</text>
				<text class="text_right gray">{{orderInfo.order_id}}</text>
			</view>
			<view class="info_view">
				<text>支付宝交易号：</text>
				<text class="text_right gray">{{orderInfo.user_phone}}</text>
			</view>
			<view class="info_view">
				<text>创建时间：</text>
				<text class="text_right gray">{{orderInfo._add_time}}</text>
			</view>
			<view class="info_view">
				<text>付款时间：</text>
				<text class="text_right gray">{{orderInfo._pay_time==null?'未支付':orderInfo._pay_time}}</text>
			</view>
			<view class="info_view">
				<text>发货时间：</text>
				<text class="text_right gray">2019-07-29 12:00:09</text>
			</view>
			<view class="info_view">
				<text>成交时间：</text>
				<text class="text_right gray">2019-07-29 12:00:09</text>
			</view>
		</view>
		<view class="clear" style="height:120upx; margin-top:20rpx;"></view>
		<view class="order_btn">
			<view class="btn">
				<button class="btn_purchase_green" @tap="logistics(orderInfo.order_id)">查看物流</button>
				<button class="btn_purchase_orange" @tap="confirmGood">确认收货</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderStatus:'等待买家付款',
				orderInfo:{},
			}
		},
		onLoad(e) {
			this.getOrderDetail(e.order_id);
		},
		methods: {
			//确认收货
			confirmGood() {
				let that = this;
				that.basePost(
					that.U({ c: 'user_api', a: 'user_take_order' }),
					{
						uni: that.orderInfo.order_id
					},
					function(res) {
						that.Tips({ title: '确认成功,立即前往评价~' },{tab:5,url:'/pages/user/my_order/my_order'});
					},
					function(res) {
						console.log(res);
					}
				);
			},
			//通过订单Id获取订单信息
			getOrderDetail(order_id){
				let that = this;
				that.basePost(
					that.U({ c: 'user_api', a: 'get_order' }),
					{
						uni: order_id
					},
					function(res) {
						that.orderInfo=res.data;
						that.orderStatus=res.data.paid==0?that.orderStatus:res.data.paid==1&&res.data.status==0?'等待卖家发货':res.data.status==1?'等待买家收货':'订单已完成';
					},
					function(res) {
						console.log(res);
					}
				);
			},
			logistics(order_id) {
				uni.navigateTo({
					url: '/pages/shop/shop_logistics/shop_logistics?order_id='+order_id
				});
			}
		}
	}
</script>

<style>
	page {
		background-color: #F2F2F2;
	}

	.content {
		text-align: center;
	}

	.address_info {
		width: 700upx;
		height: 150upx;
		margin: 25upx auto;
		background-color: #FFFFFF;
		border-radius: 10upx;
		display: flex;
		align-items: center;
	}

	.address_info image {
		width: 40upx;
		height: 40upx;
		margin: 0upx 20upx 0upx 25upx;
	}

	.address_info .info_top {
		display: block;
		width: 540upx;
		text-align: left;
		margin-bottom: 15upx;
	}

	.address_info .info_top text {
		margin-right: 25upx;
	}

	.order_list {
		width: 700upx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 10upx;
		padding-bottom: 25upx;
		margin-bottom: 25upx;
	}

	.order_list .list_top {
		width: 650upx;
		height: 90upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1upx solid #e5e5e5;
	}

	.order_list .list_info {
		width: 650upx;
		margin: 20upx auto;
		display: flex;
		align-content: center;
	}

	.order_list .list_info image {
		width: 150upx;
		height: 150upx;
		margin-right: 20upx;
	}

	.order_list .list_info .info_view .text_info {
		display: block;
		text-align: left;
		width: 480upx;
		height: 100upx;
	}

	.order_list .list_info .info_view .gray {
		display: inline-block;
		text-align: left;
		width: 240upx;
	}

	.order_list .btn {
		width: 350upx;
		text-align: right;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-left: 325upx;
	}

	.order_list button {
		margin-left: 25upx;
	}

	.consumption_info {
		width: 650upx;
		margin: 0 auto;
		margin-bottom: 20upx;
	}

	.consumption_info text {
		display: inline-block;
		text-align: left;
		width: 325upx;
	}

	.order_info {
		width: 700upx;
		margin: 0 auto;
		background-color: #FFFFFF;
		border-radius: 10upx;
		padding: 20upx 0upx;
	}

	.order_info .info_view {
		width: 650upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.order_btn {
		width: 100%;
		background-color: #FFFFFF;
		height: 120upx;
		line-height: 120upx;
		display: flex;
		align-items: center;
		position: fixed;
		bottom: 0upx;
	}

	.order_info text {
		text-align: left;
		display: block;
		width: 650upx;
		margin: 10upx auto;
	}

	/* .order_btn{
		width: 700upx;
		margin: 25upx auto;
	} */
	.order_btn .btn {
		width: 350upx;
		text-align: right;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-left: 350upx;
	}

	.order_btn button {
		margin-left: 25upx;
	}
</style>
