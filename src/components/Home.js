import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import ToDo from "./ToDo";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
      todoText: ""
    };
  }

  render() {
    let tds = this.state.todoList.map((val, key) => {
      return (
        <ToDo
          key={key}
          keyval={key}
          val={val}
          deleteTodo={() => this.deleteTodo(key)}
          editTodo={() => this.editTodo(key)}
        />
      );
    });

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}> TO DO LIST </Text>
        </View>
        <ScrollView style={styles.scrollContainer}>{tds}</ScrollView>

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
  }

  addTodo() {
    if (this.state.todoText) {
      var x = new Date();
      this.state.todoList.push({
        date: x.getDate() + "/" + (x.getMonth() + 1) + "/" + x.getFullYear(),
        todo: this.state.todoText
      });
      this.setState({ todoList: this.state.todoList });
      this.setState({ todoText: "" });
    }
  }

  deleteTodo(key) {
    this.state.todoList.splice(key, 1);
    this.setState({ todoList: this.state.todoList });
  }
  editTodo(key) {
    let t = this.state.todoList;
    t[key].todo = this.state.todoText;
    this.state.todoText = "";
    this.setState({ todoList: t });
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
  }
});
