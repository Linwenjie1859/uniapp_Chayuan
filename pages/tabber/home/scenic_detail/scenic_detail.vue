<template>
	<view class="bg-white" style="height: 100vh;">
		<view class="flex flex-direction bg-white padding-sm">
			<view class="flex flex-direction margin-bottom-sm solid-bottom padding-bottom-xs" v-for="(item,index) in scenicInfo" :key="index" >
				<image :src="item.image_input" mode="widthFix" style="width: 710rpx;" class="radius-sm margin-tb"></image>
				<text class="text-bold text-lg">{{item.name}}</text>
				<text class="text-grey text-lg margin-tb-xs text-cut-two">{{item.synopsis}}</text>
					
				<text class=" text-lg margin-bottom-xs" @tap="navToMap(item)"><text class="cuIcon-locationfill text-orange text-xxl margin-right-xs"></text> {{item.store_address}}</text>
				
				<view class="flex justify-between align-center">
					<text class="text-lg margin-bottom-xs" @tap="phoneCall(item.telephone)"><text class="cuIcon-phone text-green text-xxl margin-right-xs"></text> {{item.telephone}}</text>
					<text class=" text-xl text-red text-price">{{item.ticket_price}}/人</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cid:-1,
				scenicInfo:{}
			}
		},
		onLoad(e) {
			this.cid = e.id;
			this.getScenicInfo();
		},
		methods: {
			// 拨打电话功能
			phoneCall(phone){
				uni.makePhoneCall({
					phoneNumber:phone,
					success: (res) => {
						console.log(res);
					},
					fail: (res) => {
						console.log(res);
					}
				})
			},
			getScenicInfo() {
				let that = this;
				that.baseGet( 
					that.U({ c: 'scenic_api', a: 'get_scenic_by_cid',q: {
							cid:that.cid
					}}),
					function(res) {
						that.scenicInfo = res.data
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
			navToMap() {
				let that=this;
				uni.getLocation({
				 type: 'gcj02', //返回可以用于uni.openLocation的经纬度 
					success: function (res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function () {
								
							},
						});
					}
				})
			},
			
		}
	}
</script>

<style>

</style>
