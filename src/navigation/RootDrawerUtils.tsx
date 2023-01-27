import { DrawerToggleButton } from "@react-navigation/drawer";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";
import { StyleSheet, View } from "react-native";
import { HomeStackParamList } from "./HomeStack";

const headerLeftStyles = StyleSheet.create({
  drawerButtonContainer: {
    paddingLeft: 12,
  },
});

export const commonRootDrawerScreenOptions = {
  headerLeft: () => (
    <View style={headerLeftStyles.drawerButtonContainer}>
      <DrawerToggleButton tintColor="rgb(215,210,210)" />
    </View>
  ),
  headerTitleStyle: {
    color: "rgb(140,140,140)",
    textTransform: "uppercase",
    fontWeight: "400",
    letterSpacing: 4,
    marginLeft: -10,
  },
  headerStyle: {
    shadowOpacity: 0,
  },
  cardStyle: {
    backgroundColor: "white",
  },
  headerTitleAlign: "left",
} satisfies
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<HomeStackParamList, keyof HomeStackParamList>;
      navigation: any;
    }) => StackNavigationOptions)
  | undefined;
