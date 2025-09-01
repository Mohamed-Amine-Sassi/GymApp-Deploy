import { db } from "../../DB/firebase.mjs"; // Firebase Admin SDK
import jwt from "jsonwebtoken";

const Login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Firestore query: find admin by username
    const snapshot = await db
      .collection("admins")
      .where("username", "==", username)
      .get();

    if (snapshot.empty) {
      console.log("Admin doesn't exist!");
      return res.status(400).send(false);
    }

    // Since username is unique, take the first document
    const foundAdminDoc = snapshot.docs[0];
    const foundAdmin = foundAdminDoc.data();

    if (foundAdmin.password !== password) {
      console.log("Password incorrect!");
      return res.status(400).send(false);
    }

    console.log(username);

    // Generate tokens
    const AccessToken = jwt.sign(
      { username: username },
      process.env.SecretAccessToken,
      { expiresIn: "1m" }
    );
    const RefreshToken = jwt.sign(
      { username: username },
      process.env.SecretRefreshToken,
      { expiresIn: "7d" }
    );

    // Set cookie
    res.cookie("jwt", RefreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
      domain: process.env.NODE_ENV === "production" ? ".vercel.app" : undefined,
    });

    return res.status(200).json({ AccessToken: AccessToken });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export default Login;
