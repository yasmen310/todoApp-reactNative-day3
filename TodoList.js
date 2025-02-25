import React from "react";
import {
  FlatList,
  Text,
  Pressable,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

const TodoList = ({
  filteredTodos,
  toggleStatus,
  updateTodo,
  deleteTodo,
  setFilterationType,
  filterationType,
}) => {
  const { navigate } = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <View style={styles.dividerLine} />
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterationType === "all" && styles.activeFilterBtn,
          ]}
          onPress={() => setFilterationType("all")}
        >
          <Text
            style={[
              styles.filterText,
              filterationType === "all" && styles.activeFilterText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterationType === "inProgress" && styles.activeFilterBtn,
          ]}
          onPress={() => setFilterationType("inProgress")}
        >
          <Text
            style={[
              styles.filterText,
              filterationType === "inProgress" && styles.activeFilterText,
            ]}
          >
            In Progress
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterBtn,
            filterationType === "completed" && styles.activeFilterBtn,
          ]}
          onPress={() => setFilterationType("completed")}
        >
          <Text
            style={[
              styles.filterText,
              filterationType === "completed" && styles.activeFilterText,
            ]}
          >
            Done
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredTodos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.todosContainer}    onPress={() => navigate("TodoDetails", { title: item.title })}>
            <Text
              style={{
                fontSize: 18,
                textDecorationLine: item.isDone ? "line-through" : "none",
              }}
            >
              {item.title}
            </Text>
            <View style={styles.iconsContainer}>
              <AntDesign
                name="edit"
                size={24}
                color="blue"
                style={{ marginLeft: 10 }}
                onPress={() => updateTodo(item.id)}
              />
              {item.isDone ? (
                <MaterialCommunityIcons
                  name="progress-close"
                  size={24}
                  color="black"
                  onPress={() => toggleStatus(item.id)}
                />
              ) : (
                <AntDesign
                  name="checkcircleo"
                  size={24}
                  color="green"
                  style={{ marginLeft: 6 }}
                  onPress={() => toggleStatus(item.id)}
                />
              )}
              <Feather
                name="trash"
                size={24}
                color="red"
                onPress={() => deleteTodo(item.id)}
              />
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  dividerLine: {
    height: 1,
    width: "90%",
    backgroundColor: "#aeaeae",
    marginVertical: 15,
  },
  filterContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
  },
  filterBtn: {
    width: "30%",
    backgroundColor: "#ffffff",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "black",
  },
  activeFilterBtn: {
    backgroundColor: "black",
  },
  filterText: {
    color: "black",
    fontSize: 15,
  },
  activeFilterText: {
    color: "white",
  },
  todosContainer: {
    marginTop: 10,
    width: 300,
    borderWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default TodoList;
