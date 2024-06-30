const conf = {
  firebaseApiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
  firebaseAuthDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
  firebaseDatabaseUrl: String(import.meta.env.VITE_FIREBASE_DATABASE_URL),
  firebaseProjectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
  firebaseStorageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
  firebaseMessagingSenderId: String(
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
  ),

  firebaseAppId: String(import.meta.env.VITE_FIREBASE_APP_ID),
  firebaseMeasurementId: String(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
  rteApiKey: String(import.meta.env.VITE_RTE_API_KEY),
};

export default conf;

