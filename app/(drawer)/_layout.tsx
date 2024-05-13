import { View, Text, TouchableOpacity } from "react-native";
import "react-native-gesture-handler";
import React from "react";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CustomDrawerContent from "@/components/CustomDrawerContent";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomDrawerContent}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Denetimler",
            headerTitle: "Denetimler",
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }}
                onPress={() => {
                  router.push("/Add-audit");
                }}
              >
                <Ionicons name="add-circle-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          }}
        />
        <Drawer.Screen
          name="History"
          options={{
            drawerLabel: "Geçmiş Denetimler",
            headerTitle: "Geçmiş Denetimler",
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
