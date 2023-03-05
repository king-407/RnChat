import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
export default function Chat({user, route}) {
  const [messages, setMessages] = useState([]);
  const {uid} = route.params;
  const getMsg = async () => {
    const docId = user.uid > uid ? user.uid + '-' + uid : uid + '-' + user.uid;
    const querySnap = await firestore()
      .collection('chatroom')
      .doc(docId)
      .collection('message')
      .orderBy('createdAt', 'desc')
      .get();
    const allmsg = querySnap.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
    });
    setMessages(allmsg);
  };
  useEffect(() => {
    getMsg();
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
        onSend={mess => onSend(mess)}
        user={{
          _id: user.uid,
        }}
      />
    </View>
  );
}
