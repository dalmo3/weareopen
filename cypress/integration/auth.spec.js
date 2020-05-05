// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('Auth', () => {
  it('Auth', () => {
    cy.visit('/');

    cy.get('#main')
    cy.contains('Tests').click();
    // cy.contains('Log out').click(); // should test if logged in first

    // LOGGING IN

    cy.contains('Redirect').click();

    cy.get('input[name=email]')
      .type('dalmo3+test1@gmail.com')
      .should('have.value', 'dalmo3+test1@gmail.com');

    cy.get('input[name=password]').type('H%&PcGotv2iT7W%U');

    cy.get('.auth0-lock-submit').click();

    // LOGGED IN?
    cy.get('[aria-label="account of current user"]').should('exist').click();
    //open profile
    cy.get('.MuiPopover-paper').contains('Profile').click();
    //log out
    cy.get('[aria-label="account of current user"]').should('exist').click();
    cy.get('.MuiPopover-paper').contains('Log out').click();
  
    // cy.clearLocalStorage() // just in case this might be necessary

    // logged out?
    cy.get('[aria-label="account of current user"]').should('not.exist');
    cy.contains('Tests').click();
    // })
  });
});
