<template>
  <div id="home">
    <nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :title="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isFixed"/>
    <!-- 加入ref属性，下面拿的时候可以拿到之歌组件 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pulling="loadMore">
      <home-swiper :banner="banner" @SwiperimgLoad="SwiperimgLoad" />
      <recommend-view :recommend="recommend" />
      <feature-view />
      <tab-control
        :title="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"/>
      <goods-list :goods="goods[currentType].list" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/nav-bar/NavBar";
import HomeSwiper from "./childComponents/HomeSwiper";
import recommendView from "views/home/childComponents/RecommendView";
import FeatureView from "views/home/childComponents/FeatureView";
import TabControl from "components/common/tabControl/TabControl";
import GoodsList from "components/content/Goods/GoodsList";
import Scroll from "components/common/Scroll/Scroll";
import BackTop from "components/content/BackTop/BackTop";

import { getHomeData, getHomeGoods } from "network/home";
import { debounce } from "common/tools.js";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    recommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isFixed: false,
      saveY: 0,
    };
  },
  created() {
    // 请求轮播图片和recommend图片
    this.getHomeData();

    // 请求首页的商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    getHomeData() {
      getHomeData().then((res) => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finshPullUp();
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      this.isShowBackTop = -position.y > 1000;
      this.isFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    SwiperimgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  mounted() {
    // 3. 监听图片加载
    const refresh = debounce(this.$refs.scroll.refresh, 50);
    this.$bus.$on("imgLoad", () => {
      // 调用refresh() 方法重新计算scollerHeight
      refresh();
    });
  },
  activated() {
    // 第二次点进去把离开的位置赋值，回到我们离开的位置
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 离开首页的时候保存滚动的位置
    this.saveY = this.$refs.scroll.scroll.y;
  },
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-bar {
  background-color: var(--color-tint);
  color: #ffffff;

  /* js原生滚动 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
}
</style>
