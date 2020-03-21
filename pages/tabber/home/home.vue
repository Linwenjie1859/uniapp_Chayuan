<template>
	<view>
		<view class="fixed" style="z-index: 2048;width: 100%;">
		 	<view class="absolute" style="width: 100%;" :style="{'padding-top':StatusBarHeight+'px','background-color':'rgba(255,255,255,'+headerOpacity+')'}">
		 		<view class="flex align-center justify-between margin-lr-sm padding-tb-xs" >
		 			<view class="flex align-center" :class="{'text-grey':headerOpacity==1,'text-white':headerOpacity!=1}"> 
						福州 <text class="cuIcon-unfold margin-left-xs self-center"></text>
		 			</view>
					<view class="flex align-center text-grey padding-lr-sm padding-tb-xs justify-between round" :class="{'bg-gray light':headerOpacity==1,'bg-white':headerOpacity!=1}" >
						<text class="cuIcon-search"></text> 
						<swiper @tap="navToSearch" vertical="true" autoplay="true" circular="true" interval="3000" class="text-sm margin-lr-xs" style="width: 350rpx;height: 32rpx;overflow: hidden; line-height: 40rpx; ">
							<swiper-item v-for="(item, index) in allInfo.roll" :key="index" >
								<text>{{ item.info }}</text>
							</swiper-item>
						</swiper>
						<text class="cuIcon-scan" @tap="scanCode()"></text>
					</view>
					<view class="flex align-center" :class="{'text-grey':headerOpacity==1,'text-white':headerOpacity!=1}">
						<text class="cuIcon-dianhua margin-right-xs text-xl" @tap="phoneCall()"></text>
						<text class="cuIcon-mark text-xl" @tap="functionDome()"></text>
					</view>
					
		 		</view>
		 	</view>
		 </view>
		
		<!-- 首页头部轮播图 Start -->
		<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item, index) in allInfo.banner" :key="index" class="has-bottom-lr-radius">
				<image :src="item.pic" mode="aspectFill" ></image>
			</swiper-item>
		</swiper>
		<!-- 首页头部轮播图 End -->
		
		<!-- 首页导航栏 Start -->
		<view style="position: relative;min-height: 160rpx;" :style="{height:absoluteHeight+'px'}">
			<view style="position: absolute; top: -60rpx;" id="is-absolute-nav">  
				<view class="flex flex-direction radius-sm bg-white margin-lr-sm text-sm shadow" >
					<view class="flex align-center flex-wrap margin-tb-sm ">
						<view class="flex flex-direction justify-center margin-lr-sm margin-tb-xs align-center" style="width: 102rpx;" @tap="navToArticleList" v-for="(item, index) in allInfo.menus" :key="index">
							<navigator :url="item.url">
								<image :src="item.pic" mode="widthFix" style="width: 82rpx;"></image>
							</navigator> 
							<text>{{ item.name }}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 首页导航栏 End -->
		
		<!-- 首页活动 Start -->
		<view class="flex margin-tb-sm padding-lr-sm ">
			<view class="bg-center round shadow-warp" :style="[{'background-image':'url('+allInfo.activity[0].image+')' }]" style="width: 710rpx;height: 150rpx;">
				
			</view>
		</view>
		<!-- 首页活动 End -->
		
		<!-- 热门推荐 Start -->
		<view class="flex flex-direction padding-sm bg-white margin-top-sm radius-sm" :style="{display: (allInfo.info.teaTreeList || allInfo.info.seckillList)?'block':'none'}">
			<view class="flex flex-direction align-center">
				<view class="flex align-center justify-center" @tap="navToMoreTree">
					<text class="text-xl text-black margin-tb-sm">{{allInfo.info.teaTreeTitle}}</text>
					<text class="cuIcon-roundright margin-left-xs text-xl" > </text>
				</view>
				<text class="text-df text-yellow margin-bottom-sm">精选热门主题推荐，欢乐玩厦门</text>
			</view>
			
			<view class="flex">
				<view class="flex flex-direction radius-sm shadow-warp bg-white margin-right-sm">
					<swiper class="square-dot" :indicator-dots="true" :circular="true"
					 :autoplay="true" interval="5000" duration="500" style="height: 340rpx;width: 345rpx;">
						<swiper-item v-for="(item, index) in allInfo.info.seckillList" :key="index" @tap="navToSeckill">
							<view class="radius-top-sm bg-center" :style="[{'background-image':'url('+item.image+')' }]"  style="width: 345rpx;height: 230rpx;">
								<view class="bg-gradual-orange text-xs has-radius padding-xs" style="max-width: 200rpx;">
									距结束 {{seckillTimeString[index]}}
								</view>
							</view>
							<view class="flex flex-direction margin-top-sm padding-lr-xs" style="width: 345rpx;">
								<text class="margin-bottom-xs text-cut-two">{{item.title}}</text>
								<text class="text-price text-red">{{item.price}}</text>
							</view>
						</swiper-item>
					</swiper>
				</view>
				
				<view class="flex flex-direction radius-sm shadow-warp bg-white" style="width: 345rpx;">
					<view class="flex bg-gray light radius-top-sm padding-xs">
						<text class="text-df">茶树热榜</text>
						<text class="cuIcon-roundrightfill margin-left-xs text-lg text-gray" @tap="navToMoreTree"> </text>
					</view>
					<view class="flex flex-direction margin-top-sm padding-lr-xs" style="width: 345rpx;">
						<view class="flex margin-bottom-xs" v-for="(item, index) in allInfo.info.teaTreeList" :key="index" :data-id="item.id" @tap="navToTreeDetails">
							<image :src="item.image" mode="widthFix" style="width: 200rpx;" class="radius"></image>
							<view class="flex flex-direction  margin-left-xs justify-between padding-tb-xs" style="width:145rpx;">
								<text class="text-cut text-df">{{item.store_name}}</text>
								<text class="text-price text-red text-sm">{{item.price}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 热门推荐 End -->
		

		<!-- 目的地推荐 Start-->
		<view class="flex flex-direction padding-sm bg-white margin-top-sm radius-sm" :style="{display: allInfo.info.viewList?'block':'none'}">
			<view class="flex flex-direction align-center">
				<view class="flex align-center justify-center">
					<text class="text-xl text-black margin-tb-sm">{{allInfo.info.viewTitle}}</text>
					<text class="cuIcon-roundright margin-left-xs text-xl" @tap="navToArticleList"> </text>
				</view>
				<text class="text-df text-yellow margin-bottom-sm">精选热门主题推荐，欢乐玩厦门</text>
			</view>
			<scroll-view scroll-x="true" style="height: 350rpx;">
				<view class="flex">
					<view class="flex flex-direction margin-right-sm align-start" style="width: 600rpx;height: 350rpx" v-for="(item, index) in allInfo.info.viewList" :key="index"  @tap="navToScenicDetail(item.id)">
						<view class="flex flex-direction justify-end bg-center align-center text-white" :style="[{'background-image':'url('+item.image+')' }]" style="height: 350rpx;width: 600rpx;">
						<!-- 	<view class="flex text-white has-bg-black radius-sm self-end padding-lr-sm padding-tb-xs margin-sm"> 
								<view class="flex flex-direction justify-between">
									<text class="text-df self-start text-bold">
										<text class="text-lx">2020</text>
									</text>
									<text class="text-df">February</text>
								</view>
							</view> -->
							
							<view class="flex flex-direction align-center">
								<text class="text-lg text-bold ">{{item.title}}</text>
								<text class="text-df margin-top-xs margin-bottom">{{item.intr}}</text>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 目的地推荐 End-->
		
		
		<!-- 精选游记 Start -->
		<view class="flex flex-direction padding-sm bg-white margin-top-sm radius-sm" :style="{display: allInfo.info.articleList?'block':'none'}">
			<view class="flex flex-direction align-center">
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
							<text class="cuIcon-locationfill text-xs text-bold has-bg-black round trip-has-margin-padding">{{item.title}}</text>
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
		<!-- 精选游记 End -->
		
		
		<view class="flex flex-direction bg-white margin-top-sm padding-sm radius-sm" :style="{display: allInfo.info.goodsList?'block':'none'}">
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
		
	</view>
</template>

<script>
	let time;
	import Citys from '@/components/city.js';
export default {
	data() {
		return {
			seckillTimeString:[],
			seckillTime:[],
			absoluteFlag:false,
			absoluteHeight:0,
			//所有参数
			StatusBarHeight:this.StatusBarHeight,
			NavigationBar:this.NavigationBar,
			StatusAddNav:this.StatusAddNav,	
			allInfo: {},
			// banner
			indicatorDots: true,
			autoplay: true,
			//控制渐变标题栏的参数
			headerOpacity: 0 //不透明度
		};
	},

	onPageScroll(e) {
		let opacity=e.scrollTop/170
		this.headerOpacity=opacity>1?1:e.scrollTop<0?0:opacity;
	},
	onLoad() {
		this.getHomeAllInfo();
	},
	onReady() {
		let that=this;
		that.time = setInterval(()=>{ 
			console.log(1);
			if(that.absoluteFlag){
				setTimeout(()=>{
					clearInterval(that.time);
					let selectorQuery = uni.createSelectorQuery().in(this);
					 selectorQuery.select('#is-absolute-nav').boundingClientRect((data)=>{
						that.absoluteHeight=data.height-30;
					 }).exec();
				},800)
			}
		},100)
	}, 

	onPullDownRefresh() {
		this.getHomeAllInfo();
	},
	methods: {
	
		// 拨打电话功能
		phoneCall(){
			uni.makePhoneCall({
				phoneNumber:"15884424595",
				success: (res) => {
					console.log(res);
				},
				fail: (res) => {
					console.log(res);
				}
			})
		},
		// 开启扫码功能
		scanCode(){
			uni.scanCode({
				success: (res) => {
					if(res.result!=''){
						uni.showToast({
							title:"扫描内容为:"+res.result,
							icon:"none"
						})
					}
				},
				fail: (err) => {
					uni.showToast({
						title:"关闭扫码功能",
						icon:"none"
					})
				},
			})
		},
		
		changeTimeStyle(totaltime){
			let timeData ='';
			var h, m, s, d
			d = Math.floor(totaltime / 86400);
			h = Math.floor(totaltime % 86400 / 3600)
			m = Math.floor(totaltime % 86400 % 3600 /60)
			s = Math.floor(totaltime % 86400 % 3600 %60)
					
			h=d*24+h;
			//获取时分秒
			timeData =`${h}: ${m}: ${s}`   // 每个时间的显示格式
			return timeData.toString();
		},
		changeSeckillTime(data){
			let that=this;
			let localTime =Math.floor(new Date().getTime()/1000);
			for(let i=0;i<data.length;i++){
				that.seckillTime[i]=data[i].stop_time-localTime;
			}
			setInterval(()=>{
				for(let i=0;i<that.seckillTime.length;i++){
					that.seckillTime[i]-=1;
					that.seckillTimeString[i] = that.changeTimeStyle(that.seckillTime[i]);
				}
				this.$forceUpdate();
			},1000);
		},
		getHomeAllInfo() {
			let that = this;
			that.baseGet(
				that.U({ c: 'public_api', a: 'index' }),
				function(res) {
					that.allInfo = res.data;
					that.absoluteFlag=true;
					that.changeSeckillTime(res.data.info.seckillList);
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

		fengyangFair(e) {
			uni.navigateTo({
				url: '/pages/tabber/fengyang_fair/fengyang_fair'
			});
		},
		navToMoreGoods(e) {
			uni.navigateTo({
				url: '/pages/tabber/fengyang_fair/fengyang_fair'
			});
		},
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
		},
		navToScenicDetail(id){
			uni.navigateTo({
				url: '/pages/tabber/home/scenic_detail/scenic_detail?id='+id
			})
		},
		navToSeckill(){
			uni.navigateTo({
				url:'/pages/seckill/seckill'
			})
		},
		navToSearch() {
			uni.navigateTo({
				url: '/pages/list/search/search'
			});
		},
	
	}
};
</script>

<style scoped>
	
.has-radius{
	border-top-left-radius: 16rpx;
	border-bottom-right-radius: 30rpx;
}

	.trip-has-margin:nth-child(odd){
		margin-right: 10rpx;
	}
	.avatar-has-size{
		width: 82upx;
		height: 82upx;
		font-size: 1em;
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
	

</style>
