import { initializeApp } from "firebase/app";
import { Analytics, getAnalytics } from "firebase/analytics";
import { getDatabase, Database } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional  
const firebaseFundraisingConfig = {
  apiKey: process.env.FIREBASE_CONFIG_FUNDRAISING_API_KEYS,
  authDomain: process.env.FIREBASE_CONFIG_FUNDRAISING_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_CONFIG_FUNDRAISING_DATABASE_URL,
  projectId: process.env.FIREBASE_CONFIG_FUNDRAISING_PROJECT_ID,
  storageBucket: process.env.FIREBASE_CONFIG_FUNDRAISING_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_CONFIG_FUNDRAISING_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_CONFIG_FUNDRAISING_APP_ID,
  measurementId: process.env.FIREBASE_CONFIG_FUNDRAISING_MEASUREMENT_ID,
};

  let analyticsFund: Analytics;
  let databaseFund: Database;
if (firebaseFundraisingConfig?.projectId) {
  // Initialize Firebase
  const appFund = initializeApp(firebaseFundraisingConfig, 'fundraising');

  if (appFund.name && typeof window !== 'undefined') {
    analyticsFund = getAnalytics(appFund);
  }

  databaseFund = getDatabase(appFund);
}

export {analyticsFund, databaseFund};
