<template>
	<view style="height: 100vh;" class="bg-white">
		<view class="flex flex-direction">
			<view class="flex justify-between align-center solids-bottom" :style="{height:StatusAddNav+'px','padding-top':StatusBarHeight+'px'}" >
				<text class="cuIcon-back text-grey text-xl  margin-left-sm" @tap="back"></text>
				<view class="flex align-center text-grey padding-lr-sm round bg-gray light" style="width: 350rpx;">
					<text class="cuIcon-search margin-lr-xs"></text>
					<input class="text-sm round" type="text" v-model.trim="keyWord" placeholder="输入要查询的商品名称" />
				</view>
				<text class="text-df margin-right-sm text-black" @click="searchGoods">搜索</text>
			</view>
			<!-- 热门搜索结果 Start -->
			<view class="flex flex-direction padding-lr-sm">
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
	</view>
</template>

<script>
export default {
	data() {
		return {
			StatusBarHeight:this.StatusBarHeight,
			NavigationBar:this.NavigationBar,
			StatusAddNav:this.StatusAddNav,
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

</style>
