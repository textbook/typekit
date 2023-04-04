import merge from "webpack-merge";
import "webpack-dev-server";

import common from "./common.config";

export default merge(common, {
	devtool: "inline-source-map",
	devServer: {
		historyApiFallback: {
			disableDotRule: true,
		},
		port: 3000,
		proxy: [
			{
				context: ["/api", "/healthz"],
				logLevel: "debug",
				logProvider: () => console,
				target: "http://localhost:3100",
			},
		],
		static: false,
	},
	mode: "development",
});
