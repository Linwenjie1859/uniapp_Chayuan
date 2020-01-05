<template>
	<view class="flex flex-direction bg-gray">
		<view class="flex align-end justify-end bg-green" :style="[{'padding-top':StatusBarHeight+'px',height:NavigationBar+'px'}]" >
			
		</view>
		<view class="flex flex-direction bg-green padding-lr-sm " :style="[{height:WindowHeight_one_five+'px'}]">
			<view class="flex">
				<view class="cu-avatar round xl" @tap="edit" :style="[{ backgroundImage:'url(' + userInfo.avatar + ')' }]">
					<view class="cu-tag badge cuIcon-crownfill bg-blue"></view>
				</view> 
				<view class="flex flex-direction margin-left" v-if="!isLoginFlag" @tap="toLogin" style="width: 582rpx;">
					<text class="text-lg white ">登录</text> 
				</view> 
				<view class="flex flex-direction margin-left" v-if="isLoginFlag" style="width: 582rpx;">
					<view class="flex justify-between margin-top-sm">
						<text class="text-lg white text-bold" @tap="edit">{{userInfo.nickname}}</text>
						<view class="flex justify-end " style="margin-top: -40rpx;">
							<text class="cuIcon-message text-xxl margin-right-sm" @tap="news" ></text>
							<text class="cuIcon-settings text-xxl " ></text>
						</view>
					</view>
					<view class="flex justify-between margin-top-sm">
						<text class="text-df white margin-top-xs" @tap="edit">{{userInfo.phone}}</text>
						<text class="cuIcon-right text-lg self-center" @tap="edit"></text>
					</view>
				</view>
			</view>
			<!-- 收藏、关注、足迹 Start -->
			<view class="flex justify-between margin-lr-sm margin-top-sm text-df">
				<view class="flex flex-direction align-center" @tap="mycol">
					<text class="text-df text-bold">{{userInfo.collect_product}}</text>
					<text>收藏夹</text>
				</view>
				<view class="flex flex-direction align-center" @tap="shopcol">
					<text class="text-df text-bold">{{userInfo.collect_merchant}}</text>
					<text>关注店铺</text>
				</view>
				<view class="flex flex-direction align-center">
					<text class="text-df text-bold">5</text>
					<text>足迹</text>
				</view>
				<view class="flex flex-direction align-center" @tap="coupon">
					<text class="text-df text-bold">8</text>
					<text>红包卡卷</text>
				</view>
			</view>
			<!-- 收藏、关注、足迹 End -->
		</view>
		
		<!-- 订单状态 Start -->
		<view class="flex flex-direction bg-white margin-lr-sm padding-sm radius" style="margin-top: -40rpx;">
			<view class="flex text-grey justify-between solid-bottom padding-sm" @tap="order(0)">
				<text class="text-df">我的订单</text>
				<text class="cuIcon-right"></text>
			</view>
			<view class="flex justify-between padding-sm">
			<!-- 	<view class="cu-avatar round xl" @tap="edit" :style="[{ backgroundImage:'url(' + userInfo.avatar + ')' }]">
					<view class="cu-tag badge cuIcon-crownfill bg-blue"></view>
				</view> -->
				<view class="flex flex-direction align-center"  @tap="order(1)" style="position: relative;">
					<text class="cuIcon-pay text-xxl text-orange"></text>
					<view class="cu-tag badge bg-orange" v-if="userInfo.orderStatusNum.noBuy!=0">{{userInfo.orderStatusNum.noBuy}}</view>
					<text class="text-df">待付款</text>
				</view>
				<view class="flex flex-direction align-center"  @tap="order(2)" style="position: relative;">
					<text class="cuIcon-send text-xxl text-orange"></text>
					<view class="cu-tag badge bg-orange" v-if="userInfo.orderStatusNum.noPostage!=0">{{userInfo.orderStatusNum.noPostage}}</view>
					<text class="text-df">待发货</text>
				</view>
				<view class="flex flex-direction align-center"  @tap="order(3)" style="position: relative;">
					<text class="cuIcon-deliver text-xxl text-orange"></text>
					<view class="cu-tag badge bg-orange" v-if="userInfo.orderStatusNum.noTake!=0">{{userInfo.orderStatusNum.noTake}}</view>
					<text class="text-df">待收货</text>
				</view>
				<view class="flex flex-direction align-center"  @tap="order(4)" style="position: relative;">
					<text class="cuIcon-comment text-xxl text-orange"></text>
					<view class="cu-tag badge bg-orange" v-if="userInfo.orderStatusNum.noReply!=0">{{userInfo.orderStatusNum.noReply}}</view>
					<text class="text-df">待评价</text>
				</view>
			</view>
		</view>
		<!-- 订单状态 End -->
		
		<!-- 其他设置 Start -->
		<view class="flex flex-direction bg-white margin-lr-sm padding-sm margin-top-sm radius">
			<view class="flex justify-between align-center padding-sm solid-bottom" @tap="coupon">
				<view class="flex align-center">
					<text class="cuIcon-ticket text-xxl margin-right-xs "></text>
					<text class="text-df">优惠券</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="flex justify-between align-center padding-sm solid-bottom" @tap="info">
				<view class="flex align-center">
					<text class="cuIcon-settings text-xxl margin-right-xs "></text>
					<text class="text-df">种植规则</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="flex justify-between align-center padding-sm solid-bottom" @tap="info">
				<view class="flex align-center">
					<text class="cuIcon-settings text-xxl margin-right-xs "></text>
					<text class="text-df">安全监测</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
			<view class="flex justify-between align-center padding-sm solid-bottom" @tap="info">
				<view class="flex align-center">
					<text class="cuIcon-settings text-xxl margin-right-xs "></text>
					<text class="text-df">账号设置</text>
				</view>
				<text class="cuIcon-right"></text>
			</view>
		</view>
		<!-- 其他设置 End -->
	</view>
