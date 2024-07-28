import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "@/utils/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack initialRouteName="index">
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      </Stack>
    </AuthProvider>
  );
}
