<template>
	<view class="page-my">
		<!-- 用户信息 -->
		<view class="info">
			<view class="avatar">
				<image :src="info.avatar" />
			</view>
			<view class="name">
				<cl-text value="ID:" :size="48" color="#fff"></cl-text>
				<cl-text :value="info.name" :size="48" color="#fff"></cl-text>
			</view>
			<view class="introduction">
				<cl-text :value="info.introduction" :size="24" color="#FF9D9D" :ellipsis="1"></cl-text>
			</view>
		</view>

		<!-- 导航菜单 -->
		<view class="nav">
			<cl-list-item label="会员期限" border>
				<text slot="append" style="color:#333;font-size: 16px;" v-if="1==1">2021.10.15-2022.10.15<text class="btn" @tap="bindVip">绑定会员</text></text>
				<text slot="append" style="color:#333;font-size: 14px;" v-else-if="1==2" @tap="selProduct">
					2021.10.15-2022.10.15<text class="btn">续费会员</text></text>
				<text slot="append" v-else @tap="selProduct"> <text class="btn">开通会员</text></text>
			</cl-list-item>
			<cl-list-item label="观看记录" border @tap="lookList">
				<text slot="append" class="cl-icon-arrow-right"></text>
			</cl-list-item>
			<cl-list-item label="常见问题" border @tap="FQA">
				<text slot="append" class="cl-icon-arrow-right"></text>
			</cl-list-item>
			<cl-list-item label="联系客服" border @tap="contact">
				<text slot="append" class="cl-icon-arrow-right"></text>
			</cl-list-item>
		</view>

		<!-- 充值选择 -->
		<cl-popup :visible.sync="visiblePRO" size="680rpx" direction="bottom">
			<cl-text value="请选择套餐:" :size="48" color="primary"></cl-text>
			<view class="radio-box">
				<cl-radio class="radio-item" border v-model="val" label="1">1个月(30RMB)</cl-radio>
				<cl-radio class="radio-item" border v-model="val" label="2">3个月(80RMB)</cl-radio>
				<cl-radio class="radio-item" border v-model="val" label="3">6个月(150RMB)</cl-radio>
				<cl-radio class="radio-item" border v-model="val" label="4">12个月(300RMB)</cl-radio>
			</view>

			<view class="btn btn1">
				确认
			</view>
			<view style="height:50rpx"></view>
		</cl-popup>

		<!-- 联系客服  -->
		<cl-confirm ref="contact">
			你好，请添加微信：DIN1225
		</cl-confirm>

		<!-- 常见问题  -->
		<cl-dialog title="常见问题" :visible.sync="visibleFQA">

			<view class="">
				<view class="" style="font-size: 16px;text-align: left;font-weight: bold;margin-top:10px;">
					1.开通会员后多久生效？
				</view>
				<view class="" style="font-size: 14px;text-align: left;margin-top: 5px;">
					正常情况喜爱，付款成功后5分钟之内生效；如有问题，请联系客服。
				</view>
			</view>
			<view class="">
				<view class="" style="font-size: 16px;text-align: left;font-weight: bold;margin-top:10px;">
					2.开通会员后多久生效？
				</view>
				<view class="" style="font-size: 14px;text-align: left;margin-top: 5px;">
					正常情况喜爱，付款成功后5分钟之内生效；如有问题，请联系客服。
				</view>
			</view>
			<view class="">
				<view class="" style="font-size: 16px;text-align: left;font-weight: bold;margin-top:10px;">
					3.开通会员后多久生效？
				</view>
				<view class="" style="font-size: 14px;text-align: left;margin-top: 5px;">
					正常情况喜爱，付款成功后5分钟之内生效；如有问题，请联系客服。
				</view>
			</view>
			<view class="">
				<view class="" style="font-size: 16px;text-align: left;font-weight: bold;margin-top:10px;">
					4.开通会员后多久生效？
				</view>
				<view class="" style="font-size: 14px;text-align: left;margin-top: 5px;">
					正常情况喜爱，付款成功后5分钟之内生效；如有问题，请联系客服。
				</view>
			</view>
			<view class="">
				<view class="" style="font-size: 16px;text-align: left;font-weight: bold;margin-top:10px;">
					5.开通会员后多久生效？
				</view>
				<view class="" style="font-size: 14px;text-align: left;margin-top: 5px;">
					正常情况喜爱，付款成功后5分钟之内生效；如有问题，请联系客服。
				</view>
			</view>


		</cl-dialog>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {
					avatar: require("@/static/images/avatar.png"),
					name: "159****0846",
					introduction: "",
				},
				count: [{
						icon: require("@/static/icon/favorites.png"),
						name: "我的收藏"
					},
					{
						icon: require("@/static/icon/comment.png"),
						name: "我的评论"
					},
					{
						icon: require("@/static/icon/like.png"),
						name: "我的点赞"
					},
					{
						icon: require("@/static/icon/history.png"),
						name: "浏览历史"
					},
				],
				visiblePRO: false,
				visibleFQA: false,
				val: "",
				password1: "",
				password2: ""
			};
		},
		methods: {
			// 绑定会员
			bindVip(){
				uni.navigateTo({
					url: "/pages/login/login",
				});
			},
			
			// 选择会员套餐
			selProduct() {
				this.visiblePRO = true;
			},

			// 观看记录
			lookList() {
				uni.navigateTo({
					url: "/pages/index/record",
				});
			},

			// 常见问题
			FQA() {
				this.visibleFQA = true;
			},

			// 联系客服
			contact() {
				this.$refs["contact"].open({
					title: "温馨提示",
					showCancelButton: false,
					callback: ({
						action
					}) => {
						console.log(action);
					}
				});
			}
		},
	};