</template>

<script>
export default {
	data() {
		return {
			WindowHeight_one_five:this.WindowHeight_one_five,
			StatusAddNav:this.StatusAddNav,
			StatusBarHeight:this.StatusBarHeight,
			NavigationBar:this.NavigationBar,
			// 是否登录标志
			isLoginFlag: false,
			/******************/
			// banner
			indicatorDots: true,
			autoplay: true,
			interval: 2000,
			duration: 1000,
			userInfo:{
				collect_merchant:0,
				collect_product:0,
				phone:"",
			},
		};
	},
 
	onShow() {
		this.isLoginFlag=this.isLogin();
		setTimeout(()=>{
			this.getUserInfo();
		},800);
	},
	methods: {
		//获取用户的信息
		getUserInfo(){
			let that=this;
			that.basePost(
				that.U({ c: 'user_api', a: 'my'}),
				{},
				function(res) {
					that.userInfo=res.data
				},
				function(res) {
					console.log(res);
				}
			);
		},
		//跳转登录页面
		toLogin(){
			uni.navigateTo({
				url:"/pages/login/pwd_login/pwd_login"
			})
		},
		edit() {
			uni.navigateTo({
				url: '/pages/user/info_edit/info_edit'
			});
		},
		news(e) {
			uni.navigateTo({
				url: '/pages/user/my_news/my_news'
			});
		},
		mycol(e) {
			uni.navigateTo({
				url: '/pages/shop/my_collection/my_collection'
			});
		},
		shopcol(e) {
			uni.navigateTo({
				url: '/pages/shop/shop_collection/shop_collection'
			});
		},
		order(e) {
			console.log(e);
			uni.navigateTo({
				url: '/pages/user/my_order/my_order?index='+e
			});
		},
		coupon(e) {
			uni.navigateTo({
				url: '/pages/user/my_coupon/my_coupon'
			});
		},
		info(e) {
			uni.navigateTo({
				url: '/pages/user/my_info/my_info'
			});
		}
	}
};
</script>

<style scoped>

</style>
