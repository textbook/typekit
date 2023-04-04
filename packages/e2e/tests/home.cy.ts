describe("home page", () => {
	it("shows a message from the API", () => {
		cy.visit("/");
		cy.findByText("Hello, world!").should("exist");
	});
});
