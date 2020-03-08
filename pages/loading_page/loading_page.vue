<template>
	<view class="bg-white" style="height:100vh">
		<view class="flex flex-direction justify-between align-center" style="height:100vh">
			<view class="flex justify-end align-center" style="height: 15%;width: 100%;">
				<view class="has-black-bg  padding-lr-sm padding-tb-xs round text-white margin-right-sm">{{time}}</view>
			</view>
			<view class="flex flex-direction align-center text-black">
				<text class="text-has-size text-bold" >让休闲更加简单</text>
				<text class="text-df text-grey margin-tb-sm" >—— 尽享在家种树体验 ——</text>
			</view>
			
			<image class="margin-tb-xl" src="../../static/loading_page.png" mode="widthFix" style="width: 500rpx;"></image>
				
			<view class="flex align-center margin-bottom-sm">
				<image src="../../static/woodpecker.png" mode="widthFix" style="width:110rpx"></image>
				<view class="flex flex-direction align-center margin-left-xs">
					<text class="text-has-size text-bold">啄啄庄园</text>
					<text class="margin-top-xs text-lg">zhuozhuo.com</text> 
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let countdown;
	export default {
		data() {
			return {
				time:5,
			}
		},
		onLoad() { 
			this.countdown = setInterval(()=>{
				if(this.time>1){
					this.time-=1;
				}else{
					clearInterval(this.countdown);
				}
			},1000);
			setTimeout(()=>{
				uni.switchTab({
					url:'/pages/tabber/home/home'
				})
			},5000);
		},
		methods: {
			
		}
	}
</script>

<style scoped>
	.has-black-bg {
		background-color: rgba(0,0,0, 0.3);
	}
.text-has-size{
	font-size: 55rpx;
}
</style>
