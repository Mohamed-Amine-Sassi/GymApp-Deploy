import { db } from "../../DB/firebase.mjs";

const registerAdmin = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      username,
      password,
    } = req.body;

    const docRef = await db.collection("admins").add({
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      username,
      password,
    });

    console.log("Admin Saved with ID:", docRef.id);
    res.status(201).json({ id: docRef.id, ...req.body });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default registerAdmin;
