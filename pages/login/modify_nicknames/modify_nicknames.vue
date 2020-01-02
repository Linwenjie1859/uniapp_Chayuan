<template>
	<view class="content">
		<view class="input_view"><input class="font-28" type="text" v-model="nickName" placeholder="请输入昵称" /></view>
		<view class="text"><text class="font-28">注意：与商城业务或者卖家品牌冲突的昵称，商城将有权收回。</text></view>
		<button class="btn_green font-36 btn" @tap="saveName">确定并保存</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nickName: ''
		};
	},
	onLoad(e) {
		this.nickName=e.name;
	},
	methods: {
		//修改用户昵称
		saveName() {
			let pages = getCurrentPages();  //获取所有页面栈实例列表
			let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
			prevPage.$vm.userInfo.nickname=this.nickName;
			uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
				delta: 1
			});
		}
	}
};
</script>

<style>
.content {
	text-align: center;
}
.text {
	display: block;
	width: 550upx;
	margin: 0 auto;
	text-align: left;
	margin-top: 60upx;
	margin-bottom: 100upx;
}
.input_view {
	width: 550upx;
	height: 80upx;
	line-height: 80upx;
	display: flex;
	justify-content: space-between;
	margin: 0upx auto;
	margin-top: 80upx;
	display: flex;
	align-items: center;
	border: 1rpx solid #aaaaaa ;
	padding: 0rpx 20rpx;
	border-radius: 8rpx;
	color: #8799a3;
	/* margin-bottom: 50upx; */
}
.input_view input {
	width: 400upx;
	text-align: left;
}
</style>
