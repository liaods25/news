<template>
	<view class="page-home">
		<!-- 列表 -->
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index" @tap="toDetail">
				<view class="det">
					<view class="title">
						<cl-text :value="item.title" color="#000000" :size="32" :ellipsis="2"></cl-text>
					</view>
					<view class="count">
						<view class="count-item">{{ item.time }}小时前</view>
					</view>
				</view>
				<view class="cover">
					<image :src="item.cover" mode="" />
				</view>
			</view>
		</view>

		<view style="height: 60px;"></view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: "recom",
				tabs: [{
						label: "推荐",
						name: "recom"
					},
					{
						label: "财经",
						name: "finance"
					},
					{
						label: "娱乐",
						name: "entertainment"
					},
					{
						label: "搞笑",
						name: "funny"
					},
					{
						label: "军事",
						name: "military"
					},
					{
						label: "商务",
						name: "business"
					},
				],
				list: [{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: true,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: false,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: true,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: false,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: true,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: false,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: true,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: false,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: true,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: false,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: true,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: false,
						comment: 1278,
						time: 10,
					}, {
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: false,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: true,
						comment: 1278,
						time: 10,
					},
					{
						title: "卫生间装修不要犯这样的错误不然入住后就得重装，一点不实用",
						cover: require("@/static/images/hom-cover.png"),
						isTop: false,
						comment: 1278,
						time: 10,
					}
				],
			};
		},
		methods: {
			toDetail() {
				uni.navigateTo({
					url: "/pages/news/videoDetail",
				});
			}
		},
	};
</script>

<style lang="scss">
	.page-home {

		.cl-sticky {
			.tabs {
				background-color: #fff;
				height: 90rpx;
				border-bottom: 1rpx solid #eee;

				/deep/.cl-tabs {
					&__dropdown {
						color: #000;
					}
				}
			}
		}

		.list {
			width: calc(100% - 60rpx);
			padding-top: 30rpx;
			margin: 0 30rpx;

			.item {
				display: flex;
				align-items: center;
				margin-bottom: 38rpx;

				.det {
					margin-right: 66rpx;
					flex: 1;

					/deep/.cl-text {
						line-height: 40rpx;
					}

					.count {
						display: flex;
						align-items: center;
						margin-top: 33rpx;

						.is-top {
							width: 75rpx;
							height: 32rpx;
							margin-right: 20rpx;
							background-color: #f95859;
							color: #f5c7cc;
							border-radius: 16rpx;
							font-size: 22rpx;
							text-align: center;
						}

						&-item {
							margin-right: 20rpx;
							font-size: 22rpx;
							font-weight: 400;
							color: #999999;
						}
					}
				}

				.cover {
					width: 205rpx;
					height: 147rpx;
					border-radius: 8rpx;
					overflow: hidden;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}

		.cl-tabs__line {
			width: 80px;
		}
	}
</style>
