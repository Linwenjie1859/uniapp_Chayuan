<template>
	<view class="content">
		<view class="header">
			<view class="input_view round" @tap="search"><text class="text-lg text-grey">搜索商品</text></view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity,height:StatusAddNav+'px'}"></view>
		</view>
		<!-- 首页头部轮播图 Start -->
		<view class="banner">
			<view class="uni-padding-wrap">
				<view class="page-section swiper">
					<view class="page-section-spacing">
						<swiper
							class="swiper"
							indicator-color="#fff"
							indicator-active-color="#51c77d"
							:indicator-dots="indicatorDots"
							:autoplay="autoplay"
							:interval="interval"
							:duration="duration"
						>
							<swiper-item v-for="(item, index) in allInfo.banner" :key="index"><image :src="item.pic" mode=""></image></swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>
		<!-- 首页头部轮播图 End -->
		
		<!-- 首页滚动消息通知 Start -->
		<view class="notice">
			<text class="cuIcon-notificationfill text-orange margin-left margin-right-xs"></text>
			<swiper class="notice_view" vertical="true" autoplay="true" circular="true" interval="3000">
				<swiper-item v-for="(item, index) in allInfo.roll" :key="index">
					<navigator :url="item.url" open-type="switchTab">
						<text class="font-28 text_limit" >{{ item.info }}</text>
					</navigator>
				</swiper-item>
			</swiper>
		</view>
		<!-- 首页滚动消息通知 End -->
		
		<!-- 首页导航栏 Start -->
		<view class="home_list">
			<view class="list_top font-28">
				<view class="top_view" @tap="navToArticleList" v-for="(item, index) in allInfo.menus" :key="index">
					<navigator :url="item.url">
						<image :src="item.pic" mode=""></image>
						<text>{{ item.name }}</text>
					</navigator>
				</view>
			</view>
			
			<image class="radius home_pic2" :src="allInfo.banner[1].pic" mode=""></image>
		</view>
		<!-- 首页导航栏 End -->
		
		<!-- 热门推荐 Start-->
