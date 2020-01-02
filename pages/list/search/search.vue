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
		<!-- 热门搜索结果 Start -->
		<view class="flex flex-direction padding-lr-sm" style="padding-top: 160rpx;">
			<text class="text-lg margin-tb-sm" @click="searchGoods">热门搜索</text>
			<view class="flex flex-wrap align-center margin-top-xs">
				<view class="flex padding-lr-sm margin-right round view-has-border"  @tap="toList" :data-key="item.title" v-for="(item, index) in hotSearchList" :key="index">
					<text class="text-grey">{{ item.title }}</text>
				</view>
			</view>
		</view>
		<!-- 热门搜索结果 End -->
		
		<!-- 用户历史搜索结果 Start -->
		<view class="flex flex-direction padding-lr-sm">
			<text class="text-lg margin-tb-sm">历史搜索</text>
			<view class="flex flex-wrap align-center margin-top-xs">
				<view class="flex padding-lr-sm margin-right round view-has-border"  @tap="toList" :data-key="item" v-for="(item, index) in historyList" :key="index">
					<text class="text-grey">{{ item }}</text>
				</view>
			</view>
		</view>
		<!-- 用户历史搜索结果 End -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			hotSearchList: [],
			historyList: [],
			keyWord: ''
		};
	},
	onLoad() {
		this.getHotSearchList();
		this.getHistorySearch();
	},
	methods: {
		historyClear() {
			let that = this;
			if(that.historyList.length==0){
				that.Tips({ title: "已经没有历史记录啦！"});
				return;
			}
			uni.showModal({
				title: '提示',
				content: '确定删除全部历史记录',
				success: function(res) {
					if (res.confirm) {
						that.historyList = []
						uni.clearStorage();
					} else if (res.cancel) {
						return;
					}
				}
			});
		},
		getHotSearchList() {
			var that = this;
			that.baseGet(
				that.U({ c: 'store_api', a: 'get_routine_hot_search' }),
				function(res) {
					that.hotSearchList = res.data;
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		getHistorySearch() {
			let that = this;
			uni.getStorage({
				key: 'keyWord',
				success: res => {
					that.historyList = res.data.reverse();
				}
			});
		},
		//搜索并且添加历史搜索记录
		searchGoods() {
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
			//隐藏搜索键盘
			// #ifdef APP-PLUS
				plus.key.hideSoftKeybord();
			// #endif
			uni.navigateTo({
				url: '/pages/list/search_list/search_list?keyWord=' + this.keyWord
			});
		},
		// 点击关键字跳转
		toList(e) {
			uni.navigateTo({
				url: '/pages/list/search_list/search_list?keyWord='+e.currentTarget.dataset.key
			});
		},
		//返回上一页
		back() {
			uni.navigateBack();
		}
	}
};
</script>

<style>
	.view-has-border{
		border: 2rpx solid #8799a3;
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
