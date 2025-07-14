import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function GridMenu({ items }) {
  const navigation = useNavigation();

  return (
    <View style={styles.grid}>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => navigation.navigate(item.label ? item.label : item.name, { ...item.params })}
        >
          {item.icon}
          <Text style={styles.buttonText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    width: "47%",
    height: 145,
    backgroundColor: "#CEEBAF",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    padding: 12,
  },
  buttonText: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 15,
    color: "#000",
  },
});