<!-- 		<view class="flex flex-direction padding-sm bg-white margin-top-sm">
			<view class="flex flex-direction">
				<view class="flex align-center justify-center" @tap="navToMoreTree">
					<text class="text-xl text-black margin-tb-sm">{{allInfo.info.teaTreeTitle}}</text>
					<text class="cuIcon-roundright margin-left-xs text-xl"> </text>
				</view>
				<text class="text-df text-yellow margin-bottom-sm">精选线路推荐，体验厦门特色</text>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="flex flex-direction has-margin text-left" style="width:230rpx;" v-for="(item, index) in allInfo.info.teaTreeList"  :key="index" :data-id="item.id" @tap="navToTreeDetails">
					<image :src="item.image" mode="scaleToFill" class="img-has-radius "></image>
					<text class="text-lg text-black margin-tb-xs">{{item.store_name}}</text>
					<text class="text-grey text-cut text-df">{{item.store_info}}</text>
				</view>
			</view>
		</view> -->
		<!-- 热门推荐 End-->
		
		<!-- 主题导览 Start -->
		<view class="flex flex-direction padding-sm bg-white margin-top-sm">
			<view class="flex flex-direction">
				<view class="flex align-center justify-center"  @tap="navToMoreTree">
					<text class="text-xl text-black margin-tb-sm">{{allInfo.info.teaTreeTitle}}</text>
					<text class="cuIcon-roundright margin-left-xs text-xl" > </text>
				</view>
				<text class="text-df text-yellow margin-bottom-sm">精选热门主题推荐，欢乐玩厦门</text>
			</view>
			<scroll-view scroll-x="true" style="height: 310rpx;">
				<view class="flex">
					<view class="flex flex-direction margin-right-sm align-start" style="width: 300rpx; height: 300rpx;" v-for="(item, index) in allInfo.info.teaTreeList" :key="index" :data-id="item.id" @tap="navToTreeDetails">
						<image :src="item.image" mode="scaleToFill" style="width: 300rpx; height: 200rpx;"></image>
						<text class="text-lg text-black margin-tb-xs">{{item.store_name}}</text>
						<text class="text-grey text-cut text-df text-left" style="width: 300rpx;">{{item.store_info}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 主题导览 End -->
		
		<!-- 行程推荐 Start -->
		<view class="flex flex-direction padding-sm bg-white margin-top-sm">
			<view class="flex flex-direction">
				<view class="flex align-center justify-center">
					<text class="text-xl text-black margin-tb-sm">{{allInfo.info.articleTitle}}</text>
					<text class="cuIcon-roundright margin-left-xs text-xl" @tap="navToArticleList"> </text>
				</view>
				<text class="text-df text-yellow margin-bottom-sm">精选热门主题推荐，欢乐玩厦门</text>
			</view>
		
			<view class="flex flex-wrap" >
				<view class="flex flex-direction trip-has-margin margin-bottom-sm" style="width: 350rpx;" v-for="(item,index) in allInfo.info.articleList" :key="index">
					<view class="flex flex-direction justify-end radius trip-has-size" :style="[{'background-image':'url('+item.image_input[0]+')' }]" @tap="navToArticleDetail(item.id)">
						<view class="flex text-white">
							<text class="cuIcon-locationfill text-xs text-bold has-black-bg round trip-has-margin-padding">{{item.title}}</text>
						</view>
					</view>
					<view class="flex justify-between  align-center">
						<text class="text-xs">{{item.author}}</text>
						<view class="round bg-white" style="margin: -50rpx 20rpx 0 0; padding: 8rpx;">
							<view class="cu-avatar round avatar-has-size" @tap="edit" :style="[{'background-image':'url('+item.image_input[0]+')' }]"></view> 
						</view>
					</view>
					<view class="flex text-sm text-bold margin-bottom-xs">
						<text class="text-cut-two" @tap="navToArticleDetail(item.id)">{{item.synopsis}}</text>
					</view>
					<view class="flex align-center text-xs"> 
						<text class="radius bg-pink light margin-right-xs text-bold" style="padding: 6rpx 10rpx;">3日游</text>
						<text class="radius bg-pink light margin-right-xs text-bold" style="padding: 6rpx 10rpx;">家庭出行</text>
					</view>
				</view>
			</view> 
		</view>
		<!-- 行程推荐 End -->
		
		
		<view class="flex flex-direction bg-white margin-top-sm padding-sm">
			<view class="flex justify-between align-center padding-tb-sm">
				<text class="text-xl">{{allInfo.info.goodsTitle}}</text>
				<view class="flex text-grey text-lg align-center" @tap="navToMoreGoods">
					<text>查看更多</text>
					<text class="cuIcon-right margin-left-xs"></text>
				</view>
			</view>
			<view class="flex text-df flex-wrap">
				<view class="flex flex-direction has-margin-right-sm margin-bottom"  style="width: 337rpx;" @tap="goodeDetails" :data-id="item.id" v-for="(item, index) in allInfo.info.goodsList" :key="index">
					<image :src="item.image" mode="scaleToFill" style="width: 347rpx; height: 320rpx;"></image>
					<view class="flex text-left margin-top-sm margin-bottom-xs">
						<text class="text-df text-cut">{{ item.store_name }}</text>
					</view>
					<view class="flex justify-between align-center margin-top-xs">
						<text class="text-lg text-price text-orange">{{ item.price }}</text>
						<text class="texxt-df text-grey">月售{{ item.sales }}件</text>
					</view>
				</view>
			</view>
		</view>
		
		<!-- App下脚标 Start -->
	<!-- 	<view class="flex flex-direction align-center padding-sm">
			<view class="flex align-center justify-center margin-tb-xs" style="width: 100%;">
				<text class="padding-lr-sm">店铺信息</text>
				<text class="solid-left padding-lr-sm">安全检测</text>
				<text class="solid-left padding-lr-sm">联系我们</text>
			</view>
			<view class="flex justify-center align-center">
				<text class="text-grey text-df">App属于啄啄科技有限公司，未经许可不可抄袭。</text>
				<image src="../../../static/woodpecker.png" mode="widthFix" style="width: 80rpx;height: 92rpx;"></image>
			</view>
		</view> -->
		<!-- App下脚标 End -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			//所有参数
			StatusBarHeight:this.StatusBarHeight,
			NavigationBar:this.NavigationBar,
			StatusAddNav:this.StatusAddNav,	
			allInfo: {},
			// banner
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 1000,
			//控制渐变标题栏的参数
			afterHeaderOpacity: 0 //不透明度
		};
	},

	onPageScroll(e) {
		//导航栏渐变
		let opacity=e.scrollTop/200
		this.afterHeaderOpacity=opacity>1?1:e.scrollTop<0?0:opacity;
		
	},
	onLoad() {
		this.getHomeAllInfo();
	},
	onPullDownRefresh() {
		this.getHomeAllInfo();
	},
	methods: {
		getHomeAllInfo() {
			let that = this;
			that.baseGet(
				that.U({ c: 'public_api', a: 'index' }),
				function(res) {
					that.allInfo = res.data;
				},
				function(res) {
					console.log(res);
				},
				true
			);
			uni.stopPullDownRefresh();
		},
		search(e) {
			uni.navigateTo({
				url: '/pages/list/search/search'
			});
		},

		// 凤阳集市
		fengyangFair(e) {
			uni.navigateTo({
				url: '/pages/tabber/fengyang_fair/fengyang_fair'
			});
		},
		// 农土特产
		navToMoreGoods(e) {
			uni.navigateTo({
				url: '/pages/tabber/fengyang_fair/fengyang_fair'
			});
		},
		// 理想生活
		idealLife(e) {
			uni.navigateTo({
				url: '/pages/list/ideal_life/ideal_life'
			});
		},
		// 商品详情
		goodeDetails(e) {
			uni.navigateTo({
				url: '/pages/list/goode_details/goode_details?id=' + e.currentTarget.dataset.id
			});
		},
		flowering_seasons(e) {
			uni.navigateTo({
				url: '/pages/list/flowering_seasons/flowering_seasons'
			});
		},
		fruit_garden(e) {
			uni.navigateTo({
				url: '/pages/list/fruit_garden/fruit_garden'
			});
		},
		line_details(e) {
			uni.navigateTo({
				url: '/pages/subscribe/tree_details/tree_details'
			});
		},
		navToMoreTree(){
			uni.navigateTo({
				url:'/pages/tabber/home/more_tree_list/more_tree_list'
			})
		},
		navToTreeDetails(e){
			uni.navigateTo({
				url:'/pages/subscribe/tree_details/tree_details?id='+e.currentTarget.dataset.id
			})
		},
		navToArticleDetail(id) {
			uni.navigateTo({
				url: "/pages/list/list_detail/list_detail?id="+id,
			})
		},
		navToArticleList(){
			uni.navigateTo({
				url: '/pages/list/fengyang_scenery/fengyang_scenery'
			})
		}
	
	}
};
</script>

