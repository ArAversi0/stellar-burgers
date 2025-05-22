import { SELECTORS } from "cypress/support/selectors";

describe('Создание заказа', () => {
  before(() => {
    cy.interceptApiRequests();
  });

  beforeEach(() => {
    cy.authenticate();
    cy.visit('/');
    cy.wait('@getIngredients');
    cy.wait(500);
  });

  afterEach(() => {
    cy.cleanAuthData();
  });

  it('должен создать заказ и показать номер заказа', () => {
    // Добавляем булку
    cy.get('[data-cy="ingredient-bun"]').parent().contains('Добавить').click()

    // Добавляем ингредиент
    cy.get('[data-cy="ingredient-main"]').parent().contains('Добавить').click()

    // Оформляем заказ
    cy.get('[data-cy="order-button"]').click()
    cy.wait('@createOrder');

    // Проверяем номер заказа в модальном окне
    cy.get('[data-cy="order-number"]').should('contain', '12345');

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close-button"]').click();

    // Проверяем, что конструктор пуст
    cy.get('[data-cy="constructor-bun-top"]').should('not.exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('not.exist');
    cy.get(SELECTORS.constructorIngredients)
      .find(SELECTORS.constructorIngredient)
      .should('not.exist');
  });
});
