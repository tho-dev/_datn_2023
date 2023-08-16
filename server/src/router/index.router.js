import example from "./example.router"

const routes = (app) => {
	app.use("/api/example", example)
}

export default routes