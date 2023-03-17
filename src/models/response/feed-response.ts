import { IFeedDetail } from "../IFeed";

export interface IFetchFeedResponse {
  success: boolean;
  orders: IFeedDetail[];
  total: number;
  totalToday: number;
}