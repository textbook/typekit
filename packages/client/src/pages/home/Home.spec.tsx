import { render, screen } from "@testing-library/react";
import { MessageDto } from "@typekit/shared";
import { rest } from "msw";

import { server } from "../../setupTests";

import Home from ".";

describe("Home page", () => {
	it("renders a message from the API", async () => {
		const message = "Some random message";
		server.use(
			rest.get("/api/messages", (req, res, ctx) => {
				return res(
					ctx.json<MessageDto[]>([{ content: message, created: "2021-02-03" }]),
				);
			}),
		);
		render(<Home />);
		await expect(screen.findByText(message)).resolves.toBeInTheDocument();
	});
});
