

// import Redux from "./redux"
// import Signup from './signup'
// import Appfolio from './porfolio/appforlio'
// import Login from './chatapp/home'
// import Auth from "./chatapp/auth";
// import React, { useState } from "react";
// import Auth from "./chatapp/auth";
// import Chat from "./chatapp/chat";
;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from './chatapp/auth';
import Chat from './chatapp/chat';
import SignIn from './chatapp/signin';
import SignUp from './chatapp/signup';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default App;



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import Welcome from "./chatapp/welcome";
// import Auth from "./chatapp/auth";
// import Chat from "./chatapp/chat";

// function App() {
//   const [user, setUser] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Welcome />} />
//         <Route path="/auth" element={<Auth setUser={setUser} />} />
//         <Route path="/chat" element={user ? <Chat user={user} /> : <Welcome />} />
//       </Routes>
//     </Router>
  
//   );
// }

// export default App;
