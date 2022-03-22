<template>
  <div class="detail-params">
    <table class="table-size" v-for="(item, index) in goodsParams.size" :key="index">
      <tr v-for="(tr, indey) in item" :key="indey">
        <td v-for="(td, indez) in tr" :key="indez">{{ td }}</td>
      </tr>
    </table>
    <table class="info-param">
      <tr class="info-param-key" v-for="(table, index) in goodsParams.infos" :key="index">
        <td class="info-param-key">{{ table.key }}</td>
        <td class="param-value">{{ table.value }}</td>
      </tr>
    </table>
    <div v-if="goodsParams.image.length !== 0">
      <img :src="goodsParams.image" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParams",
  props: {
    goodsParams: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detail-params {
  padding: 20px 15px;
  font-size: 14px;
  border-bottom: 5px solid #f2f5f8;
}
.detail-params table {
  width: 100%;
  border-collapse: collapse;
}

.detail-params table tr {
  height: 42px;
}

.detail-params table tr td {
  border-bottom: 1px solid rgba(100,100,100,.1);
}
.info-param-key {
  /*当value的数据量比较大的时候, 会挤到key,所以给一个固定的宽度*/
  width: 95px;
}

.info-param {
  border-top: 1px solid rgba(0,0,0,.1);
}

.param-value {
  color: #eb4868
}

.info-img img {
  width: 100%;
}
</style>
