<template>
	<view>
		<view class="flex flex-direction padding-lr-sm padding-tb-xs">
			<view class="flex flex-direction padding-sm bg-white radius margin-top-sm">
				<view class="text-lg text-bold margin-bottom-sm has-sub-margin-xs"><text class="cuIcon-titles text-green text-xl"></text> 可兑换数</view>
				<view class="flex justify-center">
					<image :src="exchangeInfo.exchange_image" class="radius" style="height: 400rpx;"></image>
				</view>
				<view class="flex justify-between align-center padding-sm  light radius margin-tb-xs">
					<text>{{exchangeInfo.store_name}}可提取总数</text>
					<text>{{exchangeInfo.exchange_num}}/盒</text>
				</view>
				<view class="flex justify-between align-center solid-bottom padding-sm padding-bottom-xs">
					<text class="flex-treble text-lg">{{exchangeInfo.store_name}}</text>
					<view class="flex flex-twice justify-end text-grey align-center ">
						<text class="text-has-border-left text-lg text-bold"  @tap="addSubNum(0, -1)">-</text>
						<input type="number" class="text-lg text-has-border " v-model.number="num" disabled />
						<text class="text-has-border-right text-lg text-bold" @tap="addSubNum(0, 1)">+</text>
					</view> 
				</view>
			</view>
			
			<view class="flex flex-direction padding-sm bg-white radius margin-top-sm" v-if="goodsInfo.storePack">
				<view class="text-lg text-bold has-sub-margin-xs margin-bottom-sm"><text class="cuIcon-titles text-green text-xl"></text> 费用详情</view>
				<view class="flex justify-between">
					<image :src="goodsInfo.storePack.pack_image" mode="scaleToFill" class="radius margin-right-sm" style="width: 200rpx; height: 200rpx;"></image>
					<view class="flex flex-direction justify-between" style="width: 450rpx;">
						<view class="flex">
							<text class="text-bold text-lg text-cut">{{goodsInfo.storePack.name}}</text>
						</view> 
						<view class="flex">
							<text class="text-df text-cut-two margin-tb-sm">{{goodsInfo.storePack.describe}}</text>
						</view>
						<view class="flex align-center justify-between">
							<text class="text-price text-orange text-lg">{{goodsInfo.storePack.pack_cost}}</text>
							<text class="text-grey text-sm">销量:1000</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="cu-bar foot bg-white flex justify-end align-center padding-lr-sm">
			<view class=" bg-gradual-green padding-sm radius text-lg"  @tap="confirmExchange()">
				确定兑换
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:1,
				exchangeInfo:{},
				currentIndex:0,
				goodsInfo:{}
			}
		},
		onLoad(e) {
			this.currentIndex=e.index;
			this.getBeforePageInfo();
			this.getGoodInfo();
		},
		methods: {
			//获取商品的信息
			getGoodInfo() {
				let that = this;
				that.baseGet(
					that.U({
						c: 'store_api',
						a: 'details',
						q: {
							id: that.exchangeInfo.product_id
						}
					}),
					function(res) {
						that.goodsInfo = res.data;
						console.log(that.goodsInfo);
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
			//确认兑换商品
			confirmExchange(){
				let that = this;
				if(that.num>that.exchangeInfo.exchange_num){
					uni.showToast({
						title: '兑换的数量超出~',
						position: 'bottom',
						icon: 'none'
					});
					return ;
				}
				
				if(!that.goodsInfo.storePack){
					uni.showToast({
						title: '兑换商品异常~',
						position: 'bottom',
						icon: 'none'
					});
					return ;
				}
	
				that.baseGet(
					that.U({
						c: 'auth_api',
						a: 'now_buy',
						q: {
							productId: that.goodsInfo.storeInfo.id,
							merId: that.goodsInfo.merInfo.id,
							cartNum: that.num
						}
					}),
					function(res) {
						uni.navigateTo({
							url: '/pages/subscribe/exchange_confirm/exchange_confirm?listId=' + res.data.cartId
						});
					},
					function(res) {
					},
					true
				);
			},
			//获取上个页面显示的单条数据
			getBeforePageInfo(){
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				this.exchangeInfo=prevPage.$vm.exchangeInfo[this.currentIndex];
			},
			//商品加减操作
			addSubNum(index,number) {
				if (number == 0 && this.num <= 0) {
					uni.showToast({
						title: '兑换数不能减少了哟~',
						position: 'bottom',
						icon: 'none'
					});
				} else {
					this.num = this.num + number;
				}
			},
		}
	}
</script>

<style scoped>
	.has-sub-margin-xs{
		margin-left: -10rpx;
	}
.text-has-border {
		max-width: 80rpx;
		height: 51rpx;
		text-align: center;
		border-top: 1px solid #e0e0e0;
		border-bottom: 1px solid #e0e0e0;
		padding: 5upx 10upx;
	}
	
	.text-has-border-right {
		border: 1px solid #e0e0e0;
		border-top-right-radius: 8upx;
		border-bottom-right-radius: 8upx;
		padding: 5upx 20upx;
	}
	
	.text-has-border-left {
		border: 1px solid #e0e0e0;
		border-top-left-radius: 8upx;
		border-bottom-left-radius: 8upx;
		padding: 5upx 20upx;
	}
</style>
