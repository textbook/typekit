import request from "supertest";

import app from "../src/app";

describe("base application", () => {
	describe("GET /health", () => {
		it("returns 200 OK", async () => {
			await request(app).get("/healthz").expect(200, "OK");
		});

		it("rejects other request methods", async () => {
			await request(app).post("/healthz").expect(405, "Method Not Allowed");
		});
	});
});
