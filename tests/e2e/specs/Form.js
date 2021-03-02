describe("Form", () => {
  it("Visit root url", () => {
    cy.visit("/");
  });

  it("Setting value into input fields and checking that it is setted", () => {
    cy.get("#category").should("have.value", "INCOME");
    cy.get("#category").select("OUTCOME");
    cy.get("#category").should("have.value", "OUTCOME");

    cy.get("#value").type("100");
    cy.get("#value").should("have.value", "100");

    cy.get("#description").type("Some text description");
    cy.get("#description").should("have.value", "Some text description");
  });
});
