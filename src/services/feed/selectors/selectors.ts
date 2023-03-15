import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const orders = (state: RootState) => state.feed.orders;

export const doneOrdersSelector = createSelector([orders], (orders) => {
  return orders.filter(order => order.status === 'done');
});

export const inWorksOrdersSelector = createSelector([orders], (orders) => {
  return orders.filter(order => order.status === 'pending' || order.status === 'created');
});



