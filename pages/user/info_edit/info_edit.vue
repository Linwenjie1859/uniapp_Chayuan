<template>
	<view class="content">
		<view class="info_edit" @tap="changeHead">
			<text class="font-32">头像</text>
			<image class="portrait" :src="userInfo.avatar?userInfo.avatar:'/static/logo.png'" mode=""></image>
			<image src="/static/right.png" mode=""></image>
		</view> 
		<view class="info_list font-32">
			<text>手机号</text>
			<input type="text" :value="userInfo.phone" class="text-grey" disabled/>
		</view>
		<view class="info_list font-32 supplement">
			<text>商城昵称</text>
			<input type="text" v-model="userInfo.nickname" class="text-grey"/>
		</view>
		<view class="text"><text class="font-28 text-gray">注意：与商城业务或者卖家品牌冲突的昵称，商城将有权收回。</text></view>
		<button class="btn_green" @tap="saveUserInfo">保存</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			userInfo: {
				phone: '',
				nickname: '',
				avatar:"",
			},
		};
	},
	onLoad() {
		this.getUserInfo();
	},
	methods: {
		//更换用户头像
		changeHead() {
			let _self = this;
			uni.chooseImage({
				success: function(e) {
					var imagePathArr = e.tempFilePaths;
					uni.uploadFile({ 
						url: _self.url+'/ebapi/public_api/upload',
						fileType: 'image',
						formData: {
							filename: 'keyname'
						},
						filePath: imagePathArr[0],
						name: 'keyname',
						header: {
							'Content-Type': 'multipart/form-data'
						},
						success: function(res) {
							var data = JSON.parse(res.data);
							console.log(data.data.url);
							// _self.userInfo.avatar= data.data.url;	//服务器
							
							_self.userInfo.avatar= _self.url+data.data.url;	//本地
							uni.showToast({
								title: '上传进度：' + 1 + '/' + imagePathArr.length,
								icon: 'none',
								mask: false,
								duration: 1000
							});
						}
					});
				}
			});
		},
		saveUserInfo(){
			let that = this;
			that.basePost(
				that.U({ c: 'user_api', a: 'edit_user' }),
				{
					nickname: that.userInfo.nickname,
					avatar:that.userInfo.avatar,
				},
				function(res) {
					that.Tips({title:'修改成功'},{tab:3 ,url :1});
				},
				function(res) {
					that.Tips({title:'修改失败'});
				}
			);
		},
		//获取用户的信息
		getUserInfo() {
			let that = this;
			that.basePost(
				that.U({ c: 'user_api', a: 'my' }),
				{},
				function(res) {
					that.userInfo = res.data;
				},
				function(res) {
					console.log(res);
				}
			);
		},
		nicknames(name) {
			uni.navigateTo({
				url: '/pages/login/modify_nicknames/modify_nicknames?name=' + name
			});
		}
	}
};
</script>

<style>
	.text {
		display: block;
		width: 550upx;
		margin: 0 auto;
		text-align: left;
		margin-top: 60upx;
		margin-bottom: 100upx;
	}
.text-grey {
	color: #8799a3;
}
.info_edit {
	width: 660upx;
	display: flex;
	align-items: center;
	margin: 70upx auto;
}
.info_edit .portrait {
	width: 90upx !important;
	height: 90upx !important;
	border-radius: 50%;
	margin-right: 26upx;
}
.info_edit image {
	width: 35upx;
	height: 35upx;
}
.info_edit text {
	display: block;
	width: 510upx;
}
.info_list {
	width: 660upx;
	display: flex;
	align-items: center;
	margin: 0 auto;
	margin: 70upx auto;
}
.info_list text {
	display: block;
	width: 625upx;
}
.info_list image {
	width: 35upx;
	height: 35upx;
}
.text_right {
	margin-right: 26upx;
}
.info_list input {
	text-align: right;
	margin-right: 26upx;
}
.supplement {
	margin-bottom: 120upx;
}
</style>
