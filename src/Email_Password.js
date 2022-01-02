
import React,{useState} from 'react';

import {
    SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager } from "react-native-fbsdk";


GoogleSignin.configure({
  webClientId: '616812037390-lcrt56bv8efoq397n61mchvkjn2vq0v9.apps.googleusercontent.com',
});


const EmaiPassword = (props) => {

    let [email,setemail] = useState()
    let [password,setpassword] = useState()
    let [name,setName] =  useState()


    const fblogin = ()=>{
      LoginManager.logInWithPermissions(["public_profile"]).then(
        function(result) {
          if (result.isCancelled) {
            console.log("Login cancelled");
          } else {
            console.log(
              "Login success with permissions: " +
                result.grantedPermissions.toString()
            );
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
    }


    const Sign_in = ()=>{
        props.navigation.navigate('Sign In Page') 
    }

    const sign_up =  async ()=>{
        console.log(email)
        console.log(password)
        auth()
  .createUserWithEmailAndPassword(email, password)
  .then((response) => {
    console.log('User account created & signed in!');
    alert('User account created & signed in!')

     const uid = response.user.uid
        const data = {
          id: uid,
          email,
          name,
          password
        }

        console.log(data)
        const usersRef =  firestore().collection('users')
        usersRef
          .doc(uid)
          .set(data)
          .then(() => {
            console.log("ok")
          })
         



//     try{

//     const db = firestore();
//     const ref = db.collection('Users').doc();
//     const id = ref.id;
// //     console.log(id)


//     const response =  ref.set({
//     name: 'Ada Lovelace',
//     age: 30,
//   })
//   .then(() => {
//     console.log('User added!');
//   });
//     }
//     catch(e){
//         console.log(e)
//     }



// console.log(id)
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
      alert('That email address is already in use!')
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
      alert('That email address is invalid!')

    }

    console.error(error);
    alert(error.message)
  });

    }


const signInWithGoogle = async() => {
  // Wrap with try catch 
 try {
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          await GoogleSignin.revokeAccess();
          console.log('Success:',userInfo);
        } catch (error) {
         
         console.log(error)
        }
}


    return (
        <View>
          <ScrollView>
            <Text style={{ fontSize: 25, marginTop: 6 + "%", fontWeight: 'bold' }}>Email Password Authetication</Text>
            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>
                <TextInput style={{ backgroundColor: '#ccc', width: 80 + "%" }} placeholder='Enter Email' onChangeText={(e)=>setemail(e)}>
                </TextInput>
            </View>
            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>

                <TextInput style={{ backgroundColor: '#ccc', width: 80 + "%" }} placeholder='Enter Name' onChangeText={(e)=>setName(e)}>
                </TextInput>

            </View>
            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>

                <TextInput style={{ backgroundColor: '#ccc', width: 80 + "%" }} placeholder='Enter Password' onChangeText={(e)=>setpassword(e)}>
                </TextInput>

            </View>


            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>
                <TouchableOpacity  onPress={()=>sign_up()} style={{ backgroundColor: 'green', width: 80 + "%", height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25, justifyContent: 'center' }}>Sig Up</Text>
                </TouchableOpacity>

            </View>

            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>
                <TouchableOpacity  onPress={()=> Sign_in()} style={{ backgroundColor: 'green', width: 80 + "%", height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25, justifyContent: 'center' }} >Sign In </Text>
                </TouchableOpacity>

            </View>

            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>
                <TouchableOpacity  onPress={()=> fblogin()} style={{ backgroundColor: 'green', width: 80 + "%", height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25, justifyContent: 'center' }} >Google Sign In </Text>
                </TouchableOpacity>

            </View>
            </ScrollView>
        </View>
    )
}

export default EmaiPassword