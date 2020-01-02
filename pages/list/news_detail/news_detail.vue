<template>
	<view class="content">
		<view class="time">
			<text class="font-24 gray">08-08 12:00</text>
		</view>
		<view class="new_list">
			<image src="/static/icon-item-001.png" mode=""></image>
			<text class="font-28">恭喜你参加的拼团已组成成功了，请您等待卖家发货</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	page{
		background-color: #F2F2F2;
	}
	.time{
		width: 700upx;
		margin: 25upx auto;
		display: flex;
		align-items: center;
	}
	.time text{
		display: block;
		margin: 0 auto;
		padding: 2upx 25upx;
		background-color: #E5E5E5;
		border-radius: 25upx;
	}
	.new_list{
		width: 700upx;
		margin: 25upx auto;
		display: flex;
		align-items: center;
	}
	.new_list image{
		width: 80upx;
		height: 80upx;
		border-radius: 50%;
	}
	.new_list text{
		width: 540upx;
		display: block;
		background-color: #FFFFFF;
		border-radius: 10upx;
		padding: 15upx 25upx;
		margin-left: 25upx;
	}
</style>
