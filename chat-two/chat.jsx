import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { auth, db, checkAuthState } from "./firebase";
import { collection, query, orderBy, onSnapshot, getDocs, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faPaperPlane, faComments } from "@fortawesome/free-solid-svg-icons";
import EmojiPicker from "emoji-picker-react";
import { faSmile } from "@fortawesome/free-solid-svg-icons";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { FaSun, FaMoon } from "react-icons/fa";  // Importing the icons here problem
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faPhone, faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import {  faPaperclip } from "@fortawesome/free-solid-svg-icons";


import "./login.css";
  

const Chat = () => {
const [contextMenu, setContextMenu] = useState(null);
 const [editMessage, setEditMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [selectedMessage, setSelectedMessage] = useState(null);
const [isDarkMode, setIsDarkMode] = useState(false);
const [showDropdown, setShowDropdown] = useState(false);
const [chatBackground, setChatBackground] = useState("#8A2BE2"); // default
const [replyTo, setReplyTo] = useState(null);

const handleReply = (message) => {
  setReplyTo(message);
};


const handleFileUpload = (e) => {
  const files = e.target.files;
  console.log("Selected files:", files); // Replace with upload logic
};


const emojiPickerRef = useRef(null);

useEffect(() => {
  function handleClickOutside(event) {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
      setShowEmojiPicker(false); // ✅ Close emoji picker when clicking outside
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  useEffect(() => {
    checkAuthState((loggedInUser) => {
      if (!loggedInUser) {
        navigate("/");
      } else {
        setUser(loggedInUser);
      }
    });
  }, [navigate]);
  const getUserColor = (userId) => {
    const colors = ["#FFB6C1", "#FFD700", "#90EE90", "#87CEFA", "#FF6347", "#9370DB", "#FF4500", "#008080"];
    const index = userId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
    return colors[index];
  };

  const handleTouchStart = (event, msg) => {
    if (window.innerWidth > 768) return; // Only for small screens

    let timer = setTimeout(() => {
        setContextMenu({
            x: event.touches[0].clientX,
            y: event.touches[0].clientY,
            message: msg,
        });
    }, 1000); // 2-second hold to trigger menu

    event.target.dataset.longPressTimer = timer;
};

const handleTouchEnd = (event) => {
    clearTimeout(event.target.dataset.longPressTimer);
};

  // Function to handle right-click
  const handleRightClick = (event, msg) => {
    event.preventDefault(); // Prevent default right-click menu
  
    if (msg.senderId !== user.uid) return; // Only allow options for the user's own messages
  
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      message: msg,
    });
  };
  

  // Function to handle deleting a message
  const handleDeleteClick = (msgId) => {
    setConfirmDelete(msgId); // Show delete confirmation for the selected message
};

const confirmDeleteMessage = async (msgId) => {
  // Find the message in the current state to ensure it's the user's message
  const msgToDelete = messages.find(msg => msg.id === msgId);
  if (!msgToDelete) return;

  if (msgToDelete.senderId !== user.uid) return; // Ensure user can only delete their own messages

  // Delete the message from Firebase
  await deleteDoc(doc(db, "messages", msgId));

  // Remove the deleted message from the local state
  setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== msgId));

  setContextMenu(null); // Close the context menu after deletion
};


const cancelDelete = () => {
    setConfirmDelete(null);
};
const handleDeleteMessage = (msg) => {
  setSelectedMessage(msg); // Store the message to be deleted
  setShowDeleteModal(true); // Show the delete confirmation modal
};



  // Function to handle editing a message
const handleEditMessage = (msg) => {
    setEditMessage(msg);
    setMessage(msg.message); // Set input box with the message text
    setContextMenu(null);
  };
  // Function to send or update a message
  const handleSendOrUpdateMessage = async () => {
    if (!message.trim()) return;

    if (editMessage) {
        if (!editMessage.id) {
            console.error("Error: No valid message to edit");
            return;
        }

        await updateDoc(doc(db, "messages", editMessage.id), {
            message,
            edited: true, // ✅ Add this field to mark the message as edited
        });

        // ✅ Keep the message in its original position by updating the local state without sorting
        setMessages((prevMessages) =>
            prevMessages.map((msg) =>
                msg.id === editMessage.id ? { ...msg, message, edited: true } : msg
            )
        );

        setEditMessage(null);
    } else {
        await addDoc(collection(db, "messages"), {
            senderId: user.uid,
            receiverId: selectedUser.id,
            message,
            timestamp: new Date(),
            edited: false, // ✅ New messages are not edited
        });
    }

    setMessage("");
    setReplyToMessage(null); // ✅ clear reply after sending
};



  // Close context menu when clicking outside
useEffect(() => {
    const closeContextMenu = () => setContextMenu(null);
    window.addEventListener("click", closeContextMenu);
    return () => window.removeEventListener("click", closeContextMenu);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = await getDocs(collection(db, "users"));
      let usersData = usersCollection.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

      const uniqueUsers = [];
      const seenEmails = new Set();

      for (let user of usersData) {
        if (!seenEmails.has(user.email)) {
          uniqueUsers.push(user);
          seenEmails.add(user.email);
        }
      }

      if (user) {
        uniqueUsers.sort((a, b) => (a.id === user.uid ? -1 : b.id === user.uid ? 1 : 0));
      }

      setUsers(uniqueUsers);
    };

    fetchUsers();
  }, [user]);

  useEffect(() => {
    if (!user || !selectedUser) return;

    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const filteredMessages = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter(
          (msg) =>
            (msg.senderId === user.uid && msg.receiverId === selectedUser.id) ||
            (msg.senderId === selectedUser.id && msg.receiverId === user.uid)
        );
      setMessages(filteredMessages);
    });

    return () => unsubscribe();
  }, [user, selectedUser]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chatContainerRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (message.trim() === "" || !selectedUser) return;

    await addDoc(collection(db, "messages"), {
      senderId: user.uid,
      receiverId: selectedUser.id,
      message,
      timestamp: new Date(),
    });
    setMessage("");
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false); 
    setSelectedMessage(null);  
  };
  
  const handleConfirmDelete = async () => {
    if (!selectedMessage || !selectedMessage.id) return;

    try {
        await deleteDoc(doc(db, "messages", selectedMessage.id)); // Delete from Firebase

        // Remove the deleted message from local state
        setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== selectedMessage.id));

        setShowDeleteModal(false);
        setSelectedMessage(null); 
    } catch (error) {
        console.error("Error deleting message:", error);
    }
};

  
const DeleteConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
      <div
          style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Glass effect
              backdropFilter: "blur(10px)", // Blur background
              border: "1px solid rgba(255, 255, 255, 0.2)",
              borderRadius: "12px", // Rounded corners
              padding: "25px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              zIndex: 1001,
              width: "90%",
              maxWidth: "350px",
              textAlign: "center",
              color: "#333",
              animation: "fadeIn 0.3s ease-in-out",
          }}
      >
          <h3 style={{ fontSize: "18px", marginBottom: "10px" }}>
              Are you sure?
          </h3>
          <p style={{ fontSize: "14px", color: "#666" }}>
              This action cannot be undone.
          </p>

          <div style={{ marginTop: "15px", display: "flex", justifyContent: "center", gap: "10px" }}>
              <button
                  style={{
                      backgroundColor: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "0.3s",
                  }}
                  onClick={onConfirm}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#c0392b")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#e74c3c")}
              >
                  Yes, Delete
              </button>
              <button
                  style={{
                      backgroundColor: "#bdc3c7",
                      color: "#333",
                      border: "none",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      transition: "0.3s",
                  }}
                  onClick={onCancel}
                  onMouseOver={(e) => (e.target.style.backgroundColor = "#95a5a6")}
                  onMouseOut={(e) => (e.target.style.backgroundColor = "#bdc3c7")}
              >
                  Cancel
              </button>
          </div>
      </div>
  );
};
  if (!user) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar (Original design + Full width on mobile) */}
      <div
  style={{
    width: isMobile ? (selectedUser ? "0px" : "100%") : "320px",
    minWidth: isMobile ? (selectedUser ? "0px" : "100%") : "320px",
    background: " #303A40",
    borderRight: isMobile ? "none" : "1px solid #ccc",
    display: isMobile && selectedUser ? "none" : "block",
    transition: "width 0.3s ease-in-out",
    height: "100vh",
    overflowY: "auto",
    boxSizing: "border-box", 
    color : 'white'
    
  }}
