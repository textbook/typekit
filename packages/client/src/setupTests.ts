import "@testing-library/jest-dom";
import { setupServer } from "msw/node";
import "whatwg-fetch";

export const server = setupServer();

beforeAll(() => {
	server.listen({
		onUnhandledRequest({ method, url }) {
			throw new Error(`unhandled ${method} request to ${url}`);
		},
	});
});

beforeEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});
