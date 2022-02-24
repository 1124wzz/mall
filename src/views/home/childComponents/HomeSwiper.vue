<template>
    <swiper>
      <swiper-item v-for="(item, index) in banner" :key="index">
        <a :href="item.link">
          <img :src="item.image" @load="imgLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper/index'
export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    imgLoad() {
      if(!this.isLoad) {
        this.$emit('SwiperimgLoad')
        this.isLoad = true
      }
    }
  }
}
</script>

<style scoped>

</style>
