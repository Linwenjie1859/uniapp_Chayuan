<template>
	<view class="flex flex-direction">
		<!-- 店铺基本信息展示 Start -->
		<view class="flex padding-sm bg-white ">
			<view class="flex">
				<image :src="storeInfo.merInfo.store_logo" mode="scaleToFill" class="radius" style="width: 200rpx; height: 200rpx;"></image>
				<view class="flex flex-direction margin-left-sm" style="width: 490rpx;">
					<view class="flex align-center justify-between">
						<text class="text-lg text-bold">{{ storeInfo.merInfo.store_name }}</text>
						<view class="round cu-tag line-white has-black-bg padding-sm" @click="keep">
							<text class="text-xl margin-right-xs" :class="[{'cuIcon-wefill text-orange': isKeep != null,'cuIcon-we text-grey':isKeep == null}]"></text>
							<text :class="[{'text-orange': isKeep != null,'text-grey':isKeep == null}]">关注</text>
						</view>
					</view>
					<text class="text-grey text-df margin-tb-sm" >福建省宁德市寿宁县</text>
					<view class="flex justify-between align-center text-df text-grey">
						<text>{{ storeInfo.merInfo.fav_count }}人收藏</text>
						<text>销售{{ storeInfo.merInfo.sale_count }}件</text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex bg-white" style="height: 80rpx;">
			<scroll-view class="scroll-h" :scroll-x="true" :scroll-into-view="scrollInto" style="text-align: center;">
				<view v-for="(tab, index) in tabBars" :key="index" class="uni-tab-item" :id="tab.id" :data-current="index" @click="ontabtap">
					<text class="uni-tab-item-title" :class="tabIndex == index ? 'uni-tab-item-title-active' : ''">{{ tab.title }}</text>
				</view>
			</scroll-view>
		</view>
		<view class="flex bg-white" >
			<swiper :current="tabIndex" :style="[{height:scrollerHeight}]" style="width: 750rpx;" :duration="300" @change="ontabchange">
				<swiper-item v-for="(item,index) in newsList" :key="index">
					<scroll-view  :style="[{height:scrollerHeight}]" scroll-y @scrolltolower="onReachBottom_more">
					<!-- 	<view class="flex flex-direction padding-sm margin-bottom" style="width: 750rpx;" v-if="index==0">
							<image src="/static/shop_banner.png" class="radius margin-bottom-sm" mode="widthFix" style="width:100%;"></image>
							<text class="flex flex-wrap text-df">当我们说起葡萄园时，最先进入脑海的一般是诸如皮埃蒙特（Piedmont）或勃艮第（Burgundy）这样著名的产区。而位于芬兰或者泰国的葡萄园？不好意思，实在是闻所未闻。尽管这些地区看起来和葡萄园毫无交集，但其实它们也有一定的葡萄种植历史。而这些让人出乎意料的种植地也恰恰反映了葡萄树不屈不挠的精神。下面，小编就为大家介绍世界上最不可思议的九大</text>
						</view> -->
						<view class="flex flex-direction">
							<view class="flex align-center justify-between padding-sm"   @click="detail(data_item)" v-for="(data_item,data_index) in item.data" :key="data_index">
								 <image :src="data_item.image" mode="scaleToFill" class="radius margin-right-sm" style="width: 200rpx; height: 200rpx;"></image>
								 <view class="flex flex-direction" style="width: 490rpx;">
								 	<view class="flex">
								 		<text class="text-bold text-lg text-cut">{{ data_item.store_name }}</text>
								 	</view> 
									<view class="flex">
										<text class="text-df text-cut-two margin-tb-sm">{{ data_item.store_info }}</text>
									</view>
									<view class="flex align-center justify-between">
										<text class="text-price text-orange text-lg">{{data_item.price}}</text>
										<text class="text-grey text-sm">销量:{{data_item.sales}}</text>
									</view>
								 </view>
							</view>
							<uni-load-more :status="newsList[index].loadingStatus" v-if="newsList[index].loadingFlag" />
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 店铺基本信息展示 End -->
	</view>
</template>

