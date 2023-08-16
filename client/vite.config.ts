import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), "");
	const processEnvValues = {
		"process.env": Object.entries(env).reduce((prev, [key, val]) => {
			return {
				...prev,
				[key]: val,
			};
		}, {}),
	};
	return {
		plugins: [react(), tsconfigPaths()],
		server: {
			port: 3000,
			watch: {
				usePolling: true,
			},
		},
		define: processEnvValues,
	};
});
