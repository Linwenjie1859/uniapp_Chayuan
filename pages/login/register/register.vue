<template>
	<view class="bg-white" style="height: 100vh;">
		<view class="flex flex-direction padding-xl text-lg margin-lr" style="padding-top: 100rpx;">
			<view class="flex margin-tb solid-bottom padding-bottom-xs ">
				<input type="text" v-model="phone" placeholder="请输入手机号" />
			</view>
			
			<view class="flex justify-between align-center margin-tb solid-bottom padding-bottom-xs">
				<input type="text" placeholder="请输入验证码" v-model="code"/>
				<view class="flex align-center padding-tb-xs round bg-gradual-green padding-lr-sm" @tap="getCode()">
					<text class="text-sm" v-if="time==0">获取验证码</text>
					<text class="text-sm" v-else>重新获取({{time}}s)</text>
				</view>
			</view>
			
			<view class="flex margin-tb solid-bottom padding-bottom-xs">
				<input type="password" v-model="pwd" placeholder="请输入密码" />
			</view>
			
			<view class="flex margin-tb solid-bottom padding-bottom-xs">
				<input type="password" v-model="confirmPwd" placeholder="请确认密码" />
			</view>
			<view class="flex align-center bg-gradual-green round margin-top-xl padding-sm justify-center"  @tap="register">
				<text>注册</text>
			</view>
			<view class="flex justify-center align-center text-sm margin-top-sm">
				注册即表示接受 
				<text class="text-green">《快速注册》</text>
				<text>和</text>
				<text class="text-green">《隐私协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	let countdown;
	export default {
		data() {
			return {
				time: 0,
				phone: '',
				code: '',
				pwd: '',
				confirmPwd: '',
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
					that.U({ c: 'login', a: 'get_register_code'}),
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
			
			register(e) {
				var that = this;
				if(!that.checkMobile(that.phone)){
					that.Tips({ title: "请输入正确的手机号"});
					return;
				}
				if(that.code == ''){
					that.Tips({ title: "请输入验证码"});
					return;
				}
				if(that.pwd == ''){
					that.Tips({ title: "请输入密码"});
					return;
				}
				if(that.confirmPwd == ''){
					that.Tips({ title: "请输入确认密码"});
					return;
				}
				if(that.pwd != that.confirmPwd){
					that.Tips({ title: "两次输入的密码不一致"});
					return;
				}
				that.basePost(
					that.U({ c: 'login', a: 'register_by_mobile'}),
					{
						phone:that.phone,
						code: that.code,
						pwd: that.pwd,
					},
					function(res) {
						that.loginStore(res.data);
						that.Tips({ title: "注册成功！"},{tab:3 ,url :2})
					},
					function(res) {
						that.Tips({ title: res.msg});
					},
				);
			},
			//返回上一页
			back() {
				uni.navigateBack();
			},
			
			setConfirmPwd(e){
				this.confirmPwd =  e.detail.value;
			},
			...mapMutations(['loginStore'])
		}
	}
</script>

<style>
	
</style>
