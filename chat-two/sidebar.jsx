import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

const Sidebar = ({ currentUser, selectUser }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "users"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.log("Fetched users from Firestore:", userList); // Log fetched users problem
      setUsers(userList);
    });

    return () => unsubscribe();
  }, []);

  // Separate logged-in user here
  const loggedInUser = users.find((user) => user.id === currentUser?.uid);
  const otherUsers = users.filter((user) => user.id !== currentUser?.uid);

  return (
    <div className="w-1/4 bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <ul>
        {/* Display logged-in user */}
        {loggedInUser && (
          <li className="p-2 mb-2 cursor-pointer rounded bg-gray-800 font-bold">
            YOU
          </li>
        )}

        {/* Display other users */}
        {otherUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => selectUser(user)}
            className="p-2 mb-2 cursor-pointer rounded hover:bg-gray-700"
          >
            {user.displayName || "Unnamed User"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
