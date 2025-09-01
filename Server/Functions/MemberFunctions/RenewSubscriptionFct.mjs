import { db } from "../../DB/firebase.mjs"; // Firebase Admin SDK
import moment from "moment";

async function renewSubscription(req, res) {
  const { firstName, lastName, dateOfBirth, phoneNumber } = req.body;

  try {
    const subscriptionDay = moment().format("YYYY-MM-DD"); // ISO format
    const endSubscriptionDay = moment().add(1, "month").format("YYYY-MM-DD");

    // Query member
    const snapshot = await db
      .collection("members")
      .where("firstName", "==", firstName)
      .where("lastName", "==", lastName)
      .where("dateOfBirth", "==", dateOfBirth)
      .where("phoneNumber", "==", phoneNumber)
      .get();

    if (snapshot.empty) {
      console.log("Member not found for renewal!");
      return res.sendStatus(400);
    }

    // Update all matching documents (usually only one)
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        subscriptionDay,
        endSubscriptionDay,
      });
    });

    await batch.commit();

    console.log("Subscription renewed successfully!");
    return res.sendStatus(200);
  } catch (err) {
    console.error("Error renewing subscription:", err);
    return res.sendStatus(400);
  }
}

export default renewSubscription;
