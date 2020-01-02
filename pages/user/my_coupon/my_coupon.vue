<template>
	<view class="list">
		<!-- 优惠券列表 -->
		<view class="sub-list valid" :class="subState">
			<view class="loading-more"><uni-load-more :status="loadingStatus" v-if="refreshFlag" /></view>
			<view class="row" v-for="(item, index) in couponValidList" :key="index" >
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteCoupon(item.id, couponValidList)"><image src="/static/del_white.png" mode=""></image></view>
				<!-- content -->
				<view
					class="carrier"
					:class="[typeClass == 'valid' ? (theIndex == index ? 'open' : oldIndex == index ? 'close' : '') : '']"
					@touchstart="touchStart(index, $event)"
					@touchmove="touchMove(index, $event)"
					@touchend="touchEnd(index, $event)"
				>
					<view class="coupon_list" @tap="detail(item.id)">
						<view class="list_left">
							<text class="font-60 white text_center">￥{{ item.coupon_price }}</text>
							<text class="font-24 white text_center">满{{ item.use_min_price }}元可用</text>
						</view>
						<view class="list_right">
							<text class="font-32">{{ item.coupon_title }}</text>
							<text class="font-24 gray">有效期：{{ item._add_time }}至{{ item._end_time }}</text>
							<image v-if="item.status != 0" :src="item.status == 1 ? '/static/used_icon.png' : '/static/expired_icon.png'" mode=""></image>
						</view>
					</view>
				</view>
			</view>
			<view class="no_data" v-if="noDataFlag">
				<image src="/static/no_data.png" mode=""></image>
				<text class="font-28 gray">没有优惠券~</text>
			</view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
export default {
	components: {
		uniLoadMore
	},
	data() {
		return {
			couponValidList: [],
			headerTop: 0,
			//控制滑动效果
			typeClass: 'valid',
			subState: '',
			theIndex: null,
			oldIndex: null,
			isStop: false,
			//加载loading标记
			refreshFlag: true,
			loadingStatus:'loading',
			noDataFlag:false,	//没有数据的标志
		};
	},
	onLoad() {
		this.getUserCoupon();
	},
	onPullDownRefresh() {
		this.couponValidList=[];
		this.getUserCoupon();
	},
	methods: {
		//查看优惠卷的信息
		detail(couponId) {
			console.log(couponId);
			uni.navigateTo({
				url: '/pages/shop/shop_collection_coupon/shop_collection_coupon?couponId=' + couponId
			});
		},
		dealData(data) {
			for (var i = 0; i < data.length; i++) {
				data[i]['coupon_price'] = data[i]['coupon_price'].substring(0, data[i]['coupon_price'].indexOf('.'));
				console.log(data[i]);
			}
			return data;
		},
		getUserCoupon() {
			let that = this;
			that.basePost(
				that.U({ c: 'coupons_api', a: 'get_use_coupon' }),
				{},
				function(res) { 
					uni.stopPullDownRefresh();
					if(res.data.length==0){
						that.noDataFlag=true;
					}
					that.refreshFlag=false;
					that.couponValidList = that.dealData(res.data); 
					
				},
				function(res) {
					console.log(res);
				}
			);
		},
		switchType(type) {
			if (this.typeClass == type) {
				return;
			}
			uni.pageScrollTo({
				scrollTop: 0,
				duration: 0
			});
			this.typeClass = type;
			this.subState = this.typeClass == '' ? '' : 'show' + type;
			setTimeout(() => {
				this.oldIndex = null;
				this.theIndex = null;
				this.subState = this.typeClass == 'valid' ? '' : this.subState;
			}, 200);
		},
		//控制左滑删除效果-begin
		touchStart(index, event) {
			//多点触控不触发
			if (event.touches.length > 1) {
				this.isStop = true;
				return;
			}
			this.oldIndex = this.theIndex;
			this.theIndex = null;
			//初始坐标
			this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
		},
		touchMove(index, event) {
			//多点触控不触发
			if (event.touches.length > 1) {
				this.isStop = true;
				return;
			}
			let moveX = event.touches[0].pageX - this.initXY[0];
			let moveY = event.touches[0].pageY - this.initXY[1];

			if (this.isStop || Math.abs(moveX) < 5) {
				return;
			}
			if (Math.abs(moveY) > Math.abs(moveX)) {
				// 竖向滑动-不触发左滑效果
				this.isStop = true;
				return;
			}

			if (moveX < 0) {
				this.theIndex = index;
				this.isStop = true;
			} else if (moveX > 0) {
				if (this.theIndex != null && this.oldIndex == this.theIndex) {
					this.oldIndex = index;
					this.theIndex = null;
					this.isStop = true;
					setTimeout(() => {
						this.oldIndex = null;
					}, 150);
				}
			}
		},

		touchEnd(index, $event) {
			//解除禁止触发状态
			this.isStop = false;
		},

		//删除商品
		deleteCoupon(id, List) {
			let len = List.length;
			for (let i = 0; i < len; i++) {
				if (id == List[i].id) {
					List.splice(i, 1);
					break;
				}
			}
			this.oldIndex = null;
			this.theIndex = null;
		},

		discard() {
			//丢弃
		}
	}
};
</script>
<style lang="scss">
page {
	position: relative;
	background-color: #f2f2f2;
}

.list {
	width: 100%;
	display: block;
	position: relative;
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
