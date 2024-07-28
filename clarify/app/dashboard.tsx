import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  Modal,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/utils/AuthContext";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  userInfo: {
    given_name: string;
    picture: string;
    email: string;
    verified_email: boolean;
  };
  setUserInfo: React.Dispatch<React.SetStateAction<{}>>;
}

export default function dashboard() {
  const [showLogout, setShowLogout] = React.useState(false);
  const [showLogoutModal, setShowLogoutModal] = React.useState(false);

  const { setIsLogged, setUserInfo, userInfo } =
    useAuthContext() as AuthContextType;

  const router = useRouter();

  return (
    <SafeAreaView className="bg-white flex-1 items-center justify-between">
      <StatusBar barStyle="dark-content" />
      <View className="w-full border-b border-gray-200 flex flex-row items-center justify-between p-4">
        <View className="">
          <Text className="font-normal text-2xl text-gray-500">
            Hello,{" "}
            <Text className="text-blue-500 font-medium">
              {userInfo?.given_name}
            </Text>
            .
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setShowLogout(!showLogout)}
          className="h-12 w-12 bg-gray-300 rounded-full"
        >
          {userInfo?.picture && (
            <Image
              src={`${userInfo.picture}`}
              resizeMode="contain"
              className="h-full w-full rounded-full"
            />
          )}
        </TouchableOpacity>
      </View>
      <Modal visible={showLogout} transparent={true}>
        <Pressable className="flex-1" onPress={() => setShowLogout(false)}>
          <View
            style={{
              elevation: 5,
              shadowColor: "black",
              shadowOpacity: 0.2,
              shadowOffset: {
                width: 0,
                height: 2,
              },
            }}
            className="absolute top-20 right-4 rounded-xl flex justify-center items-center bg-white p-4"
          >
            <View className="pb-4">
              <Text className="text-lg text-black font-medium">
                {userInfo?.email}
              </Text>
              <Text className="text-sm text-black font-normal">
                {userInfo?.verified_email ? "Verified" : "Not Verified"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowLogout(false);
                setShowLogoutModal(true);
              }}
              className="bg-blue-100 rounded-lg w-full p-2 flex items-center justify-center"
            >
              <Text className="text-lg text-blue-600 font-medium">Log out</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Modal visible={showLogoutModal} transparent={true}>
        <TouchableOpacity
          className="flex-1 bg-black/25 flex justify-center items-center"
          onPress={() => setShowLogoutModal(false)}
        >
          <View className="rounded-2xl bg-white p-8">
            <View>
              <Text className="font-medium text-lg">
                Are you sure, you want to logout?
              </Text>
            </View>
            <View>
              <View className="flex flex-row justify-evenly mt-8">
                <TouchableOpacity
                  onPress={() => setShowLogoutModal(false)}
                  className="bg-blue-400 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-medium text-lg">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setShowLogoutModal(false);
                    setIsLogged(false);
                    SecureStore.deleteItemAsync("auth");
                    router.replace("/login");
                  }}
                  className="bg-red-400 px-4 py-2 rounded-lg"
                >
                  <Text className="text-white font-medium text-lg">Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
