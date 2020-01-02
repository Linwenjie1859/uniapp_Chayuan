<template>
	<view class="content">
		<view :style="[{ display: hidden ? 'none' : 'block' }]">
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
								<swiper-item v-for="(item, index) in threeList[0].slider_image" :key="index"><image :src="item" mode=""></image></swiper-item>
							</swiper>
						</view>
					</view>
				</view>
			</view>
			<view class="hot_list">
				<text class="title font-32">{{ rankTitle_three }}</text>
				<view class="list_view font-24">
					<view class="hot_view" @tap="shopDetail(item.id)" v-for="(item, index) in threeList" :key="index">
						<image :src="item.image" mode=""></image>
						<text class="text-cut">{{ item.store_name }}</text>
						<text class="orange">￥{{ item.price }}</text>
						<text class="hot_tip white font-24">top{{ index + 1 }}</text>
					</view>
				</view>
			</view>
			<view class="recommend_list">
				<text class="title font-32">{{ rankTitle_other }}</text>
				<view class="list_view" v-for="(item, index) in list" :key="index">
					<image :src="item.image" mode="" @tap="shopDetail(item.id)"></image>
					<view class="list_right">
						<view class="list_top" @tap="shopDetail(item.id)">
							<text class="font-28 text_limit">{{ item.store_name }}</text>
							<text class="font-28 gray" style="height: 80rpx;">{{ item.store_info }}</text>
						</view>
						<text class="font-24 static">特价优惠</text>
						<view class="list_down">
							<view class="down_text">
								<text class="font-28 orange">￥{{ item.price }}</text>
								<text class="font-24 gray old">￥{{ item.ot_price }}</text>
							</view>
							<image @tap="addGoodToCar(item.id)" src="/static/add_shop_icon.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>

			<view class="cart" @tap="shoppingCart">
				<text class="num">{{ carNum }}</text>
				<image class="img-has-size" src="/static/shopping_cart.png" mode=""></image>
			</view>
		</view>
		<uni-load-more :status="loadingMore" v-if="loadingMoreFlag" />
	</view>
</template>

<script>

