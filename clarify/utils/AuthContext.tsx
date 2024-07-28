import React, { useContext, useEffect } from "react";
import {
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID,
  WEB_CLIENT_ID,
} from "../credentials";

import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { Platform } from "react-native";
import { makeRedirectUri } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

const AuthContext = React.createContext({});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLogged, setIsLogged] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

  const config = {
    androidClientId: ANDROID_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    webClientId: WEB_CLIENT_ID,
  };

  const [request, response, promptAsync] = Google.useAuthRequest(config, {
    scheme: "clarify",
    path: "/dashboard",
  });

  useEffect(() => {
    if (response?.type === "success") {
      setIsLogged(true);
      const { authentication } = response;
      SecureStore.setItemAsync("auth", JSON.stringify(authentication));
    }
  }, [response]);

  useEffect(() => {
    SecureStore.getItemAsync("auth").then((auth) => {
      if (!auth) {
        router.replace("/login");
      } else {
        setIsLogged(true);
        router.replace("/dashboard");
        const parsedAuth = JSON.parse(auth);
        getUserInfo(parsedAuth.accessToken);
      }
    });
  }, []);

  const getUserInfo = async (token: string) => {
    const response = await fetch(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    setUserInfo(data);
  };

  return (
    <AuthContext.Provider
      value={{ isLogged, setIsLogged, promptAsync, userInfo, setUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};
