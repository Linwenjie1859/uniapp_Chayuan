<template>
	<view>
		<view class="flex flex-direction padding-lr-sm padding-tb-xs">
			<view class="flex flex-direction padding-sm bg-white radius">
				<view class="text-lg text-bold margin-bottom-sm has-sub-margin-xs"><text class="cuIcon-titles text-green text-xl"></text> 我的茶树</view>
				<view class="flex justify-between align-center padding-sm  light radius margin-tb-xs">
					<text>红茶可提取总数</text>
					<text>0/盒</text>
				</view>
				<view class="flex justify-between align-center padding-sm bg-grey light radius margin-tb-xs">
					<text>绿茶可提取总数</text>
					<text>0/盒</text>
				</view>
				<view class="flex justify-between align-center padding-sm  light radius margin-tb-xs">
					<text>白茶可提取总数</text>
					<text>0/盒</text>
				</view>
			</view>

			<view class="flex flex-direction padding bg-white radius margin-tb-sm">
				<view class="flex justify-between align-center margin-tb-xs solid-bottom padding-bottom-xs">
					<text class="flex-treble text-lg">优质红茶</text>
					<view class="flex flex-twice justify-end text-grey margin-right-xs align-center ">
						<text class="text-has-border-left text-lg text-bold"  @tap="addSubNum(0, -1)">-</text>
						<input type="number" class="text-lg text-has-border " v-model.number="num" disabled />
						<text class="text-has-border-right text-lg text-bold" @tap="addSubNum(0, 1)">+</text>
					</view> 
				</view>
				<view class="flex justify-between align-center margin-tb-xs solid-bottom padding-bottom-xs">
					<text class="flex-treble text-lg">优质绿茶</text>
					<view class="flex flex-twice justify-end text-grey margin-right-xs align-center ">
						<text class="text-has-border-left text-lg text-bold"  @tap="addSubNum(0, -1)">-</text>
						<input type="number" class="text-lg text-has-border " v-model.number="num" disabled />
						<text class="text-has-border-right text-lg text-bold" @tap="addSubNum(0, 1)">+</text>
					</view> 
				</view>
				<view class="flex justify-between align-center margin-tb-xs solid-bottom padding-bottom-xs">
					<text class="flex-treble text-lg">优质白茶</text>
					<view class="flex flex-twice justify-end text-grey margin-right-xs align-center ">
						<text class="text-has-border-left text-lg text-bold"  @tap="addSubNum(0, -1)">-</text>
						<input type="number" class="text-lg text-has-border " v-model.number="num" disabled />
						<text class="text-has-border-right text-lg text-bold" @tap="addSubNum(0, 1)">+</text>
					</view> 
				</view>
			</view>
			
			<view class="flex flex-direction padding-sm bg-white radius">
				<view class="text-lg text-bold has-sub-margin-xs margin-bottom-sm"><text class="cuIcon-titles text-green text-xl"></text> 费用详情</view>
				<view class="flex justify-between">
					<image src="../../../static/banner.jpg" mode="scaleToFill" class="radius margin-right-sm" style="width: 200rpx; height: 200rpx;"></image>
					<view class="flex flex-direction justify-between" style="width: 450rpx;">
						<view class="flex">
							<text class="text-bold text-lg text-cut">精品礼盒包装</text>
						</view> 
						<view class="flex">
							<text class="text-df text-cut-two margin-tb-sm">高端的包装礼盒送人送礼送好友 高端的包装礼盒送人送礼送好友 高端的包装礼盒送人送礼送好友</text>
						</view>
						<view class="flex align-center justify-between">
							<text class="text-price text-orange text-lg">5</text>
							<text class="text-grey text-sm">销量:1000</text>
						</view>
					</view>
				</view>
				<view class="flex align-center margin-top-sm">
					<text class="text-red text-sm">备注: 兑换数量满5件可享受包邮，不足则收取10元快递费</text>
				</view>
			</view>
		</view>
		<view class="cu-bar foot bg-white flex justify-end align-center padding-lr-sm">
			<view class=" bg-gradual-green padding-sm radius text-lg" >
				确定兑换
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				num:10
			}
		},
		methods: {
			//商品加减操作
			addSubNum(index,num) {
				// if (num <= 0 && this.ticketInfo[index].num <= 0) {
				// 	uni.showToast({
				// 		title: '该宝贝不能减少了哟~',
				// 		position: 'bottom',
				// 		icon: 'none'
				// 	});
				// } else {
				// 	this.ticketInfo[index].num = this.ticketInfo[index].num + num;
				// }
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
		height: 49rpx;
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
