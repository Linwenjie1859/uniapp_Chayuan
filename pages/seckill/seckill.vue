<template>
	<view class="bg-white" style="min-height: 100vh;">
		<view class="flex flex-direction">
			<scroll-view scroll-x="true" show-scrollbar="true">
				<view class="flex bg-red text-white" style="width: 150%;">
					<view  class="flex flex-direction padding-tb-sm margin-lr" style="width: 300rpx;" v-for="(item,index) in seckillTimeList.seckillTime" :key="index"  @tap="changeOneTimeInfo(item.id)">
						<view class="flex text-lg text-bold">
							{{item.state}}
						</view>
						<text class="margin-top-xs">{{item.time}}</text>
					</view>
				</view>
			</scroll-view>
			
			<view class="flex flex-direction">
				<view class="flex align-center justify-between padding-sm"   v-for="(item,index) in oneTimeInfoList" :key="index">
					 <image :src="item.image" mode="scaleToFill" class="radius margin-right-sm" style="width: 230rpx; height: 210rpx;"></image>
					 <view class="flex flex-direction" style="width: 460rpx;">
						<view class="flex">
							<text class="text-df text-cut-two margin-tb-sm">{{ item.info }}</text>
						</view>
						
						<view class="flex margin-bottom-sm justify-between">
							<view class="cu-progress round sm" style="width: 60%;">
								<view :class="{'bg-red':isAllowFlag,'bg-grey':!isAllowFlag}" :style="{width:(nowDate-item.start_time)/(item.stop_time-item.start_time)*100+'%'}"></view>
							</view>
							<text class="text-grey text-sm">已抢购:{{item.sales}}</text>
						</view> 
						
						<view class="flex align-center justify-between">
							<view class="flex align-center self-end">
								<text class="text-price text-red text-lg">{{item.price}}</text>
								<text class="text-price text-grey text-sm text-line-through margin-left-xs">{{item.ot_price}}</text>
							</view>
							<view @tap="nowToSeckill(index)" class="padding-tb-xs padding-lr-sm text-df radius-sm"  :class="{'bg-red':isAllowFlag,'bg-grey':!isAllowFlag}" >立即抢购<text class="cuIcon-right"></text></view>
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
				seckillTimeList:[],
				oneTimeInfoList:[],
				isAllowFlag:false,
				nowDate:1,
			}
		},
		onLoad() {
			this.getSeckillInfo();
			this.nowDate = Math.floor(new Date().getTime()/1000);
		},
		methods: {
			//获取全部时间段信息
			getSeckillInfo(){
				let that=this;
				that.basePost(
					that.U({ c: 'seckill_api', a: 'seckill_index'}),
					{},
					function(res) {
						that.seckillTimeList = res.data;
						that.changeOneTimeInfo(res.data.seckillTime[res.data.seckillTimeIndex].id);
					},
					function(res) {
						console.log(res);
					}
				);
			},
			//获取某个时间段的商品
			changeOneTimeInfo(id){ 
				let that=this;
				if(id == that.seckillTimeList.seckillTime[that.seckillTimeList.seckillTimeIndex].id){
					that.isAllowFlag=true;
				}else{
					that.isAllowFlag=false;
				}
				that.oneTimeInfoList=[];
				that.basePost(
					that.U({ c: 'seckill_api', a: 'seckill_list'}),
					{
						time:id
					},
					function(res) {
						that.oneTimeInfoList=res.data;
					},
					function(res) {
						console.log(res);
					}
				);
			},
			//现在立即秒杀
			nowToSeckill(index){
				let that=this;
				that.isLogin();
				if(!that.isAllowFlag){
					uni.showToast({
						title:"当前不是该时段,无法抢购",
						icon:"none"
					})
					return ;
				}
				that.basePost(
					that.U({ c: 'auth_api', a: 'redis_seckill'}),
					{
						productId:that.oneTimeInfoList[index].product_id,
						merId:that.oneTimeInfoList[index].mer_id,
						secKillId:that.oneTimeInfoList[index].id,
						type:that.oneTimeInfoList[index].type,
						totalPrice:that.oneTimeInfoList[index].price,
					},
					function(res) {
						that.requestPayment();
					},
					function(res) {
						uni.showToast({
							title:res.msg,
							icon:"none"
						})
					}
				);
			},
			async requestPayment() {
			    this.providerList[0].loading = true;
			    let orderInfo = await this.getOrderInfo_uniapp(this.providerList[0].id);
			    if (orderInfo.statusCode !== 200) {
			        console.log("获得订单信息失败", orderInfo);
			        uni.showModal({
			            content: "获得订单信息失败",
			            showCancel: false
			        })
			        return;
			    }
			    uni.requestPayment({
			        provider: this.providerList[0].id,
			        orderInfo: orderInfo.data,
			        success: (e) => {
			            uni.showToast({
			                title: "感谢您的赞助!"
			            })
			        },
			        fail: (e) => {
			            uni.showModal({
			                content: "支付失败,原因为: " + e.errMsg,
			                showCancel: false
			            })
			        },
			        complete: () => {
			            this.providerList[1].loading = false;
			        }
			    })
			},
			
			getOrderInfo_uniapp(e) { 
			    let appid = "";
			    // #ifdef APP-PLUS
			    appid = plus.runtime.appid;
			    // #endif
			    let url = 'https://demo.dcloud.net.cn/payment/?payid=' + e + '&appid=' + appid + '&total=0.1' ;
			    return new Promise((res) => {
			        uni.request({
			            url: url,
			            success: (result) => {
			                res(result);
			            },
			            fail: (e) => {
			                res(e);
			            }
			        })
			    })
			},
		}
	}
</script>

<style>

</style>
