<template>
	<view class="page-register">
		<view class="title"> <view class="title-box">注册</view> </view>
		<view class="tips" @tap="toLogin">
			<cl-text value="已有账号，" color="#999999" :size="30"></cl-text
			><cl-text value="马上登录" color="#F95859" :size="30"></cl-text>
		</view>
		<view class="form">
			<view class="item">
				<cl-input
					v-model="form.account"
					placeholder="请输入账号(建议使用手机号)"
					:maxlength="11"
					round
				></cl-input>
			</view>
			<view class="item">
				<cl-input
					v-model="form.password"
					placeholder="请输入8-12位字符的密码"
					:maxlength="12"
					round
					password
				></cl-input>
			</view>
			<view class="item">
				<cl-input
					placeholder="请再次输入密码"
					:maxlength="12"
					round
					password
					v-model="form.rePassword"
				></cl-input>
			</view>
			<view class="register-btn">
				<cl-button fill type="primary" round @tap="toLogin">注册</cl-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				account: "",
				phone: "",
				code: "",
				password: "",
				rePassword: "",
			},
		};
	},
	methods: {
		toLogin() {
			uni.navigateTo({
				url: "/pages/login/login",
			});
		},
	},
};
</script>

<style lang="scss">
.page-register {
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
		position: relative;
		width: 100%;
		margin-bottom: 51rpx;
		/deep/ .cl-input {
			height: 97rpx;
			padding: 0 50rpx;

			&.is-border {
				border-color: #e5e5e5;
			}
		}
		/deep/.cl-button {
			position: absolute;
			top: 14rpx;
			right: 20rpx;
			border: none;
		}
		/deep/ uni-button:after {
			border: none;
		}
	}
	.time {
		position: absolute;
		top: 28rpx;
		right: 20rpx;
		font-size: 28rpx;
		color: #f95859;
	}
	.register-btn {
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
}
</style>
