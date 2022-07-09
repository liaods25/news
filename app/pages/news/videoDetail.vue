<template>
	<view class="page-detail">
		<view class="title">{{ det.title }}</view>
		<!-- 视频 -->
		<view class="video">
			<video @timeupdate="timeupdate" ref="videos" autoplay="autoplay" :show-fullscreen-btn="isFull"
				:src="video"></video>
			<view class="lock" v-if="lock"></view>
			<view class="lock-text" v-if="lock">
				<view>非常抱歉，当前视频为会员专享</view>
				<view>
					<text class="btn" @tap="selProduct">开通会员</text>
				</view>
			</view>
		</view>
		<view class="into-box">
			<view class="info">
				<view class="avatar">
					<image :src="require('@/static/images/avatar.png')" />
					<text>常在</text>
				</view>
				<view class="like">
					<cl-icon name="cl-icon-eye-open"></cl-icon>
					1225
				</view>
				<view class="comment">
					<cl-icon name="cl-icon-cloud-upload" color="#999999"></cl-icon>
					1个月前
				</view>
			</view>
			<view class="introduction">
				<view class="in-title">
					内容描述：
				</view>
				<view class="in-detail">
					7月12日，国航CA4107航班在起飞滑行阶段，因有旅客使用手机另一名旅客制止而产生纠纷。飞机降落后有旅客报警，随后3名旅客和4名机组人员前往机场公安局配合警方调查和调解处理。经核实，纠纷一方旅客为国航一名因身体原因休养的员工，此次是个人因私出行，并非国航监督员。我们将根据相关规定进一步加强客舱秩序管理，不断提升服务水平，改善旅客出行体验。国航感谢社会各界长期以来的关心和支持。
				</view>

			</view>
		</view>

		<!-- 付费提示  -->
		<cl-confirm ref="pay"> </cl-confirm>
		<!-- 充值选择 -->
		<cl-popup :visible.sync="visible" size="680rpx" direction="bottom">
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
	</view>
</template>

<script>
	export default {
		data() {
			return {
				det: {
					title: "监督员大闹头等舱 国航:系因身体原因休养的员工",
					time: "1个月前",
					cover: require("@/static/images/detail-cover.png"),
					content: "7月12日，国航CA4107航班在起飞滑行阶段，因有旅客使用手机另一名旅客制止而产生纠纷。飞机降落后有旅客报警，随后3名旅客和4名机组人员前往机场公安局配合警方调查和调解处理。经核实，纠纷一方旅客为国航一名因身体原因休养的员工，此次是个人因私出行，并非国航监督员。我们将根据相关规定进一步加强客舱秩序管理，不断提升服务水平，改善旅客出行体验。国航感谢社会各界长期以来的关心和支持。",
				},
				feature: {
					like: 3568,
					comment: 356,
					forward: 368,
				},
				video: require("./static/video/1.mp4"),
				lock: false,
				visible: false,
				val: "",
				isFull: true,
			};
		},
		created() {
			this.getVip();
		},
		methods: {
			// 获取会员信息
			getVip() {
				this.isFull = true;
			},

			// 视频播放监控
			timeupdate(opt) {
				let isPay = false;
				if (isPay) {
					return
				}

				this.lock = opt.detail.currentTime > 5 ? true : false;
			},
			// 选择会员套餐
			selProduct() {
				this.visible = true
			},
		}

	};
</script>

<style lang="scss">
	.page-detail {
		padding: 30rpx 0;

		.title {
			padding: 0 30rpx;
			font-size: 42rpx;
			font-weight: 400;
			color: #20263c;
			line-height: 56rpx;
			margin-bottom: 20rpx;
		}

		.time {
			padding: 20rpx 30rpx;
			font-size: 32rpx;
			font-weight: 400;
			color: #9b9b9b;
		}

		.cover {
			padding: 20rpx 30rpx;

			image {
				width: 100%;
				height: 206rpx;
			}
		}

		.content {
			padding: 0 30rpx 80rpx 30rpx;
			font-size: 30rpx;
			font-weight: 400;
			color: #333333;
			line-height: 65rpx;
		}
	}

	.video {
		width: 100%;
		padding: 0 30rpx;
		box-sizing: border-box;
		position: relative;

		uni-video {
			width: 100%;
		}
	}

	.lock,
	.lock-text {
		width: 100%;
		height: 225px;
		padding: 0 30rpx;
		box-sizing: border-box;
		background: #000;
		opacity: 0.8;
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -50%;
		z-index: 99;
	}

	.lock-text {
		opacity: 1;
		color: #fff;
		text-align: center;
		font-size: 14px;
		padding-top: 80px;
		box-sizing: border-box;
		background: transparent;
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
		margin-top: 30rpx;
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

	.into-box {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.introduction {
		.in-title {
			font-size: 32rpx;
			font-weight: bold;
			color: #000;
			margin-bottom: 20rpx;
		}

		.in-detail {
			font-size: 28rpx;
			color: #333;
			text-indent: 2em;
			text-align: justify;
		}
	}

	.info {

		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		border-bottom: 1rpx solid #eee;

		.avatar {
			width: 200rpx;
			height: 100rpx;
			margin-right: 5rpx;

			image {
				width: 100rpx;
				height: 100rpx;
			}

			text {
				display: inline-block;
				margin-left: 5rpx;
				font-size: 32rpx;
				font-weight: 400;
				color: #000000;
				vertical-align: top;
				height: 100rpx;
				line-height: 100rpx;
			}
		}

		.like {
			display: flex;
			align-items: center;
			margin-right: 38rpx;
			color: #999999;

			.cl-icon {
				margin-right: 6rpx;
			}
		}

		.comment {
			display: flex;
			align-items: center;
			color: #999999;

			.cl-icon {
				margin-right: 6rpx;
			}
		}

		.btn {
			width: 120rpx;
			height: 57rpx;
			margin-left: auto;
			border: 2rpx solid #d43c3d;
			box-shadow: 0 6rpx 20rpx 0 rgba(249, 88, 89, 0.3);
			border-radius: 29rpx;
			color: #d43c3d;
			text-align: center;
			line-height: 57rpx;
		}
	}
</style>
