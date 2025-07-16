import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function ScreenLayout({
  children,
  style,
  isScrollable = false,
  hasHeader = false,
  isList = false,
  isRegister = false,
}) {
  const Container = isScrollable ? ScrollView : View;

  const containerProps = isScrollable
    ? { contentContainerStyle: [styles.innerContainer, style] }
    : { style: [styles.innerContainer, style] };

  const header_edges = ["bottom", "left", "right"];
  const no_header_edges = ["top", "bottom", "left", "right"];
  const edges = hasHeader ? header_edges : no_header_edges;

  return !isList ? (
    <SafeAreaView style={styles.safeArea} edges={edges}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        resetScrollToCoords={{ x: 0, y: 0 }}
        scrollEnabled={isScrollable}
        contentContainerStyle={styles.innerContainer}
        extraScrollHeight={isRegister ? 150 : 0}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
      >
        <Container {...containerProps}>{children}</Container>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  ) : (
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
    padding: 12,
  },
});
