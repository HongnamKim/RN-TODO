import { FlatList, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import ListItem from "./ListItem";
import { GRAY } from "../colors";

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const List = ({ data, onDelete, onToggle }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      windowSize={5}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={{ height: 10 }}
      ListFooterComponent={View}
      ListFooterComponentStyle={{ height: 80 }}
    ></FlatList>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: GRAY.LIGHT,
    height: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});

export default List;
