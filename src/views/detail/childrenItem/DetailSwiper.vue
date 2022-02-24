<template>
  <swiper  ref="mySwiper" :options="swiperOption" class="detail-swiper">
    <swiper-slide v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-slide>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import Swiper from "swiper/dist/js/swiper.min";
import "swiper/dist/css/swiper.css";

export default {
  name: "DetailSwiper",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data(){
    return{
      swiperOption: {
        autoplay: true,
        pagination : '.swiper-pagination',
      },
    }
  },
   mounted() {
    this.dom = new Swiper(this.$refs.mySwiper);
  },
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
.detail-swiper img {
  width: 400px;
}
</style>
