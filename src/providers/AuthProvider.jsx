import { axiosInstance } from "@/lib/axios";
import { useAuthStore } from "@/stores/useAuthStore";
import { useAuth } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
const updateApiToken = (token) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    // console.log(
    //   "Authorization header set:",
    //   axiosInstance.defaults.headers.common["Authorization"]
    // );
  } else {
    delete axiosInstance.defaults.headers.common["Authorization"];
    // console.log("Authorization header removed");
  }
};

const AuthProvider = ({ children }) => {
  const { getToken, userId } = useAuth();
  const [loading, setLoading] = useState(true);
 const {checkAdminStatus } = useAuthStore()

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken({ template: "jwt_spotify" });
        if (!token) {
          throw new Error("Failed to get token from Clerk");
        }
        console.log("Token retrieved:", token);

        updateApiToken(token);
        await checkAdminStatus();
      } catch (error) {
        console.error("Error in auth provider:", error.message);
        updateApiToken(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [getToken, checkAdminStatus]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader className="size-8 text-emerald-500 animate-spin" />
      </div>
    );
  }
  return <>{children}</>;
};

export default AuthProvider;
