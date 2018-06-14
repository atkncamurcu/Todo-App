import React from "react";
import {
  StyleSheet,
  Platform,
  Image,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";

import firebase from "react-native-firebase";

import { StackNavigator } from "react-navigation";
import Login from "./src/components/Login";
import Register from "./src/components/Register";
import Home from "./src/components/Home";
import ToDo from "./src/components/ToDo";

const firebaseConfig = {
  apiKey: "AIzaSyAYrpvi6AlwWIjpJAHim6ULQWhBtCtCDrU",
  authDomain: "to-do-list-27e4a.firebaseapp.com",
  databaseURL: "https://to-do-list-27e4a.firebaseio.com",
  projectId: "to-do-list-27e4a",
  storageBucket: "to-do-list-27e4a.appspot.com",
  messagingSenderId: "271936216853"
};

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(prop) {
    super();
    this.state = {
      email: "",
      password: ""
    };
  }



  /*
  componentDidMount() { 

  } 

  
 firebase.initializeApp({
      apiKey: "AIzaSyAYrpvi6AlwWIjpJAHim6ULQWhBtCtCDrU",
      authDomain: "to-do-list-27e4a.firebaseapp.com",
      databaseURL: "https://to-do-list-27e4a.firebaseio.com",
      projectId: "to-do-list-27e4a",
      storageBucket: "to-do-list-27e4a.appspot.com",
      messagingSenderId: "271936216853"
    });

    firebase.auth().onAuthStateChanged( user => {
      if(user) {
        this.setState({
          authenticated: true,
          user
        });
      }
      else {
        this.setState({
          authenticated: false,
          user: {}
        });
      }
    });
*/

  render() {
    return (
      <AppStackNavigator />

      /*      <ScrollView>
        <View style={styles.container}>
        <Image source={require('./assets/RNFirebase.png')} style={[styles.logo]} />
        <Text style={styles.welcome}>
          Welcome to the React Native{'\n'}Firebase starter project!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit App.js
        </Text>
        {Platform.OS === 'ios' ? (
          <Text style={styles.instructions}>
            Press Cmd+R to reload,{'\n'}
            Cmd+D or shake for dev menu
          </Text>
        ) : (
          <Text style={styles.instructions}>
            Double tap R on your keyboard to reload,{'\n'}
            Cmd+M or shake for dev menu
          </Text>
        )}
        <View style={styles.modules}>
          <Text style={styles.modulesHeader}>The following Firebase modules are enabled:</Text>
          {firebase.admob.nativeModuleExists && <Text style={styles.module}>Admob</Text>}
          {firebase.analytics.nativeModuleExists && <Text style={styles.module}>Analytics</Text>}
          {firebase.auth.nativeModuleExists && <Text style={styles.module}>Authentication</Text>}
          {firebase.crashlytics.nativeModuleExists && <Text style={styles.module}>Crashlytics</Text>}
          {firebase.firestore.nativeModuleExists && <Text style={styles.module}>Cloud Firestore</Text>}
          {firebase.messaging.nativeModuleExists && <Text style={styles.module}>Cloud Messaging</Text>}
          {firebase.links.nativeModuleExists && <Text style={styles.module}>Dynamic Links</Text>}
          {firebase.iid.nativeModuleExists && <Text style={styles.module}>Instance ID</Text>}
          {firebase.notifications.nativeModuleExists && <Text style={styles.module}>Notifications</Text>}
          {firebase.perf.nativeModuleExists && <Text style={styles.module}>Performance Monitoring</Text>}
          {firebase.database.nativeModuleExists && <Text style={styles.module}>Realtime Database</Text>}
          {firebase.config.nativeModuleExists && <Text style={styles.module}>Remote Config</Text>}
          {firebase.storage.nativeModuleExists && <Text style={styles.module}>Storage</Text>}
        </View>
        </View>    
      </ScrollView>*/
    );
  }
}

const AppStackNavigator = new StackNavigator(
  {
    Login: { screen: Login, navigationOptions: { header: null } },
    Register: { screen: Register, navigationOptions: { header: null } },
    Home: { screen: Home, navigationOptions: { header: null } }
  },
  {}
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  logo: {
    height: 80,
    marginBottom: 16,
    marginTop: 32,
    width: 80
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  },
  modules: {
    margin: 20
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: "center"
  }
});
