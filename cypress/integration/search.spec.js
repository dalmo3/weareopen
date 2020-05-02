// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Search', () => {
  it('Search', () => {
    cy.visit('/');

    //click search goes to /search
    cy.get('.MuiInputBase-fullWidth')
      .click()
      .url()
      .should('include', '/search');

    cy.get('.MuiInputBase-fullWidth')
      .should('have.class', 'Mui-focused')
      .type('food')
      .get('input')
      .should('have.value', 'food');
    // .should('contain.text', 'food'); //how to read this?

    cy.get('[class*=makeStyles-card]')
      .first()
      .contains(/.*food.*/i);

    cy.get('[aria-label="open business page"]')
      .first()
      .click()
      .url()
      .should('contain', '/business');

    cy.get(
      'div#business-page button.MuiButtonBase-root.MuiButton-root.MuiButton-text'
    )
      .contains('Back to Results')
      .get(
        'div#business-page button.MuiButtonBase-root.MuiButton-root.MuiButton-text'
      )
      .click()
      .url()
      .should('include', '/search');

    cy.get('[class*=makeStyles-card]')
      .first()
      .contains(/.*food.*/i);
  });
});
