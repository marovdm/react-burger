
import { ORDER } from "../consts";
import $api from "../http";


export default class Order {
  static async createOrder(payload: string[]) {
    return $api.post(ORDER.BASE_URL_ORDER, {ingredients: payload});
  }

  static async getOrderById(payload: string) {
    return $api.get(`${ORDER.BASE_URL_ORDER}/${payload}`);
  }
}