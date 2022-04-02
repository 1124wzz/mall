<template>
  <div id="cate-info">
    <scroll :pull-up-load="true" class="content">
        <div style="display: flex; flex-wrap: wrap; margin-top: 10px">
          <div class="info-item" v-for="(item, index) in categoryInfo" :key="index">
            <a :href="item.href">
              <img :src="item.image" alt="" class="info-img">
              <div class="info-text">{{ item.title }}</div>
            </a>
          </div>
        </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll/Scroll";
export default {
  name: "CategoryInfo",
  components: {
    Scroll
  },
  props: {
    categoryInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  #cate-info {
    height: 100vh;
    position: fixed;
    top: 44px;
    left: 110px;
    overflow: hidden;
  }
  .info-item {
    /*width: 80px;*/
    /*padding: 5px 15px;*/
    flex: 1;
  }
  .info-img {
    width: 80px;
    height: 80px;
  }
  .info-text {
    width: 80px;
    margin-top: 15px;
    text-align: center;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
