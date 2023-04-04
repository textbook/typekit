import { defineConfig } from "cypress";

export default defineConfig({
	downloadsFolder: "./downloads",
	fixturesFolder: "./fixtures",
	e2e: {
		baseUrl: "http://localhost:4321",
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		setupNodeEvents(on, config) {
			// implement node event listeners here
		},
		specPattern: "./tests/**/*.cy.ts",
		supportFile: "./support/e2e.ts",
	},
	screenshotsFolder: "./screenshots",
	videosFolder: "./videos",
});
