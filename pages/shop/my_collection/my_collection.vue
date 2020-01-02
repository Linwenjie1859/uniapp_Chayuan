<template>
	<!-- 收藏列表 -->
	<view class="flex flex-direction bg-white">
		<view class="flex has-radius view-is-position margin-sm " v-for="(row, index) in collectList" :key="index">
			<!-- 删除按钮 -->
			<view class="delete" @tap.stop="collectDelete(index)"><text class="cuIcon-delete text-xl"></text></view>
			<view class="delete store" @tap="purchase(row.pid,row.type)"><text class="cuIcon-shop text-xl"></text></view>
			<!-- content -->
			<view
				class="carrier"
				:class="[typeClass == 'valid' ? (theIndex == index ? 'open' : oldIndex == index ? 'close' : '') : '']"
				@touchstart="touchStart(index, $event)"
				@touchmove="touchMove(index, $event)"
				@touchend="touchEnd(index, $event)"
			>
				<view class="flex">
					<view class="flex margin-right-sm">
						<image :src="row.image" class="radius" mode="scaleToFill" style="height: 260rpx; width: 270rpx;" @tap="purchase(row.pid,row.type)"></image>
					</view>
					<view class="flex flex-direction justify-between padding-tb-xs" style="width: 430rpx;">
						<view class="flex flex-direction">
							<text class="text-cut-two">{{ row.store_name }}</text>
							<view class="flex justify-between margin-tb-xs text-grey">
								<text>{{row.sum_collect}}人收藏</text>
								<text>已售{{ row.ficti }}件</text>
							</view>
						</view>
						<view class="flex">
							<text class="text-orange text-price text-xl">{{row.price}}</text>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		<uni-load-more :status="loadingMore" v-if="loadingMoreFlag" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			loadingMoreFlag: true, //上滑加载开关
			loadingMore: 'loading', //上滑加载更多的状态
			currentPage: 1,
			collectList: [],
			pageSize: 7,
			noDateFlag:false,
			/*************/
			headerTop: 0,
			//控制滑动效果
			typeClass: 'valid',
			subState: '',
			theIndex: null,
			oldIndex: null,
			isStop: false
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
			this.getCollectList(); //让加载图标旋转0.8s后才请求
		}, 600);
	},
	onPullDownRefresh() {
		//下拉刷新页面将之前的数据初始化
		this.collectList = [];
		this.currentPage = 1;
		this.getCollectList();
	},
	onLoad(e) {
		//当页面加载的时候调用接口获取内容
		setTimeout(() => {
			this.getCollectList();
		}, 600);
	},
	methods: {
		//取消收藏
		collectDelete(index) {
			let that = this;
			uni.showModal({
				title: '提示',
				content: '确定删除收藏的宝贝？',
				success: function(res) {
					if (res.confirm) {
						that.basePost(
							that.U({ c: 'store_api', a: 'uncollect_product' }),
							{
								productId: that.collectList[index].pid
							},
							function(res) {
								that.collectList.splice(index, 1);
								that.theIndex = null;
							},
							function(res) {
								console.log(res);
							}
						);
					} else {
						return;
					}
				}
			});
		},
		//处理收藏列表数据
		dealCollectList(data) {
			for (let i = 0; i < data.length; i++) {
				data[i].image = data[i].image.replace(/\\/g, '/');
			}
			return data;
		},
		//0.8s后隐藏加载提示的信息
		closeLoadingMoreFlag() {
			setTimeout(() => {
				this.loadingMoreFlag = false;
			}, 800);
		},
		//获取收藏列表
		getCollectList() {
			var that = this;
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'get_user_collect_product',
					q: {
						page: that.currentPage,
						limit: that.pageSize
					}
				}),
				function(res) {
					uni.stopPullDownRefresh(); //当请求成功之后将下拉刷新关闭
					if (res.data.length == 0) {
						if(that.collectList.length==0){
							that.noDateFlag=true;
						}
						that.loadingMore = 'noMore';
						that.closeLoadingMoreFlag(); //0.8后将状态隐藏
						return;
					}

					that.currentPage++;
					that.collectList = [...that.collectList, ...that.dealCollectList(res.data)];
					that.loadingMore = 'more';
				},
				function(res) {
					console.log(res);
				},
				true
			);
			uni.stopPullDownRefresh();
		},
		// 立即购买
		purchase(id,type) {
			uni.navigateTo({
				url: (type==2?'/pages/list/line_details/line_details?id=':'/pages/list/goode_details/goode_details?id=') + id
			});
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

 .view-is-position {
	height: 260upx;
	position: relative;
	overflow: hidden;
	z-index: 4;
}
.delete {
	width: 98upx;
	height: 255upx;
	position: absolute;
	right: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #e54d42;
	color: #fff;
	z-index: 2;
	margin: 4rpx 0;
}

.store {
	right: 98rpx;
	background-color: #f37b1d;
}

.row .carrier {
	width: 700upx;
	margin: 0 auto;
	border-radius: 10upx;
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



</style>