>
<div
    style={{
      position: "sticky",
      top: 0,
      background: "#202A30",
      zIndex: 10, // higher than list
      padding: "10px", // add this for spacing inside
      borderBottom: "1px solid #ccc",
      margin: 0, // remove any margin

     
    }}
  >
    <div
  style={{
    display: "flex",
    alignItems: "center",
    padding: "10px",
    // background: "#f0f0f0",
  }}
>
  <div
    style={{
      width: "40px",
      height: "40px",
      borderRadius: "50%",
      backgroundColor: user.photoURL ? "transparent" : getUserColor(user.uid),
      backgroundImage: user.photoURL ? `url(${user.photoURL})` : "none",
      backgroundSize: "cover",
      backgroundPosition: "center",
      marginRight: "10px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "bold",
    }}
  >
    {!user.photoURL && (user.email[0] || "Y").toUpperCase()}
  </div>
  <div>
    <strong>YOU</strong>
    {/* <div style={{ fontSize: "12px", color: "#555" }}>{user.email}</div> */}
  </div>
</div>
          
        <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        style={{ width: "100%", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" , background : 'white' , color : 'black'}}
      />
      <h3>Users </h3>
      
    </div>

        
        {users
 .filter(
  (u) =>
    u.uid !== user.uid && // ✅ exclude self
    (u.name?.toLowerCase().includes(search) || u.email.toLowerCase().includes(search))
)

  .map((u) => {
    const firstName = u.name?.split(" ")[0] || u.email.split("@")[0].replace(/[0-9]/g, "");
    const hasProfileImage = u.photoURL;
    const userColor = hasProfileImage ? "transparent" : getUserColor(u.id);

    return (
      <div
        key={u.id}
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px",
          borderRadius: "5px",
          cursor: "pointer",
          background: selectedUser?.id === u.id ? "rgba(255, 255, 255, 0.1)" : "transparent",

        }}
        onClick={() => setSelectedUser(u)}
      >
     <div
  style={{
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: hasProfileImage ? "transparent" : userColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: "16px",
    marginRight: "10px",
    overflow: "hidden",
  }}
>
  {u.photoURL ? (
    <img
      src={u.photoURL}
      alt="Profile"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  ) : (
    (u.name || u.email || "").charAt(0).toUpperCase()
  )}
</div>


        <p style={{ fontWeight: u.id === user.uid ? "bold" : "normal" }}>
          {firstName} {u.id === user.uid ? "(You)" : ""}
        </p>
      </div>
    );
  })}

      </div>

      {/* Chat Section */}
      <div
  style={{
    flex: 1,
    display: isMobile && !selectedUser ? "none" : "flex", //
    textAlign: "center",
    height: "100vh",
    width: "100%",
    flexDirection: "column" ,
    // background:  "#008080 #3F3F4F #8A2BE2 #48D1CC #F0F8FF #E0E0E0 #D8BFD8 #182024 #2F4F4F #5F9EA0 #8b674d  #c15f2e #375A5A", 
    // background:  " #8A2BE2", 
    background: chatBackground,
    
  }}
