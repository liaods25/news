<template>
  <view style="height: 90vh">
    <!-- 标题区域 -->
    <heads v-if="current != 'user'"></heads>

    <!-- 三个主界面 -->
    <news v-if="current == 'news'"></news>
    <film v-if="current == 'film'" :page="page"></film>
    <user v-if="current == 'user'"></user>

    <!-- 底部tab样式 -->
    <view class="tab">
      <tabbar
        :current="current"
        :list="tabList"
        :paddingBottomHeight="paddingBottomHeight"
        @tabSwitch="tabSwitch"
      ></tabbar>
    </view>

    <!-- 公告信息  -->
    <cl-confirm ref="notice"></cl-confirm>
  </view>
</template>

<script>
// 主界面
import news from "@/pages/index/news";
import film from "@/pages/index/video";
import user from "@/pages/index/user";

// 切换栏
import tabbar from "@/components/tabBar.vue";
import heads from "@/components/heads.vue";
export default {
  data() {
    return {
      // 当前页码
      page: 1,
      // 当前界面
      current: "",
      // 切换栏目
      tabList: [],
      // 浏览高度
      paddingBottomHeight: 0,
    };
  },
  components: {
    tabbar: tabbar,
    news: news,
    film: film,
    user: user,
    heads:heads
  },
  onShow() {
    uni.hideTabBar({
      animation: false,
    });
    this.getTabList();
    this.setPaddingBottomHeight();
  },
  mounted() {
    this.getNotice();
  },
  methods: {
    // 获取公告信息
    getNotice() {
      this.$refs["notice"]
        .open({
          title: "温馨提示",
          showCancelButton: false,
          message: "本平台计划2021年12月25日晚上九点更新，如有不便敬请谅解",
        })
        .then((res) => {
          if (!res) {
            console.log("确定");
          }
        })
        .catch((res) => {
          console.log("关闭");
        });
    },

    // 适配iphoneX以上的底部
    setPaddingBottomHeight() {
      let that = this;
      uni.getSystemInfo({
        success: function (res) {
          let model = ["X", "XR", "XS", "11", "12", "13", "14", "15"];
          model.forEach((item) => {
            //适配iphoneX以上的底部，给tabbar一定高度的padding-bottom
            if (
              res.model.indexOf(item) != -1 &&
              res.model.indexOf("iPhone") != -1
            ) {
              that.paddingBottomHeight = 40;
            }
          });
        },
      });
    },

    // 获取菜单栏
    getTabList() {
      let isNews = true; //新闻或者视频

      this.tabList = [
        {
          text: "首页",
          icon: "/static/icon/tabbar/home.png",
          icon_a: "/static/icon/tabbar/on-home.png",
          flag: isNews ? "news" : "film",
        },
        {
          text: "我的",
          icon: "/static/icon/tabbar/my.png",
          icon_a: "/static/icon/tabbar/on-my.png",
          flag: "user",
        },
      ];
      this.current = this.tabList[0].flag;
    },

    // 切换菜单栏
    tabSwitch(flag) {
      this.current = flag;
    },
  },
  // 触底加载
  onReachBottom() {
    this.page++;
  },
};
</script>
