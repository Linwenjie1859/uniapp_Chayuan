<template>
	<view class="flex flex-direction padding-lr-sm padding-tb-xs">

		<view class="flex flex-direction margin-tb-xs bg-white padding-sm radius">
			<view class="flex justify-center margin-bottom-sm">
				<text class="text-bold text-xl">庄园状况</text>
			</view>
			<view class="flex align-center justify-between margin-bottom-sm">
				<text>种植的茶树：</text>
				<text>0棵</text>
			</view>
			<view class="flex align-center justify-between margin-bottom-sm">
				<text>已兑换数量：</text>
				<text>0包</text>
			</view>
			<view class="flex align-center justify-between">
				<text>剩余数量：</text>
				<text>0包</text>
			</view> 
		</view>
		<view class="flex justify-between align-center margin-tb-xs bg-white padding-sm radius">
			<view class="flex flex-direction align-center" @tap="navToExchangeGoods">
				<image src="../../static/cancel.png" mode="widthFix" style="width: 150rpx;"></image>
				<text>兑换商品</text>
			</view>
			<view class="flex flex-direction align-center" @tap="navToTransplantTree">
				<image src="../../static/cancel.png" mode="widthFix" style="width: 150rpx;"></image>
				<text>移植茶树</text>
			</view>
			<view class="flex flex-direction align-center" @tap="navToManorDetails" >
				<image src="../../static/cancel.png" mode="widthFix" style="width: 150rpx;"></image>
				<text>庄园详情</text>
			</view>
			<view class="flex flex-direction align-center">
				<image src="../../static/cancel.png" mode="widthFix" style="width: 150rpx;"></image>
				<text>分享好友</text>
			</view>
		</view>
		<button type="primary" class="bg-gradual-green margin-tb-xs text-lg" style="width: 100%;" @tap="navToMoreTreeList">认购更多</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		navToMoreTreeList(){
			uni.navigateTo({
				url:'/pages/tabber/home/more_tree_list/more_tree_list'
			})
		},
		navToExchangeGoods(){
			uni.navigateTo({
				url:'/pages/subscribe/exchange_goods/exchange_goods'
			})
		},
		navToTransplantTree(){
			uni.navigateTo({
				url:'/pages/subscribe/transplant_tree/transplant_tree'
			})
		},
		navToManorDetails(){
			uni.navigateTo({
				url:'/pages/subscribe/manor_details/manor_details'
			})
		}
	}
};
</script>

<style></style>