export default {
	data() {
		return {
			// 购物车小球动画start
			carNum: 0,
			isAdd:false,
			// 购物车小球动画end
			loadingMoreFlag: true, //上滑加载开关
			loadingMore: 'loading', //上滑加载更多的状态
			hidden: true,

			pageSize: 6,
			currentPage: 1,
			list: [], //所有数据
			threeList: [], //排名前三
			// banner
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 1000,

			//标题
			rankTitle_three: '————本周热门榜首————',
			rankTitle_other: '————热销排行榜————'
		};
	},
	onReachBottom() {
		if (this.loadingMore === 'loading') {
			//防止重复加载
			return;
		}
		this.loadingMoreFlag = true;
		this.loadingMore = 'loading'; //每次上滑都要从新设置status
		setTimeout(() => {
			this.getBestProduct(); //让加载图标旋转0.8s后才请求
		}, 600);
	},
	onPullDownRefresh() {
		//下拉刷新页面将之前的数据初始化
		this.list = [];
		this.threeList = [];
		this.currentPage = 1;
		this.getBestProduct();
	},
	onLoad(e) {
		setTimeout(() => {
			this.getBestProduct();
		}, 600);
	},
	methods: {
		//添加商品到购物车中
		addGoodToCar(gId) {
			let that = this;
			//是否登入
			if(that.isAdd)return;
			that.isAdd=true;
			if (that.isLogin()) {
				//获取该商品的信息
				that.baseGet(
					that.U({
						c: 'store_api',
						a: 'details',
						q: {
							id: gId
						}
					}),
					function(res) {
						//添加到购物车中
						that.basePost(
							that.U({ c: 'auth_api', a: 'set_cart' }),
							{
								productId: gId,
								merId: res.data.mer_id,
								cartNum: 1
							},
							function(res) {
								that.carNum++;
								that.Tips({title:'亲，添加商品成功~'})
								that.isAdd=false;
								
							},
							function(res) {
								console.log(res);
							}
						);
					},
					function(res) {
						console.log(res);
					},
					true
				);
			}
		},
		//0.8s后隐藏加载提示的信息
		closeLoadingMoreFlag() {
			setTimeout(() => {
				this.loadingMoreFlag = false;
			}, 800);
		},
		getBestProduct() {
			var that = this;
			that.baseGet(
				that.U({
					c: 'store_api',
					a: `get_best_product`,
					q: {
						first: that.currentPage,
						limit: that.pageSize
					}
				}),
				function(res) {
					uni.stopPullDownRefresh(); //当请求成功之后将下拉刷新关闭
					if (res.data.length == 0) {
						that.loadingMore = 'noMore';
						that.closeLoadingMoreFlag(); //0.8后将状态隐藏
						return;
					}
					that.currentPage++;
					that.list = [...that.list, ...res.data];
					that.loadingMore = 'more';
					if (that.threeList.length == 0) {
						for (let i = 0; i < 3; i++) {
							that.threeList.push(that.list.shift());
						}
					}
					that.hidden = false;
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		shopDetail(id) {
			uni.navigateTo({
				url: '/pages/list/goode_details/goode_details?id='+id
			});
		},
		shoppingCart(e) {
			uni.switchTab({
				url: '/pages/tabber/shopping_cart/shopping_cart'
			});
		}
	}
};
</script>

<style>
.img-has-size {
	height: 40rpx !important;
	width: 40rpx !important;
}
/*抛物线小球*/
.good_box {
	width: 35upx;
	height: 35upx;
	position: fixed;
	border-radius: 50%;
	overflow: hidden;
	left: 50%;
	top: 50%;
	z-index: +99;
	background: #ff4b3e;
}
.cart {
	position: fixed;
	bottom: 100upx;
	right: 25upx;
	width: 90upx;
	height: 90upx;
	background-color: #f2f2f2;
	border-radius: 50%;
	text-align: center;
	z-index: 9999;
}

.cart image {
	margin: 25upx auto;
}
.cart .num {
	width: 35upx;
	height: 35upx;
	line-height: 35upx;
	font-size: 28upx;
	border-radius: 50%;
	color: #ffffff;
	display: block;
	position: absolute;
	top: -5upx;
	left: 55upx;
	background: #ff4b3e;
}
page {
	background-color: #f2f2f2;
}
.banner {
	width: 100%;
	height: 380upx;
}

.banner .swiper {
	height: 380upx;
}

.banner image {
	width: 100%;
	height: 380upx;
}
.hot_list {
	width: 700upx;
	background-color: #ffffff;
	border-radius: 10upx;
	position: absolute;
	top: 340upx;
	left: 50%;
	margin-left: -350upx;
}
.hot_list .title {
	width: 700upx;
	display: block;
	text-align: center;
	margin: 25upx 0upx 50upx 0upx;
}
.hot_list .list_view {
	width: 650upx;
	margin: 25upx auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.hot_list .list_view .hot_view image {
	width: 180upx;
	height: 180upx;
	border-radius: 10upx;
}
.hot_list .list_view .hot_view text {
	width: 180upx;
	display: block;
	text-align: center;
}
.hot_list .list_view .hot_view {
	width: 180upx;
	position: relative;
}
.hot_list .list_view .hot_tip {
	width: 60upx !important;
	height: 60upx !important;
	display: block;
	text-align: center;
	line-height: 60upx;
	border-radius: 50%;
	background-color: #f66d3c;
	position: absolute;
	top: -30upx;
	left: -10upx;
}
.recommend_list {
	width: 700upx;
	margin: 25upx auto;
	background-color: #ffffff;
	border-radius: 10upx;
	margin-top: 390upx;
}
.recommend_list .title {
	width: 700upx;
	display: block;
	text-align: center;
	padding-top: 25upx;
}
.recommend_list .list_view {
	width: 650upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	padding: 25upx 0upx;
	border-bottom: 1upx solid #e5e5e5;
}
.recommend_list .list_view image {
	width: 180upx;
	height: 180upx;
	margin-right: 25upx;
}
.recommend_list .list_top text {
	width: 440upx;
	display: block;
}
.recommend_list .static {
	padding: 0upx 20upx;
	background-color: #fce0c8;
	border-radius: 25upx;
	color: #f66d3c;
}
.recommend_list .list_down {
	width: 440upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.recommend_list .list_down image {
	width: 45upx !important;
	height: 45upx !important;
	margin-right: 0upx;
}
.recommend_list .list_down .old {
	margin-left: 20upx;
	text-decoration: line-through;
}
.shop_cart {
	width: 80upx;
	height: 80upx;
	background-color: #f2f2f2;
	border-radius: 50%;
	display: flex;
	align-items: center;
	text-align: center;
	position: fixed;
	right: 42upx;
	bottom: 130upx;
}
.shop_cart image {
	width: 50upx;
	height: 40upx;
	margin: 0 auto;
}
</style>
