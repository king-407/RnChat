import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
export default function Chat({user, route}) {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = message => {
    const msg = message[0];
    const myMsg = {
      ...msg,
      sentBy: user.uid,
      sentTo: uid,
    };

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));
    const docId = user.uid > uid ? user.uid + '-' + uid : uid + '-' + user.uid;

    console.log(myMsg);
    firestore()
      .collection('chatroom')
      .doc(docId)
      .collection('message')
      .add(myMsg);
  };

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: user.uid,
        }}
      />
      <Text>hi</Text>
    </View>
  );
}
