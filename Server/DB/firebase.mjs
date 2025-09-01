import admin from "firebase-admin";

// Parse the Firebase service account from environment variable
let serviceAccount;
try {
  // Handle different ways the JSON might be stored in the environment variable
  const firebaseKey = process.env.FIREBASE_KEY;

  if (!firebaseKey) {
    throw new Error("FIREBASE_KEY environment variable is not set");
  }

  // Try parsing directly first
  try {
    serviceAccount = JSON.parse(firebaseKey);
  } catch (directParseError) {
    // If direct parsing fails, try replacing escaped newlines
    try {
      serviceAccount = JSON.parse(firebaseKey.replace(/\\n/g, "\n"));
    } catch (replaceParseError) {
      // If that fails, try a more comprehensive replacement
      const cleanedKey = firebaseKey
        .replace(/\\n/g, "\n")
        .replace(/\\"/g, '"')
        .replace(/\\r/g, "\r")
        .replace(/\\t/g, "\t")
        .replace(/\\\\/g, "\\");

      serviceAccount = JSON.parse(cleanedKey);
    }
  }
} catch (error) {
  console.error("Error parsing Firebase service account:", error);
  throw new Error(
    "Failed to parse Firebase service account JSON. Please check your FIREBASE_KEY environment variable."
  );
}

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export default admin;
