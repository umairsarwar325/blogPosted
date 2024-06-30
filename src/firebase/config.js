import {
  collection,
  getFirestore,
  addDoc,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytes,
  deleteObject,
  getDownloadURL,
} from "firebase/storage";
import { app } from "./auth";
import { v4 as uuidv4 } from "uuid";

class DatabaseAndStorageService {
  db;
  storage;

  constructor() {
    // Initialize Cloud Firestore and get a reference to the service
    this.db = getFirestore(app);

    // Get a reference to the storage service, which is used to create references in your storage bucket
    this.storage = getStorage();
  }

  async createPost({ title, slug, content, featuredImage, status, userID }) {
    try {
      title = title || null;
      content = content || null;
      featuredImage = featuredImage || null;
      status = status || null;
      userID = userID || null;
      slug = slug || null;
      const docRef = await addDoc(collection(this.db, "articles"), {
        title,
        content,
        featuredImage,
        status,
        userID,
        slug,
      });
      if (docRef) {
        return docRef.id;
      } else {
        return null;
      }
    } catch (e) {
      console.error("Firebase DatabaseService :: createPost :: ", e);
    }
  }

  async updatePost(
    id,
    { title, content, slug, featuredImage, status, userID, postID }
  ) {
    try {
      title = title || null;
      content = content || null;
      featuredImage = featuredImage || null;
      status = status || null;
      userID = userID || null;
      postID = postID || null;
      slug = slug || null;
      const docRef = doc(this.db, "articles", id);
      await updateDoc(docRef, {
        title,
        content,
        featuredImage,
        status,
        userID,
        postID,
        slug,
      });
      return docRef.id;
    } catch (e) {
      console.error("Firebase DatabaseService :: updatePost :: ", e);
    }
  }

  async deletePost(id) {
    try {
      await deleteDoc(doc(this.db, "articles", id));
    } catch (e) {
      console.error("Firebase DatabaseService :: deletePost :: ", e);
    }
  }

  async getPost(id) {
    try {
      const docRef = doc(this.db, "articles", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return false;
      }
    } catch (e) {
      console.error("Firebase DatabaseService :: getPost :: ", e);
      return false;
    }
  }
  async getPosts(
    query1 = query(
      collection(this.db, "articles"),
      where("status", "==", "active")
    )
  ) {
    try {
      const q = query1;
      const querySnapshot = await getDocs(q);
      const querySnapshotData = [];
      querySnapshot.forEach((value) => {
        querySnapshotData.push(value.data());
      });
      return querySnapshotData;
    } catch (e) {
      console.error("Firebase DatabaseService :: getPosts :: ", e);
      return false;
    }
  }

  // Storage Services
  async uplaodFile(file) {
    const uid = uuidv4();
    try {
      const storageRef = ref(this.storage, uid);
      const uploadTask = await uploadBytes(storageRef, file);
      if (uploadTask) {
        // const metadata = await getMetadata(storageRef);
        return uid;
      } else {
        return false;
      }
    } catch (error) {
      console.log("FirseBase StorageService :: ulpoadFile :: ", error);
      return false;
    }
  }
  async getImageUrl(uid) {
    try {
      const storageRef = ref(this.storage, uid);
      const url = await getDownloadURL(storageRef);
      if (url) {
        return url;
      } else {
        return null;
      }
    } catch (error) {
      console.log("FirseBase StorageService :: getImageUrl :: ", error);
      return false;
    }
  }
  async deleteFile(file) {
    try {
      // Create a reference to the file to delete
      const desertRef = ref(this.storage, file);
      // Delete the file
      await deleteObject(desertRef);
    } catch (error) {
      console.log("FirseBase StorageService :: deleteFile :: ", error);
      return false;
    }
  }
}

const service = new DatabaseAndStorageService();
export default service;
