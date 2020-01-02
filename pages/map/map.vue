<template>
	<view>
	<!-- 	<web-view :src="`http://api.map.baidu.com/geocoder?location=${mapInfo.lat},${mapInfo.lng}&coord_type=gcj02&output=html&src=webapp.baidu.openAPIdemo`">
		</web-view> -->
		<web-view v-if="flag" :src="`http://api.map.baidu.com/marker?location=${mapInfo.lat},${mapInfo.lng}&title=${mapInfo.store_name}&content=${mapInfo.store_name}&output=html&src=webapp.baidu.openAPIdemo`">
		</web-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			flag:false,
			mapInfo: {}
		};
	},
	onLoad(res) {
		let that=this;
		console.log(JSON.parse(res.mapInfo));
		that.mapInfo = JSON.parse(res.mapInfo);
		setTimeout(function() {
			that.flag=true;
		}, 300);
	},
	methods: {}
};
</script>

<style></style>
