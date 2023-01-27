import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export type CustomDrawerItemProps = {
  label: string;
  selected?: boolean;
  onPress?: () => void;
};

export function CustomDrawerItem(props: CustomDrawerItemProps) {
  const { label, selected, onPress } = props;

  const navigation = useNavigation();

  const handlePress = () => {
    if (selected) navigation.dispatch(DrawerActions.closeDrawer());
    else onPress?.();
  };

  return (
    <TouchableOpacity style={[styles.container, selected && styles.containerSelected]} onPress={handlePress}>
      <Text style={[styles.text, selected && styles.textSelected]}>{label}</Text>
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
