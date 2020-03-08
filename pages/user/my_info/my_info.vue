<template>
	<view class="bg-white" style="height: 100vh;">
		<view class="flex flex-direction padding">
			<view class="flex justify-between align-center margin-tb padding-tb-sm">
				<view class="flex align-center">
					<view v-if="userInfo.avatar!=''" class="cu-avatar round xl margin-right-sm" :style="{'background-image':'url('+userInfo.avatar+')'}"></view>
					<text class="text-bold text-xl">{{userInfo.nickname}}</text>
				</view>
				<view class="flex padding-lr-sm padding-tb-xs bg-gradual-green round" @tap="edit">
					<text>编辑</text>
				</view>
			</view>
			
			<view class="flex align-center justify-between margin-tb  padding-tb-sm solid-bottom" @tap="address">
				我的收货地址
				<text class="cuIcon-right text-df"></text>
			</view>
			<view class="flex align-center justify-between margin-tb  padding-tb-sm solid-bottom" >
				鼓励评分
				<text class="cuIcon-right text-df"></text>
			</view>
			<view class="flex align-center justify-between margin-tb  padding-tb-sm solid-bottom" >
				分享推荐
				<text class="cuIcon-right text-df"></text>
			</view>
			<view class="flex align-center justify-between margin-tb  padding-tb-sm solid-bottom" >
				客服电话
				<text class="cuIcon-right text-df"></text>
			</view>
			<view @tap="outLogin" class="flex align-center bg-gradual-green round margin-top-xl padding-sm justify-center">
				退出登录
			</view>
		</view>
	</view>
</template>

<script>
	import {mapMutations } from 'vuex';
	export default {
		data() {
			return {
				userInfo:{
					phone:"",
					nickname:"",
				}
			}
		},
		onShow() {
			this.getUserInfo();
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
			edit() {
				uni.navigateTo({
					url: '/pages/user/info_edit/info_edit',
				});
			},
			address(e) {
				uni.navigateTo({
					url: '/pages/user/admin_address/admin_address',
				});
			},
			outLogin(){
				let that=this;
				uni.showModal({
					title: '提示',
					content: '确定退出当前用户？',
					success: function(res) {
						if (res.confirm) {
							that.logoutStore();
							uni.clearStorageSync("data");
							uni.redirectTo({
								url:'/pages/login/pwd_login/pwd_login'
							})
						} else{
							return;
						}
					}
				});
			},
			...mapMutations(['logoutStore'])
		}
	}
</script>

<style>

</style>
