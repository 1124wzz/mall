<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }

  },
  data() {
    return {
      scroll: null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 新版本要加这个属性
      observeDOM: true,
      // 默认scroll时阻止点击事件的，设置为true开启
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    this.scroll.on('scroll', (position) => {
      this.$emit('scroll', position)
    })
    this.scroll.on('pullingUp', () => {
      this.$emit('pulling')
    })
  },
  methods: {
    // 封装一个scrollTo的方法
  scrollTo(x, y, time=500) {
    this.scroll.scrollTo(x, y, time)
  },
  finshPullUp() {
    this.scroll.finishPullUp()
  }
  }
}
</script>

<style scoped>

</style>
