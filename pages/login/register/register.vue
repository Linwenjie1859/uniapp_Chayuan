<template>
	<view class="content">
		
		<view class="input_view supplement_one">
			<input class="font-28" type="text" value="" placeholder="请输入手机号" @input="setPhone"/>
		</view>
		<view class="input_view">
			<input class="font-28" type="text" value="" placeholder="请输入验证码" @input="setCode"/>
			<button v-if="!is_code" class="btn_obtain_green" @click="get_code">获取验证码</button>
			<button v-else class="btn_obtain">重新获取({{time}}s)</button>
		</view>
		<view class="input_view">
			<input class="font-28" type="text" value="" placeholder="请输入密码" @input="setPwd"/>
		</view>
		<view class="input_view">
			<input class="font-28" type="text" value="" placeholder="请确认密码" @input="setConfirmPwd"/>
		</view>
		<button class="btn_green btn" @click="register">注册</button>
		<view class="tip font-24">
			<text>注册即表示接受</text>
			<text class="green">《快速注册》</text>
			<text>和</text>
			<text class="green">《隐私协议》</text>
		</view>
	</view>
</template>

<script>
	
	import { mapState, mapMutations } from 'vuex';
	
	export default {
		data() {
			return {
				time: 60,
				timer: null,
				is_code: false,
				phone: '',
				code: '',
				pwd: '',
				confirmPwd: '',
			}
		},
		
		methods: {
			// 跳转
			code_login(e) {
				this.type = 2;
			},
			pwd_login(e) {
				this.type = 1;
			},
			get_code(){
				var that = this;
				console.log(that.phone);
				console.log(that.checkMobile(that.phone));
				if(!that.checkMobile(that.phone)){
					that.Tips({ title: "请输入正确的手机号"});
					return;
				}
				if(that.timer == null){
					
					that.basePost(
						that.U({ c: 'login', a: 'get_register_code'}),
						{phone:that.phone},
						function(res) {
							that.is_code = true;
							that.timer = setInterval(that.countDown,1000);
						},
						function(res) {
							console.log(res);
						},
					);
				}
			},
			countDown(){
				var that = this;
				if(that.time > 0){
					that.time --;
				}else{
					clearInterval(that.timer);
					that.timer = null;
					that.time = 60;
					that.is_code = false;
				}
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
						console.log(res);
					},
				);
			},
			//返回上一页
			back() {
				uni.navigateBack();
			},
			setPhone(e){
				this.phone =  e.detail.value;
			},
			setCode(e){
				this.code =  e.detail.value;
			},
			setPwd(e){
				this.pwd =  e.detail.value;
			},
			setConfirmPwd(e){
				this.confirmPwd =  e.detail.value;
			},
			...mapMutations(['loginStore'])
		}
	}
</script>

<style>
	.content {
		text-align: center;
	}

	.logo {
		height: 150upx;
		width: 150upx;
		border-radius: 50%;
		margin-top: 150upx;
	}

	.input_view {
		width: 550upx;
		height: 80upx;
		line-height: 80upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 0upx auto;
		margin-top: 30upx;
		margin-bottom: 50upx;
	}

	.input_view input {
		/* width: 400upx; */
		text-align: left;
	}

	.supplement {
		margin-bottom: 150upx;
	}
	.supplement_one{
		margin-top: 80upx;
	}

	.tip {
		margin-top: 50upx;
	}

	
</style>
