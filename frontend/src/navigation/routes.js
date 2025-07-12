import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "./AuthContext";
import AuthRoutes from "./AuthRoutes";
import AppRoutes from "./AppRoutes";

export default function Routes() {
  const { user, isLoading } = useContext(AuthContext);
  console.log(user);
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return user ? <AppRoutes /> : <AuthRoutes />;
}
