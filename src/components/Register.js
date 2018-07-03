import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import firebase from "react-native-firebase";
import { StackNavigator } from "react-navigation";



import App from "../../App";

export default class Register extends Component {
  constructor(){
    super();
    this.state = {
      email: '',
      password: '',
      firstanem:'',
      lastname: ''
    }
  }
  signUpUser = (email, password) => {
    try {
      firebase
        .auth()
        .createUserAndRetrieveDataWithEmailAndPassword(email, password).then(() => {
          const uid = firebase.auth().currentUser.uid;
          firebase.database().ref('users/' + uid).set({
            email: this.state.email,
            password: this.state.password,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
          });
      });
    } catch (error) {
      console.log(error.toString());
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SIGN UP</Text>
        <View style={styles.infoContainer}>
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
            returnKeyType="next"
            autoCorrect={false}
            ref={"PasswordText"}
            onSubmitEditing={() => this.refs.FirstText.focus()}
            onChangeText={password => this.setState({ password })}
          />

          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="grey"
            returnKeyType="next"
            autoCorrect={false}
            ref={"FirstText"}
            onSubmitEditing={() => this.refs.LastText.focus()}
            onChangeText={firstname => this.setState({ firstname })}
          />

          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="grey"
            returnKeyType="go"
            autoCorrect={false}
            ref={"LastText"}
            onChangeText={lastname => this.setState({ lastname })}
          />

          <TouchableOpacity
            onPress={() =>
              this.signUpUser(this.state.email, this.state.password)
            }
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}> CREATE ACCOUNT </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#34427c",
    padding: 20
  },

  title: {
    color: "white",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 200,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "white"
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 400,
    bottom: 0,
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
