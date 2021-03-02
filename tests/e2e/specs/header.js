describe("Header tooltip", () => {
  it("Visit root url", () => {
    cy.visit("/");
  });

  it("Checking tooltip", () => {
    cy.get("[data-tooltip]").trigger("mouseenter");
    cy.get("[data-tooltipMsg]").should("be.visible");
    cy.get("[data-tooltip]").trigger("mouseleave");
    cy.get("[data-tooltipMsg]").should("not.be.visible");
    cy.get(".clear-btn").trigger("mouseover");
  });
});