<style scoped>
	.trip-has-margin:nth-child(odd){
		margin-right: 10rpx;
	}
	.avatar-has-size{
		width: 82upx;
		height: 82upx;
		font-size: 1em;
	}
	.has-black-bg {
		background-color: rgba(0,0,0, 0.3);
	}
	.solid-left::after{
		border-left: 1rpx solid rgba(0, 0, 0, 0.8);
	}
	.has-margin-right-sm:nth-child(odd){
		margin-right: 25rpx;
	}
	.trip-has-margin-padding{
		margin: 8rpx 10rpx;
		padding: 5rpx 10rpx;
	}
	.trip-has-size{
		width: 350rpx;
		height: 230rpx;
		background-position: center;
		background-size: cover;
		
	}
	.img-has-radius {
		width:230rpx;
		height: 160rpx;
	
	}
	.has-margin:nth-of-type(1) image{
		border-bottom-left-radius: 8rpx;
	}
	.has-margin:nth-last-of-type(1) image{
		border-bottom-right-radius: 8rpx;
	}
	
	.has-bgimg{
		width:710rpx;
		height: 300rpx;
		border-top-right-radius: 8rpx;
		border-top-left-radius: 8rpx;
		background-position: center;
	}
	.has-bg-radius{
		background-color: rgba(243,198,68,0.9);
		border-bottom-right-radius: 8rpx;
		border-bottom-left-radius: 8rpx;
	}
	.has-margin{
		margin-right: 10rpx;
	}
	.has-margin:nth-last-of-type(1){
		margin-right: 0rpx;

	}
	
	
