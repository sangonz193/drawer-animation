import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CustomDrawerItem } from "./CustomDrawerItem";
import { useOpenDrawerYOffset } from "./useOpenDrawerYOffset";

const items = ["Start", "Your Cart", "Favourites", "Your Orders"];

export function CustomDrawerContent() {
  const insets = useSafeAreaInsets();
  const openYOffset = useOpenDrawerYOffset();

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          height: insets.top,
        }}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Beka</Text>

        {items.map((item, index) => (
          <CustomDrawerItem key={item} label={item} selected={index === 0} />
        ))}

        <View style={styles.bottomLine} />

        <CustomDrawerItem label="Sign Out" />
      </View>

      <View
        style={{
          height: insets.bottom + openYOffset,
        }}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 30,
    paddingTop: 48,
    width: "60%",
    paddingRight: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 48,
    color: "white",
  },
  bottomLine: {
    height: 1,
    backgroundColor: "rgb(60,60,80)",
    width: "100%",
    marginVertical: 48,
  },
});
