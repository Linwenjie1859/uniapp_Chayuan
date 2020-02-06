<template>
	<view>
		<view class="flex flex-direction padding-lr-sm padding-tb-xs">
			<view class="flex flex-direction padding-sm bg-white radius margin-top-sm" style="min-height: 95vh;">
				<view class="text-lg text-bold margin-bottom-sm has-sub-margin-xs"><text class="cuIcon-titles text-green text-xl"></text> 我的茶叶</view>
				<view @tap="navToExchangeGoods(index)" class="flex flex-direction padding-sm  radius margin-tb-xs" v-for="(item,index) in exchangeInfo" :key="index" :class="{'bg-grey light':index%2==1}">
					<view class="flex align-center justify-between text-lg text-black">
						<text>{{item.store_name}}可提取总数</text>
						<text>{{item.exchange_num}}/盒</text>
					</view>
					<view class="flex align-center justify-between margin-top-xs  text-sm text-orange">
						<text>每盒需要{{item.exchange_rule}}片，可用茶叶有{{item.can_use_tea_num}}片</text>
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
				exchangeInfo:[],
			}
		},
		onShow() {
			this.getExchangeInfo();
		},
		methods: {
			getExchangeInfo() {
				let that = this;
				that.baseGet(
					that.U({
						c: 'store_api',
						a: 'exchange_tree_info'
					}),
					function(res) {
						console.log(res);
						that.exchangeInfo=res.data;
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
			navToExchangeGoods(index){
				uni.navigateTo({
					url:'/pages/subscribe/exchange_goods/exchange_goods?index='+index
				})
			}
		}
	}
</script>

<style>

</style>
