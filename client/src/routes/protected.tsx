export const protectedRouter = () => {
	const user = JSON.parse(localStorage.getItem("persist:root") as string);
	const auth = JSON.parse(user?.global);
	if (auth?.user?.role == "admin") {
		return true;
	}
	return false;
};
