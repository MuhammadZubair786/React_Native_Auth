import React,{useState,useEffect} from 'react';

import {
    SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

const Home = ({ route, navigation })=>{
   console.log(route.params.user_uid)

   useEffect(()=>{
       firestore()
  .collection('users')
  .doc(route.params.user_uid)
  .get()
  .then(documentSnapshot => {
    console.log('User exists: ', documentSnapshot.exists);

    if (documentSnapshot.exists) {
      console.log('User data: ', documentSnapshot.data());

      var data = documentSnapshot.data()
      console.log(data.name)


    }
  });

   },[])
    return(
        <View style={{justifyContent:'center',alignItems:'center',alignContent:'center',marginTop:50+'%'}}>
        <Text style={{fontSize:40}}>Home Page</Text>
        </View>
    )
}

export default Home;