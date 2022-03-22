<template>
  <div id="detail">
    <detail-item class="detail-nav"></detail-item>
    <scroll class="content"
            :pull-up-load="true"
            ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <base-info :goods="goods" />
      <detail-shop-info :shop="shop"/>
      <detail-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <detail-comment :comment="comment"/>
    </scroll>
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
import DetailRecommend from "@/views/detail/childrenItem/DetailRecommend";
import GoodsList from "@/components/content/Goods/GoodsList";
import DetailComment from "@/views/detail/childrenItem/DetailComment";

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
      comment: {}
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
    DetailRecommend,
    GoodsList,
    DetailComment,
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

        this.detailInfo = res.result.detailInfo
        this.goodsParams = new GoodsParams(res.result.itemParams.info, res.result.itemParams.rule)

      //  获取评论的信息
        if(res.result.rate.list) {
          this.comment = res.result.rate.list[0]
        }
      });
    this.recommend = getRecommend().then((res, error) => {
      if(error) return
      console.log(res)
      this.recommend = res.data.list
    })
    },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh()
    }
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
    height: calc(100% - 44px);
    background-color: #fff;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

</style>
