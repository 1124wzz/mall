<template>
  <div class="tab-control">
    <div v-for="(item, index) in title"
         class="tab-control-item"
         @click="tabClick(index)"
         :class="{active: currentIndex === index}" :key="index">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data () {
    return {
      currentIndex: 0
    }
  },
  props: {
    title: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    background-color: #fff;
  }
  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control-item span {
    padding: 5px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
