<template>
	<view class="bg-white" style="min-height: 100vh;">
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			this.getSeckillInfo();
	
		},
		methods: {
			getSeckillInfo(){
				let that=this;
				that.basePost(
					that.U({ c: 'seckill_api', a: 'seckill_index'}),
					{},
					function(res) {
						console.log(res);
						that.getSeckillList(res.data.seckillTime[res.data.seckillTimeIndex].id);
					},
					function(res) {
						console.log(res);
					}
				);
			},
			getSeckillList(id){ 
				let that=this;
				that.basePost(
					that.U({ c: 'seckill_api', a: 'seckill_list'}),
					{
						time:id
					},
					function(res) {
						console.log(res);
						that.getSeckillDetail(res.data[0].id);
					},
					function(res) {
						console.log(res);
					}
				);
			},
			getSeckillDetail(id){
				let that=this;
				that.basePost(
					that.U({ c: 'seckill_api', a: 'seckill_detail'}),
					{
						id:id
					},
					function(res) {
						console.log(res);
					},
					function(res) {
						console.log(res);
					}
				);
			},
		}
	}
</script>

<style>

</style>
