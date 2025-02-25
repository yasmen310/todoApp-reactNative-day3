import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";

const TodoForm = ({ addNewTodo, updateTodoData }) => {
  const [title, setTitle] = useState(updateTodoData?.title || "");
  const [description, setDescription] = useState(updateTodoData?.description || "");

  const handleSubmit = () => {
    if (!title.trim()) return;
    addNewTodo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <Text style={styles.appHeader}>Todo App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Description"
        value={description}
        onChangeText={setDescription}
      />
      <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={handleSubmit}>
        <Text style={{ color: "#fff" }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export const styles = StyleSheet.create({
  appHeader: {
    textTransform: "uppercase",
    fontWeight: "bold",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aeaeae",
    width: "90%",
    marginVertical: 10,
    height: 50,
    padding: 10,
    borderRadius: 5,
  },
  submitBtn: {
    width: "50%",
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
});
export default TodoForm;
