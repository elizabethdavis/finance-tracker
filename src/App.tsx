import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import Profile from "./components/Profile";
import Home from "./components/Home";
import AddPost from "./components/AddPost";
import ExpenseList from "./components/ExpenseList";
import SignIn from "./components/SignIn";
import { User as FirebaseUser } from "firebase/auth";
import WelcomeScreen from "./components/WelcomeScreen";
import LeftNavigation from "./components/LeftNavigation";
import AddButton from "./components/AddButton";

const App: React.FC = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="app flex min-h-screen">
        {user && <LeftNavigation />}
        <main className="flex-grow relative">
          {user ? (
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/add-post" element={<AddPost />} />
                <Route path="/expenses" element={<ExpenseList />} />
              </Routes>
              <AddButton />
            </>
          ) : (
            <Routes>
              <Route path="/" element={<WelcomeScreen />} />
              <Route path="/signin" element={<SignIn />} />
            </Routes>
          )}
        </main>
      </div>
    </Router>
  );
};

export default App;