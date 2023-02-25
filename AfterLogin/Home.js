import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import Lottie from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
const Home = ({navigation, user}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    const querySnap = await firestore()
      .collection('users')
      .where('uid', '!=', user.uid)
      .get();
    const allusers = querySnap._docs.map(docSnap => docSnap.data());
    setUsers(allusers);
  };

  useEffect(() => {
    getUsers();
  }, []);

  //   useLayoutEffect(() => {
  //     navigation.setOptions({
  //       headerRight: () => (
  //         <>
  //         <AntDesign
  //           name="UserSwitchOutlined"
  //           color="black"
  //           size={50}
  //           onPress={signOutNow}

  //         />
  //         <TouchableOpacity style={{marginLeft: 20, marginTop: 20}}>
  //           <Text style={{color: 'black'}}>Logout</Text>
  //         </TouchableOpacity>
  //       ),
  //     });
  //   }, [navigation]);

  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <Lottie
          style={{alignSelf: 'center', height: 250, width: 10, marginTop: 40}}
          source={require('../animations/chatting.json')}
          autoPlay
        />
        <View style={{marginTop: 40}}>
          {users.map(student => {
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
                }}
                onPress={() => {
                  navigation.navigate('Chat', {
                    email: student.email,
                    uid: student.uid,
                  });
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
        <Text style={{color: 'black'}}> hi</Text>
        <AntDesign
          name="logout"
          color="black"
          size={30}
          style={{position: 'absolute', top: 20, right: 35}}
          onPress={() => {
            auth().signOut();
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
