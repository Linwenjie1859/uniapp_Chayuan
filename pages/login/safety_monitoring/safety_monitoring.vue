<template>
	<view class="bg-white" style="height: 100vh;">
		<view class="flex flex-direction padding-xl text-lg padding-top-xl margin-lr">
			<view class="flex align-center text-lg margin-top-sm margin-bottom text-grey">
				为了保证是您本人操作，请完成以下验证我们将发送验证码到您的手机
			</view>
			<view class="flex margin-tb-sm solid-bottom padding-bottom-xs">
				<input type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			<view class="flex justify-between align-center margin-tb-sm solid-bottom padding-bottom-xs">
				<input type="text" placeholder="请输入验证码" v-model="code"/>
				<view class="flex align-center padding-tb-xs round bg-gradual-green padding-lr-sm" @tap="getCode()">
					<text class="text-sm" v-if="time==0">获取验证码</text>
					<text class="text-sm" v-else>重新获取({{time}}s)</text>
				</view>
			</view>
			<view class="flex align-center bg-gradual-green round margin-top-xl padding-sm justify-center" @tap="navToResetPwd()">
				<text>下一步</text>
			</view>
		</view>
	</view>
</template>

<script>
	let countdown;
	export default {
		data() {
			return {
				time:0,
				phone:"",
				code:"",
			}
		},
		methods: {
			
			//获取验证码,并且倒计时
			getCode(){
				let that=this;
				if(!that.checkMobile(that.phone)){
					that.Tips({ title: "请输入正确的手机号"});
					return;
				}
				
				if(that.time!=0)return;
				that.time=60;
				that.countdown=setInterval(()=>{
					that.time-=1;
					if(that.time<=0){
						clearInterval(that.countdown)
					}
				},1000);
				
				that.basePost(
					that.U({ c: 'login', a: 'get_update_pass_code'}),
					{
						phone:that.phone,
					},
					function(res) {
						that.Tips({ title: res});
					},
					function(res) {
						console.log(res);
					},
				);
			},
			// 验证验证码，并且跳转重置新密码
			navToResetPwd() {
				let that=this;
				if(that.phone==''){
					that.Tips({ title: "请输入手机号码"});
					return;
				}
				if(that.code==''){
					that.Tips({ title: "请输入验证码"});
					return;
				}
				that.basePost(
					that.U({ c:'user_api', a:'check_phone_code'}),
					{
						code:that.code,
						phone:that.phone,
					},
					function(res) {
						uni.navigateTo({
							url: "/pages/login/reset_password/reset_password?phone="+that.phone
						})
					},
					function(res) {
						that.Tips({ title: res.msg});
					},
				);
			},
		},
	}
</script>

<style>

</style>