>

 

  {/* Fixed Top Section */}
  <div
    style={{
      display: "flex",
      // justifyContent: "start",
      alignItems: "center",
      gap : '5px' ,
      padding: window.innerWidth >= 768 ? "4px 10px" : "0px 7px",
      fontSize: isMobile ? "16px" : "18px",
      flexShrink: 0,
      position: "sticky",
      top: 0,
      zIndex: 10,
      paddingTop: window.innerWidth >= 768 ? "14px" : "0px",
      background: " #303A40",
      color: "white", 
      // border :'2px solid red'
    }}
   className="top-icon-div">
     {selectedUser && isMobile && (
    <button
    onClick={() => setSelectedUser(null)}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "start",
      // margin: "10px",
      padding: "5px",
      background: "none",
      color: "#007bff",
      border: "none",
      cursor: "pointer",
      fontSize: "18px",
    }}
  >
    <FaArrowLeft />
  </button>
  )}
   <span style={{ display: "flex", alignItems: "center", gap: "4px"  , width:'100%'}}>
  {selectedUser && (
   <div className="mobile-avatar">
  <div
    style={{
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      backgroundColor: selectedUser.profileColor || "#ccc",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: "16px",
      textTransform: "uppercase",
      flexShrink: 0,
      overflow: "hidden",
      marginTop :'17px' ,
      
      
    }}
  >
    {selectedUser.photoURL ? (
      <img
        src={selectedUser.photoURL}
        alt="Profile"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "50%",
        }}
      />
    ) : (
      (selectedUser.name || selectedUser.email).charAt(0)
    )}
  </div>
