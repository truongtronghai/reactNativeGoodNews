import React from "react";
import { StyleSheet, Text, View } from "react-native";

const NotFound = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Screen Not Found</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    color: "#888",
    fontWeight: "bold",
  },
});

export default NotFound;
