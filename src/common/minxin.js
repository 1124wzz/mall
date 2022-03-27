import { debounce } from "@/common/tools";

export const minxin = {
  data() {
    return {
      itemImgLoad: null,
      refresh: null
    }
  },
  mounted() {
    // 3. 监听图片加载
    this.refresh = debounce(this.$refs.scroll.refresh, 50);
    this.itemImgLoad = () => {
      // 调用refresh() 方法重新计算scollerHeight
      this.refresh();
    }
    this.$bus.$on("imgLoad", this.itemImgLoad) ;
  }
}

import BackTop from "@/components/content/BackTop/BackTop";
export const backTop = {
  data() {
   return {
     isShowBackTop: false,
   }
  },
  components: {
    BackTop
  },
  methods: {
    backTopClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    demo(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  }
}
