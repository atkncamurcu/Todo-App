import React, { Component } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";

import uuid from "uuid";

import ToDo from "./ToDo";
import firebase from "react-native-firebase";






export default class Home extends React.Component {

  state = {
    ready: false,
    refreshing: false,
    todoList: [],
    todoText: "",
  };

  componentWillMount(){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        this.userID = user.uid;
      }else{
        this.props.navigation.navigate('Login');
      }
    })
  }

  componentDidMount(){
    this._loadToDos(this.userID);
  }

  _loadToDos = (id) => {

    this.setState({ refreshing: true });

    firebase.database().ref('/users/' + id + '/todo').once('value', snapshot => {
      const todosArray = [];
      snapshot.forEach(snap => {
        todosArray.push({
          todo: snap.val().addTodo,
          date: snap.val().date,
          key: snap.key
        });
      });
      this.setState({ ready: true, refreshing: false, todoList: todosArray });
    });

  }

  render() {

    if(this.state.ready){

      const tds = [];
      this.state.todoList.map(todo => {

        const deleteTodo = (key) => {
          this.state.todoList.splice(key, 1);
          this.setState({todoList: this.state.todoList, refreshing: false });
          firebase.database().ref("/users/" + this.userID + "/todo/" + key).remove();
        }

        const reKey = uuid();
        const tokey = todo.key
        tds.push(
          <ToDo
            key={reKey}
            keyval={reKey}
            val={todo}
            deleteTodo={() => deleteTodo(tokey)}
            editTodo={() => this.editTodo(tokey)}
          />
        );
      });

      return (
        <View style={styles.container}>
          <View style={styles.title}>
            <Text style={styles.titleText}> TO DO LIST </Text>
          </View>
          <ScrollView style={styles.scrollContainer}>
            {tds}
          </ScrollView>
          <TouchableOpacity 
            style={styles.signOut}
            onPress = {() => firebase.auth().signOut()}>
            <Text style = {styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
          <View style={styles.infoContainer}>
            <TextInput
              style={styles.input}
              onChangeText={todoText => this.setState({ todoText })}
              value={this.state.todoText}
              placeholder="Enter To Do"
              placeholderTextColor="white"
              underlineColorAndroid="transparent"
            />
          </View>

          <TouchableOpacity
            onPress={this.addTodo.bind(this)}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      );
    }else{
      return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator color='rgb(60, 60, 60)' size='large'/>
        </View>
      )
    }
  }

  addTodo() {

    if (this.state.todoText) {
      var x = new Date();
      const date = x.getDate() + "/" + (x.getMonth() + 1) + "/" + x.getFullYear();
      
      const ref = firebase.database()
      .ref("/users/" + this.userID + "/todo")
      .push({addTodo:this.state.todoText, date: date});

      const key = ref.key;
      ref.then(() => {
        this.setState({ 
          todoText: "", 
          todoList: [ 
            ...this.state.todoList, 
            {
              date: date, 
              todo: this.state.todoText,
              key: key
            }
          ] 
        });
      });

      
      
    }
  }

  
  
  editTodo(key) {

    const allDoS = this.state.todoList;
    const filteredDos = this.state.todoList.filter(todo => {
      if(todo.key !== key) return true;
      else return false;
    });
    const thisDos = this.state.todoList.filter(todo => {
      if(todo.key === key) return true;
      else return false;
    })[0];

    thisDos.todo = this.state.todoText;
    this.setState({
      todoText: '',
      todoList: [ thisDos, ...filteredDos ]
    })

    firebase.database().ref("/users/" + this.userID + "/todo/" + key).update({addTodo: thisDos.todo, date: thisDos.date});
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column"
  },
  title: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#34427c"
  },
  titleText: {
    color: "white",
    fontSize: 25,
    padding: 15
  },
  infoContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    backgroundColor: "#34427c"
  },
  input: {
    height: 40,
    marginBottom: 15,
    backgroundColor: "#34427c",
    paddingHorizontal: 10,
    color: "white"
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontSize: 15,
    fontWeight: "bold"
  },
  signOutText: {
    textAlign: "center",
    color:"white",
    fontSize:15,
    fontWeight: 'bold',

  },
  buttonContainer: {
    position: "absolute",
    right: 15,
    bottom: 70,
    backgroundColor: "#5c9ce0",
    width: 70,
    height: 70,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  signOut: {
    position: "absolute",
    right:0,
    top:0,
    backgroundColor: "red",
    width: 70,
    height: 63,
    alignItems: "center",
    justifyContent: "center",
    borderRadius:12
  }
});
