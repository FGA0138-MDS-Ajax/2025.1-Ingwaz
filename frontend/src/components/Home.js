import React, { useContext } from "react";
import { Text, StyleSheet } from "react-native";

import GridMenu from "../components/GridMenu";
import ScreenLayout from "../components/ScreenLayout";
import { AuthContext } from "../navigation/AuthContext";
import LogoutButton from "./LogoutButton";

export default function HomeScreen({ children, items, subGreeting, isAbove=false }) {
  const { user } = useContext(AuthContext);

  return isAbove ? (
    <ScreenLayout isScrollable={true}>
      <Text style={styles.greeting}>{`OLÁ ${user.nome.toUpperCase()}!`}</Text>
      <Text style={styles.subGreeting}>{`${subGreeting}`}</Text>
      {children}
      <GridMenu items={items} />
      <LogoutButton />
    </ScreenLayout>
  ) : (
    <ScreenLayout isScrollable={true}>
      <Text style={styles.greeting}>{`OLÁ ${user.nome.toUpperCase()}!`}</Text>
      <Text style={styles.subGreeting}>{`${subGreeting}`}</Text>
      <GridMenu items={items} />
      {children}
      <LogoutButton />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: "#666",
    alignSelf: "flex-start",
    marginBottom: 16,
  },
});
