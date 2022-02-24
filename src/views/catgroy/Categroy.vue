<template>
  <swiper  ref="mySwiper" :options="swiperOption">
    <swiper-slide>111111111</swiper-slide>
    <swiper-slide>2222222222222</swiper-slide>
    <swiper-slide>3333333333333333</swiper-slide>
  </swiper>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import  Swiper from  'swiper/dist/js/swiper.min'
import "swiper/dist/css/swiper.css";

export default {
  name: "Categroy",
  components: {
    swiper,
    swiperSlide
  },
  data(){
    return{
      swiperOption: {
        loop: true,
        autoplay: true,
      },
    }
  },
  mounted() {
    this.dom = new Swiper(this.$refs.mySwiper);
  },
}
</script>
