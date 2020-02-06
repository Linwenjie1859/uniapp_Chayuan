<template>
	<view class="bg-brown" style="min-height: 100vh;">
		<view class="nav fixed" :class="opacityNum==1?'bg-white':''" :style="{'height':StatusAddNav+'px','padding-top':StatusAddHalfNav+'px'}">
			<view class="flex align-center text-white" v-if="opacityNum!=1">
				<text class="cuIcon-back text-xxl" @tap="navToBack" ></text>
				<text class="margin-left-sm text-lg">热门茶树</text>
			</view>
			<view class="flex align-center" v-else>
				<text class="cuIcon-back text-blue text-xxl" @tap="navToBack"></text>
				<text class="margin-left-sm text-black text-lg">热门茶树</text>
			</view>
		</view>
		<view class="flex flex-wrap padding-sm" :style="{'padding-top':StatusAddNav+'px'}">
			<view @tap="navToTreeDetails(item.id)" class="flex flex-direction justify-between radius has-backgroung-img padding-sm" v-for="(item,index) in list" :key="index" :style="[{'background-image':'url('+item.image+')' }]">
				<view class="flex flex-direction">
					<text class="text-bold text-lg text-black">{{item.store_name}}</text>
					<view class="flex align-center margin-tb-xs">
						<view class="cu-progress round sm ">
							<view class="bg-green radius" :style="[{ width:'60%'}]"></view>
						</view>
						<text class="text-df margin-left-xs text-black">2700分</text>
					</view>
					<text class="text-sm text-black">赶紧认领回家啦~</text>
				</view>
				<view class="flex flex-direction">
					<view class="flex justify-end align-center">
						<view class="flex flex-direction">
							<text class="text-price text-xl">{{item.price}}</text>
						</view>
					</view>
					<view class="flex justify-end align-center">
						<view class="flex align-center text-brown">
							<text class="cuIcon-locationfill "></text> 
							<text class="text-sm text-bold">{{item.open_address}}</text>
						</view>
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
				StatusAddNav:this.StatusAddNav,
				StatusAddHalfNav:this.StatusAddHalfNav,
				opacityNum:0,
				
				loadingMoreFlag: true, //上滑加载开关
				loadingMore: 'loading', //上滑加载更多的状态
				hidden: true,
				
				pageSize: 6,
				currentPage: 1,
				list: [], //所有数据
			}
		},
		onPageScroll(e) {
			this.opacityNum = e.scrollTop >50? 1:0;
		},
		onReachBottom() {
			if (this.loadingMore === 'loading') {
				//防止重复加载
				return;
			}
			this.loadingMoreFlag = true;
			this.loadingMore = 'loading'; //每次上滑都要从新设置status
			setTimeout(() => {
				this.getBestProduct(); //让加载图标旋转0.8s后才请求
			}, 600);
		},
		onLoad() {
			this.getBestProduct();
		},
		methods: { 
			//0.8s后隐藏加载提示的信息
			closeLoadingMoreFlag() {
				setTimeout(() => {
					this.loadingMoreFlag = false;
				}, 800);
			},
			getBestProduct() {
				var that = this;
				that.baseGet(
					that.U({
						c: 'store_api',
						a: `get_other_product`,
						q: {
							first: that.currentPage,
							limit: that.pageSize
						}
					}),
					function(res) {
						if (res.data.length == 0) {
							that.loadingMore = 'noMore';
							that.closeLoadingMoreFlag(); //0.8后将状态隐藏
							return;
						}
						that.currentPage++;
						that.list = [...that.list, ...res.data];
						that.loadingMore = 'more';
						that.hidden = false;
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
			navToTreeDetails(id){
				uni.navigateTo({
					url:'/pages/subscribe/tree_details/tree_details?id='+id
				})
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
