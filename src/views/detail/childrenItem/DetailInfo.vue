<template>
  <div>
    <div class="desc-info">{{ detailInfo.desc }}</div>
    <div class="key-info">{{ detailInfo.detailImage[0].key}}</div>
    <div class="image-info">
      <img v-for="(item, index) in detailInfo.detailImage[0].list" :src="item" alt="" :key="index" @load="imgLoad">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      counter: 0,
      imgLength: 0
    }
  },
  methods: {
    imgLoad() {
      if(++this.counter === this.imgLength){
        this.$emit('imgLoad')
      }
    }
  },
  watch: {
    detailInfo() {
      this.counter = this.detailInfo[0].list.length
    }
  }
}
</script>

<style scoped>
.desc-info {
  margin-top: 20px;
  font-size: 16px;
}
.key-info {
  margin-top: 10px;
  margin-left: 20px;
  margin-bottom: 10px;
  font-size: 18px;
}
.image-info img {
  width: 100%;
}
</style>
