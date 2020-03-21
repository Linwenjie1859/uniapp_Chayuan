<template>
	<view class="bg-brown" style="min-height: 100vh;">
		<view class="nav fixed" :class="opacityNum==1?'bg-white':''" :style="{'height':StatusAddNav+'px','padding-top':StatusAddHalfNav+'px'}">
			<view class="flex align-center text-white" v-if="opacityNum!=1">
				<text class="cuIcon-back text-xxl" @tap="navToBack" ></text>
				<text class="margin-left-sm text-lg">{{goodsInfo.storeInfo.store_name}}</text>
			</view>
		</view>
		<view class="flex flex-wrap padding-sm" :style="{'padding-top':StatusAddNav+'px'}" >
			<view class="flex flex-direction justify-between radius bg-white padding-sm" style="width: 710rpx;margin-top: 110rpx;">
				<view class="flex justify-center align-center">
					<view class="round bg-white padding-sm" style="margin-top:-110rpx">
						<image :src="goodsInfo.storeInfo.image"  class="round" style="width: 250rpx; height: 250rpx;"></image>
					</view>
				</view>
				<view class="flex align-center justify-between margin-top text-black">
					<view class="flex flex-direction align-center justify-center padding-sm">
						<text class="text-grey text-df">种植面积</text>
						<text class="text-bold text-lg margin-top-xs">{{goodsInfo.storeInfo.area}}</text>
					</view>
					<view class="flex flex-direction align-center justify-center padding-sm">
						<text class="text-grey text-df">种植费用</text>
						<text class="text-bold text-price text-xl margin-top-xs">{{goodsInfo.storeInfo.price}}</text>
					</view>
					<view class="flex flex-direction align-center justify-center padding-sm">
						<text class="text-grey text-df">所在地区</text>
						<text class="text-bold text-lg margin-top-xs">{{goodsInfo.storeInfo.open_address | subStringToCity}}</text>
					</view>
				</view>
				<view class="flex text-grey text-df margin-tb-sm ">
					<text class="text-cut-three">{{goodsInfo.storeInfo.store_info}}</text>
				</view>
				<view class="flex justify-center text-df text-grey">
					目前已经种植
				</view>
				<view class="flex justify-center align-center">
					<num-scroll :value="goodsInfo.storeInfo.sales"></num-scroll>
					<text class="margin-left-xs text-lg">人</text>
				</view>
				<view class="flex align-center text-center justify-center bg-gradual-green round margin-bottom-xs padding-tb-sm text-xl" @tap="purchase">
					<text>立即种植</text>
				</view>
				<view class="flex text-df text-grey margin-top-sm solid-top padding-top justify-center">
					您所支付的费用将提供给啄啄庄园用于打理庄园
				</view>
				<view class="flex justify-center margin-top-sm">
					<image src="../../../static/address.png" mode="widthFix" style="width: 50rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				StatusAddNav:this.StatusAddNav,
				StatusAddHalfNav:this.StatusAddHalfNav,
				opacityNum:0,
				currentGoodsId:0,
				goodsInfo:{
					storeInfo:{
						open_address:''
					}
				},
				cartInfo:{},
				orderKey:'',
				defaultAddress:{},
				providerList: [],	//支付列表
				orderId:'',			//订单Id编码
				id:'',				//订单id
			}
		},
		
		onPageScroll(e) {
			console.log(e);
			this.opacityNum = e.scrollTop >50? 1:0;
		},
		
		onLoad(e) {
			this.currentGoodsId = e.id;
			this.getTreeInfo();
			// #ifdef APP-PLUS
			uni.getProvider({
			    service: "payment",
			    success: (e) => {
			        let providerList = [];
			        e.provider.map((value) => {
			            switch (value) {
			                case 'alipay':
			                    providerList.push({
			                        name: '支付宝',
			                        id: value,
			                        loading: false
			                    });
			                    break;
			                case 'wxpay':
			                    providerList.push({
			                        name: '微信',
			                        id: value,
			                        loading: false
			                    });
			                    break;
			                default:
			                    break;
			            }
			        })
			        this.providerList = providerList;
			    },
			    fail: (e) => {
			        console.log("获取支付通道失败：", e);
			    }
			});
			// #endif
		},
		methods: {
			//支付成功之后修改订单状态
			updatePayStatus(){
				let that = this;
				that.baseGet(
					that.U({
						c: 'store_api',
						a: 'update_pay_status',
						q: {
							order_id: that.orderId,
							product_id:that.currentGoodsId,
							id:that.id
						}
					}),
					function(res) {
						console.log(res);
					},
					function(res) {
						console.log(res);
					},
					true
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
			
			//整理接口返回的数据
			SortData(data){
				let map={};	//存在mer_id
				let array=[];	//所有的数据
				for(var i=0;i<data.length;i++){
					var temp=data[i];
					if(!map[temp.mer_id]){
						array.push({
							count_price:temp.productInfo.price*temp.cart_num,	// 价钱*个数=单个总价
							count_num:temp.cart_num,
							mer_id:temp.mer_id,
							data:[temp],
						})
						map[temp.mer_id]="Occupies a position";
					}else{
						for(var j = 0; j < array.length; j++){
							var existData = array[j];
							if(existData.mer_id == temp.mer_id){
								existData.count_price+=temp.productInfo.price*temp.cart_num,
								existData.count_num+=temp.cart_num
								existData.data.push(temp);
								break;
							}
						}
					}
				}
				return array;
			},
			
			//创建订单编号
			settlement(){ 
				let that=this;
				that.basePost(
					that.U({ c: 'auth_api', a: 'create_order'}),
					{
						mer_id:that.cartInfo[0].mer_id,
						key:that.orderKey,
						couponId:'',
						userIntegral:'',
						mark:'',
						type:2,
						product_id:that.cartInfo[0].data[0].productInfo.id
					},
					function(res) {  
						that.orderId=res.data.result.orderId;
						that.id=res.data.result.id;
						// that.payModalFlag=true;
						let orderInfo={
							order_id:res.data.result.orderId,
							total_price:that.sumPrice
						}
						that.updatePayStatus();
						// #ifdef APP-PLUS
							that.requestPayment();
						// #endif
						
					},  
					function(res) {
						console.log(res);
					}
				);
			},
			
			//用茶树商品的购物车id生成一个订单
			getOrderInfo(cartId){
				let that = this;
				that.basePost(
					that.U({ c: 'auth_api', a: 'confirm_order' }),
					{
						cartId:cartId
					},
					function(res) { 
						that.cartInfo = that.SortData(res.data.cartInfo);
						that.orderKey=res.data.orderKey;
						that.settlement();
					},
					function(res) {
						console.log(res);
					}
				);
			},
			
			// 立即购买
			purchase() {
				let that = this;
				that.isLogin();
				that.baseGet(
					that.U({
						c: 'auth_api',
						a: 'now_buy',
						q: {
							productId: that.goodsInfo.storeInfo.id,
							merId: that.goodsInfo.merInfo.id,
							cartNum: 1
						}
					}),
					function(res) {
						that.getOrderInfo(res.data.cartId);
					},
					function(res) {
						if(res.msg.indexOf("该产品库存不足")!=-1){
							that.Tips({title:res.msg});
						}
					},
					true
				);
			},
			
			//获取茶树信息进行展示
			getTreeInfo(){
				let that = this;
				that.baseGet(
					that.U({
						c: 'store_api',
						a: 'details',
						q: {
							id: that.currentGoodsId
						}
					}),
					function(res) {
						that.goodsInfo = res.data;
						console.log(that.goodsInfo);
					},
					function(res) {
						console.log(res);
					},
					true
				);
			},
			
			// 返回上一个页面
			navToBack(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style scoped>
	
	
.has-backgroung-img{
	background-position: center;
	background-size: cover;
	height: 500rpx;
	width: 345rpx;
	margin-bottom:20rpx;
}
.has-backgroung-img:nth-child(odd){
	margin-right:20rpx;
}
.cu-progress {
	height: 19rpx !important;
	width: 60% !important;
}
.nav.fixed{
	box-shadow: 0 1upx 6upx rgba(0, 0, 0, 0) ;
}
</style>
