import { registrationDeviceId, signupError } from "@/lib/registration";
import { storeSession, dashboardPath } from "@/lib/session";
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
        device_id: registrationDeviceId(),
      });

      storeSession(response.data);

      toast.success("Google login successful", {
        description: "Welcome to GradLink Ghana.",
      });

      navigate(dashboardPath(response.data), { replace: true });
    } catch (error) {


      toast.error("Google authentication failed", {
        description:
          signupError(error),
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
