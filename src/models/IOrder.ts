import { IIngredient } from "./IIngredient";

export interface IOrder {
  name: string;
  order: {
      ingredients: IIngredient[],
      _id: string,
      owner: {
          name: string,
          email: string,
          createdAt: string,
          updatedAt: string
      },
      status: string,
      name: string,
      createdAt: string,
      updatedAt: string,
      number: string,
      price: number
  }
}