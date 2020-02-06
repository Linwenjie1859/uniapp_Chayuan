<template>
	<view class="flex flex-direction">
		<view class="header">
			<text class="cuIcon-back cuIcon-has-absolute" @tap="navToBack" :class="[afterHeaderOpacity==1 ? 'text-black':'text-white']"></text>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex }">
				<view class="middle font-32">
					<view v-for="(anchor, index) in anchorlist" :class="[selectAnchor == index ? 'on' : '']" :key="index" @tap="toAnchor(index)">{{ anchor.name }}</view>
				</view>
			</view>
		</view>
		<!-- 商品轮播图 Start -->
		<swiper
			indicator-color="#fff"
			indicator-active-color="#51c77d"
			:indicator-dots="indicatorDots"
			:autoplay="autoplay"
			:interval="interval"
			:duration="duration"
			class="has-height-width"
		>
			<swiper-item v-for="(item, index) in goodsInfo.storeInfo.slider_image" :key="index" >
				<image :src="item" class="has-height-width"></image>
			</swiper-item>
		</swiper>
		<!-- 商品轮播图 End -->
		
		<!-- 商品名称、售价、销量 Start -->
		<view class="flex flex-direction padding-sm bg-white">
			<text class="text-bold text-cut-two text-lg">{{ goodsInfo.storeInfo.store_name }}</text>
			<view class="flex justify-between margin-top-sm">
				<text class="text-price text-orange text-xl">{{ goodsInfo.storeInfo.price}}</text>
				<text>已售：{{goodsInfo.storeInfo.ficti}}{{goodsInfo.storeInfo.unit_name}}</text>
			</view>
		</view>
		<!-- 商品名称、售价、销量 End -->
		
		<!-- 活动、发货 Start -->
		<view class="flex flex-direction margin-tb-xs padding-sm bg-white">
			<view class="flex margin-bottom-sm align-center text-df text-grey">
				<text class="margin-right">活动</text>
				<view class="flex align-center">
					<text class="cuIcon-sponsor margin-right-xs text-xl"></text>
					<text class="text-black">购买可获得 {{goodsInfo.storeInfo.give_integral}} 积分</text>
				</view>
			</view>
			<view class="flex margin-bottom-sm align-center text-df text-grey">
				<text class="margin-right">发货</text>
				<view class="flex align-center">
					<text class="cuIcon-location margin-right-xs text-xl"></text>
					<text class="text-black">福建寿宁 | 快递：{{goodsInfo.storeInfo.postage==0?'免运费':goodsInfo.storeInfo.postage}}</text>
				</view>
			</view>
		</view>
		<!-- 活动、发货 End -->
		
		
		<!-- 宝贝评价 Start -->
		<view class="flex flex-direction padding-sm bg-white" id="comments">
			<view class="flex align-center justify-between">
				<view class="flex align-center">
					<text class="cuIcon-message"></text>
					<text>宝贝评价({{ goodsInfo.reply.count_num ? goodsInfo.reply.count_num : 0}})</text>
				</view>
				<view class="flex align-center text-grey"  @tap="details">
					<text> 查看全部</text>
					<text class="cuIcon-right"></text>
				</view>
			</view>
			<view class="flex align-center margin-top-sm margin-bottom-xs" v-if="goodsInfo.reply">
				<view class="cu-avatar round lg" @tap="edit" :style="{backgroundImage:'url(' +goodsInfo.reply.avatar + ')'}">
					<view class="cu-tag badge cuIcon-crownfill bg-blue"></view>
				</view> 
				<text class="text-sm">{{goodsInfo.reply.nickname}}</text>
			</view>
			<view class="flex">
				<text class="text-cut-two">{{goodsInfo.reply.comment}}</text>
			</view>
		</view>
		<!-- 宝贝评价 End -->
		
		<!-- 店铺商家信息 Start -->
		<view class="margin-tb-xs padding bg-white">
			<view class="flex justify-between text-black text-sm align-center">
				<view class="flex-sub flex align-center">
					<image
						class="radius"
						:src="goodsInfo.merInfo.store_logo"
						mode="scaleToFill"
						style="width: 140rpx; height: 140rpx;"
						@tap="commodity"
					></image>
					<view class="flex flex-direction margin-left-sm">
						<text class="text-df text-bold">{{goodsInfo.merInfo.store_name}}</text>
						<view class="flex margin-tb-sm text-xs">
							<view class="bg-gray light round inline-block padding-lr-xs">
								<text class="text-sm">
									综合体验
									<text class="text-red cuIcon-favorfill" v-for="index in 5" :key="index"></text>
								</text>
							</view>
						</view>
						<view class="flex justify-between text-grey">
							<text>收藏{{goodsInfo.merInfo.fav_count}}</text>
							<text>销量{{goodsInfo.merInfo.sale_count}}</text>
							<text>访问量{{goodsInfo.merInfo.views}}</text>
						</view>
					</view>
				</view>
				<view class="flex align-center self-end">
					<view class="bg-orange round cu-tag line-orange"><text class="text-white text-sm" @tap="commodity">进店逛逛</text></view>
				</view>
			</view>
		</view>
		<!-- 店铺商家信息 End -->
		
		<!-- 商品详情 Start -->
		<view class="flex flex-direction bg-white">
			<view class="flex align-center detail-has-border">
				<text class="margin-tb-xs margin-left-sm text-df  text-black text-bold">商品详情</text>
			</view>
			<view style="width: 750rpx;overflow: auto;"><rich-text :nodes="goodsInfo.storeInfo.description"></rich-text></view>
		</view>
		<!-- 商品详情 End -->
	
		<!-- 底部弹窗 -->
		<uni-popup ref="share" :type="type" :custom="true" @change="change">
			<view class="uni-share">
				<view class="goods-info">
					<image :src="goodsInfo.storeInfo.slider_image[0]"></image>
					<view class="info">
						<view class="flex">
							<text class="price font-36 orange">￥{{ goodsInfo.storeInfo.price }}</text>
							<text class="spec font-24">规格：500g</text>
						</view>
						<text class="title font-28 text-cut-two">{{ goodsInfo.storeInfo.store_name }}</text>
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
				<view class="btn flex">
					<button class="font-28 bg-green white" @click="addGoodToCar">加入购物车</button>
					<button class="font-28 bg-orange white" @tap="purchase">立即购买</button>
				</view>
				<view class="clear" style="height: 50upx;"></view>
			</view>
		</uni-popup>
		<view style="padding-top: 110upx;" class="bg-white"></view>
		<!-- 底部菜单 -->
		<view class="footer">
			<view class="footer_list">
				<view class="icons font-24 gray">
					<view class="box" @tap="commodity">
						<text class="cuIcon-shop text-xxl"></text>
						<view class="text">店铺</view>
					</view>
					<view class="box" @tap="cart">
						<text class="cuIcon-cart text-xxl"></text>
						<view class="text">购物车</view>
					</view>
					<view class="box" @tap="collectGood">
						<text class="text-xxl" :class="[isKeep ? ' text-orange cuIcon-favorfill' : 'text-gray cuIcon-favor']"></text>
						<view class="text">{{ isKeep ? '已' : '' }}收藏</view>
					</view>
				</view>
				<view class="btn font-24">
					<view class="joinCart bg-green text-white" @click="togglePopup('bottom', 'share')">加入购物车</view>
					<view class="buy bg-orange text-white" @click="togglePopup('bottom', 'share')">立即购买</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// 底部弹出层
