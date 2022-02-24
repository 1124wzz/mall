<template>
  <div>
    <detail-item></detail-item>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailItem from './childrenItem/DetailItem.vue'
import { getDetail } from 'network/detail.js'
import DetailSwiper from './childrenItem/DetailSwiper.vue'

export default {
  name: 'Detail',
  data() {
    return {
      iid: null,
      topImages: []
    }
  },
  components: {
    DetailItem,
    DetailSwiper
  },
  created() {
    this.iid = this.$route.params.iid

    getDetail(this.iid).then(res => {
      console.log(res);
      this.topImages = res.result.itemInfo.topImages

    })

  }
}
</script>

<style scoped>

</style>
