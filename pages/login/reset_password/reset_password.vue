<template>
	<view class="content">
		<view class="input_view supplement_one">
			<input class="font-28" type="text" value="" placeholder="请输入密码" />
		</view>
		<view class="input_view">
			<input class="font-28" type="text" value="" placeholder="请确认密码" />
		</view>
		<view class="input_view supplement">
			<input class="font-28" type="text" value="" placeholder="请输入验证码" />
			<image class="num_code" src="/static/num_code.jpg" mode=""></image>
		</view>
		<button class="btn_green btn">重置</button>
	</view>
</template>

<script>

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
		width: 400upx;
		text-align: left;
	}
	.num_code{
		width: 150upx;
		height: 60upx;
	}
	.supplement {
		margin-bottom: 150upx;
	}
	.supplement_one{
		margin-top: 80upx;
	}
	
</style>
