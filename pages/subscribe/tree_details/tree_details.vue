<template>
	<view class="bg-brown" style="min-height: 100vh;">
		<view class="nav fixed" :class="opacityNum==1?'bg-white':''" :style="{'height':StatusAddNav+'px','padding-top':StatusAddHalfNav+'px'}">
			<view class="flex align-center text-white" v-if="opacityNum!=1">
				<text class="cuIcon-back text-xxl" @tap="navToBack" ></text>
				<text class="margin-left-sm text-lg">{{goodsInfo.storeInfo.store_name}}</text>
			</view>
		</view>
		<view class="flex flex-wrap padding-sm" :style="{'padding-top':StatusAddNav+'px'}" >
			<view class="flex flex-direction justify-between radius bg-white padding-sm" style="width: 710rpx;margin-top: 110rpx;">
				<view class="flex justify-center align-center">
					<view class="round bg-white padding-sm" style="margin-top:-110rpx">
						<image :src="goodsInfo.storeInfo.image"  class="round" style="width: 250rpx; height: 250rpx;"></image>
					</view>
				</view>
				<view class="flex align-center justify-between margin-top text-black">
					<view class="flex flex-direction align-center justify-center padding-sm">
						<text class="text-grey text-df">种植面积</text>
						<text class="text-bold text-lg margin-top-xs">{{goodsInfo.storeInfo.area}}</text>
					</view>
					<view class="flex flex-direction align-center justify-center padding-sm">
						<text class="text-grey text-df">种植费用</text>
						<text class="text-bold text-price text-xl margin-top-xs">{{goodsInfo.storeInfo.price}}</text>
					</view>
					<view class="flex flex-direction align-center justify-center padding-sm">
						<text class="text-grey text-df">所在地区</text>
						<text class="text-bold text-lg margin-top-xs">{{goodsInfo.storeInfo.open_address | subStringToCity}}</text>
					</view>
				</view>
				<view class="flex text-grey text-df margin-tb-sm ">
					<text class="text-cut-three">{{goodsInfo.storeInfo.store_info}}</text>
				</view>
				<view class="flex justify-center text-df text-grey">
					目前已经种植
				</view>
				<view class="flex justify-center align-center">
					<num-scroll :value="goodsInfo.storeInfo.ficti"></num-scroll>
					<text class="margin-left-xs text-lg">人</text>
				</view>
				<view class="flex align-center text-center justify-center bg-gradual-green round margin-bottom-xs">
					<button class="bg-gradual-green round">立即种植</button>
				</view>
				<view class="flex text-df text-grey margin-top-sm solid-top padding-top justify-center">
					您所支付的费用将提供给啄啄庄园用于打理庄园
				</view>
				<view class="flex justify-center margin-top-sm">
					<image src="../../../static/address.png" mode="widthFix" style="width: 50rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusAddNav:this.StatusAddNav,
				StatusAddHalfNav:this.StatusAddHalfNav,
				opacityNum:0,
				currentGoodsId:0,
				goodsInfo:{}
			}
		},
		
		onPageScroll(e) {
			console.log(e);
			this.opacityNum = e.scrollTop >50? 1:0;
		},
		onLoad(e) {
			this.currentGoodsId = e.id;
			this.getTreeInfo();
		},
		methods: { 
			getTreeInfo(){
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
						console.log(that.goodsInfo);
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
			navToBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped>
	
.has-backgroung-img{
	background-position: center;
	background-size: cover;
	height: 500rpx;
	width: 345rpx;
	margin-bottom:20rpx;
}
.has-backgroung-img:nth-child(odd){
	margin-right:20rpx;
}
.cu-progress {
	height: 19rpx !important;
	width: 60% !important;
}
.nav.fixed{
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0) ;
}
</style>
