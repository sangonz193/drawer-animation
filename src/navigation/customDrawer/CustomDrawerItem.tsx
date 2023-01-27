import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export function CustomDrawerItem(props: { label: string; selected?: boolean }) {
  const { label, selected } = props;

  const navigation = useNavigation();

  const closeDrawer = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
  };

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.containerSelected]}
      onPress={closeDrawer}
    >
      <Text style={[styles.text, selected && styles.textSelected]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    marginBottom: 12,
    paddingVertical: 16,
    borderRadius: 12,
  },
  containerSelected: {
    backgroundColor: "rgb(60,40,60)",
  },
  text: {
    color: "white",
    fontSize: 20,
  },
  textSelected: {
    color: "rgb(220,100,110)",
  },
});
