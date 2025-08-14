import jwt from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(401).send("Unauthorized!");
  }
  const token = authorization.split(" ")[1];
  if (!token) {
    return res.status(500).send("No Token");
  }
  jwt.verify(token, process.env.SecretAccessToken, (err, decode) => {
    if (err) return res.status(403).send("Sth went wrong");
    req.username = decode.username;
    next();
  });
};
export default authMiddleware;
