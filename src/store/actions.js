import {
  ADD_COUNTER,
  ADD_CART
} from './mutation-types'
export default {
  addToCart(context, payload) {
    return new Promise(((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit(ADD_COUNTER, oldProduct)
        resolve('商品数量+1')
      }else {
        payload.count = 1
        context.commit(ADD_CART, payload)
        resolve('添加购物车成功')
      }
    }))
  }
}
