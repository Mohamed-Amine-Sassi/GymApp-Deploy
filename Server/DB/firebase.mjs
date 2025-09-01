import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_KEY.replace(/\\n/g, "\n")
);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const db = admin.firestore();
