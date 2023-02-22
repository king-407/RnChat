import {View, Text} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';

const Home = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const querySnap = await firestore().collection('users').get();
    console.log(querySnap.docs[0].data);
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;
