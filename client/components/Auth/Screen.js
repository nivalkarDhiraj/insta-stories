import React from "react";
import { View, Button, TextInput } from "react-native";
// import Stories from "../stories";

const AuthSelect = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button 
        title="Sign In" 
        onPress={() => navigation.navigate("Login")} />
      <Button
        title="Create Accouunt"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
};

const Login = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{ height: 40, width: "80%", backgroundColor: "#c4fcb8" }}
        placeholder="User Id"
      />
      <TextInput
        style={{ height: 40, width: "80%", backgroundColor: "#c4fcb8" }}
        placeholder="Password"
      />
      <Button title="Login" onPress={() => navigation.navigate('Stories')} />
    </View>
  );
};

const Signup = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={{ height: 40, width: "80%", backgroundColor: "#c4fcb8" }}
        placeholder="Name"
      />
      <TextInput
        style={{ height: 40, width: "80%", backgroundColor: "#c4fcb8" }}
        placeholder="Email"
      />
      <TextInput
        style={{ height: 40, width: "80%", backgroundColor: "#c4fcb8" }}
        placeholder="Password"
      />
      <Button title="Signup" />
    </View>
  );
};

export { AuthSelect, Login, Signup };
