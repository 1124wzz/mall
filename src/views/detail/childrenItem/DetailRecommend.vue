<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
     <grid-view>
       <goods-list-item v-for="(item, index) in recommend" :key="index" :goods-item="item"/>
     </grid-view>
  </div>
</template>

<script>
import goodsListItem from "@/components/content/Goods/GoodsListItem";
import GridView from "@/components/common/gridView/GridView";
export default {
  name: "DetailRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    goodsListItem,
    GridView
  }
}
</script>

<style scoped>
.recommend-info {
  padding: 5px;
}

.info-header {
  line-height: 40px;
  padding-left: 8px;
  font-size: 15px;
  color: #333;
}
</style>
