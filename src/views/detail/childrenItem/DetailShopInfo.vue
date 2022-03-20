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
      <table class="">
        <tr v-for="item in shop.score">
          <td>{{item.name}}</td>
          <td>{{ item.score }}</td>
        </tr>
      </table>
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
  filters: {
    cell(value) {
      let result = value
      if(value > 10000) {
        result = (result / 10000).toFixed(1) + '万'
        return result
      }
    }
  }
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
  top: 82px;
  right: 37px;
}
.shopTable table td {
  width: 80px;
  height: 25px;
}
.detail-shop-info {
  border-top: 2px solid #cccccc;
}
</style>
