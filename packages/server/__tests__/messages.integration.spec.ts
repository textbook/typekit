import request from "supertest";

import app from "../src/app";

describe("/api/messages", () => {
	describe("GET /", () => {
		it("returns an array of messages", async () => {
			const { body: messages } = await request(app)
				.get("/api/messages")
				.expect(200);
			expect(messages).toHaveLength(1);
			expect(messages.at(0)).toMatchObject({ content: "Hello, world!" });
		});
	});
});
