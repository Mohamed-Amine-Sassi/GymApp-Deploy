import jwt from "jsonwebtoken";
const Refresh = (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).send("No Refresh Token");
  }
  jwt.verify(token, process.env.SecretRefreshToken, (err, decode) => {
    if (err) {
      return res
        .status(403)
        .send("Sth went wrong when checking for refresh Token");
    }
    const accessToken = jwt.sign(
      { username: decode.username },
      process.env.SecretAccessToken,
      { expiresIn: "1min" }
    );
    return res.status(200).json({ AccessToken: accessToken });
  });
};
export default Refresh;
