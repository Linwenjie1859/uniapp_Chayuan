<template>
	<view>
		<view class="flex flex-direction padding-sm bg-white margin-bottom-sm">
			<view class="flex solid-bottom margin-tb-sm">
				<text class="margin-right">收货人</text>
				<input type="text" v-model="realName" placeholder="请输入收货人" />
			</view>
			
			<view class="flex solid-bottom margin-tb-sm">
				<text class="margin-right">手机号</text>
				<input type="number" v-model="phone" placeholder="请输入手机号" />
			</view>
			
			<view class="flex solid-bottom margin-tb-sm">
				<text class="margin-right">所在地区</text>
				<view class="input" @tap="chooseCity">{{region.label}}</view>
			</view>
	
			<view class="flex margin-tb-sm">
				<textarea type="text" v-model="detail" placeholder="请输入详细地址" />
			</view>
		</view>
		
		<view class="flex flex-direction padding-sm bg-white margin-bottom-sm">
			<view class="flex justify-between">
				<text>设置默认</text>
				<switch :checked="isDefault" color="#51c77d" style="transform:scale(0.7)" @change="isDefaultChange"/>
			</view>
		</view>
	
		<view class="flex flex-direction padding-sm bg-white margin-bottom-sm" v-if="id!=-1" @tap="deleteAddress">
			<view class="flex justify-between"> 
				<text class="text-red">删除收货地址</text>
			</view>
		</view>
	
		<button class="bg-gradual-green round margin-lr" style="width: 690rpx;" @tap="saveAddress" >保存</button>
		<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValue" @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>	
	</view>
</template>

<script>
	import mpvueCityPicker from '@/components/mpvue-citypicker/mpvueCityPicker.vue'
	
	export default {
		components: {
			mpvueCityPicker
		},
		data() {
			return {
				id:-1,
				realName:"",
				phone:"",
				detail:"",
				isDefault:false,
				cityPickerValue: [0, 0, 1],
				region:{label:"请选择地址",value:[],cityCode:""}
			};
		},
		onLoad(e) {
			if(e.id){
				this.id=e.id;
				this.getAddressInfo();
			}
		},
		methods: {
			//删除收货地址
			deleteAddress(){
				let that=this;
				uni.showModal({
					title: '提示',
					content: '确定删除该收货地址？',
					success: function(res) {
						if (res.confirm) {
							that.basePost(
								that.U({ c: 'user_api', a: 'remove_user_address'}),
								{
									addressId:that.id
								},
								function(res) {
									that.Tips({title:"删除成功！"});
									//删除成功返回上一个页面
									uni.navigateBack({
										delta:1
									})
								},
								function(res) {
									console.log(res);
								},
							);
						} else if (res.cancel) {
							return;
						}
					}
				});
			},
			//编辑地址前获取地址信息
			getAddressInfo(){
				let that=this;
				console.log(this.id);
				that.basePost(
					that.U({ c: 'user_api', a: 'get_user_address'}),
					{
						addressId:that.id
					},
					function(res) {
						console.log(res.data);
						let data=res.data;
						that.realName=data.real_name;
						that.phone=data.phone;
						that.detail=data.detail;
						that.isDefault=data.is_default=="0"?false:true;
						that.region.label=data.province+'-'+data.city+'-'+data.district;
					},
					function(res) {
						console.log(res);
					},
				);
			},
			//是否设置为默认
			isDefaultChange(e){
				this.isDefault = e.detail.value;
				console.log(this.isDefault);
			},
			// 添加地址
			saveAddress(){
				let that=this;
				let array=that.region.label.split("-");
				if(that.realName == ''){
					that.Tips({ title: "请输入收货人"});
					return;
				}
				if(!that.checkMobile(that.phone)){
					that.Tips({ title: "请输入正确的手机号"});
					return;
				}
			
				if(that.region.label=='请选择地址'){
					that.Tips({ title: "请选择所在地区"});
					return;
				}
				if(that.detail == ''){
					that.Tips({ title: "请填写详细地址"});
					return;
				}
				that.basePost(
					that.U({ c: 'user_api', a: 'edit_user_address'}),
					{
						real_name:that.realName,
						phone: that.phone,
						pwd: that.pwd,
						detail:that.detail,
						is_default:that.isDefault,
						address:{
							province:array[0],
							city:array[1],
							district:array[2],
						},
						id:that.id==-1?'':that.id
					},
					function(res) {
						that.Tips({title:'添加地址成功'},{tab:3 ,url :1});
					},
					function(res) {
						console.log(res);
					},
				);
			},
			onCancel(e) {
			},
			chooseCity() {
				this.$refs.mpvueCityPicker.show()
			},
			onConfirm(e) {
				this.region = e;
				this.cityPickerValue = e.value;
				console.log(e);
			},
		},
	};
</script>

<style>
	
</style>
