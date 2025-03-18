describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should display the home page", () => {
    cy.get("h1").should("exist");
    cy.url().should("include", "/");
  });

  it("should have correct metadata", () => {
    cy.title().should("include", "Todo");
  });
});
