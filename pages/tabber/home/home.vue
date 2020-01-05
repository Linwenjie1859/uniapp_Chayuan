<template>
	<view class="content">
		<view class="header">
			<view class="input_view round" @tap="search"><text class="text-lg text-grey">搜索商品</text></view>
			<!-- 头部-滚动渐变显示 -->
			<view class="after" :style="{ opacity: afterHeaderOpacity, zIndex: afterHeaderzIndex ,height:StatusAddNav+'px'}"></view>
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
				<view class="top_view" @tap="fengyangScenery" v-for="(item, index) in allInfo.menus" :key="index">
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
		<view class="flex flex-direction padding-sm bg-white margin-top-sm">
			<view class="flex flex-direction">
				<view class="flex align-center justify-center" @tap="navToMoreTree">
					<text class="text-lg text-black margin-tb-sm">热门推荐</text>
					<text class="cuIcon-roundright margin-left-xs"> </text>
				</view>
				<text class="text-sm text-yellow margin-bottom-sm">精选线路推荐，体验厦门特色</text>
			</view>
			<view class="bg-img bg-mask has-bgimg" :style="{'background-image': 'url('+allInfo.info.otherList[3].image+')'}" :data-id="allInfo.info.otherList[0].id" @tap="navToTreeDetails">
				<view class="flex flex-direction justify-between align-center text-white margin-left-sm">
					<view class="self-start flex flex-direction align-center padding-xs  padding-lr text-black has-bg-radius">
						<text class="text-df margin-bottom-xs">鼓浪屿</text>
						<text class="text-xs">世界文化遗产</text>
					</view>
				</view>
			</view>
			<view class="flex margin-top-xs justify-between">
				<view class="flex flex-direction has-margin text-left" style="width:230rpx;" v-for="(item, index) in allInfo.info.otherList" v-if="index<3" :key="index" :data-id="item.id" @tap="navToTreeDetails">
					<image :src="item.image" mode="scaleToFill" class="img-has-radius "></image>
					<text class="text-sm text-black margin-tb-xs">{{item.store_name}}</text>
					<text class="text-grey text-cut text-xs">{{item.store_info}}</text>
				</view>
			</view>
		</view>
		<!-- 热门推荐 End-->
		
		<!-- 主题导览 Start -->
		<view class="flex flex-direction padding-sm bg-white margin-top-sm">
			<view class="flex flex-direction">
				<view class="flex align-center justify-center">
					<text class="text-lg text-black margin-tb-sm">主题导览</text>
					<text class="cuIcon-roundright margin-left-xs" @tap="idealLife"> </text>
				</view>
				<text class="text-sm text-yellow margin-bottom-sm">精选热门主题推荐，欢乐玩厦门</text>
			</view>
			<scroll-view scroll-x="true" >
				<view class="flex">
					<view class="flex flex-direction margin-right-sm align-start" style="width: 300rpx; height: 250rpx;" v-for="(item, index) in allInfo.info.otherList" :key="index">
						<image :src="item.image" mode="scaleToFill" style="width: 300rpx; height: 200rpx;"></image>
						<text class="text-sm text-black margin-tb-xs">{{item.store_name}}</text>
						<text class="text-grey text-cut text-xs" style="width: 300rpx;">{{item.store_info}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 主题导览 End -->
		
		<!-- 行程推荐 Start -->
		<view class="flex flex-direction padding-sm bg-white margin-top-sm">
			<view class="flex flex-direction">
				<view class="flex align-center justify-center">
					<text class="text-lg text-black margin-tb-sm">行程推荐</text>
				</view>
				<text class="text-sm text-yellow margin-bottom-sm">精选热门主题推荐，欢乐玩厦门</text>
			</view>
			<view class="flex flex-direction margin-tb-sm solid-bottom" v-for="(item,index) in allInfo.article_category" :key="index">
				<image :src="item.list[0].image_input[0]" mode="scaleToFill" class="trip-has-size"></image>
				
				<view class="flex align-center justify-between margin-top-sm margin-bottom-xs">
					<view class="flex align-center">
						<text class="cuIcon-titles  text-blue"></text>
						<text class="text-black text-bold text-sm ">{{item.list[0].title}}</text>
					</view>
					<view class="flex align-center text-grey text-sm">
						<text>{{item.list[0].add_time}} </text>
						<text class="cuIcon-forwardfill margin-left-xs"></text>
					</view>
				</view>
			</view>
			
		</view>
		<!-- 行程推荐 End -->
		
		
		<view class="flex flex-direction bg-white margin-top-sm padding-sm">
			<view class="flex justify-between align-center padding-tb-sm">
				<text class="text-lg">精品茶叶</text>
				<view class="flex text-grey text-df align-center" @tap="agriculturalSpecialty">
					<text>更多</text>
					<text class="cuIcon-right margin-left-xs"></text>
				</view>
			</view>
			<view class="flex text-df flex-wrap">
				<view class="flex flex-direction has-margin-right-sm margin-bottom"  style="width: 347rpx;" @tap="goodeDetails" :data-id="item.id" v-for="(item, index) in allInfo.info.bestList" :key="index">
					<image :src="item.image" mode="scaleToFill" style="width: 347rpx; height: 320rpx;"></image>
					<view class="flex text-left margin-top-sm margin-bottom-xs">
						<text class="text-df text-cut-two">{{ item.store_name }}</text>
					</view>
					<view class="flex justify-between align-center margin-top-xs">
						<text class="text-sm text-price text-orange">{{ item.price }}</text>
						<text class="text-sm text-grey">月售{{ item.sales }}件</text>
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
			beforeHeaderzIndex: 11, //层级
			afterHeaderzIndex: 10, //层级
			beforeHeaderOpacity: 1, //不透明度
			afterHeaderOpacity: 0 //不透明度
		};
	},

	onPageScroll(e) {
		//导航栏渐变
		let tmpY = 375;
		e.scrollTop = e.scrollTop > tmpY ? 375 : e.scrollTop;
		this.afterHeaderOpacity = e.scrollTop * (1 / tmpY);
		this.beforeHeaderOpacity = 1 - this.afterHeaderOpacity;
		//切换层级
		this.beforeHeaderzIndex = e.scrollTop > 0 ? 10 : 11;
		this.afterHeaderzIndex = e.scrollTop > 0 ? 11 : 10;
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

		// 凤阳风光
		fengyangScenery(e) {
			uni.navigateTo({
				url: '/pages/list/fengyang_scenery/fengyang_scenery'
			});
		},
		// 凤阳集市
		fengyangFair(e) {
			uni.navigateTo({
				url: '/pages/tabber/fengyang_fair/fengyang_fair'
			});
		},
		// 农土特产
		agriculturalSpecialty(e) {
			uni.navigateTo({
				url: '/pages/list/agricultural_specialty/agricultural_specialty'
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
		fengyang_scenery(e) {
			uni.navigateTo({
				url: '/pages/list/fengyang_scenery/fengyang_scenery'
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
		}
	
	}
};
</script>

<style>
	.has-margin-right-sm:nth-child(odd){
		margin-right: 15rpx;
	}
	.trip-has-size{
		width: 710rpx;
		height: 400rpx;
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
