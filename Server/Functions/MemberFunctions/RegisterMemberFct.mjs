import moment from "moment/moment.js";
import { db } from "../../DB/firebase.mjs"; // Firebase Admin SDK

const registerMember = async (req, res) => {
  const { firstName, lastName, phoneNumber, dateOfBirth, specialty } = req.body;

  const subscriptionDay = moment().format("YYYY-MM-DD"); // ISO format
  const endSubscriptionDay = moment().add(1, "month").format("YYYY-MM-DD");

  try {
    // Add new member to Firestore collection "members"
    const docRef = await db.collection("members").add({
      firstName,
      lastName,
      phoneNumber,
      dateOfBirth,
      specialty,
      subscriptionDay,
      endSubscriptionDay,
    });

    console.log("Member Saved with ID:", docRef.id);
    return res.status(201).json({ id: docRef.id, ...req.body });
  } catch (err) {
    console.error("Error saving member:", err);
    return res.status(500).json({ error: err.message });
  }
};

export default registerMember;
