<template>
	<view class="page-detail">
		<view class="title">{{ det.title }}</view>
		<view class="time">发布时间：{{ det.time }} </view>
		<!-- 富文本 -->
		<!-- <view class="content" v-html=""></view> -->
		<view class="cover">
			<image :src="det.cover" />
		</view>
		<view class="content">
			{{ det.content }}
			{{ det.content }}
			{{ det.content }}
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			det: {
				title: "监督员大闹头等舱 国航:系因身体原因休养的员工",
				time: "201/03/25 09:00:45",
				cover: require("@/static/images/detail-cover.png"),
				content:
					"7月12日，国航CA4107航班在起飞滑行阶段，因有旅客使用手机另一名旅客制止而产生纠纷。飞机降落后有旅客报警，随后3名旅客和4名机组人员前往机场公安局配合警方调查和调解处理。经核实，纠纷一方旅客为国航一名因身体原因休养的员工，此次是个人因私出行，并非国航监督员。我们将根据相关规定进一步加强客舱秩序管理，不断提升服务水平，改善旅客出行体验。国航感谢社会各界长期以来的关心和支持。",
			}
		};
	},
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
	}
	.time {
		padding: 20rpx 30rpx;
		font-size: 24rpx;
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
	}}
</style>
