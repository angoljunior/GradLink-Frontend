import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import api from "@/api/axios";

const GoogleAuthButton = ({ role = "student" }) => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await api.post("/auth/google/", {
        token: credentialResponse.credential,
        role,
      });

      localStorage.setItem("access", response.data.access);
      localStorage.setItem("refresh", response.data.refresh);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("userName", response.data.username);

      toast.success("Google login successful", {
        description: "Welcome to GradLink Ghana.",
      });

      if (response.data.role === "employer") {
        navigate("/employer-dashboard");
      } else {
        navigate("/student-dashboard");
      }
    } catch (error) {
      console.log("Google auth error:", error.response?.data || error);

      toast.error("Google authentication failed", {
        description:
          error.response?.data?.detail ||
          "Please try again or use email/password.",
      });
    }
  };

  return (
    <div className="w-full">
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={() => {
          toast.error("Google sign in failed", {
            description: "Please try again.",
          });
        }}
        width="100%"
      />
    </div>
  );
};

export default GoogleAuthButton;
