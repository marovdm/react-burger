export interface IIngredient {
  readonly name: string;
  readonly type: 'bun' | 'main' | 'sauce';
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile: string;
  readonly image_large: string;
  readonly _id: string;
  unique?: string
}