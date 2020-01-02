<template>
	<view class="list">
		<!-- 收藏列表 -->
		<view class="sub-list valid" :class="subState" @tap="detail">
			<view class="no_news" v-if="couponValidList.length==0">
				<image src="/static/no_news.png" mode=""></image>
				<text class="font-28 gray">暂无消息</text>
			</view>
			<view class="row" v-for="(row,index) in couponValidList" :key="index">
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteCoupon(row.id,couponValidList)">
					<image src="/static/del_white.png" mode=""></image>
				</view>
				<!-- content -->
				<view class="carrier" :class="[typeClass=='valid'?theIndex==index?'open':oldIndex==index?'close':'':'']"
				 @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
					<!-- 消息列表 -->
					<view class="shop_home">
						<view class="news_list" @tap="detail">
							<text class="info_num white bg_orange">10</text>
							<image :src="row.img" mode=""></image>
							<view class="news_info">
								<view class="info_view">
									<text class="font-28">{{row.title}}</text>
									<text class="font-24 gray">{{row.time}}</text>
								</view>
								<view class="info_view">
									<text class="font-24 gray text_limit">{{row.info}}</text>
								</view>
							</view>
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
				couponValidList: [{
					id: 1,
					title: "服务通知",
					info:"恭喜你参加的拼团已组成成功了，请您等待卖家发货",
					time:"2019-08-08",
					img: "/static/icon-item-001.png"
				}, 
				{
					id: 2,
					title: "账户通知",
					info:"恭喜你参加的拼团已组成成功了，请您等待卖家发货",
					time:"2019-08-08",
					img: "/static/icon-item-003.png"
				}, 
				{
					id: 3,
					title: "物流通知",
					info:"恭喜你参加的拼团已组成成功了，请您等待卖家发货",
					time:"2019-08-08",
					img: "/static/icon-item-005.png"
				}, ],
				headerTop: 0,
				//控制滑动效果
				typeClass: 'valid',
				subState: '',
				theIndex: null,
				oldIndex: null,
				isStop: false
			}
		},
		methods: {
			// 立即购买
			purchase(e) {
				uni.navigateTo({
					url: "/pages/list/goode_details/goode_details"
				})
			},
			detail(e) {
				uni.navigateTo({
					url: "/pages/list/news_detail/news_detail"
				})
			},
			switchType(type) {
				if (this.typeClass == type) {
					return;
				}
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 0
				})
				this.typeClass = type;
				this.subState = this.typeClass == '' ? '' : 'show' + type;
				setTimeout(() => {
					this.oldIndex = null;
					this.theIndex = null;
					this.subState = this.typeClass == 'valid' ? '' : this.subState;
				}, 200)
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
						}, 150)
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
	}
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
		height: 150upx;
		margin: 25upx auto;
		border-radius: 10upx;
		position: relative;
		overflow: hidden;
		z-index: 4;
	}

	.row .menu {
		width: 195upx;
		height: 150upx;
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

	// 消息列表

	.news_list {
		width: 700upx;
		background-color: #FFFFFF;
		margin: 0 auto;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		margin-bottom: 25upx;
		position: relative;
	}

	.news_list image {
		width: 100upx;
		height: 100upx;
		margin: 25upx;
	}

	.news_list .info_view {
		width: 520upx;
		height: 60upx;
		line-height: 60upx;
		text-align: left;
		display: flex;
		justify-content: space-between;
	}

	.no_news {
		width: 700upx;
		margin: 300upx auto;
		text-align: center;
	}

	.no_news image {
		width: 200upx;
		height: 200upx;
		margin: 0 auto;
	}

	.no_news text {
		width: 700upx;
		display: block;
		text-align: center;
		margin-top: 30upx;
	}
	.info_num{
		display: block;
		width: 30upx;
		height: 30upx;
		border-radius: 50%;
		line-height: 30upx;
		text-align: center;
		position: absolute;
		top: 15upx;
		left: 105upx;
		font-size: 20upx;
	}
</style>
