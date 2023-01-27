import { DrawerActions, DrawerNavigationState, useNavigation, useNavigationState } from "@react-navigation/core";
import { NavigationProp } from "@react-navigation/native";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootDrawerParamList } from "../RootDrawer";
import { CustomDrawerItem } from "./CustomDrawerItem";
import { useOpenDrawerYOffset } from "./useOpenDrawerYOffset";

type CustomDrawerContentNavigationProp = NavigationProp<
  RootDrawerParamList,
  keyof RootDrawerParamList,
  undefined,
  DrawerNavigationState<RootDrawerParamList>
>;

const items = [
  {
    key: "StartTabs",
    label: "Start",
    handler: (navigation) => navigation.navigate("StartTabs", { screen: "HomeStack" }),
  },
  {
    key: "YourCartStack",
    label: "Your Cart",
    handler: (navigation) => navigation.navigate("YourCartStack"),
  },
  {
    key: "FavouritesStack",
    label: "Favourites",
    handler: (navigation) => navigation.navigate("FavouritesStack"),
  },
  {
    key: "YourOrdersStack",
    label: "Your Orders",
    handler: (navigation) => navigation.navigate("YourOrdersStack"),
  },
] satisfies {
  key: keyof RootDrawerParamList;
  label: string;
  handler: (navigation: CustomDrawerContentNavigationProp) => void;
}[];

export function CustomDrawerContent() {
  const insets = useSafeAreaInsets();
  const openYOffset = useOpenDrawerYOffset();

  const navigation = useNavigation<CustomDrawerContentNavigationProp>();
  const selectedItem = useSelectedItem();

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          height: insets.top,
        }}
      />

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Beka</Text>

        {items.map((item) => (
          <CustomDrawerItem
            key={item.label}
            label={item.label}
            selected={selectedItem === item.key}
            onPress={item.handler && (() => item.handler(navigation))}
          />
        ))}

        <View style={styles.bottomLine} />

        <CustomDrawerItem label="Sign Out" onPress={() => navigation.dispatch(DrawerActions.closeDrawer())} />
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

function useSelectedItem() {
  const navigation = useNavigation<CustomDrawerContentNavigationProp>();

  return useNavigationState((): keyof RootDrawerParamList | null => {
    const state = navigation.getState();
    const { history } = navigation.getState() ?? {};
    if (!history) return "StartTabs";

    for (let i = history.length - 1; i >= 0; i--) {
      const item = history[i];
      if (item.type !== "route") continue;

      const { key } = item;
      const route = state.routes.find((r) => r.key === key);

      if (route) {
        return route.name as keyof RootDrawerParamList;
      }
    }

    return null;
  });
}
