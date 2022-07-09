<template>
	<view class="page-login">
		<view class="title">
			<view class="title-box">登录</view>
		</view>
		<view class="tips" @tap="toRegister">
			<cl-text value="还没有账号，" color="#999999" :size="30"></cl-text>
			<cl-text value="立即注册" color="#F95859" :size="30"></cl-text>
		</view>

		<view class="form">
			<view class="item">
				<cl-input placeholder="请输入账号" :maxlength="11" round></cl-input>
			</view>
			<view class="item">
				<cl-input placeholder="请输入密码" :maxlength="12" round password></cl-input>
			</view>

			<view class="login-btn">
				<cl-button fill type="primary" round @tap="onLogin">登录</cl-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			toRegister() {
				uni.navigateTo({
					url: "/pages/login/register",
				});
			},
			onLogin() {
				uni.reLaunch({
					url: "/pages/base",
				});
			}
		}
	};
</script>

<style lang="scss">
	.page-login {
		//#ifdef MP-WEIXIN
		padding-top: 100rpx;

		//#endif
		.title {
			display: flex;
			justify-content: center;
			margin-bottom: 30rpx;
			padding-top: 100rpx;
			font-size: 56rpx;
			font-weight: 400;
			color: #000000;

			&-box {
				position: relative;

				&::after {
					content: "";
					display: inline-block;
					position: absolute;
					left: 0;
					bottom: 1rpx;
					width: 100%;
					height: 5rpx;
					background-color: #f95859;
					border-radius: 8rpx;
					z-index: -1;
				}
			}
		}

		.tips {
			width: 100%;
			margin-bottom: 91rpx;
			text-align: center;
		}

		.form {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			width: 100%;
			margin-bottom: 8rpx;
			padding: 0 40rpx;
			box-sizing: border-box;
		}

		.item {
			width: 100%;
			margin-bottom: 51rpx;

			/deep/ .cl-input {
				height: 97rpx;
				padding: 0 50rpx;

				&.is-border {
					border-color: #E5E5E5;
				}
			}
		}

		.login-btn {
			display: flex;
			justify-content: center;
			width: 100%;
			margin-bottom: 42rpx;

			/deep/.cl-button {
				width: 670rpx;
				height: 90rpx;
				box-shadow: 0 6rpx 20rpx 0 rgba(249, 88, 89, 0.3);
				border-radius: 45rpx;
			}
		}

		.change {
			display: flex;
			justify-content: center;
			width: 100%;
			margin-bottom: 155rpx;
		}

		.list {
			.item {
				width: 100rpx;
				height: 100rpx;
				margin: 0 auto;
				margin-top: 50rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
</style>
