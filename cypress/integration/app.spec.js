// type definitions for Cypress object "cy"
/// <reference types="cypress" />

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });
});

describe('App', () => {
  it('Render app', () => {
    cy.visit('/');
    cy.contains('Home');
    cy.get('.MuiButton-label').should('exist');
    cy.contains('Profile').click().url().should('include', '/profile');
  });
});

describe('Pages', () => {
  it('Navigate', () => {
    cy.visit('/');
    cy.contains('Profile').click().url().should('include', '/profile');
    cy.contains('Home').click().url().should('eq', 'https://localhost:7317/');
  });
});

