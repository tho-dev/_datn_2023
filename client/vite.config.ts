import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");

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
			host: "localhost",
			port: 3000,
			watch: {
				usePolling: true,
			},
		},
		define: processEnvValues,
	};
});
