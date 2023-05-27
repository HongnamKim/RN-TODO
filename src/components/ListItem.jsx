import { memo } from "react";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import PropTypes from "prop-types";
import { DANGER, GRAY, PRIMARY } from "../colors";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const ListItem = memo(({ item, onDelete, onToggle }) => {
  const today = new Date();
  const todayDate = today.getDate();
  const checkboxProps = {
    name: item.isDone ? "checkbox-marked" : "checkbox-blank-outline",
    color: item.isDone ? PRIMARY.DEFAULT : GRAY.DARK,
    size: 20,
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          onToggle(item.id);
        }}
      >
        <MaterialCommunityIcons {...checkboxProps} />
      </Pressable>

      <View style={styles.task}>
        <Text style={item.isDone && { color: GRAY.DEFAULT }}>{item.task}</Text>
        <Text
          style={[{ color: GRAY.DARK }, item.isDone && { color: GRAY.DEFAULT }]}
        >{`${item.month + 1} / ${item.d}`}</Text>
      </View>
      <View style={{ marginRight: 10 }}>
        <Text style={item.isDone && { color: GRAY.DEFAULT }}>{`D+${
          todayDate - item.d
        }`}</Text>
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
          color={item.isDone ? DANGER.LIGHT : DANGER.DEFAULT}
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
    borderWidth: 1,
    borderRadius: 8,
    borderColor: GRAY.DARK,
    flexDirection: "row",
    alignItems: "center",
  },
  task: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export default ListItem;
