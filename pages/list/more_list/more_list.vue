<template>

	<view class="bg-white padding-sm">
		<!-- 大致文章显示 Start -->
		<view class="flex flex-direction">
			<view class="flex justify-between margin-bottom-sm solid-bottom" @tap="detail" :data-id="article.id" v-for="(article, index) in list" :key="index">
				<image class="img-has-small-size radius margin-bottom-xs" :src="article.image_input[0]" ></image>
				<view class="flex flex-direction justify-around" style="width: 450rpx;">
					<text class="text-df text-black text-cut">{{article.title}}</text>
					<text class="text-df text-cut-two text-gray">{{article.synopsis}}</text>
					<view class="flex justify-between">
						<text class="text-sm text-grey">{{article.add_time}}</text>
						<view class="flex text-grey">
							<text class="cuIcon-attention margin-right-xs"></text>
							<text class="text-sm">{{article.visit}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 大致文章显示 End -->
		<uni-load-more :status="loadingMore" v-if="loadingMoreFlag"/>
	</view>

</template>

<script>
export default {
	data() {
		return {
			loadingMoreFlag: true, //上滑加载开关
			loadingMore:'loading',	//上滑加载更多的状态
			/********/
			articleId:'',
			pageSize: 6,
			currentPage: 1,
			list: [],
		};
	},
	onReachBottom() {
		if(this.loadingMore === 'loading'){	//防止重复加载
			return ;
		}
		this.loadingMoreFlag = true;
		this.loadingMore='loading';	//每次上滑都要从新设置status
		setTimeout(()=>{
			this.getArticleList(this.articleId);	//让加载图标旋转0.8s后才请求
		},600) 
	},
	onPullDownRefresh() {
		//下拉刷新页面将之前的数据初始化
		this.list = [];
		this.currentPage = 1;
		this.getArticleList(this.articleId);
	},
	onLoad(e) {
		//当页面加载的时候调用接口获取内容
		this.articleId=e.id;
		setTimeout(()=>{
			this.getArticleList(this.articleId);	
		},600);
	},
	methods: {
		//查看文章的详情
		detail(e) {
			var id = e.currentTarget.dataset.id;
			uni.navigateTo({
				url: '/pages/list/list_detail/list_detail?id=' + id
			});
		},
		//0.8s后隐藏加载提示的信息
		closeLoadingMoreFlag() {
			setTimeout(()=> {
				this.loadingMoreFlag = false;
			}, 800);
		},
		//初始化数据
		getArticleList(cid) {
			var that = this;
			that.baseGet(
				that.U({
					c: 'article_api',
					a: `get_cid_article`,
					q: {
						cid: cid,
						first: that.currentPage,
						limit: that.pageSize
					}
				}),
				function(res) {
					uni.stopPullDownRefresh();		//当请求成功之后将下拉刷新关闭
					if (res.data.length == 0) {
						that.loadingMore="noMore";
						that.closeLoadingMoreFlag();	//0.8后将状态隐藏
						return ;
					}
					
					that.currentPage++;
					that.list=[...that.list,...res.data];
					that.loadingMore="more";
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

<style scopeds>
	.img-has-small-size{
		width: 240rpx;
		height: 180rpx;
	}
	.img-has-size{
		width: 750rpx;
		height: 300rpx;
	}

</style>
