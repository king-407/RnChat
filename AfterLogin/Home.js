import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import React, {useEffect, useState, useLayoutEffect} from 'react';
import Lottie from 'lottie-react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
const Home = ({navigation, user}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const querySnap = await firestore()
      .collection('users')
      .where('uid', '!=', user.uid)
      .get();
    const allusers = querySnap._docs.map(docSnap => docSnap.data());
    setUsers(allusers);
    setLoading(false);
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
  if (loading) {
    return <Lottie source={require('../animations/loader.json')} autoPlay />;
  }
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
                  height: 140,
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
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Image
                    style={{
                      padding: 5,
                      height: 100,
                      width: 80,
                      marginLeft: 30,
                      marginTop: 15,
                      borderRadius: 100,

                      borderColor: 'black',
                    }}
                    source={require('../images/Hacker2.png')}
                  />
                  <Text
                    style={{
                      marginLeft: 50,
                      marginTop: 40,
                      fontSize: 23,
                      fontWeight: '400',
                      fontStyle: 'italic',
                      color: 'black',
                    }}>
                    {student.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <AntDesign
          name="logout"
          color="white"
          size={40}
          style={{
            position: 'absolute',
            top: 20,
            right: 35,
            backgroundColor: 'black',
            padding: 10,
            borderRadius: 50,
            shadowColor: 'black',
            shadowOpacity: 0.26,
            shadowOffset: {width: 0, height: 2},
            shadowRadius: 10,
            elevation: 3,
          }}
          onPress={() => {
            auth().signOut();
          }}
        />
        <AntDesign
          name="plus"
          color="white"
          size={40}
          style={{
            position: 'absolute',
            top: 20,
            left: 35,
            backgroundColor: 'black',
            padding: 7,
            borderRadius: 50,
            elevation: 100,
          }}
          onPress={() => {
            navigation.navigate('Tweet');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
