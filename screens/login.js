import * as React from "react";
import { KeyboardAvoidingView } from "react-native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import firebase from 'firebase';
import { Entypo } from '@expo/vector-icons';

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      mail: '',
      pass: '',
      sec: true,
    }
  }

  securityChange = () => {
    this.setState({ sec: !this.state.sec })
  }


  login = () => {
    if (this.state.mail && this.state.pass) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.mail, this.state.pass)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          alert('Logged In')
          this.props.navigation.navigate('ReaderScreen')
        })
        .catch((error) => {
          var errorCode = error.code;
          console.log(errorCode)
          if (errorCode === 'auth/invalid-email') {
            alert('Wrong Email ID')
          }

          else if (errorCode === 'auth/wrong-password') {
            alert('Password is Wrong')
          }
        });
    }
    else {
      alert('Please enter Email and Password')
    }
  };


  render() {
    return (

      <KeyboardAvoidingView
        enabled={true}
        behavior={'padding'}
      >

        <View style={styles.view}>


        <Image
          source={require('../assets/st1.jpg')}
          style={styles.image}
        />

        <TextInput
          placeholder={'Enter Email ID'}
          onChangeText={x => {
            this.setState({ mail: x })
          }}
          value={this.state.mail}
          style={[styles.mail, { marginTop: 30, width: '95%' }]}
        />

        <View style={{ flexDirection: 'row' }}>

          <TextInput
            placeholder={'Enter Password'}
            onChangeText={x => {
              this.setState({ pass: x })
            }}
            value={this.state.pass}
            style={[styles.mail,{borderRightWidth:0,paddingLeft:38}]}
            secureTextEntry={this.state.sec}
          />

          <TouchableOpacity style={[styles.mail, {
            height: '50%', width: '10%', paddingTop: 10, borderLeftWidth: 0,
          }]}
            onPress={() => {
              this.securityChange()
            }
            }
          >
            {!this.state.sec ? (<Entypo name="eye" size={24} color="black" />) : (<Entypo name="eye-with-line" size={24} color="black" />)}


          </TouchableOpacity>

        </View>

        <TouchableOpacity
          style={styles.log}
          onPress={() => {
            this.login()
          }}
        >
          <Text style={styles.text}>Login</Text>
        </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  mail: {
    borderWidth: 3,
    marginTop: 50,
    textAlign: 'center',
    width: '85%',
    height: 50,
    alignItems: 'center',
  },
  log: {
    marginTop: 50,
    borderWidth: 3,
    width: '30%',
    height: '8%',
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 4,
    borderRadius: 20
  },
  view: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 250,
    marginTop:8,

  }
})