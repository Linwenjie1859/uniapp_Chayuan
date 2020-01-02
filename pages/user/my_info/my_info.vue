<template>
	<view class="content">
		<view class="info_edit">
			<image class="portrait" :src="userInfo.avatar" mode=""></image>
			<text class="font-32">{{userInfo.nickname}}</text>
				<button class="btn_edit_green" @tap="edit">编辑</button>
		</view>
			<view class="info_list" @tap="address">
				<text class="font-28">我的收货地址</text>
				<image src="/static/right.png" mode=""></image>
			</view>
		<view class="info_list">
			<text class="font-28">鼓励评分</text>
			<image src="/static/right.png" mode=""></image>
		</view>
		<view class="info_list">
			<text class="font-28">分享推荐</text>
			<image src="/static/right.png" mode=""></image>
		</view>
		<view class="info_list supplement">
			<text class="font-28">客服电话</text>
			<image src="/static/right.png" mode=""></image>
		</view>
		<button class="btn_green">退出登录</button>
	</view>
</template>

<script>
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
			edit(e) {
				uni.navigateTo({
					url: '/pages/user/info_edit/info_edit',
				});
			},
			address(e) {
				uni.navigateTo({
					url: '/pages/user/admin_address/admin_address',
				});
			},
			
		}
	}
</script>

<style>
	.info_edit{
		width: 660upx;
		display: flex;
		align-items: center;
		margin: 70upx auto;
	}
	.info_edit .portrait{
		width: 90upx;
		height: 90upx;
		border-radius: 50%;
	}
	.info_edit text{
		display: block;
		width: 450upx;
		margin-left: 26upx;
	}
	.info_list{
		width: 660upx;
		display: flex;
		align-items: center;
		margin: 0 auto;
		margin-bottom: 80upx;
	}
	.info_list text{
		display: block;
		width: 625upx;
	}
	.info_list image{
		width: 35upx;
		height: 35upx;
	}
	.supplement{
		margin-bottom: 120upx;
	}

</style>
