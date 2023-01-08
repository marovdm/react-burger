import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import burgerConstructorStyles from './burger-constructor.module.scss'
import ConstructorOrder from './constructor-order/constructor-order'

const selectedBun = {
    "_id":"60666c42cc7b410027a1a9b1",
    "name":"Краторная булка N-200i",
    "type":"bun",
    "proteins":80,
    "fat":24,
    "carbohydrates":53,
    "calories":420,
    "price":1255,
    "image":"https://code.s3.yandex.net/react/code/bun-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/bun-02-large.png",
    "__v":0
}

const selectedIngredients = [
  {
    "_id":"60666c42cc7b410027a1a9b9",
    "name":"Соус традиционный галактический",
    "type":"sauce",
    "proteins":42,
    "fat":24,
    "carbohydrates":42,
    "calories":99,
    "price":15,
    "image":"https://code.s3.yandex.net/react/code/sauce-03.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sauce-03-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9b4",
    "name":"Мясо бессмертных моллюсков Protostomia",
    "type":"main",
    "proteins":433,
    "fat":244,
    "carbohydrates":33,
    "calories":420,
    "price":1337,
    "image":"https://code.s3.yandex.net/react/code/meat-02.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/meat-02-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/meat-02-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9bc",
    "name":"Плоды Фалленианского дерева",
    "type":"main",
    "proteins":20,
    "fat":5,
    "carbohydrates":55,
    "calories":77,
    "price":874,
    "image":"https://code.s3.yandex.net/react/code/sp_1.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/sp_1-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/sp_1-large.png",
    "__v":0
  },
  {
    "_id":"60666c42cc7b410027a1a9bb",
    "name":"Хрустящие минеральные кольца",
    "type":"main",
    "proteins":808,
    "fat":689,
    "carbohydrates":609,
    "calories":986,
    "price":300,
    "image":"https://code.s3.yandex.net/react/code/mineral_rings.png",
    "image_mobile":"https://code.s3.yandex.net/react/code/mineral_rings-mobile.png",
    "image_large":"https://code.s3.yandex.net/react/code/mineral_rings-large.png",
    "__v":0
  }
]

export default function BurgerConstructor() {
  return (
    <section className={burgerConstructorStyles.constructor}>
      <div className="mb-10">
        <ConstructorElement 
          type="top"
          isLocked={selectedBun.type === "bun"}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image_mobile}
          extraClass="mb-4 ml-8"
        />
        <div className={`${burgerConstructorStyles.constructorWrapper} custom-scroll`}>
          {selectedIngredients.map(ingredient =>
            <article className={burgerConstructorStyles.elementWrapper}>
              <span className={burgerConstructorStyles.elementIcon}>
                <DragIcon type="primary" />
              </span>
              <ConstructorElement
                isLocked={ingredient.type === "bun"}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image_mobile}
                key={ingredient._id}
                extraClass="ml-8"
              />
            </article>
          )}
        </div>      
        <ConstructorElement 
          type="bottom"
          isLocked={selectedBun.type === "bun"}
          text={selectedBun.name}
          price={selectedBun.price}
          thumbnail={selectedBun.image_mobile}
          extraClass="mt-4 ml-8"
        />
      </div>       
      <ConstructorOrder />
    </section>
  )
}
