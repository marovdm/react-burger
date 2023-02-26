import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const selectedIngredients = (state: RootState) => state.burgers.selectedIngredients;
const selectedBun = (state: RootState) => state.burgers.selectedBun;

export const allAddedSelector = createSelector([selectedIngredients, selectedBun], (ingredients, bun) => {
  if (bun) return [...ingredients, bun];
  return ingredients;
});

export const totalPriceSelector = createSelector([allAddedSelector], ingredients => {
  if (!ingredients.length) return 0;
  return ingredients.reduce((acc, el) => acc + (el.type==='bun' ? el.price * 2 : el.price), 0)
});

export const orderSelector = (state: RootState) => state.order.orderData?.order