<template>
	<view class="list">
		<!-- 优惠券列表 -->
		<view class="sub-list valid" :class="subState">
			<view class="loading-more"><uni-load-more status="true" v-if="refreshFlag" /></view>
			<view class="row" v-for="(item, index) in list" :key="index">
				<view class="coupon_list">
					<view class="list_right">
						<text class="font-32 ">{{ item.res.title }}</text>
						<text class="font-24 color9">有效日期:{{ item.data.add_time }}-{{ item.data.end_time }}</text>
					</view>
					<view class="list_left" @tap="getCoupon(item.data.id)">
						<text class="font-45 white text_center">￥{{ item.res.coupon_price }}</text>
						<text class="font-32 white text_center">立即领取</text>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingMore" v-if="loadingMoreFlag" />
			<view class="no_data" v-if="noDataFlag">
				<image src="/static/no_data.png" mode=""></image>
				<text class="font-28 gray">没有优惠券~</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loadingMoreFlag: true, //上滑加载开关
			loadingMore: 'loading', //上滑加载更多的状态
			noDataFlag:false,
			
			articleId: '',
			pageSize: 6,
			currentPage: 1,
			list: []
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
			this.getCouponList(); //让加载图标旋转0.8s后才请求
		}, 600);
	},
	onPullDownRefresh() {
		//下拉刷新页面将之前的数据初始化
		this.list = [];
		this.noDataFlag=false;
		this.currentPage = 1;
		this.getCouponList();
	},
	onLoad(e) {
		//当页面加载的时候调用接口获取内容
		setTimeout(() => {
			this.getCouponList();
		}, 600);
	},
	methods: {
		//领取优惠券
		getCoupon(cid) {
			let that = this;
			that.baseGet(
				that.U({
					c: 'coupons_api',
					a: 'user_get_coupon',
					q: {
						couponId: cid
					}
				}),
				function(res) {
					that.Tips({ title: '优惠券领取成功!快去使用吧~' });
				},
				function(res) {
					console.log(res);
				}
			);
		},
		//获取优惠券id列表
		getCouponList() {
			let that = this;
			that.baseGet(
				that.U({
					c: 'coupons_api',
					a: 'get_issue_coupon_list',
					q: {
						limit: that.pageSize,
						page: that.currentPage
					}
				}),
				function(res) {
					if (res.data.length == 0) {
						that.loadingMore = 'noMore';
						that.closeLoadingMoreFlag(); //0.8后将状态隐藏
						return;
					}
					for (let i = 0; i < res.data.length; i++) {
						that.getCouponDetail(res.data[i]);
					}
				},
				function(res) {
					console.log(res);
				}
			);
		},
		//0.8s后隐藏加载提示的信息
		closeLoadingMoreFlag() {
			setTimeout(() => {
				this.loadingMoreFlag = false;
				this.noDataFlag=true;
			}, 800);
		},
		//获取优惠券信息
		getCouponDetail(data) {
			let that = this;
			that.baseGet(
				that.U({
					c: 'coupons_api',
					a: 'get_coupon_info',
					q: {
						cid: data.cid
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
					that.loadingMore = 'more';
					var info = {
						data: data,
						res: res.data
					};
					that.list.push(info);
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
.small-font {
	display: inline;
	font-size: 24rpx;
}
.loading-more {
	align-items: center;
	justify-content: center;
	text-align: center;
}
page {
	position: relative;
	background-color: #f2f2f2;
}
.color9 {
	color: #999999;
}
.font-45 {
	font-size: 45rpx;
}
.list {
	width: 100%;
	display: block;
	position: relative;
}
.scroll-v {
	height: calc(100vh);
	width: 750upx;
}
.row {
	width: 700upx;
	height: 200upx;
	margin: 25upx auto;
	border-radius: 10upx;
	position: relative;
	overflow: hidden;
	z-index: 4;
}

.row .menu {
	width: 195upx;
	height: 200upx;
	position: absolute;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: red;
	color: #fff;
	z-index: 2;
}

.menu image {
	width: 35upx;
	height: 35upx;
}

.row .carrier {
	width: 700upx;
	margin: 0 auto;
	border-radius: 10upx;
}
.loading-more {
	align-items: center;
	justify-content: center;
	// padding-top: 10px;
	// padding-bottom: 10px;
	text-align: center;
}
.carrier {
	@keyframes showMenu {
		0% {
			transform: translateX(0);
		}

		100% {
			transform: translateX(-28%);
		}
	}

	@keyframes closeMenu {
		0% {
			transform: translateX(-28%);
		}

		100% {
			transform: translateX(0);
		}
	}

	&.open {
		animation: showMenu 0.25s linear both;
	}

	&.close {
		animation: closeMenu 0.15s linear both;
	}

	background-color: #fff;
	position: absolute;
	width: 100%;
	padding: 0 0;
	height: 100%;
	z-index: 3;
	flex-wrap: nowrap;
}
.coupon_list {
	width: 700upx;
	height: 200upx;
	display: flex;
	align-items: center;
	border-radius: 10upx;
	background-color: #ffffff;
}
.coupon_list .list_left {
	width: 200upx;
	height: 200upx;
	border-radius: 10upx;
	background-color: #51c77d;
}
.used {
	background-color: #cccccc !important;
}
text {
	display: block;
	margin: 25upx 0upx;
}
.coupon_list .list_right {
	width: 450upx;
	margin: 0upx 25upx;
	position: relative;
}
.coupon_list .list_right image {
	width: 140upx;
	height: 140upx;
	position: absolute;
	top: -10upx;
	right: 0;
}
.gray {
	margin-top: 60upx;
}
.no_data {
	width: 700upx;
	margin: 0 auto;
	text-align: center;
	margin-top: 300upx;
}
.no_data image {
	width: 200upx;
	height: 200upx;
	margin: 0 auto;
}
.no_data text {
	display: block;
	width: 700upx;
	margin: 0 auto;
	text-align: center;
}
</style>
