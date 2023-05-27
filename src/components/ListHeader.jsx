import { StyleSheet, View, Text } from "react-native";
import PropTypes from "prop-types";
import { useCallback, useEffect, useState } from "react";

const ListHeader = ({ todos }) => {
  const [totalList, setTotalList] = useState(0);
  const [doneList, setDoneList] = useState(0);
  const [undoneList, setUndoneList] = useState(0);

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = ("00" + (today.getMonth() + 1)).slice(-2);
  const todayDate = ("00" + today.getDate()).slice(-2);

  useEffect(() => {
    countList();
  }, [todos, countList]);

  const countList = useCallback(() => {
    setTotalList(todos.length);
    setDoneList(() => {
      let count = 0;
      todos.forEach((item) => {
        if (item.isDone) {
          count++;
        }
      });

      return count;
    });
    setUndoneList(() => {
      let count = 0;
      todos.forEach((item) => {
        if (!item.isDone) {
          count++;
        }
      });

      return count;
    });
  }, [todos]);

  return (
    <View style={styles.header}>
      <Text style={styles.date}>
        {`${todayYear}. ${todayMonth}. ${todayDate}`}
      </Text>
      <Text
        style={styles.count}
      >{`${totalList} / ${doneList} / ${undoneList}`}</Text>
    </View>
  );
};

ListHeader.propTypes = {
  todos: PropTypes.array.isRequired,
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  date: { fontSize: 25, fontWeight: "700" },
  count: { fontSize: 25, fontWeight: "700" },
});

export default ListHeader;
