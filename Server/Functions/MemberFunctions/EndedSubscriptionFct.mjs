import { db } from "../../DB/firebase.mjs"; // Firebase Admin SDK
import moment from "moment";

const EndedSubscription = async (req, res) => {
  const Today = moment().format("YYYY-MM-DD"); // use ISO format for comparison

  try {
    // Query members where endSubscriptionDay < Today
    const snapshot = await db
      .collection("members")
      .where("endSubscriptionDay", "<", Today)
      .get();

    if (snapshot.empty) {
      return res.status(200).json([]);
    }

    // Map documents to array
    const endedMembers = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(endedMembers);
  } catch (err) {
    console.error("Error getting ended members:", err);
    return res.status(400).send("Error getting ended members");
  }
};

export default EndedSubscription;
