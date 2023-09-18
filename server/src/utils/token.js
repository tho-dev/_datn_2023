export const getAuthToken = (req) => {
  const authorization =
    req.headers?.authorization?.toString() ?? req.query.token ?? "";
  const authToken = authorization.replace("Bearer ", "");

  return authToken;
};
