import React, { useEffect } from "react";
import { Redirect } from "expo-router";
import { useAuthContext } from "@/utils/AuthContext";
import { Appearance } from "react-native";

interface AuthContextType {
  isLogged: boolean;
}

export default function index() {
  const { isLogged } = useAuthContext() as AuthContextType;
  useEffect(() => {
    Appearance.setColorScheme("light");
  }, []);
  return isLogged ? <Redirect href="/dashboard" /> : <Redirect href="/login" />;
}
