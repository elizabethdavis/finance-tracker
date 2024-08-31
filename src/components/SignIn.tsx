import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/profile");
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  };

  return (
    <div className="sign-in p-4 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Sign In</h2>
      <button
        onClick={handleGoogleSignIn}
        className="bg-white text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow flex items-center"
      >
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          alt="Google logo"
          className="w-6 h-6 mr-2"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
