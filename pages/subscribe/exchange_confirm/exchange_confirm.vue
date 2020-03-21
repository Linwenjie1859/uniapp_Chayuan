<template>
	<view>
		<!-- 收货地址信息 -->
		<view class="margin-sm  padding bg-white has-radius">
			<view class="flex align-center">
				<view class="bg-gradual-orange round has-padding-sm"><text class="cuIcon-locationfill text-white " style="font-size: 32rpx;"></text></view>
				<view class="flex flex-direction flex-sub margin-left-sm ">
					<view class="flex align-center">
						<text class="text-lg margin-right-sm">{{defaultAddress.real_name}}</text>
						<text class="text-df self-end text-grey">{{defaultAddress.phone}}</text>
					</view>
					<view class="flex justify-between margin-top-sm" @tap="address">
						<text v-if="defaultAddress==''" class="text-black text-df">添加收货地址</text>
						<text v-else class="text-black text-df">{{defaultAddress.province}}{{defaultAddress.city}}{{defaultAddress.district}}{{defaultAddress.detail}}</text>
						<text class="cuIcon-right text-grey"></text>
					</view> 
					<text class="margin-top-sm text-orange text-sm">收货不便时，可选择免费暂存服务</text>
				</view>
			</view>
		</view>
		<!-- 收货地址信息 end-->
	
		<!-- 商品确认信息 -->
		<view class="flex flex-direction">
			<view class="flex flex-direction bg-white has-radius padding-sm margin-lr-sm margin-tb-xs" v-for="(item,index) in cartInfo" :key="index">
				<!-- 店铺名称 -->
				<view class="flex align-center">
					<text class="cuIcon-shop text-red text-xxl"></text>
					<text class="text-lg text-black margin-left-xs text-bold text-cut">{{item.data[0].merchant_name}}</text>
				</view>
				<!-- 店铺名称 end-->
				<!-- 商品信息 -->
				<view class="flex flex-direction margin-top-sm justify-between" v-for="(ite,ind) in item.data" :key="ind">
					<view class="flex justify-between margin-bottom-sm">
						<view class="flex margin-right-sm">
							<image class="radius" :src="ite.productInfo.exchange_image" mode="scaleToFill" style="width: 190rpx; height: 180rpx;"></image>
						</view>
						<view class="flex flex-direction" style="width: 555rpx;">
							<view class="flex margin-tb-sm justify-between">
								<!-- <view class="bg-gray light padding-xs radius margin-right-xs"><text class="text-sm text-cut">蔚限定皮肤:虎痴之拳,2019中秋首款</text></view> -->
								<text class="text-black text-df text-cut-two">{{ite.productInfo.store_name}}</text>
								<text class="text-grey self-end text-xs margin-right-xs">x{{ite.cart_num}}</text>
							</view>
							<view class="flex justify-between align-center">
								<text class="text-grey text-sm">销量：{{ite.productInfo.sales}}{{ite.productInfo.unit_name}}</text>
								<text class="text-price text-df text-orange">{{ite.productInfo.price}}</text>
							</view>
						</view>
					</view>
					
					<view class="flex justify-between margin-bottom-sm">
						<view class="flex margin-right-sm">
							<image class="radius" :src="ite.storePack.pack_image" mode="scaleToFill" style="width: 190rpx; height: 180rpx;"></image>
						</view>
						<view class="flex flex-direction" style="width: 555rpx;">
							<text class="text-black text-df text-cut-two">{{ite.storePack.name}}</text>
							<text class="text-grey text-sm text-cut-two margin-tb-sm">{{ite.storePack.describe}}</text>
							<view class="flex justify-between align-center">
								<text class="text-price text-df text-orange">{{ite.storePack.pack_cost}}</text>
								<text class="text-grey  text-xs ">x{{ite.cart_num}}</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 商品信息 end-->
	
				<view class="flex margin-top align-center text-sm">
					<view class="flex flex-sub justify-end margin-right-sm"><text class="text-black">服务类型</text></view>
					<view class="flex flex-treble  justify-end text-grey align-center">
						<text>72小时之内发货</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
		
				
				<view class="flex margin-top align-center text-sm">
					<view class="flex flex-sub justify-end margin-right-sm"><text class="text-black">专享折扣</text></view>
					<view class="flex flex-treble justify-end text-black align-center">
						<text>88vip专享9.5折,省{{currentCouponPrice}}元</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				
				<view class="flex margin-top align-center text-sm">
					<view class="flex flex-sub justify-end margin-right-sm"><text class="text-black">配送方式</text></view>
					<view class="flex flex-treble text-grey align-center justify-end">
						<text class="text-grey">免邮费</text>
						<text class="cuIcon-right"></text>
					</view>
				</view>
				
				
				<view class="flex margin-top align-center text-sm">
					<view class="flex flex-sub justify-end margin-right-sm"><text class="text-black">买家留言</text></view>
					<view class="flex flex-treble justify-start text-grey align-center ">
						<input type="text" v-model="createOrder.mark" placeholder="选填,请先和卖家进行商量"/>
					</view>
				</view>
				
				<view class="flex margin-top align-center justify-end text-df">
					<text class="text-grey margin-right-xs">共{{item.count_num}}件</text>
					<text class="text-black">小计：</text>
					<text class="text-price text-orange">{{priceGroup.totalPrice}}</text>
				</view>
			</view>
		</view>
		<view style="padding-top: 100rpx;"></view>
		<!-- 商品确认信息 end-->
		<view class="flex justify-end bg-white cu-bar foot align-center padding-lr" >
			<view class="flex align-center">
				<text class="text-grey">共{{sumNum}}件，</text>
				<view class="margin-right-sm text-black">
					合计
					<text class="text-price text-red text-df margin-left-xs">{{priceGroup.totalPrice}}</text>
				</view>
				<view class="bg-gradual-green round  cu-btn" @tap="settlement">提交订单</view>
				
				<!-- #ifdef APP-PLUS -->
			<!-- 	<template v-if="providerList.length > 0">
					<view class="bg-gradual-green round  cu-btn"   @click="requestPayment(providerList[0],0)"
				        :loading="item.loading">提交订单</view>
				</template> -->
				<!-- #endif -->
				
			</view>
		</view>
		<!-- 模态窗 Start -->
		<view class="cu-modal bottom-modal" :class="payModalFlag?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white solid-bottom">
					<view class="action text-grey" @tap="hideOrOpenModal"><text class="cuIcon-close text-xxl"></text></view>
					<view class="action text-black">确认付款</view>
					<view class="action text-blue"><text class="cuIcon-question text-xxl"></text></view>
				</view>
				<view class="padding-xl bg-white">
					<view class="flex flex-direction">
						<view class="flex align-center justify-center">
							<text class="text-has-size text-price text-black text-bold">{{priceGroup.totalPrice}}</text>
						</view>
						<view class="flex align-center justify-between margin-tb-sm">
							<text class="text-grey">订单编号</text>
							<text class=" text-black ">{{orderId}}</text>
						</view>
						<view class="flex align-center justify-between ">
							<text class="text-grey">付款方式</text>
							<text class=" text-black ">支付宝</text>
						</view>
					</view>
				</view>
				<view class="bg-has-gray light padding text-black" @tap="payMoney">
					立即付款
				</view>
			</view>
		</view>
		<!-- 模态窗 End -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				priceGroup:{},
				payModalFlag:false,
				array: [
					{
						coupon_title:'未选择',
						coupon_price:0,
					},
				],
				currentCouponPrice:0,	//当前优惠的金额
				couponIndex: 0,	//当前选中的优惠券下标
				/******************/
				
				listId:'',	//要结算的订单的id编号集
				cartInfo:[],	//根据id编号集查询到的信息
				defaultAddress:{
					city: "",
					detail: "",
					district: "",
					id: "",
					is_default: "",
					phone: "",
					province: "",
					real_name: "",
				},	//默认收货地址
				createOrder:{
					addressId:'',
					couponId:'',
					userIntegral:'',
					mark:''
				},
				orderKey:"",
				mer_id:0,	//店铺id
				providerList: [],	//支付列表
				
				orderId:'',		//订单提交后获得信息显示在模态窗中
				id:'',			//订单主键id
				productId:'',	//商品id
			}
		},
		onLoad(e) {
			this.listId=e.listId;	//1、直接购买就是一个id 2、购物车结算就可以是多个id
			this.getAddressList();	
			this.getOrderInfo();
			// #ifdef APP-PLUS
			uni.getProvider({
			    service: "payment",
			    success: (e) => {
			        console.log("payment success:" + JSON.stringify(e));
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
		computed:{
			//计算总的商品个数
			sumNum (){
				let temp=0;
				for(let i=0;i<this.cartInfo.length;i++){
					 temp += parseInt(this.cartInfo[i].count_num);
				}
				return temp
			},
			//计算总价钱
			sumPrice (){
				let temp=0;
				for(let i=0;i<this.cartInfo.length;i++){
					 temp += this.cartInfo[i].count_price;
				}
				return parseFloat(temp+'');
			},
		},
		methods: {
			//支付成功之后修改订单状态
			updatePayStatus(){
				let that = this;
				that.baseGet(
					that.U({
						c: 'store_api',
						a: 'exchange_update_pay_status',
						q: {
							order_id: that.orderId,
							product_id:that.productId,
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
			//进行支付跳转操作
			payMoney(){
				let that=this;
				that.basePost(
					that.U({ c: 'pay', a: 'pay'}),
					{
						reqsn:that.orderId,
						sumPrice:that.sumPrice,
						paytype:'A03',
					},
					function(res) {
						uni.showToast({
							title:res.data.errmsg,
							icon:'none'
						})
						that.hideOrOpenModal();
						
					},
					function(res) {
						console.log(res);
					},
				);
			},
			// 关闭支付窗口
			hideOrOpenModal(){
				this.payModalFlag= false;
				uni.redirectTo({
					url:'/pages/user/order_details/order_details?order_id='+this.orderId
				})
			},
			
			//获取默认收货地址
			getAddressList(){
				let that=this;
				that.basePost(
					that.U({ c: 'user_api', a: 'user_default_address'}),
					{},
					function(res) {
						that.defaultAddress=res.data;
					},
					function(res) {
						console.log(res);
					},
				);
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
			//获取订单信息
			getOrderInfo(){
				let that = this;
				that.basePost(
					that.U({ c: 'auth_api', a: 'confirm_order' }),
					{
						cartId:that.listId,
						type:3,				//type:3代表是兑换商品
					},
					function(res) { 
						that.cartInfo = that.SortData(res.data.cartInfo);
						that.orderKey=res.data.orderKey;
						that.priceGroup=res.data.priceGroup;
						that.productId=res.data.cartInfo[0].product_id;
					},
					function(res) {
						console.log(res);
					}
				);
			},
			// picker
			bindPickerChange: function(e) {
				this.couponIndex = e.detail.value;
				this.sumPrice+=this.currentCouponPrice;
				this.sumPrice-=this.array[e.detail.value].coupon_price;
				this.currentCouponPrice=this.array[e.detail.value].coupon_price;
			},
			// 选择地址
			address(){
				uni.navigateTo({
					url:"/pages/user/admin_address/admin_address?clickFlag=1"
				}) 
			},
			// 结算
			settlement(){ 
				//创建订单编号
				let that=this;
				that.basePost(
					that.U({ c: 'auth_api', a: 'create_order'}),
					{
						mer_id:that.cartInfo[0].mer_id,
						key:that.orderKey,
						addressId:that.defaultAddress.id,
						couponId:that.array[that.couponIndex].id,
						userIntegral:that.createOrder.userIntegral,
						mark:that.createOrder.mark,
						type:3,						//type:3代表兑换商品,和type:1功能一样
					},
					function(res) { 
						that.orderId=res.data.result.orderId;
						// that.payModalFlag=true;
						that.id=res.data.result.id;
						that.updatePayStatus();
						that.requestPayment();
						// let orderInfo={
						// 	order_id:res.data.result.orderId,
						// 	total_price:that.sumPrice
						// }
						// uni.redirectTo({
						// 	url:"/pages/user/confirm_payment/confirm_payment?orderInfo="+JSON.stringify(orderInfo)
						// })
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

<style scoped>
	.bg-has-gray{
		background-color: rgba(255,255,255,0.3);
	}
	.text-has-size{
		font-size: 68rpx;
	}
	.text-price::before{
		font-size: 60%;
	}
.has-radius {
	border-radius: 18rpx;
}
.has-padding-sm {
	padding: 7rpx 11rpx;
}
</style>
