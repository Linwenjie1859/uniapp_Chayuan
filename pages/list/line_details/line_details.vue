<template>
	<view class="content">
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="footer_list">
				<view class="icons font-24 gray">
					<view class="box" @tap="commodity">
						<image src="/static/dp_icon.png" mode=""></image>
						<view class="text">店铺</view>
					</view>
					<view class="box" @tap="cart">
						<image src="/static/waiter.png" mode=""></image>
						<view class="text">客服</view>
					</view>
					<view class="box" @tap="keep">
						<image class="icon" :class="[isKeep ? 'shoucangsel' : 'shoucang']"></image>
						<view class="text">{{ isKeep ? '已' : '' }}收藏</view>
					</view>
				</view>
				<view class="btn font-24"><view class="buy bg_orange white" @click="togglePopup('bottom', 'share')">立即预定</view></view>
			</view>
		</view>

		<!-- 商品主图轮播 -->
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
							<swiper-item v-for="(item, index) in goodsInfo.storeInfo.slider_image" :key="index"><image :src="item" mode=""></image></swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>

		<!-- 商品简介 -->
		<view class="shop_list">
			<!-- 商品 -->
			<view class="list_top">
				<text class="title font-32">{{ goodsInfo.storeInfo.store_name }}</text>
				<view class="shop_view">
					<view class="price">
						<text class="font-36 orange">￥{{ goodsInfo.storeInfo.price }}</text>
						<text class="font-24 gray">/ {{ goodsInfo.storeInfo.unit_name }}</text>
					</view>
					<text class="font-24 gray">含门票</text>
					<view class="time"><text class="font-24 static">周末推荐</text></view>
				</view>
				<view class="shop_view font-24 gray">
					<text>市场售价：{{ goodsInfo.storeInfo.ot_price }}</text>
					<text>已售：{{ goodsInfo.storeInfo.sales }}件</text>
					<text>{{ goodsInfo.storeInfo.open_address }}</text>
				</view>
			</view>
			<!-- 日期 -->

			<mx-date-picker
				:show="showPicker"
				type="date"
				:value="value"
				show-tips="true"
				begin-text="预订"
				end-text="离开"
				show-seconds="true"
				@confirm="onSelected"
				@cancel="onSelected"
				showHoliday="true"
			/>
			<view class="list_top">
				<view class="flex align-center">
					<image src="/static/time.png" mode=""></image>
					<text class="font-28">出行日期</text>
					<text class="font-28 margin-left-sm" @click="onShowDatePicker()">{{ date }}</text>
				</view>
				<!-- <view class="time_list">
					<scroll-view class="scroll-view" scroll-x="true" @scroll="scroll" scroll-left="0">
						<view id="demo6" class="scroll-view-item">
							<text class="font-28 gray">8-2 周五</text>
							<text class="font-36 orange">￥18.90</text>
						</view>
					</scroll-view>
				</view> -->
			</view>

			<!-- 评价 -->
			<view class="list_top">
				<view class="title_view">
					<view class="view_left flex">
						<image src="/static/kf_icon.png" mode=""></image>
						<text class="font-28">宝贝评价({{ goodsInfo.reply.count_num ? goodsInfo.reply.count_num : 0 }})</text>
					</view>
					<view class="view_right" @tap="details"><text class="font-28 gray">查看全部></text></view>
				</view>
				<view class="comments_details flex" v-if="goodsInfo.reply">
					<image :src="goodsInfo.reply.avatar ? goodsInfo.reply.avatar : '/static/pic.png'" mode=""></image>
					<text class="font-24">{{ goodsInfo.reply.nickname }}</text>
				</view>
				<view class="details_info">
					<text class="title font-28 text_limit">{{ goodsInfo.reply.comment }}</text>
				</view>
			</view>

			<!-- 详情 -->
			<view class="list_top">
				<Tabs :TabList="TabList" :currentTab="current" @tabs="tabsChange">
					<!-- 行程 -->
					<view class="list_top" slot="trip">
						<view class="flex">
							<image src="/static/sc_icon.png" mode=""></image>
							<text class="font-28">行程路线</text>
						</view>
						<view class="product_trait gray">
							<view class="trait_list">
								<text class="font-32">{{ goodsInfo.storeInfo.trip_id.view }}</text>
								<text class="font-28">景点</text>
							</view>
							<view class="trait_list">
								<text class="font-32">{{ goodsInfo.storeInfo.trip_id.eat }}</text>
								<text class="font-28">餐食</text>
							</view>
							<view class="trait_list">
								<text class="font-32">{{ goodsInfo.storeInfo.trip_id.item }}</text>
								<text class="font-28">自费项目</text>
							</view>
						</view>
						<view class="font-28 product_info"><rich-text :nodes="goodsInfo.storeInfo.process"></rich-text></view>
					</view>

					<!-- 产品详情 -->
					<view class="list_top" slot="features">
						<view class="flex">
							<image src="/static/sc_icon.png" mode=""></image>
							<text class="font-28">产品详情</text>
						</view>
						<view class="font-28 product_info"><rich-text :nodes="goodsInfo.storeInfo.description"></rich-text></view>
					</view>

					<!-- 费用须知 -->
					<view class="list_top" slot="cost">
						<view class="flex">
							<image src="/static/sc_icon.png" mode=""></image>
							<text class="font-28">费用须知</text>
						</view>
						<view class="font-28 product_info"><rich-text :nodes="goodsInfo.storeInfo.attention"></rich-text></view>
					</view>
				</Tabs>
			</view>

			<view class="clear" style="height: 100upx;"></view>

			<!-- 底部弹窗 -->
			<uni-popup ref="share" :type="type" :custom="true" @change="change">
				<view class="uni-share">
					<view class="goods-info">
						<image :src="goodsInfo.storeInfo.image"></image>
						<view class="info">
							<view class="flex">
								<text class="price font-36 orange">￥{{ goodsInfo.storeInfo.price }}</text>
								<text class="spec font-24">/ {{ goodsInfo.storeInfo.unit_name }}</text>
								<text class="spec font-24">含门票</text>
							</view>
							<text class="title font-28 text_limit_two">{{ goodsInfo.storeInfo.store_name }}</text>
							<view class="price-number">
								<text class="spec font-24">库存:{{ goodsInfo.storeInfo.stock }}件</text>
								<view class="number">
									<view class="sub font-32" @tap.stop="addSubNum(-1)"><text class="icon jian">-</text></view>
									<view class="input font-28"><input type="number" v-model="currentNum" /></view>
									<view class="add font-32" @tap.stop="addSubNum(1)"><text class="icon jia">+</text></view>
								</view>
							</view>
						</view>
					</view>
					<view class="cancel" @click="cancel('share')"><image src="/static/cancel.png" mode=""></image></view>
					<view class="btn flex"><button class="font-28 bg_orange white" @tap="purchase">立即预定</button></view>
					<view class="clear" style="height: 50upx;"></view>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
