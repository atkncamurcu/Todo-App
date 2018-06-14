import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";

import firebase from "react-native-firebase";
import App from '../../App'
import {Navigator} from 'react-navigation';


export default class Login extends Component {
  
  
  loginUser(){

    try {

      firebase.auth().signInWithEmailAndPassword(email, password) .then(function(user) {
        console.log(user);

      }); 
      
        this.props.navigation.navigate("Home");
        
    } 
  
    
    catch (error) {
      console.log(error.toString());
    }

  }

   
      

  

  
  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <View style={styles.infoContainer}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={require("../../assets/logo.jpg")}
            />
            <Text style={styles.title}>To Do List Application</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="E-mail Address"
            placeholderTextColor="grey"
            keyboardType="email-address"
            returnKeyType="next"
            autoCorrect={false}
            onSubmitEditing={() => this.refs.PasswordText.focus()}
            onChangeText={email => this.setState({ email })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            returnKeyType="go"
            autoCorrect={false}
            ref={"PasswordText"}
            onChangeText={password => this.setState({ password })}
          />

          <TouchableOpacity
            onPress={() => this.loginUser(this.state.email,this.state.password)}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}> Continue with Facebook </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Register")}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}> REGISTER </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#34427c",
    flexDirection: "column"
  },
  logoContainer: {
    marginTop: 75,
    alignItems: "center",
    flex: 1
  },
  logo: {
    width: 150,
    height: 150
  },
  title: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 3
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    padding: 20
  },
  input: {
    height: 40,
    marginBottom: 15,
    backgroundColor: "white",
    paddingHorizontal: 10
  },

  buttonContainer: {
    backgroundColor: "#308fd3",
    paddingVertical: 15,
    marginTop: 10
  },

  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 15,
    fontWeight: "bold"
  }
});
