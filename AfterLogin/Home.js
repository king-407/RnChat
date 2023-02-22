import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState} from 'react';
import Lottie from 'lottie-react-native';
const Home = () => {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const querySnap = await firestore().collection('users').get();
    const allusers = querySnap._docs.map(docSnap => docSnap.data());
    setUsers(allusers);
  };
  useEffect(() => {
    getUsers();
  }, []);
  console.log(users);
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <Lottie
          style={{alignSelf: 'center', height: 250, width: 10, marginTop: 20}}
          source={require('../animations/chatting.json')}
          autoPlay
        />
        <View style={{marginTop: 40}}>
          {users.map(student => {
            console.log(student);
            return (
              <TouchableOpacity
                key={student.uid}
                style={{
                  marginTop: 10,
                  height: 150,
                  width: 350,
                  backgroundColor: '#FFF2FD',
                  borderRadius: 35,

                  elevation: 10,

                  alignSelf: 'center',
                  // flexDirection: 'row',
                }}>
                <View>
                  <Text
                    style={{
                      marginLeft: 20,
                      marginTop: 20,
                      fontSize: 20,
                      fontWeight: '450',
                      fontStyle: 'italic',
                      color: 'black',
                    }}>
                    {student.email}
                  </Text>
                  <Text
                    style={{
                      marginLeft: 12,
                      marginTop: 12,
                      fontSize: 17,
                      fontStyle: 'italic',
                      fontWeight: '500',
                      color: 'black',
                    }}>
                    {student.uid}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
