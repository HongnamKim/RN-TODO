import { ActivityIndicator, Alert, Button, View } from "react-native";
import { useEffect, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

import { nanoid } from "nanoid";

import EmptyList from "./EmptyList";
import ListHeader from "../components/ListHeader";
import List from "../components/List";
import InputFAB from "../components/InputFAB";
import TodayProvider from "../contexts/TodayContext";
import { useUserContext } from "../contexts/UserContext";

const ListScreen = () => {
  const { user } = useUserContext();

  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getItem, setItem } = useAsyncStorage(`${user}-todos`);

  const save = async (data) => {
    try {
      await setItem(JSON.stringify(data));
      setTodos(data);
    } catch (e) {
      Alert.alert("저장하기 실패", "데이터 저장에 실패했습니다.");
    }
  };

  const load = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const data = await getItem();
        const todos = JSON.parse(data || "[]");
        setTodos(todos);
      } catch (e) {
        Alert.alert("불러오기 실패", "데이터 불러오기에 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    }, 1000);
  };

  useEffect(() => {
    load();
  }, []);

  const onInsert = (task) => {
    const id = nanoid();
    const date = Date();
    const newTodos = [{ id, task, date, isDone: false }, ...todos];
    save(newTodos);
  };

  const onDelete = (id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    save(newTodos);
  };

  const onToggle = (id) => {
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item
    );
    save(newTodos);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <TodayProvider>
        <ListHeader todos={todos} />
        {todos.length ? (
          <List data={todos} onDelete={onDelete} onToggle={onToggle}></List>
        ) : (
          <EmptyList />
        )}
      </TodayProvider>
      <Button title="refresh" onPress={load} />
      <InputFAB onInsert={onInsert} />
    </View>
  );
};

ListScreen.propTypes = {};

export default ListScreen;
