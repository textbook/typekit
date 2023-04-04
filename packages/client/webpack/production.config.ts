import { resolve } from "node:path";

import merge from "webpack-merge";

import common from "./common.config";

export default merge(common, {
	devtool: "source-map",
	mode: "production",
	output: {
		filename: "[name].[contenthash].js",
		path: resolve(__dirname, "..", "..", "..", "dist", "static"),
	},
});
