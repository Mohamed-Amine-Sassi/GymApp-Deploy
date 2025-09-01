import { db } from "../../DB/firebase.mjs"; // Firebase Admin SDK
import moment from "moment";

export const NbreOfMembers = async (req, res) => {
  try {
    const snapshot = await db.collection("members").get();
    const count = snapshot.size; // snapshot.size gives number of documents
    return res.status(200).json(count);
  } catch (err) {
    console.error("Error counting members:", err);
    return res.status(500).json({ error: err.message });
  }
};

export const NbreOfEndedSubMembers = async (req, res) => {
  try {
    const Today = moment().format("YYYY-MM-DD"); // ISO format for comparison
    const snapshot = await db
      .collection("members")
      .where("endSubscriptionDay", "<", Today)
      .get();

    const count = snapshot.size; // number of ended subscription members
    return res.status(200).json(count);
  } catch (err) {
    console.error("Error getting ended subscription members:", err);
    return res.status(500).json({ error: err.message });
  }
};