// 底部弹出层
import uniPopup from '@/components/uni-popup/uni-popup.vue';
// tab
import Tabs from '../../../components/wiszx-tabs/tabs.vue';

import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';

export default {
	components: {
		uniPopup,
		// tab
		Tabs,
		MxDatePicker
	},
	data() {
		return {
			showPicker: false,
			date: '2019-01-01',
			// range: ['2019-01-01','2019-01-06'],
			value: '',
			/******************/
			currentGoodsId: 0,
			goodsInfo: {
				storeInfo: {
					price: 0.0
				}
			},
			isKeep: false, //收藏

			// banner
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 1000,
			//当前购物车商品数量
			currentNum: 1,

			// 底部弹出层
			show: false,
			type: '',
			list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			content: '顶部弹 popup',

			// time_list
			scrollTop: 0,
			old: {
				scrollTop: 0
			},

			// tab
			current: 0,
			TabList: [
				{
					title: '行程'
				},
				{
					title: '产品详情'
				},
				{
					title: '用费须知'
				}
			]
		};
	},
	onLoad(e) {
		this.currentGoodsId = e.id;
		this.getGoodInfo();
	},
	methods: {
		onShowDatePicker() {
			//显示
			this.showPicker = true;
			this.value = this.date;
			console.log(this);
		},
		onSelected(e) {
			//选择
			this.showPicker = false;
			if (e) {
				this.date = e.value;
				//选择的值
				console.log(e.value);
			}
		},
		//获取商品的信息
		getGoodInfo() {
			let that = this;
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'details',
					q: {
						id: that.currentGoodsId
					}
				}),
				function(res) {
					that.goodsInfo = res.data;
					that.isKeep = res.data.storeInfo.userCollect;
					console.log(that.goodsInfo);
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
		// 立即购买
		purchase(e) {
			let that = this;
			that.baseGet(
				that.U({
					c: 'auth_api',
					a: 'now_buy',
					q: {
						productId: that.goodsInfo.storeInfo.id,
						merId: that.goodsInfo.mer_id,
						cartNum: that.currentNum
					}
				}),
				function(res) {
					console.log();
					uni.navigateTo({
						url: '/pages/user/confirm_order/confirm_order?listId=' + res.data.cartId
					});
				},
				function(res) {
					if (res.msg.indexOf('该产品库存不足') != -1) {
						that.Tips({ title: res.msg });
					}
				},
				true
			);
		},
		commodity() {
			console.log(this.goodsInfo.mer_id);
			uni.navigateTo({
				url: '/pages/shop/shop_commodity/shop_commodity?storeId=' + this.goodsInfo.mer_id
			});
		},
		cart(e) {
			uni.navigateTo({
				url: '/pages/tabber/shopping_cart/shopping_cart'
			});
		},
		details(e) {
			uni.navigateTo({
				url: '/pages/shop/comments_details/comments_details?id=' + this.goodsInfo.storeInfo.id
			});
		},
		// 底部弹出层
		togglePopup(type, open) {
			switch (type) {
				case 'top':
					this.content = '顶部弹出 popup';
					break;

				case 'bottom':
					this.content = '底部弹出 popup';
					break;
				case 'center':
					this.content = '居中弹出 popup';
					break;
			}
			this.type = type;
			if (open === 'tip') {
				this.show = true;
			} else {
				this.$refs[open].open();
			}
		},
		cancel(type) {
			if (type === 'tip') {
				this.show = false;
				return;
			}
			this.$refs[type].close();
		},
		change(e) {
			console.log(e.show);
		},
		//加购商品数量增减
		addSubNum(num) {
			if (num < 0 && this.currentNum == 1) {
				this.Tips({ title: '亲，已经不能再减了' });
				return;
			}
			this.currentNum += num;
		},
		// time_list
		scroll: function(e) {
			console.log(e);
			this.old.scrollTop = e.detail.scrollTop;
		},
		goTop: function(e) {
			// 解决view层不同步的问题
			this.scrollTop = this.old.scrollTop;
			this.$nextTick(function() {
				this.scrollTop = 0;
			});
			uni.showToast({
				icon: 'none',
				title: '纵向滚动 scrollTop 值已被修改为 0'
			});
		},

		// tab
		tabsChange(index) {
			this.current = index;
		}
	}
};
</script>

