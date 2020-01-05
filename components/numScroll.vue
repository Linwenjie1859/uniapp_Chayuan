<template>
	<view class="content">
		<!-- num 是字符串，会被切成片渲染 -->
		<view class="position-relative" v-for="(key,value) in num" :key="value">
			<view class="has-transition" :style="'transform: translateY(-'+(key*70)+'rpx);'" >
				<view class="position-relative position-absolute" v-for="(item,index) in range" :style="'transform: translateY('+(index*100)+'%);'" :key="index">
					{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	let range = new Array(10).fill(0).map((item,index) => index);
	
	export default {
		props:{
			value:{
				type: String,
				default: '1659'
			}
		},
		data() {
			return {
				num:'0',	//当前显示数字
				range:range,//0-9
				turnTime: 100,//定时器时间 单位毫秒  可控制数字滚动快慢 数字越高滚动频率越慢
				showNumber:0,
				nowNumber:0,
			}
		},
		onLoad() {
			this._getNumber();
		},
		// onReady() {
		// 	setTimeout(()=>{
		// 		this._getNumber();
		// 	},2000);
		// },
		watch:{
			value(){
				this._getNumber();
			}
		},
		methods: {
			// 这里是保留两位小数的
			_getNumber(){
				
				if(this.num == this.value){
					return
				}
				
				// 我的思路是把数字切成一个数组，每个字符对应一个下标
				this.showNumber = this.num.toString().split('');
				this.nowNumber = this.value.toString().split('');
				
				let showLen = this.showNumber.length;	//111
				let nowLen = this.nowNumber.length;		//2222
				
				let key = showLen > nowLen ? 'nowNumber' : 'showNumber';
				
				// 这个函数是用来补位的，例如原来是1，新数字是100，那么要给位数少的补位 1 ==> 001
				this._formatNumber(key,showLen,nowLen);
				
				// 这个是数字变化滚动的具体函数
				this._turnNumber();
			},
			
			_formatNumber(key,oldV,newV){
				let length = Math.abs(oldV - newV);
				let arr = new Array(length).fill(1);
				this[key] = arr.concat(this[key]);
			},
			
			_turnNumber(){
				
				let _this = this;
				// 循环数字数组，
				_this.showNumber.forEach((e,i) => {
					// 判断对应位数的值，如果相等就跳过
					if(e == _this.nowNumber[i]) return;
					
					let inter = setInterval(() => {
						// 数值相等后清除定时器
						if(e == _this.nowNumber[i]){
							clearInterval(inter);
						}else{
							// 如果大于就 --  小于就 ++
							_this.showNumber[i] = e > _this.nowNumber[i] ? --e : ++e;
							// 每次值变化都更新到视图上，这样看上去就像是滚动了一下。好吧，其实就是滚动了
							_this.num = parseInt(_this.showNumber.join('')).toFixed(0);
						}
						
					},_this.turnTime);
				})
				
			},
			
		}
	}
</script>

<style>
	.content{
		text-align: center;
	}
	
	.position-relative{
		display: inline-block;
		width: 45rpx;
		text-align: center;
		height: 70rpx;
		line-height: 70rpx;
		border: 1rpx solid ;
		border-radius: 2rpx;
		color: #39b54a;
		margin:40rpx 10rpx;
		overflow: hidden;
		position: relative;
		background-color: #d7f0dbff;
		font-size: 36rpx;
		font-weight: bold;
	}
	
	.has-transition{
		width: 100%;
		height: calc(100% * 10);
		position: relative; 
		transition:all 0.5s; 
	}
	
	.position-absolute{
		position: absolute;
		top: 0;
		left: 0;
		margin: 0;
		border: none;
	}
</style>
