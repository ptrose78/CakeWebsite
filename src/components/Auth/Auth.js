import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { googleLogin } from "../../features/auth/authSlice"; // Redux action for login

const Auth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Dynamically inject the Google Sign-In script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize the Google Sign-In button after script is loaded
    script.onload = () => {
      window.google.accounts.id.initialize({
        client_id: "1080204010970-b70tu5esjutrkcqfvlhdkj79b0rtuo8v.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("g_id_signin"),
        { theme: "outline", size: "large" } // Button customization options
      );
    };

    return () => {
      document.body.removeChild(script); // Clean up script on component unmount
    };
  }, []);

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token:", response.credential);
    dispatch(googleLogin(response.credential)); // Dispatch action to store token in Redux
  };

  return <div id="g_id_signin"></div>;
};

export default Auth;
