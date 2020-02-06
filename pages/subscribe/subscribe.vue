<template>
	<view class="flex flex-direction padding-lr-sm padding-tb-xs">
		<view class="flex flex-direction margin-tb-xs bg-white padding-sm radius">
			<view class="flex justify-center margin-bottom-sm">
				<text class="text-bold text-xl">我的庄园</text>
			</view>
			<view class="flex align-center justify-between margin-bottom-sm">
				<text>种植的茶树：</text>
				<text>{{treeNumInfo.tree_num}} 棵</text>
			</view>
			<view class="flex align-center justify-between margin-bottom-sm">
				<text>已兑换数量：</text>
				<text>{{treeNumInfo.used_tea_num}} 片</text>
			</view>
			<view class="flex align-center justify-between">
				<text>剩余数量：</text>
				<text>{{treeNumInfo.can_use_tea_num}} 片</text>
			</view> 
		</view>
		<view class="flex justify-between align-center margin-tb-xs bg-white padding-sm radius">
			<view class="flex flex-direction align-center" @tap="navToExchangeList">
				<view class="cuIcon-circle text-sl cu-avatar">
					<view class="cu-tag badge bg-red">20</view>
				</view>
				<text>兑换商品</text>
			</view>
			<view class="flex flex-direction align-center" @tap="navToManorDetails" >
				<view class="cuIcon-text text-sl cu-avatar">
					<view class="cu-tag badge bg-red">99+</view>
				</view>
				<text>庄园详情</text>
			</view>
			<view class="flex flex-direction align-center" @tap="navToMap()">
				<view class="cuIcon-cardboard text-sl cu-avatar">
					<!-- <view class="cu-tag badge bg-red">2</view> -->
				</view>
				<text>前往庄园</text>
			</view>
			<view class="flex flex-direction align-center">
				<view class="cuIcon-share text-sl cu-avatar">
					<!-- <view class="cu-tag badge bg-red">2</view> -->
				</view>
				<text>分享好友</text>
			</view>
		</view>
		<button type="primary" class="bg-gradual-green margin-tb-xs text-lg" style="width: 100%;" @tap="navToMoreTreeList">认购更多</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			farmProduceList:{},
			treeNumInfo:{
				tree_num:0,
				used_tea_num:0,
				can_use_tea_num:0
			},
		};
	},
	onLoad() {
		this.farmProduceInfo();
	},
	onShow() {
		this.getTreeAllInfo();
	},
	methods: {
		getTreeAllInfo() {
			let that = this;
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'user_tree_all_info'
				}),
				function(res) {
					console.log(res);
					that.treeNumInfo=res.data;
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		navToMap() {
			let that=this;
			uni.navigateTo({
				url:"/pages/map/map?mapInfo="+JSON.stringify(that.farmProduceList.merInfo[0].list[0])
			})
		},
		farmProduceInfo() {
			let that = this;
			that.goodsList = [];
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'get_merchant_index'
				}),
				function(res) {
					that.farmProduceList = res.data;
					console.log(res);
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		navToMoreTreeList(){
			uni.navigateTo({
				url:'/pages/tabber/home/more_tree_list/more_tree_list'
			})
		},
		navToExchangeList(){
			uni.navigateTo({
				url:'/pages/subscribe/exchange_list/exchange_list'
			})
		},
		// navToTransplantTree(){
		// 	uni.navigateTo({
		// 		url:'/pages/subscribe/transplant_tree/transplant_tree'
		// 	})
		// },
		navToManorDetails(){
			uni.navigateTo({
				url:'/pages/subscribe/manor_details/manor_details'
			})
		}
	}
};
</script>

<style scoped>
	.cu-avatar{
		background-color: #FFFFFF;
		color: rgba(0,0,0,0.6);
		width: 85%;
		height: 100%;
	}
</style>
