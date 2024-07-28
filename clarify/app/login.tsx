import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useAuthContext } from "@/utils/AuthContext";
import { AuthRequestPromptOptions, AuthSessionResult } from "expo-auth-session";

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  promptAsync: (
    options?: AuthRequestPromptOptions
  ) => Promise<AuthSessionResult>;
}

export default function login() {
  const { setIsLogged, promptAsync } = useAuthContext() as AuthContextType;
  return (
    <SafeAreaView className="bg-white flex-1 items-center justify-between">
      <StatusBar barStyle="dark-content" />
      <View className="absolute top-0 h-[35%] w-full bg-blue-200 -z-10"></View>
      <View className="absolute bottom-0 h-[70%] w-full bg-blue-400 -z-10"></View>
      <View className="h-40 w-40 bg-white rounded-full p-4 mt-[15%]">
        <Image
          source={require("../assets/images/logo.jpg")}
          resizeMode="contain"
          className="h-full w-full"
        />
      </View>
      <View className="flex-1 justify-center">
        <TouchableOpacity
          className="flex flex-row items-center px-6 py-1 rounded-xl bg-white"
          onPress={() => {
            promptAsync();
          }}
        >
          <Image
            source={require("../assets/images/google.png")}
            resizeMode="contain"
            className="h-12 w-12 mr-4"
          />
          <Text className="font-medium text-black text-lg">
            Continue with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex items-center mt-4">
          <Text className="text-base font-medium text-white underline">
            Terms of use
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
