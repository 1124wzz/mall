import { request } from "@/network/request";
import axios from "@/network/axios";

export function getCategory () {
  return request({
    url: '/category'
  })
}
export function getSubCategory(maitKey) {
  return request({
    url: '/subcategory',
    params: {
      maitKey
    }
  })
}
