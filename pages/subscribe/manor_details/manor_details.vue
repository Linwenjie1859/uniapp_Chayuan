<template>
	<view>
		<view class="flex flex-direction padding-lr-sm padding-tb-xs">
			<view class="flex flex-direction padding-sm bg-white radius">
				<view class="flex justify-between text-lg  has-sub-margin-xs">
					<view class="flex text-bold has-sub-margin-xs">
						<text class="cuIcon-titles text-green text-xl"></text>我的庄园
					</view>
					<view class="flex align-center text-grey" @tap="navToMoreTreeList">
						认购更多<text class="cuIcon-right"></text>
					</view>
				</view>
				<view class="flex flex-direction margin-bottom" v-for="(item,index) in 3" :key="index">
					<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="fail"
					 :autoplay="false" interval="5000" duration="500" indicator-color="#8799a3"
					 indicator-active-color="#fff">
						<swiper-item v-for="(item_img,item_index) in 5" :key="item_index">
							<view class="flex padding-sm justify-center " >
								<view class="flex flex-direction align-center text-df" > 
									<image class="radius" src="../../../static/banner.jpg" mode="scaleToFill" style="width: 670rpx; height: 375rpx;"></image>
								</view>
							</view> 
						</swiper-item>
					</swiper>
					<view class="flex align-center has-sub-margin-xs text-bold text-lg margin-top-sm">
						<text class="cuIcon-selectionfill text-green"></text>白茶树
					</view>
					<view class="flex align-center justify-between margin-bottom-sm">
						<view class="flex flex-direction align-center justify-center padding-sm">
							<text class="text-bold ">800g</text>
							<text><text class="cuIcon-rankfill text-red"></text> 茶叶产量</text>
						</view>
						<view class="flex flex-direction align-center justify-center padding-sm">
							<text class="text-bold ">32℃</text>
							<text><text class="cuIcon-evaluate_fill text-orange"></text> 土壤温度</text>
						</view>
				<!-- 		<view class="flex flex-direction align-center justify-center padding-sm">
							<text class="text-bold">800ml</text>
							<text>植物湿度</text>
						</view> -->
						<view class="flex flex-direction align-center justify-center padding-sm">
							<text class="text-bold ">优</text>
							<text><text class="cuIcon-emojifill text-green"></text> 空气质量</text>
						</view>
					</view>
					
					<view class="flex justify-between margin-tb-xs padding-bottom-xs solid-bottom">
						<text>认购棵数</text>
						<text>1/棵</text>
					</view>
					<view class="flex justify-between margin-tb-xs padding-bottom-xs solid-bottom">
						<text>已兑换数量</text>
						<text>0/盒</text>
					</view>
					<view class="flex justify-between margin-tb-xs padding-bottom-xs solid-bottom">
						<text>剩余数量</text>
						<text>1/盒</text>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 100rpx;"></view>
		<view class="cu-bar foot bg-gradual-orange text-lg flex justify-center align-center padding-lr-sm has-radius">
			前往庄园游玩
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			navToMoreTreeList(){
				uni.navigateTo({
					url:'/pages/tabber/home/more_tree_list/more_tree_list'
				})
			},
		}
	}
</script>

<style scoped>
	.has-radius{
		border-top-left-radius: 8rpx;
		border-top-right-radius: 8rpx;
	}
.has-sub-margin-xs{
		margin-left: -10rpx;
	}
</style>
