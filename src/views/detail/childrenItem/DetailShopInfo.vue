<template>
  <div class="detail-shop-info">
    <div class="logo">
      <img :src="shop.shopLogo" alt="">
      <p>{{ shop.name }}</p>
    </div>
    <div class="shopInfo">
      <span>{{ shop.cSells | cell }}</span>
      <p>{{ shop.cGoods }}</p>
    </div>
    <div class="shopText">
      <span>总销量</span>
      <p>全部宝贝</p>
    </div>
    <div class="shopTable">
      <table>
        <tr v-for="item in shop.score">
          <td>{{item.name}}</td>
          <td :class="{active: item.isBetter}" class="green">{{ item.score }}</td>
          <td :class="{active: item.isBetter}" class="green">{{ item.isBetter? '高' : '低'}}</td>
        </tr>
      </table>
    </div>
    <div class="shops">
      进店逛逛
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      text_content: ''
    }
  },
  filters: {
    cell(value) {
      let result = value
      if(value > 10000) {
        result = (result / 10000).toFixed(1) + '万'
        return result
      }
    }
  },
  computed: {}
}
</script>

<style scoped>
.logo {
  position: relative;
}
  .logo img {
    position: absolute;
    top: 10px;
    left: 20px;
    width: 50px;
    height: 50px;
  }
  .logo p {
    position: absolute;
    top: 30px;
    left: 110px;
    width: 100px;
  }
  .shopInfo {
    position: relative;
  }
  .shopInfo span {
    position: absolute;
    top: 100px;
    left: 20px;
    margin-left: 20px;
  }
.shopInfo p {
  position: absolute;
  top: 100px;
  left: 100px;
  margin-left: 20px;
}
.shopText {
  position: relative;
}
.shopText span {
  position: absolute;
  top: 135px;
  left: 35px;
}
.shopText p {
  position: absolute;
  top: 135px;
  left: 106px;
}
.shopTable {
  position: relative;
}
.shopTable table {
  position: absolute;
  top: 86px;
  right: 40px;
  border-left: 1px solid #cccccc;
}
.shopTable table td {
  height: 25px;
  padding-left: 10px;
}
.detail-shop-info {
  border-top: 2px solid #f2f5f8;
}
.active {
  color: red!important;
}
.green {
  color: green;
}
.shops {
  margin-top: 188px;
  margin-left: 152px;
  width: 120px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
  background-color: #f2f5f8;
}
</style>
