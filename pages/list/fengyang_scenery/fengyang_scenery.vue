<template>
	<view class="bg-white">
		<view class="flex flex-direction padding-bottom-sm" v-for="(item, index) in articleList" :key="index">
			<!-- 文章的标题 Start -->
			<view class="flex align-center justify-between margin-bottom-xs solid-top solid-bottom"  @click="getList" :data-id="item.id">
				<view class="flex align-center">
					<text class="cuIcon-titles text-blue light"></text>
					<text class="text-black margin-tb-sm text-df">{{item.title}}</text>
				</view> 
				<text class="cuIcon-right margin-tb-sm margin-right-xs"></text>
			</view>
			<!-- 文章的标题 End -->
			
			<image  :src="item.image" mode="scaleToFill" class="img-has-size"></image>
	
			<!-- 大致文章显示 Start -->
			<view class="flex flex-direction margin-top-sm">
				<view class="flex justify-between margin-lr-sm margin-bottom-sm solid-bottom" @tap="detail" :data-id="article.id" v-for="(article, index) in item.list" :key="index">
					<image class="img-has-small-size radius margin-bottom-xs" :src="article.image_input[0]" ></image>
					<view class="flex flex-direction justify-around" style="width: 450rpx;">
						<text class="text-df text-black text-cut">{{article.title}}</text>
						<text class="text-df text-cut-two text-gray">{{article.synopsis}}</text>
						<view class="flex justify-between">
							<text class="text-sm text-grey">{{article.add_time}}</text>
							<view class="flex text-grey">
								<text class="cuIcon-attention margin-right-xs"></text>
								<text class="text-sm">{{article.visit}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 大致文章显示 End -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				articleList: [],
			}
		},
		onShow() {
			this.getArticleIndex()
		},
		methods: {
			getArticleIndex: function() {
				var that = this;
				that.baseGet(
					that.U({ c: 'article_api', a: 'get_article_index' }),
					function(res) {
						console.log((res.data));
						that.setData({ articleList: res.data });
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
			detail(e) {
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: "/pages/list/list_detail/list_detail?id="+id,
				})
			},
			getList(e) {
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({
					url: "/pages/list/more_list/more_list?id="+id,
				})
			},
		}
	}
</script>

<style scoped>
	.img-has-small-size{
		width: 240rpx;
		height: 180rpx;
	}
	.img-has-size{
		width: 750rpx;
		height: 300rpx;
	}
	
</style>
