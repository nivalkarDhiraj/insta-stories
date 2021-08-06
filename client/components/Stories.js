import React from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
// import LinearGradient from 'react-native-linear-gradient'
import users from "../userLists.json";

export default function Stories() {
  return (
    <View style={{ flex: 1 }}>
      {users.map((item) => (
        // <Text id={index} >thisffddsf</Text>
        <View
          key={item.id}
          style={{ padding: 5, width: "85", display: "flex" }}
        >
          <View style={styles.storyCard}>
            <Image source={{ uri: item.photo }} style={styles.userImage} />

            <Text style={styles.userName}>{item.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  userImage: {
    height: 80,
    width: 80,
    borderRadius: 50,
    borderColor: "#00915e",
    borderWidth: 5,
  },

  userName: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: "1.5rem",
    paddingLeft: "0.8rem",
    paddingTop: "0.5rem",
  },

  storyCard: {
    backgroundColor: "#696868",
    padding: 2,
    borderRadius: 50,
    flexDirection: "row",
  },
});
