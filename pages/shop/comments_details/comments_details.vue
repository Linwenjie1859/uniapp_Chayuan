<template>
	<view class="content">
		<view class="comments_info">
			<view class="has-flex">
				<text @tap="radioChangeType(index+1)" :class="[(index+1==currentIndex)?'bg-orange':'bg-gray']" class="has-bg" v-for="(item , index) in sartTime" :key="index">
					{{item.name}}
				</text>
			</view>
			<view class="loading-more"><uni-load-more status="loading" v-if="startLoadingFlag" /></view>
			<view class="info_list margin-top-sm" v-for="(item,index) in list" :key="index">
				<view class="list_top">
					<image :src="item.avatar?item.avatar:'/static/pic.png'" mode=""></image>
					<text class="font-28">{{item.nickname}}</text>
					<text class="font-24 text_right">{{item.add_time}}</text>
				</view>
				<text class="comments_cont font-28">{{item.comment}}</text>
				<view class="pic_list">
					<image :src="ite" mode="" v-for="(ite,inde) in item.pics.pics" :key="inde"></image>
				</view>
			</view>
			
		</view>
		<view class="loading-more"><uni-load-more :status="loadingMore" v-if="loadingMoreFlag" /></view>
	</view>
</template>

<script>
// 售后原因
import axbCheckBox from '@/components/axb-checkbox/axb-checkbox.vue';
export default {
	components: {
		axbCheckBox
	},
	data() {
		return {
			startLoadingFlag: true, //一开始进入的加载开关
			loadingMore: '', //上滑加载更多的状态
			loadingMoreFlag: false, //上滑加载开关
			currentIndex:1,
			pageSize: 6,
			currentPage: 1,
			list: [],
			id: 0,
			sartTime: [
				{
					name:'全部',
					value: '1',
					checked: 1
				},
				{	name:'好评',
					value: '2',
					checked: 0
				},
				{	name:'中评',
					value: '3',
					checked: 0
				},
				{	name:'差评',
					value: '4',
					checked: 0
				}
			]
		};
	},
	onReachBottom() {
		this.loadingMore = 'loading'; //每次上滑都要从新设置status
		this.loadingMoreFlag = true; //当上滑时开启加载
		setTimeout(() => {
			this.getUserReply(this.articleId); //让加载图标旋转0.8s后才请求
		}, 800);
	},
	onPullDownRefresh() {
		//下拉刷新页面将之前的数据初始化
		this.list = [];
		this.currentPage = 1;
		this.getUserReply(this.articleId);
	},
	onLoad(e) {
		//当页面加载的时候调用接口获取内容
		this.id = e.id;
		this.getReplyNum();
		setTimeout(() => {
			this.getUserReply(); //假设网络延迟后出现加载图标
		}, 800);
	},
	methods: {
		radioChangeType(e){
			this.currentIndex=e;
			this.list = [];
			this.startLoadingFlag=true;
			this.currentPage = 1;
			this.getUserReply(e)
		},
		//0.8s后隐藏加载提示的信息
		closeLoadingMoreFlag() {
			setTimeout(() => {
				this.loadingMoreFlag = false;
			}, 800);
		},
		getUserReply(type) {
			let that = this;
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'product_reply_list',
					q: {
						productId: that.id,
						page: that.currentPage,
						limit: that.pageSize,
						type: type?type-1:0
					}
				}),
				function(res) {
					//请求成功后的操作
					that.startLoadingFlag = false; //当请求成功之后将startLoadingFlag关闭
					uni.stopPullDownRefresh(); //当请求成功之后将下拉刷新关闭
					if (res.data.length == 0) {
						that.loadingMore = 'noMore';
						that.closeLoadingMoreFlag(); //0.8后将状态隐藏
						return;
					}
					that.currentPage++;
					that.list = [...that.list, ...res.data];
					console.log(that.list);
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		getReplyNum() {
			let that = this;
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'product_reply_count',
					q: {
						productId: that.id,
					}
				}),
				function(res) {
					console.log(res);
					let data=res.data;
					that.sartTime[0].name=`全部(${data.sum_count})`;
					that.sartTime[1].name=`好评(${data.good_count})`;
					that.sartTime[2].name=`中评(${data.in_count})`;
					that.sartTime[3].name=`差评(${data.poor_count})`;
					that.$forceUpdate();
				},
				function(res) {
					console.log(res);
				},
				true
			);
		}
	}
};
</script>

<style scoped>
	.bg-gray{
	background-color: #f0f0f0;
	color: #333333;
	}
	.bg-orange{
		background-color: #f37b1d;
		color: #ffffff;
	}
	.has-bg{
		padding: 10rpx 30rpx;
		border-radius: 500rpx;
		font-size: 29rpx;
	}
	.has-flex{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
page {
	background-color: #f2f2f2;
}
.comments_info {
	width: 750upx;
	background-color: #ffffff;
	border-radius: 10upx;
	padding: 25rpx;
	padding-bottom: 25upx;
	height: 100vh;
}
.title {
	height: 100upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin: 0 auto;
}
.info_list {
	width: 650upx;
	margin: 0 auto;
	border-bottom: 1upx solid #e5e5e5;
	margin-top: 10upx;
}
.list_top {
	width: 650upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
}
.list_top image {
	width: 80upx;
	height: 80upx;
	border-radius: 50%;
	margin-right: 20upx;
}
.list_top text {
	width: 270upx;
}
.comments_cont {
	display: block;
	width: 650upx;
	margin: 5upx auto;
	margin-bottom: 20upx;
}
.pic_list {
	width: 700upx;
	display: flex;
	align-items: center;
}
.pic_list image {
	width: 140upx;
	height: 140upx;
	margin: 0upx 25upx 25upx 4upx;
}
</style>
