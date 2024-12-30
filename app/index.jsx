import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  View,
  Pressable,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  // CREATE: Add a new to-do
  const addTodo = () => {
    if (text.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a valid to-do.');
      return;
    }
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), title: text.trim() },
    ]);
    setText('');
  };

  // READ: Render To-Do List (Handled by FlatList)

  // UPDATE: Edit a to-do
  const updateTodo = () => {
    if (text.trim() === '') {
      Alert.alert('Invalid Input', 'Please enter a valid to-do.');
      return;
    }
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === currentTodo.id ? { ...todo, title: text.trim() } : todo
      )
    );
    setIsModalVisible(false); // Close the modal
    setText(''); // Clear input field
  };

  // DELETE: Remove a to-do
  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  // Render each to-do item
  const renderTodo = ({ item }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.title}</Text>
      <View style={styles.actions}>
        <Pressable
          onPress={() => {
            setCurrentTodo(item);
            setText(item.title);
            setIsModalVisible(true); // Open the modal to edit
          }}
          style={styles.actionButton}
        >
          <Ionicons name="pencil" size={20} color="blue" />
        </Pressable>
        <Pressable
          onPress={() => deleteTodo(item.id)}
          style={styles.actionButton}
        >
          <Ionicons name="trash" size={20} color="red" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Enter a todo"
          placeholderTextColor="gray"
        />
        <Pressable onPress={addTodo} style={styles.addButton}>
          <Ionicons name="add-circle" size={50} color="green" />
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTodo}
        contentContainerStyle={styles.list}
      />

      {/* Modal for Editing Todo */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <TextInput
              style={styles.modalInput}
              value={text}
              onChangeText={setText}
              placeholder="Edit your todo"
              placeholderTextColor="gray"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                <Text style={styles.modalActionText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={updateTodo}>
                <Text style={styles.modalActionText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: 'black',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flexGrow: 1,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  actions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalActionText: {
    color: 'blue',
    fontSize: 16,
  },
});
