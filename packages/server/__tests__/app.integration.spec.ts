import request from "supertest";

import app from "../src/app";

describe("base application", () => {
	it("exposes a /healthz endpoint", async () => {
		await request(app).get("/healthz").expect(200, "OK");
	});
});
