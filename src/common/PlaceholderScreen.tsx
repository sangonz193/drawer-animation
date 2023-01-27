import { StyleSheet, Text, View } from "react-native";

export type PlaceholderScreenProps = {
  name: string;
};

export function PlaceholderScreen(props: PlaceholderScreenProps) {
  const { name } = props;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    color: "rgb(140,140,140)",
    textTransform: "uppercase",
  },
});