.content{
	text-align: center;
}



/* 头部 */
.header {
	width: 100%;
	height: 150upx;
	display: flex;
	align-items: center;
	position: fixed;
	top: 0;
	z-index: 10;
}
.input_view {
	width: 450upx;
	height: 50upx;
	background-color: rgba(255, 255, 255, 0.7);
	position: absolute;
	left: 20%;
	z-index: 1024;
	border: 1px solid rgba(135, 153, 163, 0.3);
	bottom: 39rpx;
}

.input_view text {
	display: block;
	width: 450upx;
	height: 50upx;
	line-height: 50upx;
	text-align: center;
}
.after {
	width: 100%;
	position: fixed;
	top: 0upx;
	background: #fff;
	transition: opacity 0.05s linear;
	color: #fff;
}

.after .middle {
	display: flex;
	align-items: center;
	width: 400upx;
	padding-top: 90upx;
	margin: 0 auto;
	justify-content: space-between;
}

.banner {
	/* margin-top: 170upx; */
	width: 100%;
	height: 450upx;
}

.banner .swiper {
	height: 450upx;
}

.banner image {
	width: 100%;
	height: 450upx;
}

.notice {
	width: 100%;
	height: 90upx;
	background-color: #ffffff;
	display: flex;
	align-items: center;
}

.notice image {
	width: 35upx;
	height: 35upx;
	margin: 0upx 25upx;
}

.notice_view {
	text-align: left;
	width: 650upx;
	height: 75upx;
	line-height: 75upx;
}

.home_list {
	width: 100%;
	background-color: #ffffff;
	margin-top: 25upx;
}

.home_list .list_top {
	width: 700upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.list_top .top_view image {
	width: 80upx;
	height: 80upx;
	margin: 25upx 35upx 10upx 35upx;
}

.list_top .top_view text {
	display: block;
	width: 150upx;
	text-align: center;
}

.home_pic2 {
	width: 700upx;
	height: 300upx;
	margin: 25upx auto;
}

.list_down {
	width: 700upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.list_down image {
	width: 190upx;
	height: 90upx;
	margin-bottom: 25upx;
}

.title {
	width: 700upx;
	height: 100upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.home_pic3 {
	width: 700upx;
	height: 340upx;
	margin: 0 auto;
}

.recommend {
	display: block;
	width: 700upx;
	margin: 0 auto;
	text-align: left;
}

.recommend_list {
	width: 700upx;
	margin: 25upx auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.recommend_list .list_view {
	position: relative;
	margin-bottom: 25upx;
}

.recommend_list .list_view image {
	width: 150upx;
	height: 150upx;
}

.recommend_list .list_view text {
	display: block;
	width: 150upx;
	height: 50upx;
	line-height: 50upx;
	color: #ffffff;
	background-color: rgba(255, 255, 255, 0.5);
	text-align: center;
	position: absolute;
	top: 100upx;
	left: 0upx;
}

.product_list {
	width: 700upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
}

.product_list .prod_view {
	width: 335upx;
}

.product_list .prod_view image {
	width: 335upx;
	height: 335upx;
	border-radius: 10upx;
}

.prod_view .list_info {
	width: 335upx;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 10upx;
	margin-bottom: 25upx;
}

.no_more {
	width: 700upx;
	display: block;
	margin: 60upx auto;
	text-align: center;
}
</style>
