<template>
  <div class="detail">
    <detail-item></detail-item>
    <scroll class="content">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
    </scroll>
  </div>
</template>

<script>
import DetailItem from "./childrenItem/DetailItem.vue";
import { getDetail, Goods } from "@/network/detail.js";
import DetailSwiper from "./childrenItem/DetailSwiper.vue";
import BaseInfo from "./childrenItem/BaseInfo.vue";
import Scroll from "@/components/common/Scroll/Scroll";
import DetailShopInfo from "@/views/detail/childrenItem/DetailShopInfo";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
      shop: null
    };
  },
  components: {
    DetailItem,
    DetailSwiper,
    BaseInfo,
    Scroll,
    DetailShopInfo
  },
  created() {
      this.iid = this.$route.params.iid;

      getDetail(this.iid).then((res) => {
        console.log(res);
        this.topImages = res.result.itemInfo.topImages;
        this.goods = new Goods(
          res.result.itemInfo,
          res.result.columns,
          res.result.shopInfo.services
        );
        this.shop = res.result.shopInfo
      });
    },
};
</script>

<style scoped>
  .detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content {
    height: calc(100% - 44px);
    background-color: #fff;
  }
</style>