<style lang="scss">
page {
	width: 100%;
	height: 100%;
	background-color: #f2f2f2;
	position: relative;
}

.content {
	height: 100%;
	width: 100%;
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

// tab
.header {
	width: 100%;
	height: 170upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
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
	padding-top: 100upx;
	margin: 0 auto;
	justify-content: space-between;
}

.on {
	width: 80upx;
	text-align: center;
	margin-bottom: -4upx;
	color: #f66d3c;
	border-bottom: solid 4upx #f66d3c;
}

// foot
.footer {
	position: fixed;
	bottom: 0upx;
	width: 100%;
	height: 100upx;
	border-top: solid 1upx #eee;
	background-color: #fff;
	z-index: 2;
}

.footer .footer_list {
	width: 700upx;
	height: 100upx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: 0 auto;
}

.icons {
	width: 310upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.box {
	width: 80upx;
	height: 80upx;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
}

.box image {
	width: 50upx;
	height: 50upx;
}

.btn {
	height: 80upx;
	border-radius: 40upx;
	overflow: hidden;
	display: flex;
}

.joinCart,
.buy {
	height: 80upx;
	width: 290upx;
	text-align: center;
	line-height: 80upx;
	font-size: 28rpx;
}

.margin-left-sm {
	margin-left: 20rpx;
}
// 商品
.flex {
	display: flex;
	align-items: center;
}

.shop_list {
	width: 700upx;
	position: absolute;
	top: 340upx;
	left: 50%;
	margin-left: -350upx;
	height: 100%;
	// display: flex;
	// flex-wrap: wrap;
	// justify-content: center;
}

.shop_list .list_top {
	width: 700upx;
	background-color: #fff;
	border-radius: 10upx;
	margin-bottom: 25upx;
}

.shop_list .list_top image {
	width: 35upx;
	height: 35upx;
	margin: 25upx 15upx 25upx 25upx;
}

.shop_list .list_top .title {
	width: 650upx;
	display: block;
	margin: 0 auto;
	padding-top: 20upx;
}

.shop_view {
	width: 650upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 25upx;
}
.align-center {
	align-items: center;
}
.shop_view .static {
	padding: 0upx 20upx;
	background-color: #fce0c8;
	border-radius: 25upx;
	color: #f66d3c;
	margin-left: 10upx;
}

.shop_view .time text {
	display: block;
	text-align: right;
}

// 评价
.title_view {
	width: 675upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-right: 25upx;
}

.comments_details image {
	width: 80upx !important;
	height: 80upx !important;
	border-radius: 50%;
	margin: 0upx 15upx 0upx 25upx !important;
}

.details_info {
	padding-bottom: 25upx;
}

/* 底部分享 */
.uni-share {
	background: #fff;
	position: relative;
}

.goods-info {
	width: 700upx;
	display: flex;
	margin: 0 auto;
	padding: 50upx 0upx;
}

.goods-info image {
	width: 220upx;
	height: 220upx;
}

.goods-info .info {
	width: 460upx;
	margin: 0upx 0upx 0upx 25upx;
}

.goods-info .info .title {
	display: block;
	width: 460upx;
	height: 80upx;
	overflow: hidden;
	margin: 25upx 0upx;
}

.goods-info .info .spec {
	display: block;
	text-align: center;
	color: #999;
	height: 30upx;
	line-height: 30upx;
	border-radius: 15upx;
	margin: 10upx 10upx;
}

.goods-info .info .price-number {
	width: 460upx;
	display: flex;
	align-items: flex-end;
	justify-content: space-between;
}

.goods-info .info .number {
	display: flex;
	justify-content: center;
	align-items: center;
}

.input {
	width: 45upx;
	height: 45upx;
	line-height: 50upx;
	text-align: center;
	margin: 0 10upx;
	background-color: #f2f2f2;
}

input {
	margin-top: -5upx;
}

.sub,
.add {
	width: 45upx;
	height: 45upx;
	text-align: center;
	line-height: 45upx;
	background-color: #f2f2f2;
	border-radius: 5upx;
}

.cancel image {
	width: 45upx;
	height: 45upx;
	position: absolute;
	top: 15upx;
	right: 15upx;
}

.uni-share .btn {
	width: 700upx;
	margin: 0 auto;
	height: 80upx;
}

.uni-share .btn button {
	width: 750upx;
	height: 80upx;
	line-height: 80upx;
	border-radius: 0upx;
}

// time_list
.time_list {
	width: 650upx;
	height: 140upx;
	margin: 0 auto;
}

.scroll-view {
	white-space: nowrap;
	width: 100%;
}

.scroll-view-item {
	display: inline-block;
	width: 200upx;
	height: 110upx;
	border: 1upx solid #e5e5e5;
	border-radius: 30upx;
	text-align: center;
	margin-right: 25upx;
}

.scroll-view-item text {
	display: block;
	width: 200upx;
	text-align: center;
	line-height: 50upx;
}

// tab
// 行程列表
.product_trait {
	width: 650upx;
	padding: 10upx 0upx;
	margin: 0 auto;
	background-color: #f2f2f2;
	border-radius: 10upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.product_trait .trait_list text {
	display: block;
	width: 150upx;
	text-align: center;
}

.trip_list {
	width: 650upx;
	margin: 25upx auto;
}

.trip_list .list_view image {
	width: 30upx;
	height: 30upx;
	background-color: #51c77d;
	border-radius: 50%;
	padding: 5upx;
}

.trip_list .detailed {
	display: block;
	width: 560upx;
	margin-left: 75upx;
	margin-top: -15upx;
}

.list_top .product_info {
	width: 650upx;
	margin: 25upx auto;
	// display: block;
	word-wrap: break-word;
	word-break: break-all;
	overflow: hidden;
	/*这个参数根据需要来决定要不要*/
}
</style>