import uniPopup from '@/components/uni-popup/uni-popup.vue';

export default {
	components: {
		uniPopup
	},
	data() {
		return {
			// banner
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 1000,
			//控制渐变标题栏的参数
			beforeHeaderzIndex: 11, //层级
			afterHeaderzIndex: 10, //层级
			beforeHeaderOpacity: 1, //不透明度
			afterHeaderOpacity: 0, //不透明度

			anchorlist: [], //导航条锚点
			selectAnchor: 0, //选中锚点

			isKeep: false, //收藏

			// 底部弹出层
			show: false,
			type: '',
			list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
			content: '顶部弹 popup',
			currentGoodsId: 0,
			goodsInfo: {
				storeInfo: {
					price: 0.0
				},
				reply:{
					avatar:'/static/pic.png'
				}
			},
			//当前购物车商品数量
			currentNum: 1
		};
	},
	onLoad(e) {
		this.currentGoodsId = e.id;
		this.getGoodInfo();
	},
	onReady() {
		this.calcAnchor(); //计算锚点高度，页面数据是ajax加载时，请把此行放在数据渲染完成事件中执行以保证高度计算正确
	},
	onPageScroll(e) {
		//锚点切换
		this.selectAnchor = e.scrollTop >= this.anchorlist[2].top ? 2 : e.scrollTop >= this.anchorlist[1].top ? 1 : 0;
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
	},

	methods: {
		//添加商品到购物车中
		addGoodToCar() {
			let that = this;
			if (that.isLogin()) {
				that.basePost(
					that.U({ c: 'auth_api', a: 'set_cart' }),
					{
						productId: that.goodsInfo.storeInfo.id,
						merId: that.goodsInfo.merInfo.id,
						cartNum: that.currentNum
					},
					function(res) {
						if (res.code == 200) {
							that.Tips({ title: '添加成功,在购物车等亲' });
							that.cancel('share');
						}
					},
					function(res) {
						console.log(res);
					}
				);
			}
		},
		//加购商品数量增减
		addSubNum(num) {
			if (num < 0 && this.currentNum == 1) {
				this.Tips({ title: '亲，已经不能再减了' });
				return;
			}
			this.currentNum += num;
		},
		//收藏和取消收藏
		collectGood() {
			let that = this;
			//收藏商品之前判断用户是否已经登录
			if (this.isLogin()) {
				console.log(this.isKeep);
				if (this.isKeep) {
					//收藏的情况下，进行取消收藏操作
					that.basePost(
						that.U({ c: 'store_api', a: 'uncollect_product' }),
						{
							productId: that.currentGoodsId
						},
						function(res) {
							if (res.code == 200) {
								that.isKeep = false;
							}
						},
						function(res) {
							console.log(res);
						}
					);
				} else {
					//还没有收藏的情况下，进行收藏操作
					that.basePost(
						that.U({ c: 'store_api', a: 'collect_product' }),
						{
							productId: that.currentGoodsId
						},
						function(res) {
							if (res.code == 200) {
								that.isKeep = true;
							}
						},
						function(res) {
							console.log(res);
						}
					);
				}
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
					
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		//返回上一页
		navToBack() {
			uni.navigateBack();
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
						merId: that.goodsInfo.merInfo.id,
						cartNum: that.currentNum
					}
				}),
				function(res) {
					uni.navigateTo({
						url: '/pages/user/confirm_order/confirm_order?listId=' + res.data.cartId
					});
				},
				function(res) {
					if(res.msg.indexOf("该产品库存不足")!=-1){
						that.Tips({title:res.msg});
					}
				},
				true
			);
		},
		commodity() {
			uni.navigateTo({
				url: '/pages/shop/shop_commodity/shop_commodity?storeId=' + this.goodsInfo.merInfo.id
			});
		},
		cart() {
			uni.switchTab({
				url: '/pages/tabber/shopping_cart/shopping_cart'
			});
		},
		details(e) {
			uni.navigateTo({
				url: '/pages/shop/comments_details/comments_details?id='+this.goodsInfo.storeInfo.id
			});
		},

		//跳转锚点
		toAnchor(index) {
			this.selectAnchor = index;
			uni.pageScrollTo({
				scrollTop: this.anchorlist[index].top,
				duration: 200
			});
		},
		//计算锚点高度
		calcAnchor() {
			this.anchorlist = [
				{
					name: '商品',
					top: 0
				},
				{
					name: '评价',
					top: 0
				},
				{
					name: '详情',
					top: 0
				}
			];
			let commentsView = uni.createSelectorQuery().select('#comments');
			commentsView
				.boundingClientRect(data => {
					let statusbarHeight = 0;
					//APP内还要计算状态栏高度
					// #ifdef APP-PLUS
					statusbarHeight = plus.navigator.getStatusbarHeight();
					// #endif
					let headerHeight = uni.upx2px(100);
					this.anchorlist[1].top = data.top - headerHeight - statusbarHeight;
					this.anchorlist[2].top = data.bottom - headerHeight - statusbarHeight;
				})
				.exec();
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
		}
	}
};
</script>

<style scoped>
	.detail-has-border{
		border-left: 8rpx solid #f37b1d;
	}
.has-height-width{
	height: 850rpx;
	width: 750rpx;
}

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
	width: 180upx;
	text-align: center;
	line-height: 80upx;
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
	width: 350upx;
	height: 80upx;
	line-height: 80upx;
	border-radius: 0upx;
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
.cuIcon-has-absolute{
	font-size: 46rpx !important;
	position: absolute;
	left: 25upx;
	z-index: 100000;
}

.after {
	width: 100%;
	height: 64px;
	position: fixed;
	top: 0upx;
	transition: opacity 0.05s linear;
	background-color: #fff;
	color: #000;
}

.after .middle {
	display: flex;
	align-items: center;
	width: 400upx;
	padding-top: 60upx;
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
</style>
