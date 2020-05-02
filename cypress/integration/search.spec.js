// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Search', () => {
  it('Search', () => {
    
    cy.visit('/');
    cy.get('.MuiInputBase-fullWidth')
      .click()
      .url()
      .should('include', '/search');

    cy.get('.MuiInputBase-fullWidth')
      .should('have.class', 'Mui-focused')
      .type('food')
      // .should('contain.text', 'food');

    cy.get('.makeStyles-card-316')
      .should('contain', 'Food')
    
    cy.get('[aria-label="open business page"]')
      .first()
      .click()
      .url()
      .should('contain', '/business')

    cy.get('div#business-page button.MuiButtonBase-root.MuiButton-root.MuiButton-text span.MuiButton-label')
      .should('include.text', 'Back to Results')
      .click()
      .url()
      .should('include', '/search');

  });

});