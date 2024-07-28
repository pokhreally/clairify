import React, { useEffect } from "react";
import { Redirect, router } from "expo-router";

export default function oauthredirect() {
  useEffect(() => {
    router.dismissAll();
    router.replace("/dashboard");
  }, []);
  return;
}