<script>
export default {
	
	data() {
		return {
			keyWord:"",	//搜索关键字
			currentLoadFlag:true,
			newsList: [],	//全部宝贝、新品、活动数组集合
			storeId: '85',	// 本店ID
			storeInfo: {
				merInfo:{
					views:0
				}
			},	//店铺首页
			tabIndex: 0,	//当前下标
			scrollInto: '',	//scroll跳转到这个Id
			isKeep: false,  //收藏
			tabBars: [
				{
					title: '全部宝贝',
					id: 'baobei'
				},
				{
					title: '热卖商品',
					id: 'remai'
				},
				{
					title: '新品上架',
					id: 'xingping'
				},
				{
					title: '活动促销',
					id: 'huodong'
				}
			],
		};
	},
	onLoad(e) {
		this.storeId = e.storeId;
		this.getStoreInfo();
		this.initInfo();
		this.getGoodList(0);
	},
	onPullDownRefresh() {
		//下拉刷新页面将之前的数据初始化
		this.newsList = [];
		this.getStoreInfo();
		this.initInfo();
		this.getGoodList(0);
	},
	computed:{
		scrollerHeight:function(){
			return (this.WindowHeight-320/2)+'px';	//16是调试出来的差值
		}
	},
	methods: {
		//初始化newsList数据类型
		initInfo() {
			this.tabBars.forEach(tabBar => {
				this.newsList.push({
					data: [],
					loadingStatus:"loading",
					currentPage: 1,
					pageSize: 6,
					loadingFlag:true,
				});
			});
		},
		// 加载更多， 
		onReachBottom_more() {
		    if(this.newsList[this.tabIndex].loadingStatus === 'loading'){	//防止重复加载
				return ;
			}
			this.newsList[this.tabIndex].loadingFlag = true;
			this.newsList[this.tabIndex].loadingStatus='loading';	//每次上滑都要从新设置status
			setTimeout(()=>{
				this.getGoodList(this.tabIndex);	
			},600) 
		},
		//导航栏点击跳转
		ontabtap(e) {
			let index = e.target.dataset.current || e.currentTarget.dataset.current;
			this.tabIndex = index;
		},
		//左右滑动
		ontabchange(e) {
			let index = e.target.current || e.detail.current;
			this.tabIndex = index;
			this.scrollInto = this.tabBars[index].id;
			//获取信息
			if (this.newsList[index].data.length === 0) {
				this.getGoodList(index);
			}
		},
		//0.8s后隐藏加载提示的信息
		closeLoadingMoreFlag() {
			setTimeout(()=> {
				this.newsList[this.tabIndex].loadingFlag = false;
			}, 800);
		},
		//获取全部宝贝、新品、活动促销
		getGoodList(index) {
			let that = this;
			// 如果是首页点击那么不需要请求
			// if (index == 0) return;
			that.baseGet(
				that.U({
					c: 'store_api',
					a: 'get_product_list',
					q: {
						mid: that.storeId,
						hot:index==1 ? 1 : '',
						news: index == 2 ? 1 : '',
						benefit: index == 3 ? 1 : '',
						// news: index == 2 ? 1 : '',
						// benefit: index == 3 ? 1 : '',
						page: that.newsList[index].currentPage,
						limit: that.newsList[index].pageSize
					}
				}),
				function(res) {
					uni.stopPullDownRefresh();	
					if (res.data.length == 0) {
						that.newsList[index].loadingStatus = 'noMore';
						that.closeLoadingMoreFlag();	//0.8后将状态隐藏
						return;
					}
									
					that.newsList[index].data = [...that.newsList[index].data, ...res.data];
					that.newsList[index].currentPage++;
					that.newsList[index].loadingStatus="more";
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		//获取店铺详情
		getStoreInfo() {
			let that = this;
			that.baseGet(
				that.U({
					c: 'merchant_api',
					a: 'merchant_info',
					q: {
						id: that.storeId
					}
				}),
				function(res) {
					that.storeInfo = res.data;
					that.isKeep = res.data.merInfo.is_collect;
				},
				function(res) {
					console.log(res);
				},
				true
			);
		},
		//收藏
		keep() {
			let that = this;
			//收藏商品之前判断用户是否已经登录
			if (this.isLogin()) {
				if (this.isKeep != null) {
					//收藏的情况下，进行取消收藏操作
					that.basePost(
						that.U({ c: 'merchant_api', a: 'uncollect_merchant' }),
						{
							merId: that.storeId
						},
						function(res) {
							if(res.code==200){
								that.isKeep = null;
							}
						},
						function(res) {
							console.log(res);
						}
					);
				} else {
					//还没有收藏的情况下，进行收藏操作
					that.basePost(
						that.U({ c: 'merchant_api', a: 'collect_merchant' }),
						{
							merId: that.storeId
						},
						function(res) {
							if(res.code==200){
								that.isKeep = '1';
							}
						},
						function(res) {
							console.log(res);
						}
					);
				}
			}
		},

		// 商品详情
		detail(e) {
			if(e.type==2){
				uni.navigateTo({
					url: '/pages/list/line_details/line_details?id='+e.id
				});
			}else{
				uni.navigateTo({
					url: '/pages/list/goode_details/goode_details?id='+e.id
				});
			}
			
		},
	}
};
</script>

<style scoped>
	.uni-tab-item {
		display: inline-block;
		flex-wrap: nowrap;
		padding-left: 33upx;
		padding-right: 33upx;
	}
	
	.uni-tab-item-title {
		color: #555;
		font-size: 30upx;
		height: 80upx;
		line-height: 80upx;
		flex-wrap: nowrap;
		white-space: nowrap;
	}
	
	.uni-tab-item-title-active {
		color: #51c77d;
		padding-bottom: 10rpx;
		border-bottom: 6upx solid #51c77d;
	}
	.has-black-bg {
		background-color: rgba(255, 255, 255, 0.4);
		border: 1rpx solid rgba(0, 0, 0, 0.2);
	}
	
</style>
