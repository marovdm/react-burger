import { IIngredient } from "../../models/IIngredient";

export const calculatePrice = (arr: IIngredient[]) => {
  return arr.reduce((acc, el) => acc + (el.type==='bun' ? el.price * 2 : el.price), 0)
};