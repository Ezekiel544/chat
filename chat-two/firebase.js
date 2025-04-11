import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkL2FJwh6URZEN82RbMye2qwWSnqXJmR8",
  authDomain: "chat-app-1aa7d.firebaseapp.com",
  projectId: "chat-app-1aa7d",
  storageBucket: "chat-app-1aa7d.firebasestorage.app",
  messagingSenderId: "434525804551",
  appId: "1:434525804551:web:73df00dbd35950ce3ef2a2"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signInUser = async (email, password, navigate) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in:", userCredential.user);
    navigate("/chat");
  } catch (error) {
    console.error("Error signing in:", error.message);
  }
};

const registerUser = async (email, password, navigate) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User registered:", user);
    
    // Store user in Firestore here solve 
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: serverTimestamp()
    });
    navigate("/chat");
  } catch (error) {
    console.error("Error registering:", error.message);
  }
};

const sendMessage = async (senderId, receiverId, message) => {
  try {
    await addDoc(collection(db, "messages"), {
      senderId,
      receiverId,
      message,
      timestamp: serverTimestamp()
    });
    console.log("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error.message);
  }
};

const checkAuthState = (callback) => {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
};

export { auth, db, signInUser, registerUser, sendMessage, checkAuthState };



// const firebaseConfig = {
//   apiKey: "AIzaSyBkL2FJwh6URZEN82RbMye2qwWSnqXJmR8",
//   authDomain: "chat-app-1aa7d.firebaseapp.com",
//   projectId: "chat-app-1aa7d",
//   storageBucket: "chat-app-1aa7d.firebasestorage.app",
//   messagingSenderId: "434525804551",
//   appId: "1:434525804551:web:73df00dbd35950ce3ef2a2"
// };