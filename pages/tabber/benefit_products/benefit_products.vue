<template>
	<view class="content">
		<view class="header">
			<view class="input_view" @tap="search"><text class="font-28 gray">搜索商品</text></view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }"></view>
		</view>
		<view class="banner">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper
							class="swiper"
							indicator-color="#fff"
							indicator-active-color="#51c77d"
							:indicator-dots="indicatorDots"
							:autoplay="autoplay"
							:interval="interval"
							:duration="duration"
						>
							<swiper-item v-for="(item, index) in farmProduceList.banner" :key="index"><image :src="item.img" mode=""></image></swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<view class="benefit_list" v-for="(item, index) in farmProduceList.merInfo" :key="index">
			<text class="title font-32">————{{ item.name }}————</text>
			<image :src="item.image" mode=""></image>
			<view class="list_down">
				<view class="down_view" v-for="(ite, ind) in item.list" :key="ind">
					<image :src="ite.store_logo" mode="" @tap="detail(ite.id)"></image>
					<view class="view_details" @tap="detail(ite.id)">
						<text class=" font-28">{{ ite.store_name }}</text>
						<text class=" font-24">详情></text>
					</view>
					<view class="view_details font-24">
						<view class="details_left">
							<image src="/static/navigation_icon.png" mode=""></image>
							<text @click="navToMap(ite)">导航</text>
						</view>
						<view class="details_right" @tap="keep">
							<image src="/static/collection_icon.png" mode=""></image>
							<text class="white">{{ ite.is_collect ? '' : '已' }}收藏</text>
						</view>
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
			// banner
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 1000,
			isKeep: false, //收藏
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11, //层级
			afterHeaderzIndex: 10, //层级
			beforeHeaderOpacity: 1, //不透明度
			afterHeaderOpacity: 0, //不透明度
			farmProduceList: {}
		};
	},
	onPageScroll(e) {
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},
	onLoad() {
		this.farmProduceInfo();
	}, 
	methods: {
		navToMap(mapInfo) {
			uni.navigateTo({
				url:"/pages/map/map?mapInfo="+JSON.stringify(mapInfo)
			})
		},
		farmProduceInfo() {
			let that = this;
			that.goodsList = [];
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'get_merchant_index'
				}),
				function(res) {
					that.farmProduceList = res.data;
					console.log(res);
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		//收藏
		keep() {
			this.isKeep = this.isKeep ? false : true;
		},
		// 搜索商品
		search(e) {
			uni.navigateTo({
				url: '/pages/list/search/search'
			});
		},
		// 商品详情
		detail(id) {
			uni.navigateTo({
				url: '/pages/shop/shop_commodity/shop_commodity?storeId='+id
			});
		}
	}
};
</script>

<style>
page {
	background-color: #f2f2f2;
}

/* 头部 */
.header {
	width: 100%;
	height: 170upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
}
.input_view {
	width: 580upx;
	height: 70upx;
	background-color: rgba(255, 255, 255, 0.5);
	border-radius: 10upx;
	position: absolute;
	left: 50%;
	margin-left: -290upx;
	bottom: 25upx;
	z-index: 100;
}

.input_view text {
	display: block;
	width: 580upx;
	height: 70upx;
	line-height: 70upx;
	text-align: center;
}
.after {
	width: 100%;
	height: 170upx;
	position: fixed;
	top: 0upx;
	transition: opacity 0.05s linear;
	background-color: #51c77d;
	color: #fff;
}

.after .middle {
	display: flex;
	align-items: center;
	width: 400upx;
	padding-top: 90upx;
	margin: 0 auto;
	justify-content: space-between;
}

.banner {
	/* margin-top: 170upx; */
	width: 100%;
	height: 450upx;
}

.banner .swiper {
	height: 450upx;
}

.banner image {
	width: 100%;
	height: 450upx;
}

.benefit_list {
	width: 700upx;
	margin: 0 auto;
}

.benefit_list .title {
	width: 700upx;
	text-align: center;
	display: block;
	margin: 25upx 0upx;
}

.benefit_list image {
	width: 700upx;
	height: 270upx;
	border-radius: 10upx;
}

.benefit_list .list_down {
	width: 700upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
}

.benefit_list .list_down .down_view {
	width: 330upx;
	background-color: #ffffff;
	text-align: center;
	border-radius: 10upx;
	padding-bottom: 15upx;
	margin: 20upx 0upx 25upx 0upx;
}

.benefit_list .list_down .down_view image {
	width: 280upx !important;
	height: 220upx !important;
	border-radius: 10upx;
	margin-top: 25upx;
}

.benefit_list .list_down .down_view .view_details {
	width: 280upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 10upx;
}

.benefit_list .list_down .down_view .view_details image {
	width: 25upx !important;
	height: 25upx !important;
	margin: 0upx 0upx 0upx 10upx;
}

.benefit_list .list_down .down_view .view_details .details_right {
	width: 110upx;
	height: 40upx;
	background-color: #51c77d;
	display: flex;
	align-items: center;
	border-radius: 10upx;
}

.benefit_list .list_down .down_view .view_details .details_right text {
	display: block;
	width: 80upx;
	text-align: center;
}
</style>
