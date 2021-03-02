describe("Checking filters", () => {
  it("Visit root url", () => {
    cy.visit("/");
  });

  it("Checking filter buttons for adding and removing a class when changing a filter", () => {
    cy.get("[data-filter=All]").should("have.class", "active");
    cy.get("[data-filter=INCOME]").trigger("click");
    cy.get("[data-filter=INCOME]").should("have.class", "active");
    cy.get("[data-filter=All]").should("not.have.class", "active");
    cy.get("[data-filter=OUTCOME]").trigger("click");
    cy.get("[data-filter=OUTCOME]").should("have.class", "active");
    cy.get("[data-filter=INCOME]").should("not.have.class", "active");
  });
});
