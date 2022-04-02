<template>
  <div id="cate-bar">
    <Scroll :pull-up-load="true" class="content">
      <div class="cate-tab-bar">
        <div @click="cateClick(index)"
             class="cate-item-bar"
             v-for="(item, index) in cate_list"
             :class="{active: currentIndex === index}"
             :key="index">
          {{ item.title }}
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/Scroll/Scroll";
export default {
  name: "CategoryTabBat",
  props: {
    cate_list: {
      type: Array,
      default() {
        return []
      }
    },
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  components: {
    Scroll
  },
  methods: {
    cateClick(index) {
      this.currentIndex = index
      this.$emit('cateClick', index)
    }
  },
}
</script>

<style scoped>
  #cate-bar {
    display: inline-block;
    height: 100vh;
    overflow: hidden;
  }
  .cate-tab-bar {
    width: 100px;
    text-align: center;
    background-color: #f6f6f6;
  }
  .cate-item-bar {
    font-size: 18px;
    height: 35px;
    line-height: 10px;
    padding: 25px 5px;
  }
  .active {
    background-color: #fff;
    color: var(--color-high-text);
  }
  .content {
    height: calc(100% - 44px - 49px);
  }
</style>
