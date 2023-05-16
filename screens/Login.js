import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert
} from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
const backImage = require("../assets/backImage.png");
const logo = require("../assets/friendinmypocket.png");

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onHandleLogin = () => {
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => console.log("Login success"))
        .catch((err) => Alert.alert("Login error", err.message));
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.logocontainer}> */}
      <Image source={logo} style={styles.logo} />
      {/* </View> */}

      <View style={styles.whiteSheet} />
      <Image source={backImage} style={styles.backImage} />
      <SafeAreaView style={styles.form}>
        {/* <Text style={styles.title}>Log In</Text> */}
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          {/* <image source /> */}
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            {" "}
            Log In
          </Text>
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center"
          }}
        >
          <Text style={{ color: "white", fontWeight: "600", fontSize: 14 }}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={{ color: "#219ebc", fontWeight: "600", fontSize: 14 }}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  logo: {
    width: "32%",
    height: "22%",
    position: "absolute",
    zIndex: 1,
    alignSelf: "center",
    marginTop: 25,
    borderRadius: 30,
    borderColor: "white",
    borderWidth: 2
  },
  // logo: {
  //   width: 100,
  //   height: 100
  // },

  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12
  },
  backImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    resizeMode: "cover"
  },
  whiteSheet: {
    width: "100%",
    height: "100%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff"
    // borderTopLeftRadius: 60
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30
  },
  button: {
    backgroundColor: "#219ebc",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40
  }
});