</script>

<style lang="scss">
	.page-my {
		.info {
			width: 100%;
			padding: 38rpx 30rpx;
			background-color: #f5393b;
			box-sizing: border-box;

			.avatar {
				width: 129rpx;
				height: 129rpx;
				margin: 0 auto;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				margin-top: 16rpx;
				text-align: center;
			}

			.introduction {
				margin-top: 12rpx;
				padding: 0 30rpx;
				text-align: center;
			}

			.avatar {
				width: 129rpx;
				height: 129rpx;
				margin: 0 auto;
				border-radius: 50%;
				overflow: hidden;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.name {
				margin-top: 16rpx;
				text-align: center;
			}

			.introduction {
				margin-top: 12rpx;
				padding: 0 30rpx;
				text-align: center;
			}
		}

		.count {
			display: flex;
			padding: 46rpx 34rpx;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 84rpx;
				text-align: center;
				flex: 1;
			}

			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 50rpx;
				height: 50rpx;
				margin-bottom: 28rpx;

				image {
					max-width: 50rpx;
					max-height: 50rpx;
				}
			}

			.name {
				font-size: 22rpx;
				font-weight: 400;
				color: #333333;
			}
		}

		.line {
			width: 100%;
			height: 15rpx;
			background-color: #fafafc;
		}

		.nav {
			padding: 0 32rpx;

			.cl-list-item {
				padding: 4rpx 6rpx;
			}

			.cl-list-item__label {
				font-size: 28rpx;
				font-weight: 400;
				color: #252737;
			}

			&>text {
				color: #cacad6;
			}
		}

		.btn {
			display: inline-block;
			width: 150rpx;
			height: 57rpx;
			margin-left: auto;
			border: 2rpx solid #d43c3d;
			box-shadow: 0 6rpx 20rpx 0 rgba(249, 88, 89, 0.3);
			border-radius: 29rpx;
			color: #F95859;
			text-align: center;
			line-height: 57rpx;
			margin-left: 30rpx;
		}

		.btn1 {
			display: block;
			width: 100%;
			height: 80rpx;
			margin: 0 auto;
			border: 1rpx solid #d43c3d;
			border-radius: 40rpx;
			color: #F95859;
			text-align: center;
			line-height: 80rpx;
		}

		.radio-box {
			width: 100%;
			padding: 30rpx 0;
			box-sizing: border-box;
		}

		.radio-item {
			width: 100%;
			height: 45px;
			padding: 10px;
			line-height: 25px;
			box-sizing: border-box;
			margin: 5rpx auto;
			justify-content: space-around;
		}
	}
</style>