</div>

  )}

 <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
    color: "#fff",
    width : '100%',
    marginTop: window.innerWidth <= 768 ? "12px" : "0px", // Only on small screens
  }}
>
  {/* User name or placeholder */}
  <div style={{ fontWeight: "bold", fontSize: "16px" , }} >
    {selectedUser
      ? selectedUser.name || selectedUser.email.split("@")[0]
      : "Select a user to chat"}
  </div>

  {/* Icons section */}
  {selectedUser && (
    <div style={{ display: "flex", alignItems: "center", gap: window.innerWidth <= 768 ? "14px" : "30px",}}>
      <FontAwesomeIcon icon={faVideo} style={{ cursor: "pointer" , fontSize: "15px"  }} title="Video Call" />
      <FontAwesomeIcon icon={faPhone} style={{ cursor: "pointer" , fontSize: "15px" }} title="Voice Call" />
      <span style={{ position: "relative" }}>
  <FontAwesomeIcon
    icon={faEllipsisV}
    style={{ cursor: "pointer", fontSize: "15px" }}
    title="More Options"
    onClick={() => setShowDropdown((prev) => !prev)}
  />

{showDropdown && (
  <div
    style={{
      position: "absolute",
      top: "25px",
      right: 0,
      background: "#fff",
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "10px",
      zIndex: 1000,
      width: "160px",
      display: "flex",
      flexWrap: "wrap", // 👈 allows wrapping
      gap: "8px",
      boxShadow: "0px 4px 8px rgba(0,0,0,0.15)",
    }}
  >
    {[
      "#008080", "#3F3F4F", "#8A2BE2", "#48D1CC",
       "#D8BFD8", "#182024", "#2F4F4F", "#5F9EA0",
      "#4A3B30", "#604A3F", "#375A5A",
    ].map((color) => (
      <button
        key={color}
        onClick={() => {
          setChatBackground(color);
          setShowDropdown(false);
        }}
        style={{
          width: "30px",
          height: "30px",
          background: color,
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      />
    ))}
  </div>
)}


</span>

    </div>
  )}
</div>

</span>
  </div>



{/* Scrollable Chat Messages */}
<div

 ref={chatContainerRef}
 style={{
   flex: 1,
   overflowY: "auto",
   padding: "10px",
   display: "flex",
   flexDirection: "column",
 }}
>
  {!selectedUser && !isMobile && (
  <div
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "22px",
      color: "#888",
      textAlign: "center",
      padding: "20px",
    }}
  >
    Select a user to start chatting
  </div>
)}

