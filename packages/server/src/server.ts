import app from "./app";

const port = parseInt(process.env.PORT ?? "3000", 10);

const server = app.listen(port, () => {
	console.log(`listening on ${port}`);
});
