<template>
	<view class="content">
		<view class="coupon_info">
			<text class="font-32 white">葡萄庄园优惠券</text>
			<text class="font-24 white">————使用期限：{{couponInfo.add_time}}-{{couponInfo.end_time}}————</text>
			<view class="info_view">
				<view class="info_list">
					<text class="font-80 white">￥{{couponInfo.coupon_price}}</text>
					<text class="font-32 white">葡萄庄园优惠券</text>
				</view>
				<image src="/static/basket.png" mode=""></image>
			</view>
		</view>
		<view class="shop_info">
			<view class="shop_home">
				<view class="home_info">
					<view class="title">
						<text class="font-32">猜你喜欢</text>
						<text class="font-28">换一换</text>
					</view>
					<view class="goods_list">
						<view class="list_view" @tap="detial">
							<image src="/static/shop_pic.png" mode=""></image>
							<text class="font-28 text_limit">寿宁锌葡萄好吃的锌葡萄</text>
							<view class="list_info">
								<text class="font-24 orange">￥45.0</text>
								<text class="font-24">月售4件</text>
							</view>
						</view>
						<view class="list_view" @tap="detial">
							<image src="/static/shop_pic.png" mode=""></image>
							<text class="font-28 text_limit">寿宁锌葡萄好吃的锌葡萄</text>
							<view class="list_info">
								<text class="font-24 orange">￥45.0</text>
								<text class="font-24">月售4件</text>
							</view>
						</view>
			
					</view>
				</view>
			</view>
		
		</view>
		<text class="no_more font-28 gray">————没有更多————</text>
		<view class="shop_details" @tap="shop">
			<image src="/static/shop_pic.png" mode=""></image>
			<text class="font-32">葡萄庄园</text>
			<image class="right" src="/static/right.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				couponId:'',
				couponInfo:{
					add_time:"暂无数据",
					end_time:"暂无数据",
					coupon_price:"0"
				},
			}
		},
		onLoad(e) {
			this.couponId=e.couponId;
			this.getCouponInfo();
		},
		methods: {
			getCouponInfo(){
				let that=this;
				that.baseGet(
					that.U({ c: 'coupons_api', a: 'get_coupon_rope',q: {
						couponId: that.couponId
					}}),
					function(res) {
						that.couponInfo=res.data;
						console.log(that.couponInfo);
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
			detial(e) {
				uni.navigateTo({
					url: "/pages/list/goode_details/goode_details"
				})
			},
			shop(e) {
				uni.navigateTo({
					url: "/pages/shop/shop_commodity/shop_commodity"
				})
			},
		}
	}
</script>

<style>
	page{
		background-color: #F2F2F2;
	}
	.coupon_info{
		width: 700upx;
		margin: 25upx auto;
		border-radius: 10upx;
		background-color: #51C77D;	
		padding: 40upx 0upx;
	}
	.coupon_info text{
		display: block;
		width: 700upx;
		text-align: center;
	}
	.info_view{
		width: 500upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 40upx;
	}
	.info_view image{
		width: 160upx;
		height: 160upx;
	}
	.info_list text{
		width: 290upx!important;
	}
	.home_info {
		width: 700upx;
		margin: 25upx auto;
		background-color: #ffffff;
		border-radius: 10upx;
		padding-top: 25upx;
	}
	.title {
		width: 650upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 25upx;
	}
	
	.goods_list {
		width: 650upx;
		margin: 0 auto;
		display: flex;
		flex-wrap:wrap;
		align-items: center;
		justify-content: space-between;
	}
	
	.goods_list .list_view {
		width: 310upx;
		margin-bottom: 25upx;
	}
	
	.goods_list .list_view .text_limit {
		display: block;
		width: 310upx;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.goods_list .list_view image {
		width: 310upx;
		height: 310upx;
	}
	
	.goods_list .list_view .list_info {
		width: 310upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.no_more{
		width: 700upx;
		display: block;
		margin: 0 auto;
		text-align: center;
	}
	.shop_details{
		width: 700upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
		margin: 25upx auto;
		display: flex;
		align-items: center;
	}
	.shop_details image{
		width: 115upx;
		height: 115upx;
		margin: 25upx;
	}
	.shop_details text{
		width: 460upx;
	}
	.shop_details .right{
		width: 35upx!important;
		height: 35upx!important;
	}

</style>
