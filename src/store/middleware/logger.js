const logger = (param) => (state) => (next) => (action) => {
	return next(action);
};
export default logger;
