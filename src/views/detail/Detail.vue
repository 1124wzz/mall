<template>
  <div id="detail">
    <detail-item class="detail-nav" @backClick="backClick" ref="nav"></detail-item>

    <scroll class="content"
            :pull-up-load="true"
            ref="scroll" @scroll="scroll">
      <detail-swiper :top-images="topImages" ref="base"></detail-swiper>
      <base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-info ref="params" :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-comment ref="comment" :comment="comment"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTopClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import DetailItem from "./childrenItem/DetailItem.vue";
import { getDetail, Goods, GoodsParams, getRecommend } from "@/network/detail.js";
import DetailSwiper from "./childrenItem/DetailSwiper.vue";
import BaseInfo from "./childrenItem/BaseInfo.vue";
import Scroll from "@/components/common/Scroll/Scroll";
import DetailShopInfo from "@/views/detail/childrenItem/DetailShopInfo";
import DetailInfo from "@/views/detail/childrenItem/DetailInfo";
import DetailParams from "@/views/detail/childrenItem/DetailParams";
import GoodsList from "@/components/content/Goods/GoodsList";
import DetailComment from "@/views/detail/childrenItem/DetailComment";
import { minxin, backTop } from "@/common/minxin";
import {debounce} from "@/common/tools";
import DetailBottomBar from "@/views/detail/childrenItem/DetailBottomBar";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: null,
      shop: null,
      detailInfo: null,
      goodsParams: {},
      recommend: [],
      comment: {},
      topYs: [],
      topLoad: null,
      currentIndex: 0
    };
  },
  components: {
    DetailItem,
    DetailSwiper,
    BaseInfo,
    Scroll,
    DetailShopInfo,
    DetailInfo,
    DetailParams,
    GoodsList,
    DetailComment,
    DetailBottomBar
  },
  mixins: [minxin, backTop],
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

        this.detailInfo = res.result.detailInfo

        this.goodsParams = new GoodsParams(res.result.itemParams.info, res.result.itemParams.rule)

      //  获取评论的信息
        if(res.result.rate.list) {
          this.comment = res.result.rate.list[0]
        }
      });
    this.recommend = getRecommend().then((res, error) => {
      if(error) return
      this.recommend = res.data.list
    })
    this.topLoad = debounce(() => {

    }, 100)
    },
  methods: {
    imgLoad() {
      this.refresh()
    },
    backClick(index) {
      this.$refs.scroll.scrollTo(0, -this.topYs[index], 500)
    },
    getTopYs() {
      this.topYs = []
      this.topYs.push(this.$refs.base.$el.offsetTop)
      this.topYs.push(this.$refs.params.$el.offsetTop)
      this.topYs.push(this.$refs.comment.$el.offsetTop)
      this.topYs.push(this.$refs.recommend.$el.offsetTop)
      // 放入一个最大值，可以来判断
      this.topYs.push(Number.MAX_VALUE)
    },
    scroll(position) {
      for(let i = 0; i < this.topYs.length - 1; i++) {
        if(this.currentIndex !== i && (-position.y >= this.topYs[i] && -position.y < this.topYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = i
        }
      }
      this.demo(position)
    },
    addToCart() {
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // this.$store.commit('addToCart', product)
      this.$store.dispatch('addToCart', product)
    }
  },
  destroyed() {
    this.$bus.$off('imgLoad', this.itemImgLoad)
  },
  updated() {
    this.getTopYs()
  }
};
</script>

<style scoped>
  #detail {
    height: 100vh;
    background-color: #fff;
    position: relative;
    z-index: 1;
  }
  .content {
    height: calc(100% - 44px - 58px);
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>
