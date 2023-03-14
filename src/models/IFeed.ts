export interface IFeedDetail {
  ingredients: string[];
  _id: string,
  name: string,
  status: 'created' | 'pending' | 'done',
  number: number,
  createdAt: string,
  updatedAt: string
}