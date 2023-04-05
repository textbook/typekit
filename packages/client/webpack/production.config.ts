import { resolve } from "node:path";

import HtmlWebpackTagsPlugin from "html-webpack-tags-plugin";
import merge from "webpack-merge";

import { dependencies } from "../package.json";

import common from "./common.config";

export default merge(common, {
	devtool: "source-map",
	mode: "production",
	output: {
		filename: "[name].[contenthash].js",
		path: resolve(__dirname, "..", "..", "..", "dist", "static"),
	},
	plugins: [
		new HtmlWebpackTagsPlugin({
			scripts: (
				[
					{ packageName: "react", variableName: "React" },
					{ packageName: "react-dom", variableName: "ReactDOM" },
				] as const
			).map(({ packageName, variableName }) => ({
				attributes: { crossorigin: "" },
				external: { packageName, variableName },
				path: `https://cdnjs.cloudflare.com/ajax/libs/${packageName}/${dependencies[
					packageName
				].replace(/^[^~]/, "")}/umd/${packageName}.production.min.js`,
			})),
			usePublicPath: false,
		}),
	],
});
