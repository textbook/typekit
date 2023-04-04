import "dotenv/config";

checkRequiredEnvVars(process.env, [] as const);

export default {
	port: parseInt(process.env.PORT ?? "3000", 10),
	logLevel: process.env.LOG_LEVEL?.toLowerCase() ?? "info",
	production: process.env.NODE_ENV?.toLowerCase() === "production",
} as const;

function checkRequiredEnvVars<T extends string>(
	env: NodeJS.ProcessEnv,
	required: readonly T[],
): asserts env is NodeJS.ProcessEnv & Record<T, string> {
	const missing = required.filter(
		(variable) => process.env[variable] === undefined,
	);
	if (missing.length > 0) {
		// eslint-disable-next-line no-console
		console.error(`Missing required configuration: ${missing.join(", ")}`);
		process.exit(1);
	}
}
