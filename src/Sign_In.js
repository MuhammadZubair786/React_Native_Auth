
import React,{useState} from 'react';

import {
    SafeAreaView, ScrollView, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const Sign_In = (props) => {

    let [email,setemail] = useState()
    let [password,setpassword] = useState()
  

    const sign_up =  async ()=>{
        console.log(email)
        console.log(password)

     auth()
            .signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res.user.uid)

              
                
           
                alert("Successfully User  Sig In")
                setemail('')
                setpassword('')
                
                props.navigation.navigate('Home',{
              user_uid: res.user.uid
                   
                  })

               
            })
            .catch(error => {

                if (error.code === 'auth/user-not-found') {
                    
                    Alert.alert("In_Correct Email", " There is no user record corresponding to this identifier");
                }
                if (error.code === 'auth/wrong-password') {
                    Alert.alert("In_Correct Password", " The password is invalid or the user does not have a password!");
                   
                }

                // if (error.code === 'auth/invalid-email') {
                //     console.log('That email address is invalid!');
                // }

                console.error(error);
            });
    

       
  

    }




    return (
        <View>
            <Text style={{ fontSize: 25, marginTop: 6 + "%", fontWeight: 'bold' }}>Email Password Authetication</Text>
            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>
                <TextInput style={{ backgroundColor: '#ccc', width: 80 + "%" }} placeholder='Enter Email' onChangeText={(e)=>setemail(e)} value={email}>
                </TextInput>
            </View>
           
            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>

                <TextInput style={{ backgroundColor: '#ccc', width: 80 + "%" }} placeholder='Enter Password' onChangeText={(e)=>setpassword(e)} value={password}>
                </TextInput>

            </View>


            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>
                <TouchableOpacity  onPress={()=>sign_up()} style={{ backgroundColor: 'green', width: 80 + "%", height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25, justifyContent: 'center' }}>Sig In</Text>
                </TouchableOpacity>

            </View>

            <View style={{ marginTop: 10 + "%", marginLeft: 10 + "%" }}>
                <TouchableOpacity  onPress={()=>signInWithGoogle()} style={{ backgroundColor: 'green', width: 80 + "%", height: 40, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', fontSize: 25, justifyContent: 'center' }}>Sign Up </Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Sign_In