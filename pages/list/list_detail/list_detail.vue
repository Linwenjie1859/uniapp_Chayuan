<template>
	<view class="bg-white">
		<view class="flex align-center padding-top-sm">
			<text class="cuIcon-titles text-blue light"></text>
			<text class="text-black">{{article.title}}</text>
		</view>
		<view class="margin-lr-sm padding-bottom-sm">
			<image :src="article.image_input[0]" class="radius img-has-height" mode="scaleToFill"></image>
			
			<!-- 文章出处信息 Start-->
			<view class="flex align-center justify-between">
				<view class="flex">
					<view class="cu-avatar round lg" :style="[{ backgroundImage:'url(' + article.image_input[0] + ')' }]">
						<view class="cu-tag badge cuIcon-female bg-pink"></view>
						<!-- cuIcon-male bg-blue 男士标志 -->
					</view> 
					<view class="flex flex-direction margin-left-xs justify-around">
						<view class="flex align-center ">
							<text class="text-black text-bold text-df">{{article.author}}</text>
							<view class="bg-blue margin-left-xs round padding-lr-xs" >
								<text class="text-xs">金牌导游</text>
							</view>
						</view>
						<text class="text-gray text-sm">{{article.add_time}} | 阅读{{article.visit}}</text>
					</view>
				</view>
				<view class="flex align-center self-end text-sm">
					<text class="cuIcon-like"></text>
					<text class="margin-lr-xs">关注</text>
				</view>
			</view>
			<!-- 文章出处信息 End-->
			
			<view class="flex flex-wrap padding-tb-sm padding-lr light radius has-bg margin-tb-sm" >
				<view class="flex view-has-icon" >
					<view class="bg-orange round view-has-padding">
						<text class="cuIcon-calendar text-white" style="font-size: 20rpx;"></text>
					</view>
					<text class="text-sm margin-left-xs">出发时间 9月</text>
				</view>
				<view class="flex view-has-icon" >
					<view class="bg-green round view-has-padding">
						<text class="cuIcon-time text-white" style="font-size: 20rpx;"></text>
					</view>
					<text class="text-sm margin-left-xs">行程天数 3天</text>
				</view>
				<view class="flex view-has-icon" >
					<view class="bg-yellow round view-has-padding">
						<text class="cuIcon-moneybag text-white" style="font-size: 20rpx;"></text>
					</view>
					<text class="text-sm margin-left-xs">人均话费 1.5千</text>
				</view>
				<view class="flex view-has-icon" >
					<view class="bg-red round view-has-padding">
						<text class="cuIcon-friendfamous text-white" style="font-size: 20rpx;"></text>
					</view>
					<text class="text-sm margin-left-xs">和谁出行 和朋友</text>
				</view>
			</view>
			<view class="flex text-df margin-bottom-sm">
				<view class="text-grey">
					<text class="cuIcon-activity text-red margin-right-xs"></text>
					<text class="text-black">前言:</text> 
					{{article.synopsis}}
				</view>
			</view>
			<view class="text-df">
				<text class="cuIcon-read text-orange margin-right-xs "></text>
				详情介绍
			</view>
			<rich-text class="text-df" :nodes="article.content"></rich-text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				article:{},
			}
		},
		methods: {
			getArticle(id) {
				var that = this;
				that.baseGet(
					that.U({ c: 'article_api', a: `visit`,q: {id: id} }),
					function(res) {
						that.article=res.data;
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
		},
		onLoad(e) {
			this.getArticle(e.id)
		}
	}
</script>

<style scoped>
	.has-bg{
		background: rgba(135,153,163,0.1);
	}
	.view-has-icon{
		width: 310rpx;
		margin:10rpx 7rpx;
	}
	.view-has-padding{
		padding: 3rpx 8rpx;;
	}
	.img-has-height{
		height: 380rpx;
		width: 710rpx;
		margin:10rpx 0;
	}

</style>
