import { db } from "../../DB/firebase.mjs"; // Firebase Admin SDK

const getAllMembers = async (req, res) => {
  try {
    const snapshot = await db.collection("members").get();

    if (snapshot.empty) {
      return res.status(200).send("No Members Yet!");
    }

    // Map documents to array
    const allMembers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(allMembers);
  } catch (err) {
    console.error("Error getting all members:", err);
    return res.status(400).send("Error getting all members");
  }
};

export default getAllMembers;
