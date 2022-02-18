<template>
  <div id="home">
    <nav-bar class="home-bar">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banner="banner"></home-swiper>
    <recommend-view :recommend="recommend"/>
  </div>
</template>

<script>
import NavBar from "@/components/common/nav-bar/NavBar";
import HomeSwiper from "./childComponents/HomeSwiper";
import recommendView from "@/views/home/childComponents/RecommendView";
import {getHomeData} from "@/network/home";


export default {
  name: 'Home',
  components: {
    NavBar,
    HomeSwiper,
    recommendView
  },
  data() {
    return {
      banner: [],
      recommend: []
    }
  },
  created() {
    getHomeData().then(res => {
      this.banner = res.data.banner.list
      this.recommend = res.data.recommend.list
    })
  }
}
</script>

<style scoped>
  .home-bar {
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>
