import { SELECTORS } from '../support/selectors';

describe('Конструктор бургера: добавление ингредиентов', () => {
  before(() => {
    cy.interceptApiRequests();
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('должен добавлять булку в конструктор', () => {
    cy.get('[data-cy="ingredient-bun"]')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get('[data-cy="constructor-bun-top"]').should('exist');
    cy.get('[data-cy="constructor-bun-bottom"]').should('exist');
  });

  it('должен добавлять начинку в конструктор', () => {
    cy.get('[data-cy="ingredient-main"]')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get(SELECTORS.constructorIngredients)
      .find(SELECTORS.constructorIngredient)
      .should('exist');
  });

  it('должен добавлять соус в конструктор', () => {
    cy.get('[data-cy="ingredient-sauce"]')
      .closest('li')
      .contains('Добавить')
      .click();

    cy.get(SELECTORS.constructorIngredients)
      .find(SELECTORS.constructorIngredient)
      .should('exist');
  });
});
