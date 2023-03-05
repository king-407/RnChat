import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {ScrollView} from 'react-native-gesture-handler';
const ShowTweet = ({user}) => {
  const [tweets, setTweets] = useState([]);

  const getTweets = async () => {
    try {
      const querySnap = await firestore().collection('Tweets').get();
      let cards = [];
      querySnap._docs.forEach(element => {
        cards.push(element._data);
      });
      setTweets(cards);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getTweets();
    console.log(tweets);
  }, []);

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
                    fontWeight: '450',
                    fontStyle: 'italic',
                    color: 'black',
                  }}>
                  {student.tweet}
                </Text>
                <Text
                  style={{
                    marginLeft: 270,
                    marginTop: 47,
                    fontSize: 17,
                    fontStyle: 'italic',
                    fontWeight: '500',
                    color: 'black',
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
