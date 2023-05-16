import { useState, useEffect, useLayoutEffect, useCallback } from "react";

import { Configuration, OpenAIApi } from "openai";
import {
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  View,
  ActivityIndicator
} from "react-native";

import { GiftedChat, SystemMessage } from "react-native-gifted-chat";
import { Avatar } from "react-native-elements";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from "firebase/firestore";

import { signOut } from "firebase/auth";
import { auth, database, openaiApiKey } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";
import axios from "axios";
// import { KeyboardAvoidingView } from "react-native";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const [user, loading] = useAuthState(auth);
  const [sendingMessage, setSendingMessage] = useState(false);

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      )
    });
  }, [navigation]);

  const openai = new OpenAIApi(
    new Configuration({
      organization: "org-8fdQgzwomN8mD3PVkgvYeZes",
      // ApiKey: { openaiApiKey }
      ApiKey: "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"
    })
  );
  // console.log(apiKey);
  useEffect(() => {
    const messagesRef = collection(database, "chats");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          createdAt: data.createdAt.toDate(),
          user: data.user
        };
      });

      setMessages(newMessages);
    });

    return unsubscribe;
  }, []);

  const handleSendMessage = useCallback(
    async (newMessages = []) => {
      setSendingMessage(true);

      const newMessage = newMessages[0];

      const questionMessage = {
        _id: new Date().getTime(),
        createdAt: new Date(),
        text: newMessage.text,
        system: true,
        user: {
          _id: user.uid,
          name: user.displayName
        }
      };

      setMessages((previousMessages) =>
        GiftedChat.append(questionMessage, previousMessages)
      );

      const promptText =
        "Tu es mon meilleur ami, tu es bienveillant  et tu dois me faire la conversation sans dépasser le token de 200, n'hesites pas à utiliser des emojies dans tes réponses ";

      const response = await axios.post(
        "https://api.openai.com/v1/completions",
        {
          model: "text-davinci-003",
          prompt: "User: " + promptText + newMessage.text + "\nBot:",
          max_tokens: 200,
          n: 1,
          stop: "\n"
        },
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${openaiApiKey}`
            Authorization: `Bearer ${"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"}`
          }
        }
      );

      const answer = response.data.choices[0].text.trim();
      console.log(answer);

      const answerMessage = {
        _id: new Date().getTime() + 1,
        createdAt: new Date(),
        text: answer,
        system: true,
        user: {
          _id: 2,
          name: "Chatbot"
        }
      };
      try {
        await addDoc(collection(database, "chats"), {
          text: answer,
          createdAt: new Date(),
          user: {
            _id: "Chatbot",
            name: "Chatbot"
          }
        });
      } catch (error) {
        console.log("Error adding message to Firestore: ", error);
      }
      setMessages((previousMessages) => [...previousMessages, answerMessage]);
      setMessages((previousMessages) => previousMessages.reverse());
      // setMessages((previousMessages) =>
      //   GiftedChat.append(answerMessage, previousMessages)
      // );

      const { uid } = user;
      try {
        await addDoc(collection(database, "chats"), {
          text: newMessage.text,
          createdAt: new Date(),
          user: {
            _id: user.uid,
            name: user.displayName
          }
        });
      } catch (error) {
        console.log("Error adding message to Firestore: ", error);
      }

      setSendingMessage(false);
    },
    [user]
  );

  if (loading) {
    return null;
  }
  function renderAvatar(props) {
    return (
      <View style={{ backgroundColor: "white" }}>
        <Avatar source={require("../assets/bubble.png")} size="medium" />
      </View>
    );
  }
  return (
    <GiftedChat
      key={messages.length}
      messages={messages}
      user={{ _id: user.uid }}
      onSend={handleSendMessage}
      renderAvatar={renderAvatar}
      disabled={sendingMessage}
      renderFooter={() => {
        if (sendingMessage) {
          return <ActivityIndicator size="small" />;
        }
        return null;
      }}
    />
  );
}
