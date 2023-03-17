import { IOrder } from "../IOrder";

export interface IGetOrderInfoResponse {
  success: boolean;
  orders: IOrder[]
}