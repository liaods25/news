<template>
  <!-- 标题区域 -->
  <view class="head">
    <text class="front">H</text>
    <text>VIDEOS</text>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: function () {
        return "H-VIDEOS";
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.head {
  width: 100%;
  height: 44px;
  line-height: 44px;
  background: #f95859 !important;
  padding: 0 15px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  text {
    font-size: 32rpx;
    color: #fff;
    font-weight: bold;
    vertical-align: middle;
  }
  .front {
    color: #fff;
    margin-right: 2px;
    vertical-align: middle;
  }
}
</style>
