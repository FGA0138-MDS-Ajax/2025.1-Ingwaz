import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, View } from "react-native";

export default function ScreenLayout({ children, style, isScrollable = false }) {
  const Container = isScrollable ? ScrollView : View;

  const containerProps = isScrollable
    ? { contentContainerStyle: [styles.innerContainer, style] }
    : { style: [styles.innerContainer, style] };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Container {...containerProps}>{children}</Container>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  innerContainer: {
    flexGrow: 1,
    padding: 16,
  },
});
