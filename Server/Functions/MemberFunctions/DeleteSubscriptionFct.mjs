import { db } from "../../DB/firebase.mjs"; // Firebase Admin SDK

const DeleteSubscription = async (req, res) => {
  const { firstName, lastName, dateOfBirth, phoneNumber } = req.body;

  try {
    // Query for the member
    const snapshot = await db
      .collection("members")
      .where("firstName", "==", firstName)
      .where("lastName", "==", lastName)
      .where("dateOfBirth", "==", dateOfBirth)
      .where("phoneNumber", "==", phoneNumber)
      .get();

    if (snapshot.empty) {
      console.log("Member not found!");
      return res.sendStatus(400);
    }

    // Delete all matching documents (usually only one)
    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();

    console.log("Member deleted successfully!");
    return res.sendStatus(200);
  } catch (err) {
    console.error("Error deleting member:", err);
    return res.sendStatus(500);
  }
};

export default DeleteSubscription;
