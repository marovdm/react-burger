import { NORMA_API, ORDER } from '../../src/utils/consts';

describe('app works correctly with routes', function() {
  const login = 'test@test123.ru';
  const password = '12345678';

  before(function() {
    cy.visit('http://localhost:3000/react-burger');
    // перехватываем запрос к серверу
    cy.intercept('POST', `${NORMA_API}/${ORDER.BASE_URL_ORDER}`, {fixture: 'order-create.json'}).as('createOrder');
  });

  it('should can create order', function() {
    // заходим на страницу и перетаскиваем элемент
    cy.contains('Соберите бургер');
    cy.get('[data-cy="ingredients"]')
      .contains("Краторная булка N-200i")
      .trigger("dragstart")
    cy.get("[data-cy=constructor]").trigger("drop");
    // нажимаем оформить заказ
    cy.get('[data-cy="btn-order"]')
      .trigger("click")
    // т.к. не авторизованы - логинимся
    cy.get('input[type="email"]')
      .type(login)
    cy.get('input[type="password"]')
      .type(password)
    cy.get('form')
      .submit()
    cy.get('[data-cy="btn-order"]')
      .trigger("click")

    cy.wait("@createOrder")
    cy.contains('Ваш заказ начали готовить')
  });
}); 