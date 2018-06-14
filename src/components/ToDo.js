import React , {Component} from 'react';
import {  View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default class ToDo extends React.Component{
    render() {
        return(
            <View key = {this.props.keyval} style = {styles.todo} >
            <Text style = {styles.todoText}> {this.props.val.date} </Text>
            <Text style = {styles.todoText}> {this.props.val.todo} </Text>

            <TouchableOpacity onPress = {this.props.deleteTodo} style = {styles.todoDelete}>
            <Text style = {styles.todoDeleteText}> D </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress = {this.props.editTodo} style = {styles.todoEdit}>
            <Text style = {styles.todoDeleteText}> E </Text>
            </TouchableOpacity>

            </View>


        );
    }
}

const styles = StyleSheet.create({
    todo: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
    },
    todoText: {
        paddingLeft: 20,
        borderLeftWidth: 10,
        borderLeftColor: '#34427c'
    },
    todoDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10,

    },

    todoDeleteText: {
        color: 'white',
    },

    todoEdit: {
        position:'absolute',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#2980b9',
        top:10,
        bottom:10,
        right:50,
        padding:10
        
    }
   
});