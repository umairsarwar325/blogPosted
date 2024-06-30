import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import conf from "../conf/conf";

const firebaseConfig = {
  apiKey: conf.firebaseApiKey,
  authDomain: conf.firebaseAuthDomain,
  databaseURL: conf.firebaseDatabaseUrl,
  projectId: conf.firebaseProjectId,
  storageBucket: conf.firebaseStorageBucket,
  messagingSenderId: conf.firebaseMessagingSenderId,
  appId: conf.firebaseAppId,
  measurementId: conf.firebaseMeasurementId,
};

class AuthService {
  app;
  auth;

  constructor() {
    // Initialize Firebase
    this.app = initializeApp(firebaseConfig);
    // Initialize Firebase Authentication and get a reference to the service
    this.auth = getAuth(this.app);
  }

  async createAccount({ email, password, name }) {
    const user = {
      state: true,
      data: null,
    };
    const displayName = name;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password,
        displayName
      );
      user.data = await userCredential.user;
      if (user.data) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      user.state = false;
      user.data = error.message;
      return user;
    }
  }

  async login({ email, password }) {
    const user = {
      state: true,
      data: null,
    };
    // console.log(this.auth)
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      user.data = await userCredential.user;
      if (user.data) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      user.state = false;
      user.data = error.message;
      return user;
    }
  }

  async logout() {
    try {
      signOut(this.auth)
        .then(() => {
          return true;
        })
        .catch((error) => {
          return false;
        });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(
        `Firebase Auth :: Logout :: errorCode: ${errorCode}  errorMessage: ${errorMessage}`
      );
    }
  }

  async getCurrentUser() {
    try {
      onAuthStateChanged(this.auth, (user) => {
        console.log(user);
        if (user) {
          return user;
        } else {
          return null;
        }
      });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(
        `Firebase Auth :: getCurrentUser :: errorCode: ${errorCode}  errorMessage: ${errorMessage}`
      );
      return false;
    }
  }
}

const authService = new AuthService();
export default authService;
export const app = authService.app;
