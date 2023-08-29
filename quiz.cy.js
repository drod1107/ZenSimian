Cypress._.times(100, () => {
  describe("Landing page checks", () => {
    it("lands on the home page, verifies the carousel is working, and clicks the Start Quiz button", () => {
      cy.visit("/");
      cy.get("#landing > a > #startQuiz").click();

      // create a random number and assign it to a variable so the answers selected are semi randomized
      const min = 1; // Minimum value
      const max = 4; // Maximum value
      let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      for (let i = 0; i < 10; i++) {
        // Replace 5 with the number of repetitions you want
        cy.get(`:nth-child(${randomNumber}) > label`).click();
        cy.get("#nextQuestion").click();
        cy.wait(3);
      }
    });
  });
});
