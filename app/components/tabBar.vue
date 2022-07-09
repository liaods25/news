<template>
	<view class="">
		<cover-view class="tabbar" :style="{'padding-bottom': paddingBottomHeight + 'rpx'}">
			<cover-view class="tabbar-item" v-for="(item, index) in list" :key="index" @click="tabbarChange(item.flag)">
				<cover-image class="item-img" :src="item.icon_a" v-if="current == item.flag"></cover-image>
				<cover-image class="item-img" :src="item.icon" v-else></cover-image>
				<cover-view class="item-name" :class="{'tabbarActive': current == item.flag }" v-if="item.text">
					{{item.text}}
				</cover-view>
			</cover-view>
		</cover-view>
	</view>

</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [];
				}
			},
			current: {
				type: String,
				default: function() {
					return "";
				}
			},
			paddingBottomHeight: {
				type: Number,
				default: function() {
					return 0;
				}
			},
		},
		methods: {
			tabbarChange(flag) {
				this.$emit('tabSwitch', flag);
			}
		}
	};
</script>
<style lang="scss" scoped>
	.tabbarActive {
		color: #f95859 !important;
	}

	.tabbar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;
		width: 100%;
		height: 100rpx;
		background-color: #ffffff;
		border-top: 1rpx solid #eee;
		.tabbar-item {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			height: 100rpx;

			.item-img {
				margin-bottom: 4rpx;
				width: 46rpx;
				height: 46rpx;
			}

			.item-name {
				font-size: 26rpx;
				color: #A3A3A3;
			}
		}
	}
</style>
