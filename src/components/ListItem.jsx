import { memo, useRef } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTodayContext } from "../contexts/TodayContext";
import { useTheme } from "styled-components";

const ListItem = memo(({ item, onDelete, onToggle }) => {
  const { COLORS } = useTheme();
  const { todayYear, todayMonth, todayDate } = useTodayContext();

  const dDay = useRef();

  const postTime = new Date(item.date);
  const postYear = postTime.getFullYear();
  const postMonth = ("00" + (postTime.getMonth() + 1)).slice(-2);
  const postDate = ("00" + postTime.getDate()).slice(-2);

  const postDateString = `${postYear}-${postMonth}-${postDate}`;
  const todayDateString = `${todayYear}-${todayMonth}-${todayDate}`;

  const postObject = new Date(postDateString);
  const todayObject = new Date(todayDateString);
  dDay.current = (todayObject - postObject) / 1000 / 3600 / 24;

  const checkboxProps = {
    name: item.isDone ? "checkbox-marked" : "checkbox-blank-outline",
    color: item.isDone ? COLORS.PRIMARY.DEFAULT : COLORS.GRAY.DARK,
    size: 24,
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.subBg }]}>
      <Pressable
        onPress={() => {
          onToggle(item.id);
        }}
      >
        <MaterialCommunityIcons {...checkboxProps} />
      </Pressable>

      <View style={styles.task}>
        <Text
          style={[
            { color: COLORS.mainText },
            item.isDone && { color: COLORS.GRAY.DEFAULT },
          ]}
        >
          {item.task}
        </Text>

        <Text
          style={[
            { color: COLORS.subText },
            item.isDone && { color: COLORS.GRAY.DEFAULT },
          ]}
        >{`${postMonth} / ${postDate}`}</Text>
      </View>

      <View style={{ marginRight: 10 }}>
        <Text
          style={[
            { color: COLORS.subText },
            item.isDone && { color: COLORS.GRAY.DEFAULT },
          ]}
        >
          {`D+${dDay.current}`}
        </Text>
      </View>

      <Pressable
        onPress={() => {
          Alert.alert("삭제", "정말로 삭제하시겠습니까?", [
            {
              text: "삭제",
              style: "destructive",
              onPress: () => {
                onDelete(item.id);
              },
            },
            { text: "취소" },
          ]);
        }}
      >
        <MaterialCommunityIcons
          name="trash-can"
          size={20}
          color={item.isDone ? COLORS.DANGER.LIGHT : COLORS.DANGER.DEFAULT}
        />
      </Pressable>
    </View>
  );
});

ListItem.propTypes = {
  item: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

ListItem.displayName = "ListItem";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  task: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default ListItem;
