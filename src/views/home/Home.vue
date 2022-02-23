<template>
  <div id="home"><nav-bar class="home-bar"><div slot="center">购物街</div></nav-bar>
    <!-- 加入ref属性，下面拿的时候可以拿到之歌组件 -->
    <scroll class="content" ref="scroll" 
                            :probe-type="3" 
                            @scroll="contentScroll" 
                            :pull-up-load="true" @pulling="loadMore">
      <home-swiper :banner="banner"/>
      <recommend-view :recommend="recommend"/>
      <feature-view/>
      <tab-control :title="['流行', '新款', '精选']"
                   class="tab-control"
                   @tabClick="tabClick"/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar";
import HomeSwiper from "./childComponents/HomeSwiper";
import recommendView from "@/views/home/childComponents/RecommendView";
import FeatureView from "@/views/home/childComponents/FeatureView";
import TabControl from "@/components/common/tabControl/TabControl";
import GoodsList from "@/components/content/Goods/GoodsList";
import Scroll from "@/components/common/Scroll/Scroll";
import BackTop from '@/components/content/BackTop/BackTop'

import { getHomeData, getHomeGoods} from "@/network/home";


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    recommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        'pop': { page: 0, list: []},
        'new': { page: 0, list: []},
        'sell': { page: 0, list: []},
      },
      currentType: 'pop',
      isShowBackTop: false
    }
  },
  created() {
    this.getHomeData()

    // 请求首页的商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  methods: {
    getHomeData() {
      getHomeData().then(res => {
        this.banner = res.data.banner.list
        this.recommend = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page +=1

        this.$refs.scroll.finshPullUp()
      })
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    }
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }
  .home-bar {
    background-color: var(--color-tint);
    color: #ffffff;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
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
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
