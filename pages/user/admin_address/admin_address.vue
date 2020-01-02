<template>
	<view>
		<view class="flex flex-direction bg-white" style="height: 100vh; position: relative;">
			<view class="flex justify-between padding align-center margin-bottom-sm solid-bottom"  v-for="(item,index) in addressList" :key="index" >
				<view class="flex align-center"  @click="changeDefault(index,item.id)" @tap="chooseAdd(item)">
					<view class="flex flex-direction justify-center align-center round bg-grey" style="height: 70rpx; width: 70rpx;">
						<text class="text-xxl">{{item.real_name | subString}}</text>
					</view>
					<view class="flex flex-direction margin-left-sm">
						<view class="flex align-center margi-bottom-xs">
							<text class="text-lg margin-right-sm">{{item.real_name}}</text>
							<text class="text-df self-end text-grey">{{item.phone}}</text>
						</view>
						<view class="flex flex-wrap align-center" style="width: 500rpx;">
							<view class="bg-red light radius padding-lr-xs margin-right-sm" v-if="index==currentDefault">
								<text class="text-orange">默认</text>
							</view>
							<text>{{item.province}} {{item.city}} {{item.district}} {{item.detail}}</text>
						</view>
					</view>
				</view>
				<view class="flex self-end" @tap="editAddress(item.id)">
					<text class="text-grey solid-left padding-left-sm padding-right-xs">编辑</text>
				</view>
			</view>
			<button type="primary" @tap="addAddress" class="bg-gradual-green round margin-lr" style="position: absolute;bottom: 30rpx;width: 690rpx;">添加新地址</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentDefault:0,
				addressList:[],
				clickFlag:0,
			}
		},
		onShow() {
			this.getAddressList();
		},
		onLoad(e) {
			this.clickFlag=e.clickFlag;
		},
		methods: {
			//点击选中收获地址、不修改默认地址
			chooseAdd(info){
				let that=this;
				if(!that.clickFlag)return;
				that.Tips({title:'修改收获地址成功'});
				let pages = getCurrentPages();  //获取所有页面栈实例列表
				let nowPage = pages[ pages.length - 1];  //当前页页面实例
				let prevPage = pages[ pages.length - 2 ];  //上一页页面实例
				prevPage.$vm.defaultAddress=info;
				uni.navigateBack({  //uni.navigateTo跳转的返回，默认1为返回上一级
					delta: 1
				});
			},
			//改变默认
			changeDefault(index,id){
				if(this.clickFlag)return;
				console.log("修改");
				let that=this;
				that.currentDefault=index;
				that.basePost(
					that.U({ c: 'user_api', a: 'set_user_default_address'}),
					{addressId:id},
					function(res) {
						console.log(res);
					},
					function(res) {
						console.log(res);
					},
				);
			},
			//添加收货地址
			addAddress(){
				uni.navigateTo({
					url: '/pages/user/add_address/add_address'
				});
			},
			//获取用户的所有收获地址
			getAddressList(){
				let that=this;
				that.basePost(
					that.U({ c: 'user_api', a: 'user_address_list'}),
					{},
					function(res) {
						that.addressList=res.data;
						//循环遍历得到默认地址位置
						for(let i=0;i<that.addressList.length;i++){
							if(that.addressList[i].is_default==1){
								that.currentDefault=i;
								break;
							}
						}
						console.log(that.currentDefault);
					},
					function(res) {
						console.log(res);
					},
				);
			},
			//编辑收货地址
			editAddress(id) {
				uni.navigateTo({
					url: '/pages/user/add_address/add_address?id='+id
				});
			},
			
		}
	}
</script>

<style scoped>

</style>
