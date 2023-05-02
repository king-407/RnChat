import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import React, {useEffect, useState, useLayoutEffect} from 'react';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AntDesign from 'react-native-vector-icons/AntDesign';
const Home = ({navigation, user}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [name, setName] = useState();
  const [profile, setProfile] = useState();

  const userInfo = async () => {
    const person = await firestore().collection('users').doc(user.uid).get();
    setName(person._data.name);
    setProfile(person._data.display);
  };
  const getPosts = async () => {
    setLoading(true);
    const querySnap = await firestore().collection('Tweets').get();
    let cards = [];
    querySnap._docs.forEach(element => {
      cards.push(element._data);
    });
    setTweets(cards);
    setLoading(false);
  };
  useEffect(() => {
    userInfo();
  }, []);

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

  useEffect(() => {
    console.log('i am back');
    getPosts();
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
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{backgroundColor: 'black'}}>
      <TouchableOpacity
        onPress={() => {
          auth().signOut();
        }}>
        <Image
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            position: 'absolute',
            right: 10,
            top: 40,
          }}
          source={{
            uri: profile,
          }}
        />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            fontFamily: 'DancingScript-VariableFont_wght',
            fontSize: 45,
            marginTop: 20,
            marginLeft: 10,
            color: 'white',
            alignSelf: 'center',
          }}>
          DiaryBook
        </Text>

        <FlatList
          data={users}
          horizontal={true}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{marginTop: 10, marginLeft: 15}}
                onPress={() => {
                  navigation.navigate('Chat', {
                    email: item.email,
                    uid: item.uid,
                  });
                }}>
                <Image
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 50,
                    marginTop: 10,
                  }}
                  source={{
                    uri: item.display,
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />

        <AntDesign
          name="pluscircle"
          size={40}
          color="white"
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            position: 'absolute',
            left: 20,
            top: 33,
          }}
          onPress={() => {
            navigation.navigate('Tweet');
          }}
        />
      </View>
      <View style={{marginTop: 20}}>
        {tweets.map(student => {
          return (
            <View
              key={student.photu}
              style={{
                marginBottom: 30,
                marginTop: 10,
                borderTopWidth: 0.1,
                borderColor: 'white',
              }}>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Image
                  style={{height: 40, width: 40, borderRadius: 50}}
                  source={{
                    uri: student.avatar,
                  }}
                />
                <Text
                  style={{
                    color: 'white',
                    marginLeft: 10,
                    marginTop: 10,
                    fontWeight: '800',
                    fontSize: 15,
                    fontFamily: 'TiltWarp-Regular',
                  }}>
                  {student.name}
                </Text>
              </View>
              <Image
                style={{
                  flex: 1,
                  height: 300,
                  width: '100%',
                  alignSelf: 'stretch',
                }}
                source={{
                  uri: student.photu,
                }}
              />
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginTop: 10,
                  marginLeft: 10,
                }}>
                <Icon name="hearto" size={30} color="white" />
                <EvilIcons
                  name="comment"
                  size={40}
                  color="white"
                  style={{marginLeft: 10}}
                />
                <FontAwesome5
                  name="share"
                  size={30}
                  color="white"
                  style={{marginLeft: 10}}
                />
              </View>
              <View style={{display: 'flex', flexDirection: 'row'}}>
                <Text
                  style={{
                    fontWeight: '800',
                    color: 'white',
                    marginLeft: 10,
                    marginTop: 10,
                  }}>
                  {student.name}
                </Text>
                <Text style={{color: 'white', marginLeft: 6, marginTop: 10}}>
                  {student.tweet}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Home;
