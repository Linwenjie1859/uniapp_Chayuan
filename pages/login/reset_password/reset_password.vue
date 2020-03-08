<template>
	<view class="bg-white" style="height: 100vh;">
		<view class="flex flex-direction padding-xl text-lg padding-top-xl margin-lr">
			
			<view class="flex margin-tb-sm solid-bottom padding-bottom-xs">
				<input type="password" v-model="pwd" placeholder="请输入新密码" />
			</view>
			
			<view class="flex margin-tb-sm solid-bottom padding-bottom-xs">
				<input type="password" v-model="pwd_confirm" placeholder="请确认新密码" />
			</view>
			
			<view class="flex align-center text-lg margin-tb-sm">
				<text class="text-sm text-orange">尊敬的客户,为确保您的账号安全,请务必妥善保管好您的密码,切勿将密码告知任何人。</text>
			</view>
			<view class="flex align-center bg-gradual-green round margin-top-xl padding-sm justify-center" @tap="resetPassword()">
				<text>重置</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
		data() {
			return {
				phone:'',
				pwd:"",
				pwd_confirm:"",
			}
		},
		onLoad(e) {
			console.log(e);
			this.phone=e.phone;
		},
		methods: {
			//重置密码
			resetPassword(){
				let that=this;
				if(that.pwd==''){
					that.Tips({ title: "请输入正确的密码"});
					return;
				}
				if(that.pwd_confirm==''){
					that.Tips({ title: "请再次输入密码"});
					return;
				}
				if(that.pwd_confirm!=that.pwd){
					that.Tips({ title: "两次密码不一致,请重新确认"});
					return;
				}
				that.basePost(
					that.U({ c: 'user_api', a: 'edit_user_pass'}),
					{
						phone:that.phone,
						pwd:that.pwd
					},
					function(res) {
						that.Tips({ title: res.msg});
						that.redToLogin();
					},
					function(res) {
						that.Tips({ title: res.msg});
					},
				);
			},
			redToLogin(){
				uni.redirectTo({ 
					url:'/pages/login/pwd_login/pwd_login'
				})
			}
		},
	}
</script>

<style>

	
</style>
