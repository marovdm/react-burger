import Ingredient from "../models/ingredient/ingredient";
import PageConstructor from "./page-constructor";

export default function IngredientPage() {
  return (
    <PageConstructor>
      <Ingredient />
    </PageConstructor>
  )
}
