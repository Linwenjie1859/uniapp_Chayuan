<template>
	<view class="content">
		<view class="scenery_list">
			<view class="list_view">
				<view class="scenery" @tap="detail">
					<image class="scenery_img" src="/static/fengyang.png" mode=""></image>
					<view class="info_list">
						<text class="font-32 text_limit">四季分明，夏天无酷热</text>
						<text class="font-28 text_info">凤阳镇位于福建省寿宁县东南部，地处白云山麓 ，西与周宁交界，南与福安市相连，东与武曲镇毗邻，北与斜滩镇接壤。</text>
						<view class="see_list">
							<text class="font-24 gray">2019-07-31</text>
							<view class="num">
								<image src="/static/see.png" mode=""></image>
								<text class="font-24 gray">532</text>
							</view>
						</view>
					</view>
				</view>
				<view class="scenery" @tap="detail">
					<image class="scenery_img" src="/static/fengyang.png" mode=""></image>
					<view class="info_list">
						<text class="font-32 text_limit">四季分明，夏天无酷热</text>
						<text class="font-28 text_info">凤阳镇位于福建省寿宁县东南部，地处白云山麓 ，西与周宁交界，南与福安市相连，东与武曲镇毗邻，北与斜滩镇接壤。</text>
						<view class="see_list">
							<text class="font-24 gray">2019-07-31</text>
							<view class="num">
								<image src="/static/see.png" mode=""></image>
								<text class="font-24 gray">532</text>
							</view>
						</view>
					</view>
				</view>
				<view class="scenery" @tap="detail">
					<image class="scenery_img" src="/static/fengyang.png" mode=""></image>
					<view class="info_list">
						<text class="font-32 text_limit">四季分明，夏天无酷热</text>
						<text class="font-28 text_info">凤阳镇位于福建省寿宁县东南部，地处白云山麓 ，西与周宁交界，南与福安市相连，东与武曲镇毗邻，北与斜滩镇接壤。</text>
						<view class="see_list">
							<text class="font-24 gray">2019-07-31</text>
							<view class="num">
								<image src="/static/see.png" mode=""></image>
								<text class="font-24 gray">532</text>
							</view>
						</view>
					</view>
				</view>
				<view class="scenery no_border" @tap="detail">
					<image class="scenery_img" src="/static/fengyang.png" mode=""></image>
					<view class="info_list">
						<text class="font-32 text_limit">四季分明，夏天无酷热</text>
						<text class="font-28 text_info">凤阳镇位于福建省寿宁县东南部，地处白云山麓 ，西与周宁交界，南与福安市相连，东与武曲镇毗邻，北与斜滩镇接壤。</text>
						<view class="see_list">
							<text class="font-24 gray">2019-07-31</text>
							<view class="num">
								<image src="/static/see.png" mode=""></image>
								<text class="font-24 gray">532</text>
							</view>
						</view>
					</view>
				</view>
			</view>
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
			detail(e) {
				uni.navigateTo({
					url: "/pages/list/list_detail/list_detail"
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #F2F2F2;
	}

	.scenery_list {
		width: 700upx;
		margin: 25upx auto;
	}

	.scenery_list .list_view {
		width: 700upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
		margin-top: 25upx;
	}

	.scenery_list .scenery {
		width: 650upx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		border-bottom: 1upx solid #E5E5E5;
	}

	.scenery_list .scenery_img {
		width: 240upx !important;
		height: 180upx !important;
		margin-right: 25upx;
	}

	.scenery_list .info_list {
		width: 385upx;
		height: 180upx;
		margin: 25upx 0upx;
	}

	.info_list .text_limit {
		width: 385upx;
		display: block;
		margin-top: -5upx;
		margin-bottom: 10upx;
	}

	.info_list .text_info {
		width: 385upx;
		display: block;
		height: 80upx;
		ine-height: 30px;
		text-align: left;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.see_list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-top: 20upx;
	}

	.see_list .num {
		display: flex;
		align-items: center;
	}

	.see_list .num image {
		width: 30upx;
		height: 22upx;
		margin-right: 10upx;
	}
</style>
