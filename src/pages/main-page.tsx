import BurgerConstructor from "../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../components/burger-ingredients/burger-ingredients";
import Main from "../modules/main/main"
import PageConstructor from "./page-constructor";

export default function MainPage() {
  return (
    <PageConstructor>
      <Main>
        <BurgerIngredients />
        <BurgerConstructor />
      </Main>
    </PageConstructor>
  )
}