{selectedUser && messages.length === 0 && (
  <div
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
      flexDirection: "column",
      animation: "fadeIn 0.6s ease-in-out",
    }}
  >
    <div style={{ fontSize: "40px", marginBottom: "10px" }}>👋</div>

    <p
      style={{
        fontSize: window.innerWidth <= 480 ? "16px" : "20px",
        color: "#888",
        lineHeight: 1.5,
      }}
    >
      Say hi to{" "}
      <strong style={{ color: "#fff" }}>
        {selectedUser.name?.split(" ")[0] || selectedUser.email}
      </strong>
    </p>

    {/* Optional subtext */}
    <p
      style={{
        fontSize: "14px",
        color: "#aaa",
        marginTop: "5px",
      }}
    >
      Start a conversation
    </p>

    {/* Keyframes for animation */}
    <style>
      {`
        @keyframes fadeIn {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}
    </style>
  </div>
)}


{messages.map((msg) => {
{messages.map((msg) => (
  <div
    key={msg.id}
    onContextMenu={(e) => handleRightClick(e, msg)}
    onTouchStart={(e) => {
      e.target.startX = e.touches[0].clientX;
      handleTouchStart(e, msg); // existing long press support
    }}
    onTouchEnd={(e) => {
      const endX = e.changedTouches[0].clientX;
      const startX = e.target.startX || 0;

      if (startX - endX > 50) {
        handleReply(msg); // ✅ swipe to reply
      } else {
        handleTouchEnd(e); // keep long press working
      }
    }}
    style={{
      padding: "10px",
      margin: "5px",
      borderRadius: "10px",
      background: msg.senderId === user.uid ? "#DCF8C6" : "#FFFFFF",
      maxWidth: "80%",
      wordWrap: "break-word",
      cursor: "pointer",
      alignSelf: msg.senderId === user.uid ? "flex-end" : "flex-start",
    }}
  >
    {/* 🔁 Show replied-to message preview */}
  {/* ✅ If it's a reply, show the original message preview */}
  {msg.replyTo && (
      <div
        style={{
          fontSize: "12px",
          color: "#555",
          marginBottom: "4px",
          borderLeft: "3px solid #007bff",
          paddingLeft: "6px",
        }}
      >
        Replying to: <i>{msg.replyTo}</i>
      </div>
    )}
    {/* 💬 Actual message content */}
    {msg.message}
  </div>
))}


    const messageTime = msg.timestamp
        ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        : "Just now";

    return (
        <div
            key={msg.id}
            style={{
              maxWidth: window.innerWidth <= 480 ? "85%" : "39%", // ✅ Increase width on smaller screens
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
              fontSize: window.innerWidth <= 480 ? "13px" : "16px", // ✅ Reduce font size on small screens
              padding: "10px",
              borderRadius: "10px",
              background: msg.senderId === user.uid ? "#DCF8C6" : "#FFFFFF",
              alignSelf: msg.senderId === user.uid ? "flex-end" : "flex-start",
              textAlign: "left",
              border: "1px solid #ccc",
              position: "relative",
          
              /* ✅ Fix Overflow Issues */
              wordWrap: "break-word",
              overflowWrap: "break-word",
              whiteSpace: "pre-wrap",
          }}
            onContextMenu={(e) => handleRightClick(e, msg)}
        >
            <p>{msg.message}</p>
            {msg.edited && ( // ✅ Show "Edited" if the message was modified
                <p style={{ fontSize: "10px", color: "#888", marginTop: "2px" }}>Edited</p>
            )}
            <p style={{ fontSize: "10px", color: "#666", marginTop: "0px", textAlign: "right" }}>
                {messageTime}
            </p>
        </div>
    );
})}
</div>


{showDeleteModal && (
    <DeleteConfirmationModal
        message={selectedMessage.message}
        onConfirm={handleConfirmDelete} // ✅ Pass function without arguments
        onCancel={handleCancelDelete}
    />
)}

{contextMenu && (
  <div
    style={{
      position: "absolute",
      top: `${contextMenu.y}px`,
      left: `${contextMenu.x}px`,
      background: "white",
      border: "1px solid #ccc",
      boxShadow: "2px 2px 10px rgba(0,0,0,0.2)",
      padding: "5px",
      zIndex: 1000,
    }}
  >
    <p
      style={{ cursor: "pointer" }}
      onClick={() => handleEditMessage(contextMenu.message)} // Edit option
    >
      Edit
    </p>
    <p
      style={{ cursor: "pointer" }}
      onClick={() => handleDeleteMessage(contextMenu.message)} // Delete option
    >
      Delete
    </p>
  </div>
)}



  {/* Fixed Input Section */}
     {selectedUser && (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      padding: "10px",
      borderTop: "1px solid #ccc",
      position: "sticky",
      bottom: 0,
      background: "#303A40",
      zIndex: 10,
      marginBottom: "0px",
      flexWrap: "nowrap",
      width: "100%",
      boxSizing: "border-box",
       position: "relative", // Required for send button absolute positioning
    }}
  >


  
    {showEmojiPicker && (
      <div
        ref={emojiPickerRef}
        style={{
          position: "absolute",
          bottom: window.innerWidth <= 480 ? "70px" : "60px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
          width: window.innerWidth <= 480 ? "90vw" : "auto",
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        <EmojiPicker
          onEmojiClick={(emoji) => {
            setMessage((prev) => prev + emoji.emoji);
            setShowEmojiPicker(false);
          }}
        />
      </div>
    )}


    {/* Input wrapper for icons and responsiveness */}
    <div
      style={{
        position: "relative",
        flex: 1,
        width: "100%",
      }}
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault(); // Prevents newline if using textarea
            handleSendOrUpdateMessage();
          }
        }}
        placeholder="Type a message..."
        style={{
          width: "100%",
          background: "white",
          paddingLeft: "60px",
          paddingRight: "60px",
          paddingTop: "10px",
          paddingBottom: "10px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: window.innerWidth <= 768 ? "16px" : "14px",
          outline: "none",
        }}
      />

      {/* Emoji icon (left inside input) */}
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        style={{
          position: "absolute",
          left: "24px",
          top: "50%",
          transform: "translateY(-50%)",
          background: "none",
          fontSize: "18px",
          color: "gray",
          cursor: "pointer",
          padding: 0,
          
        }}
      >
        <FontAwesomeIcon icon={faSmile} />
      </button>
 
 {/* 📎 Paperclip Icon for File Upload (Left side of input) */}
<label
  htmlFor="fileUpload"
  style={{
    position: "absolute",
    left: "10px",
    top: "48%",
    transform: "translateY(-50%)",
    background: "none",
    fontSize: "18px",
    color: "gray",
    cursor: "pointer",
    padding: 0,
  }}
>
  <FontAwesomeIcon icon={faPaperclip} />
  <input
    id="fileUpload"
    type="file"
    style={{ display: "none" }}
    multiple
    onChange={handleFileUpload}
  />
</label>





      {/* Send button (right inside input) */}
      <button
        onClick={handleSendOrUpdateMessage}
        style={{
          position: "absolute",
          right: "10px",
          top: "50%",
          transform: "translateY(-50%)",
          border: "none",
          background: "none",
          fontSize: "18px",
          color: "#007bff",
          cursor: "pointer",
          padding: 0,
        }}
        
      >
        <FontAwesomeIcon icon={faPaperPlane} 
         style={{
          transform: "rotate(38deg)", // 👈 Perfect Telegram-style angle
        }}/>
      </button>
    </div>
  </div>
)} 

  </div>
    </div>
  );
};

export default Chat; 