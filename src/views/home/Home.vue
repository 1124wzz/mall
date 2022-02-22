<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"/>
    <recommend-view :recommend="recommend"/>
    <feature-view/>
    <tab-control :title="['流行', '新款', '精选']"
                 class="tab-control"
                 @tabClick="tabClick"/>
    <goods-list :goods="goods[currentType].list"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar";
import HomeSwiper from "./childComponents/HomeSwiper";
import recommendView from "@/views/home/childComponents/RecommendView";
import FeatureView from "@/views/home/childComponents/FeatureView";
import TabControl from "@/components/common/tabControl/TabControl";
import GoodsList from "@/components/content/Goods/GoodsList";

import { getHomeData, getHomeGoods} from "@/network/home";


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    recommendView,
    FeatureView,
    TabControl,
    GoodsList
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
      currentType: 'pop'
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
        console.log(res);
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
    }
  }
}
</script>

<style scoped>
  #home {
    padding-top: 44px;
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
  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  }
</style>
