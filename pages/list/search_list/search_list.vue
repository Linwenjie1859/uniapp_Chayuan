<template>
	<view style="height: 100vh;" class="bg-white">
		<view class="header">
			<view class="view-is-absolute flex justify-between align-center">
				<text class="cuIcon-back text-white text-xxl margin-top-sm margin-left" @tap="back"></text>
				<view class="input_view round padding-lr-sm padding-tb-xs">
					<input class="text-df round text-center" type="text" v-model.trim="keyWord" placeholder="搜索商品" />
				</view>
				<text class="cuIcon-search text-white text-xxl margin-top-sm margin-right" @click="searchGoods"></text>
			</view>
		</view>
		<view style="padding-top: 170rpx;" class="padding-lr-sm">
			<view class="flex text-df flex-wrap">
				<view class="flex flex-direction has-margin-right-sm margin-bottom-sm"  style="width: 347rpx;" @tap="detail(item.id)" v-for="(item, index) in goodsList" :key="index">
					<image :src="item.image" mode="scaleToFill" style="width: 347rpx; height: 320rpx;"></image>
					<view class="flex text-left">
						<text class="text-df text-cut-two">{{ item.store_name }}</text>
					</view>
					<view class="flex justify-between align-center margin-top-xs">
						<text class="text-sm text-price text-orange">{{ item.price }}</text>
						<text class="text-sm text-grey">月售{{ item.sales }}件</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex flex-direction align-center" v-if="noData">
			<image src="/static/no_data.png" mode="scaleToFill" style="height: 240rpx; width: 280rpx;"></image>
			<text class="text-df text-grey">没有找到相关商品~</text>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			showBack: true,
			keyWord: '',
			storeId:"",
			goodsList: [],
			historyList: [],
			noData: false,
			// 上拉加载参数
			pageSize: 6,
			currentPage: 1,
			// 上拉加载参数
			loadMoreText: '加载更多...',
			loadMoreFlag:false,
			
		};
	},
	onReachBottom() {
		this.loadMoreFlag=true;
		setTimeout(() => {
			this.getSearchGoods();
		}, 500);
	},
	onLoad(e) {
		console.log(e);
		this.keyWord = e.keyWord;
		this.storeId=e.storeId;
		this.getSearchGoods();
		this.getHistorySearch();
	},
	methods: {
		//获取历史搜索记录
		getHistorySearch() {
			let that = this;
			uni.getStorage({
				key: 'keyWord',
				success: res => {
					that.historyList = res.data.reverse();
				}
			});
		},
		//添加历史搜索记录
		setSearchHistory() {
			let that = this;
			if (that.keyWord == '') {
				that.Tips({ title: '请输入关键字' });
				return;
			}
			//判断关键字是否存在历史记录之中
			if (that.historyList.indexOf(that.keyWord) == -1) {
				that.historyList.reverse();
				that.historyList.push(that.keyWord);
				uni.setStorage({
					key: 'keyWord',
					data: that.historyList
				});
				that.historyList.reverse();
			}
			that.goodsList = [];
			that.currentPage=1;
			console.log(that.keyWord);
			that.getSearchGoods();
		},
		//获取搜索的商品
		getSearchGoods() {
			let that = this;
			console.log("搜索");
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'get_product_list',
					q: {
						cid: '',
						mid:that.storeId,
						keyword: that.keyWord,
						priceOrder: '',
						salesOrder: '',
						news: '',
						page: that.currentPage,
						limit: that.pageSize
					}
				}),
				function(res) {
					that.goodsList = that.goodsList.concat(res.data);
					console.log(that.goodsList);
					that.currentPage++;
					if(res.data.length==0){
						that.loadMoreText="没有更多数据了！"
					}
					if (that.goodsList.length == 0) {
						that.noData = true;
					} else {
						that.noData = false;
					}
					setTimeout(()=>{
						that.loadMoreFlag=false;
					},1000);
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		//返回上一页
		back() {
			uni.navigateBack();
		},
		detail(id) {
			uni.navigateTo({
				url: '/pages/list/goode_details/goode_details?id='+id
			});
		}
	}
};
</script>

<style scoped>
	.has-margin-right-sm:nth-child(odd){
		margin-right: 15rpx;
	}
	/* 头部 */
	.header {
		background-color: #39b54a;
		width: 100%;
		height: 160upx;
		position: fixed;
		z-index: 10000;
	}
	.view-is-absolute{
		position: absolute;
		top:0;
		width: 100%;
		height: 100%;
		
	}
	.input_view {
		width: 450upx;
		height: 60upx;
		background-color: rgba(255, 255, 255, 0.7);
		position: absolute;
		left: 20%;
		z-index: 1024;
		border: 1px solid rgba(135, 153, 163, 0.3);
		bottom: 39rpx;
	}

</style>
