// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Auth', () => {
  it('Auth', () => {
    cy.visit('/');

    // cy.wait(2000);

    cy.get('.MuiDrawer-paperAnchorLeft').should('not.exist');
    cy.get('[aria-label="open drawer"]').click();

    cy.get('.MuiDrawer-paperAnchorLeft')
      .should('exist')
      .contains('Business Owners')
      .click();
  });
});
