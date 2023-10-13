export const protectedRouter = () => {
	const user = JSON.parse(localStorage.getItem("persist:root") as string);
	if (user) {
		const auth = JSON.parse(user?.global);

		if (auth?.isLogin == true) {
			if (auth?.user?.role == "admin") {
				return true;
			}
			return false;
		} else {
			return false;
		}
	}
	return false;
};
