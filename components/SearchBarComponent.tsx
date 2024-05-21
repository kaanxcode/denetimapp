import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";

const SearchBarContent = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Denetim Arayınız..."
        placeholderTextColor="#7EBDC2"
      />
    </View>
  );
};

export default SearchBarContent;

const styles = StyleSheet.create({
  container: {
    height: 70,
    justifyContent: "center",
    padding: 5,
  },
  input: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "#7EBDC2",
    height: 50,
    borderRadius: 4,
    padding: 10,
  },
});
