import React from "react";
import Auth from "../../components/Auth/Auth.js";
import { useSelector } from "react-redux";
import { selectAuth } from "../../features/auth/authSlice";

const SignIn = () => {
  const auth = useSelector(selectAuth);

  return (
    <div>
      {auth.token ? (
        <p>Welcome! You're signed in.</p>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default SignIn;
