<template>
	<view class="bg-white padding-sm" style="height: 100vh;">
		<view class="flex flex-direction padding-sm">
			<view class="flex justify-between align-center margin-tb text-lg padding-tb-sm" @tap="changeHead">
				<text class="text-grey self-end">头像</text>
				<view v-if="userInfo.avatar!=''" class="cu-avatar round xl self-start" :style="{'background-image':'url('+userInfo.avatar+')'}"></view>  
				<view v-if="userInfo.avatar==''" class="cu-avatar round xl self-start" style="background-image: url(../../../static/woodpecker.png);"></view>  
			</view>
			<view class="flex justify-between margin-tb text-lg padding-tb-sm align-center text-right">
				<text class="text-grey">手机号</text>
				<input type="text" :value="userInfo.phone" disabled class="text-grey"/>
			</view>
			<view class="flex justify-between margin-tb text-lg padding-tb-sm align-center text-right">
				<text class="text-grey">庄园昵称</text>
				<input type="text" v-model="userInfo.nickname" placeholder="请输入昵称"/>
			</view>
			<text class="text-df text-grey margin-top">注意：与商城业务或者卖家品牌冲突的昵称，商城将有权收回。</text>
			<button class="bg-gradual-green margin-top-sm round" style="width: 100%;" @tap="saveUserInfo">保存</button>
		</view>
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
							console.log(data);
							_self.userInfo.avatar= data.data.url;	//服务器
							// _self.userInfo.avatar= _self.url+data.data.url;	//本地
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
	
</style>
