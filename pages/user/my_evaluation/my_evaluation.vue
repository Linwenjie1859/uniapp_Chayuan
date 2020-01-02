<template>
	<view class="bg-white">
		<view v-for="(item,index) in listUnique" :key="index" >
			<view class="shop_info" >
				<image :src="item.image" mode=""></image>
				<text class="font-28">描述相符</text>
				<sunui-star :defaultStar="item.product_score" :maxStar="5"  @changeStar="changeStar" class='sunui-star' :index='0' :currentIndex='index'/>
				<!-- 添加星级评价的时候要在main.js里添加两句话 -->
				<!-- <text class="font-28">满意</text> -->
			</view>
			<textarea class="font-28 margin-top-xs" value="" placeholder="宝贝满意您的期待吗？说说怎么样" v-model="item.comment" />
			<view class="add_pic">
				<robby-image-upload @add="addImage"  showUploadProgress="true" :currentIndex='index'
				serverUrlDeleteImage="http://www.fyang.com/ebapi/public_api/delete_image" 
				serverUrl="http://www.fyang.com/ebapi/public_api/upload"></robby-image-upload>
			</view>
			<view class="score">
				<text class="font-32 title">店铺评分</text>
			<!-- 	<view class="score_list">
					<text class="font-28">符合描述</text>
					<sunui-star :defaultStar="item.service_score" :maxStar="5" @changeStar="changeStar" class='sunui-star'  :index='1' :currentIndex='index'/>
				</view>
				<view class="score_list" >
					<text class="font-28">快递速度</text>
					<sunui-star :defaultStar="item.service_score" :maxStar="5" @changeStar="changeStar" class='sunui-star' :index='2' :currentIndex='index'/>
				</view> -->
				<view class="score_list" >
					<text class="font-28">服务态度</text>
					<sunui-star :defaultStar="item.service_score" :maxStar="5" @changeStar="changeStar" class='sunui-star'  :index='3' :currentIndex='index'/>
				</view>
			</view>
		</view>
		<button class="btn_green" @tap="evaluation">发布</button>
	</view>
</template>

<script>
	import robbyImageUpload from '@/components/robby-image-upload/robby-image-upload.vue'
	export default {
		components: {robbyImageUpload},
		// 星级评分
		data() {
			return {
				listUnique:[],
				arrayList:[],
			}
		},
		onLoad(e) {
			this.listUnique=JSON.parse(e.listUnique);
			this.initInfo();
		},
		methods: {
			addImage(e){
				this.listUnique[e.currentIndex].pics=e.allImages;
				console.log(this.listUnique);
			},
			checkArray(){
				for(var j=0;j<this.listUnique.length;j++){
					for(var i=0;i<4;i++){
						if(this.arrayList[j][i]==0){
							this.Tips({title:'全部商品评价后才能发布哟~'});
							return true;
						}
						
					}
				}
				return false;
			},
			//初始化newsList数据类型
			initInfo() {
				let that=this;
				that.listUnique.forEach(item => {
				
					item['comment']='',
					item['pics']=[],
					item['product_score']=0,
					item['service_score']=0,
					this.arrayList.push([
						0,5,5,0
					])
				});
			},
			//进行评价
			evaluation(){
				let that = this;
				if(this.checkArray()) return;
				for(var i=0;i<that.listUnique.length;i++){
					that.basePost(
						that.U({ c: 'user_api', a: 'user_comment_product'}),
						{
							unique:that.listUnique[i].unique ,
							comment:that.listUnique[i].comment, 
							pics:that.listUnique[i],
							product_score:that.arrayList[i][0],
							service_score:that.arrayList[i][3]
						}, 
						function(res) {
							that.Tips({title:'评价成功!感谢亲~'},{tab:3});
						},
						function(res) {
							console.log(res);
						}
					);
				}
			},
			
			changeStar(e) {
				console.log("6666");
				this.arrayList[e.currentIndex][e.index]=e.curStar
			}
		},	
	}		
</script>

<style>
	.shop_info{
		width: 700upx;
		border-radius: 10upx;
		padding: 25upx;
		display: flex;
		align-items: center;
		border-bottom: 1upx solid #E5E5E5;
		padding-bottom: 25upx;
	}
	.shop_info image{
		width: 115upx;
		height: 115upx;
		margin-right:25upx ;
	}
	sunui-star{
		margin: 0upx 50upx;
	}
	textarea{
		width: 700upx;
		height: 150upx;
		margin: 0 auto;
	}
	.add_pic{
		width: 700upx;
		height: 180upx;
		margin: 0 auto;
		overflow: hidden;
		border-bottom: 1upx solid #E5E5E5;
		padding-bottom: 20upx;
	}
	.score{
		width: 700upx;
		margin: 0 auto;
		margin-bottom: 100upx;
	}
	.score .title{
		width: 700upx;
		display: block;
		margin: 25upx 0upx;
	}
	.score .score_list{
		display: flex;
		align-items: center;
		margin: 5upx 0upx;
	}
</style>
