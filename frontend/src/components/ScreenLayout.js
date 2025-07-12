import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScreenLayout({ children, style, isScrollable = false, hasHeader = false }) {
  const Container = isScrollable ? ScrollView : View;

  const containerProps = isScrollable
    ? { contentContainerStyle: [styles.innerContainer, style] }
    : { style: [styles.innerContainer, style] };
  
  const header_edges = ["bottom", "left", "right"]
  const no_header_edges = ["top", "bottom", "left", "right"]
  const edges = hasHeader ? header_edges : no_header_edges;
  
  return (
    <SafeAreaView style={styles.safeArea} edges={edges}>
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
