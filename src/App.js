// TodoListApp.js
import React from 'react';
import { View } from 'react-native';
import TodoList from './TodoList';

const TodoListApp = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TodoList />
    </View>
  );
};

export default TodoListApp;

// TodoList.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('ton_url_api_aws/todos')
      .then(response => {
        setTodos(response.data);
      })
      .catch(error => {
        console.error('Erreur de chargement des tâches : ', error);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default TodoList;

// TodoItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TodoItem = ({ todo }) => {
  return (
    <View style={styles.todoItem}>
      <Text>{todo.task}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TodoItem;
