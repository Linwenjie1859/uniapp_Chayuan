<template>
	<view class="content">
		<scroll-view class="scroll-h" :scroll-x="true" :scroll-into-view="scrollInto" style="text-align: center;">
			<view v-for="(tab, index) in tabBars" :key="index" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
				<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.title }}</text>
			</view>
		</scroll-view>
		<!-- 订单列表 -->
		<swiper :current="tabIndex" class="swiper-box" :duration="300" @change="ontabchange" style="overflow: hidden;">
			<swiper-item class="swiper-item" v-for="(it, inde) in newsList" :key="inde">
				<scroll-view class="scroll-v" scroll-y @scrolltolower="loadMore()">
					<view class="loading-more"><uni-load-more :status="newsList[inde].refreshStatus" v-if="newsList[inde].refreshFlag" /></view>
					<view v-for="(item, index) in it.data" :key="index">
						<view class="order_list">
							<!-- 待发货 -->
							<view class="list_top" v-if="item.status == 0 && item.paid == 1">
								<text class="font-32">{{item.store_name}}</text>
								<text class="font-28 orange">等待卖家发货</text>
							</view>
							<!-- 待付款 -->
							<view class="list_top" v-if="item.status == 0 && item.paid == 0">
								<text class="font-32">{{item.store_name}}</text>
								<text class="font-28 orange">等待买家付款</text>
							</view>
							<!-- 待收货 -->
							<view class="list_top" v-if="item.status == 1 && item.paid == 1">
								<text class="font-32">{{item.store_name}}</text>
								<text class="font-28 orange">卖家已发货</text>
							</view>
							<!-- 待评价 -->
							<view class="list_top" v-if="(item.status == 2 || item.status == 3)&& item.paid == 1">
								<text class="font-32">{{item.store_name}}</text>
								<text class="font-28 orange">交易成功</text>
							</view>
							<!-- 公共部分 -->
							<view class="list_info" @tap="details(item.order_id)" v-for="(ite, ind) in item.cartInfo" :key="ind">
								<image :src="ite.productInfo.image" mode=""></image>
								<view class="info_view">
									<text class=" font-28 text-cut-two">{{ ite.productInfo.store_info }}</text>
									<text class="gray  font-24" v-if="item.open_address" style="margin: 10rpx 0 0 0;">地点:{{item.open_address}}</text>
									<text class="gray  font-24  text_right" v-if="!item.open_address" style="margin: 10rpx 0 0 0;">x{{ite.cart_num}}</text>
									<text class="gray text_right  font-24" style="margin: 10rpx 0 0 0;">￥{{ ite.productInfo.price }}</text>
									<text class="font-24 gray" style="margin: 0;" v-if="item.date">出发日期:{{item.date}}</text> 
								</view>
							</view>
							<view style="display: flex; justify-content:flex-end;">
								<text class="font-28" style="margin:0 20rpx 10rpx;">共{{ item.cartInfo.length }}件商品 合计<text class="text-price text-orange">{{item.pay_price}}</text></text>
							</view>
							<!-- 待发货 -->
							<view class="btn" v-if="item.status == 0 && item.paid == 1"><button class="btn_purchase_green">提醒发货</button></view>
							<!-- 待付款 -->
							<view class="btn" v-if="item.status == 0 && item.paid == 0">
								<button class="btn_purchase_green" @tap="closeOrder(item.order_id, inde, index)">取消订单</button>
								<button class="btn_purchase_orange" @tap="purchase(inde,index)">立即付款</button>
							</view>
							<!-- 待收货 -->
							<view class="btn" v-if="item.status == 1 && item.paid == 1">
								<button class="btn_purchase_green" @tap="logistics(item.order_id)">查看物流</button>
								<button class="btn_purchase_orange" @tap="confirmGood(item.order_id, inde, index)">确认收货</button>
							</view>
							<!-- 待评价 --> 
							<view class="btn" v-if="item.status == 2 && item.paid == 1">
								<button class="btn_purchase_green" @tap="logistics(item.order_id)">查看物流</button>
								<button class="btn_purchase_orange" @tap="evaluation(inde, index)">评价</button>
							</view>
						</view>
					</view>
					<!-- 无订单 -->
					<view class="no_data" v-if="it.nodata">
						<image src="/static/no_data.png" mode=""></image>
						<text class="font-28 gray">没有相关订单~</text>
					</view>

					<view class="loading-more"><uni-load-more :status="newsList[inde].loadingStatus" v-if="newsList[inde].loadingFlag" /></view>
				</scroll-view>
			</swiper-item>
		</swiper>
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
			currentLoadFlag: true,
			newsList: [], //全部宝贝、新品、活动数组集合
			tabIndex: 0, //当前下标
			scrollInto: '', //scroll跳转到这个Id
			tabBars: [
				{
					title: '全部'
				},
				{
					title: '待付款'
				},
				{
					title: '待发货'
				},
				{
					title: '待收货'
				},
				{
					title: '待评价'
				}
			]
		};
	},
	onLoad(e) {
		this.initInfo();
		this.tabIndex = e.index;
	},
	onShow() {
		this.newsList[this.tabIndex].data = [];
		this.newsList[this.tabIndex].currentPage = 1;
		this.newsList[this.tabIndex].loadingFlag = false;
		this.newsList[this.tabIndex].nodata = false;
		this.newsList[this.tabIndex].refreshFlag = true;
		this.getOrderList(this.tabIndex);
	},
	methods: {
		//初始化newsList数据类型
		initInfo() {
			this.tabBars.forEach(tabBar => {
				this.newsList.push({
					data: [],
					refreshText: '',
					loadingStatus: 'more',
					refreshStatus: 'loading',
					currentPage: 1,
					pageSize: 6,
					loadingFlag: false,
					refreshFlag: true,
					nodata: false
				});
			});
		},

		// 加载更多，
		loadMore() {
			let that=this;
			if (that.currentLoadFlag) {
				that.currentLoadFlag = false;
				that.newsList[that.tabIndex].loadingStatus = 'loading';
				that.newsList[that.tabIndex].loadingFlag = true;
				setTimeout(function(){
					that.getOrderList(that.tabIndex);
				},400);
			}
			//保证每次只能请求一次
			setTimeout(() => {
				that.currentLoadFlag = true;
			}, 500);
		},
		//下拉刷新

		//导航栏点击跳转
		ontabtap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			this.tabIndex = index;
		},
		//左右滑动
		ontabchange(e) {
			let index = e.target.current || e.detail.current;
			this.tabIndex = index;
			this.scrollInto = this.tabBars[index].id;
			//重置信息
			this.newsList[this.tabIndex].data = [];
			this.newsList[this.tabIndex].currentPage = 1;
			this.newsList[this.tabIndex].loadingFlag = false;
			this.newsList[this.tabIndex].nodata = false;
			this.newsList[this.tabIndex].refreshFlag = true;
			this.getOrderList(this.tabIndex);
		},
		//0.8s后隐藏加载提示的信息
		closeLoadingFlag() {
			let that = this;
			setTimeout(function() {
				that.newsList[that.tabIndex].loadingFlag = false;
			}, 800);
		},
		//获取用户所有订单
		getOrderList(index) {
			let that = this;
			that.basePost(
				that.U({ c: 'user_api', a: 'get_user_order_list' }),
				{
					//type状态的代表意思:'':查询所有;0:未付款;1:代发货;2:待收货;3:已收货;4:待评价;-1:退货申请中;-2：已退款;
					type: index == 0 ? '' : index == 1 ? 0 : index == 2 ? 1 : index == 3 ? 2 : 3,
					page: that.newsList[index].currentPage,
					limit: that.newsList[index].pageSize,
					search: ''
				},
				function(res) {
					that.newsList[that.tabIndex].refreshFlag = false;
					uni.stopPullDownRefresh();
					//判断该次级下是否有信息存在，以及查询出来的结果是否等于0条。如果是就显示没数据图片，否则不显示。
					that.newsList[index].nodata =(res.data.length == 0 && that.newsList[index].data== 0)?true:false;
					if (res.data.length == 0) { 
						that.newsList[index].loadingStatus = 'noMore';
						that.closeLoadingFlag();
						return;
					}
					that.newsList[index].data = [...that.newsList[index].data, ...res.data];
					that.newsList[index].currentPage++;
				},
				function(res) {
					console.log(res);
				}
			);
		},
		// tab
		tabsChange(index) {
			this.current = index;
		},
		//立即购买
		purchase(inde,index) {
			let json={
				order_id:this.newsList[inde].data[index].order_id,
				total_price:this.newsList[inde].data[index].total_price,
			}
			uni.navigateTo({
				url: '/pages/user/confirm_payment/confirm_payment?orderInfo='+JSON.stringify(json)
			});
		},
		//取消订单
		closeOrder(order_id, inde, index) {
			let that = this;
			uni.showModal({
				title: '提示',
				content: '确定删除这个订单？',
				success: function(res) {
					if (res.confirm) {
						that.basePost(
							that.U({ c: 'user_api', a: 'user_remove_order' }),
							{
								uni: order_id
							},
							function(res) {
								that.newsList[inde].data.splice(index, 1);
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
		//确认收货
		confirmGood(order_id, inde, index) {
			let that = this;
			that.basePost(
				that.U({ c: 'user_api', a: 'user_take_order' }),
				{
					uni: order_id
				},
				function(res) {
					that.Tips({ title: '确认成功,立即前往评价~' });
					that.newsList[inde].data.splice(index, 1);
					that.tabIndex = 4;
				},
				function(res) {
					console.log(res);
				}
			);
		},
		//查看详情
		details(order_id) {
			uni.navigateTo({
				url: '/pages/user/order_details/order_details?order_id='+order_id
			});
		},
		//评价
		evaluation(inde, index) {
			let listUnique=[];
			let cartInfo=this.newsList[inde].data[index].cartInfo;
			for(var i=0;i<cartInfo.length;i++){
				let info={
					unique:cartInfo[i].unique,
					image:cartInfo[i].productInfo.image
				}
				listUnique.push(info);
			}
			uni.navigateTo({
				url: '/pages/user/my_evaluation/my_evaluation?listUnique='+JSON.stringify(listUnique)
			});
		},
		//查看物流
		logistics(order_id) {
			uni.navigateTo({
				url: '/pages/shop/shop_logistics/shop_logistics?order_id='+order_id
			});
		}
	}
};
</script>

<style lang="scss">
.has-margin-top {
	margin-top: 25rpx;
}
.bg-white {
	background: #ffffff;
}
.tabs {
	margin-top: 340upx;
	flex: 1;
	flex-direction: column;
	overflow: hidden;
	height: 100vh;
}
.scroll-h {
	width: 750upx;
	height: 80upx;
	flex-direction: row;
	background: #ffffff;
}

.line-h {
	height: 1upx;
	background-color: #cccccc;
}

.uni-tab-item {
	display: inline-block;
	flex-wrap: nowrap;
	padding-left: 33upx;
	padding-right: 33upx;
}

.uni-tab-item-title {
	color: #555;
	font-size: 30upx;
	height: 80upx;
	line-height: 80upx;
	flex-wrap: nowrap;
	white-space: nowrap;
}

.uni-tab-item-title-active {
	color: #51c77d;
	padding-bottom: 10rpx;
	border-bottom: 6upx solid #51c77d;
}

.swiper-box {
	flex: 1;
	height: 100vh;
	padding-top: 20rpx;
}

.swiper-item {
	flex: 1;
}

.scroll-v {
	height: calc(100vh - 100rpx);
	width: 750upx;
}

.update-tips {
	position: absolute;
	left: 0;
	top: 41px;
	right: 0;
	padding-top: 5px;
	padding-bottom: 5px;
	background-color: #fddd9b;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.update-tips-text {
	font-size: 14px;
	color: #ffffff;
}

.refresh {
	width: 750upx;
	height: 64px;
	justify-content: center;
}

.refresh-view {
	flex-direction: row;
	flex-wrap: nowrap;
	align-items: center;
	justify-content: center;
}

.refresh-icon {
	width: 32px;
	height: 32px;
	transition-duration: 0.5s;
	transition-property: transform;
	transform: rotate(0deg);
	transform-origin: 16px 16px;
}

.refresh-icon-active {
	transform: rotate(180deg);
}

.loading-icon {
	width: 20px;
	height: 20px;
	margin-right: 5px;
}

.loading-icon-active {
	transform: rotate(21600deg);
}

.loading-text {
	margin-left: 2px;
	font-size: 16px;
	color: #999999;
}

.loading-more {
	align-items: center;
	justify-content: center;
	// padding-top: 10px;
	// padding-bottom: 10px;
	text-align: center;
}

.loading-more-text {
	font-size: 28upx;
	color: #999;
}
page {
	background-color: #f2f2f2;
}

.content {
	width: 100%;
	overflow: hidden;
	flex: 1;
	flex-direction: column;
	height: 100vh;
}
.active-switch {
	width: 100%;
	height: 105upx;
	// overflow:scroll;
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-radius: 10upx;
	position: fixed;
	top: 0;
	z-index: 100;
}
// 订单列表
.shop_content {
	margin-top: 20upx;
}

.order_list {
	width: 700upx;
	margin: 0 auto;
	background-color: #ffffff;
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
	height: 150upx;
	margin-right: 20upx;
}

.order_list .list_info .info_view text {
	display: block;
	text-align: left;
	width: 480upx;
}

.order_list .list_info .info_view .gray {
	display: inline-block;
	text-align: left;
	margin: 20upx 0upx;
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
