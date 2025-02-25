import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [filterationType, setFilterationType] = useState("all");
  const [updateTodoData, setUpdateTodoData] = useState(null);

  useEffect(() => {
    const loadTodos = async () => {
      const storedTodos = await AsyncStorage.getItem("todos");
      if (storedTodos) {
        const parsedTodos = JSON.parse(storedTodos);
        setTodos(parsedTodos);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("todos", JSON.stringify(todos));
    filterTodos(); 
  }, [todos, filterationType]);

  const addNewTodo = (title, description) => {
    const newTodo = { id: Date.now().toString(), title, description, isDone: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos)
  };

  const toggleStatus = (id) => {
    const updatedTodos = todos.map((todo) => 
      todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
    );
    setTodos(updatedTodos);
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos); 
  };

  const updateTodo = (id) => {
  };

  const filterTodos = () => {
    let updatedFilteredTodos = [];
    if (filterationType === "inProgress") {
      updatedFilteredTodos = todos.filter((todo) => !todo.isDone);
    } else if (filterationType === "completed") {
      updatedFilteredTodos = todos.filter((todo) => todo.isDone);
    } else {
      updatedFilteredTodos = todos; 
    }
    setFilteredTodos(updatedFilteredTodos);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TodoForm addNewTodo={addNewTodo} updateTodoData={updateTodoData} />
      <TodoList
        filteredTodos={filteredTodos} 
        filterationType={filterationType}
        setFilterationType={setFilterationType}
        toggleStatus={toggleStatus}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </SafeAreaView>
  );
};


export const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    flex: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
    justifyContent: "center",
  },
});

export default Home;
