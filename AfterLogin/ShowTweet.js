import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
import Lottie from 'lottie-react-native';
const ShowTweet = ({user}) => {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTweets = async () => {
    try {
      setLoading(true);
      const querySnap = await firestore().collection('Tweets').get();
      let cards = [];
      querySnap._docs.forEach(element => {
        cards.push(element._data);
      });
      setTweets(cards);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTweets();
    console.log(tweets);
  }, []);
  if (loading) {
    return <Lottie source={require('../animations/loader.json')} autoPlay />;
  }
  return (
    <ScrollView>
      <View style={{marginTop: 40}}>
        {tweets.map(student => {
          return (
            <TouchableOpacity
              key={student.tweet}
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

                    fontFamily: 'TiltWarp-Regular',
                    color: 'black',
                  }}>
                  {student.tweet}
                </Text>
                <Text
                  style={{
                    marginLeft: 270,
                    marginTop: 47,
                    fontSize: 17,

                    fontWeight: '500',
                    color: 'black',
                    fontFamily: 'TiltWarp-Regular',
                  }}>
                  - {student.name}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default ShowTweet;
