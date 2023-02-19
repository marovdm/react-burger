import { BURGER } from "../consts";
import $api from "../http";

export default class Burger {
  static async fetchIngredients() {
    return $api.get(BURGER.FETCH_DATA);
  };

  static async createOrder(payload) {
    return $api.post(BURGER.CREATE_ORDER, {ingredients: payload});
  }
}