import {
  ADD_COUNTER,
  ADD_CART
} from './mutation-types'
export default {
  addToCart(context, payload) {
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    if(oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    }else {
      payload.count = 1
      context.commit(ADD_CART, payload)
    }
  }
}
