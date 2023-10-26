export const sortOptions = (input) => {
	input.sort((a, b) => (a.position > b.position ? 1 : -1))
	return input
}