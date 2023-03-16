import { createSelector } from "@reduxjs/toolkit";
import { calculatePrice } from "../../../utils/helpers/calculate-price";
import { RootState } from "../../store";

const selectedIngredients = (state: RootState) => state.burgers.selectedIngredients;
const selectedBun = (state: RootState) => state.burgers.selectedBun;

export const allAddedSelector = createSelector([selectedIngredients, selectedBun], (ingredients, bun) => {
  if (bun) return [...ingredients, bun];
  return ingredients;
});

export const totalPriceSelector = createSelector([allAddedSelector], ingredients => {
  if (!ingredients.length) return 0;
  return calculatePrice(ingredients);
});

export const orderSelector = (state: RootState) => state.order.orderData?.order