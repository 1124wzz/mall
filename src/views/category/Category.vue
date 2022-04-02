<template>
  <div id="category">
    <nav-bar class="cate-bar" ><div slot="center">商品分类</div></nav-bar>
    <category-tab-bat :cate_list="cate_list" @cateClick="cateClick"/>
      <category-info :category-info="currentCategory"/>
  </div>
</template>

<script>
import navBar from "@/components/common/nav-bar/NavBar";
import CategoryTabBat from "@/views/category/childComponts/CategoryTabBat";
import { getCategory, getSubCategory } from "@/network/category";
import CategoryInfo from "@/views/category/childComponts/CategoryInfo";
export default {
  name: "Category",
  components: {
    CategoryTabBat,
    navBar,
    CategoryInfo,
  },
  data(){
    return{
      cate_list: [],
      currentIndex: -1,
      currentCategory: {}
    }
  },
  methods: {
    cateClick(index) {
      this._getSubCategory(index)
    },
    _getSubCategory(index) {
      this.currentIndex = index
      const maitKey = this.cate_list[index].maitKey
      console.log(maitKey)
      getSubCategory(maitKey).then(res => {
        this.currentCategory = res.data.list
      })
    }
  },
  created() {
    getCategory().then(res => {
      this.cate_list = res.data.category.list

      // 获取正在流行的数据
      this._getSubCategory(0)
    })

  },
}
</script>

<style scoped>
  #category {
    height: 100vh;
    z-index: 1;
  }
  .cate-bar {
    background-color: var(--color-tint);
    color: white;
  }
</style>
